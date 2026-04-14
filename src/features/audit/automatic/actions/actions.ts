"use server"

import { z } from "zod";
import { getTranslations } from "next-intl/server";

import {AuditResult, AutomaticAudit, AutomaticAuditAxeResults} from "@/features/audit/automatic/types/types";
import { createReportSchema } from "@/features/audit/automatic/zod-schema";

import type { ApiResponse } from "@/shared/api/types/types";
import { validateFormData } from "@/shared/utils/server-utils";
import { createServerSupabase } from "@/shared/supabase/server";
import { revalidateCache, validateUser } from "@/shared/utils/server-utils";
import { createApiResponse } from "@/shared/api/response";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";
import {SupabaseClient} from "@supabase/supabase-js";
import {isRedirectError} from "next/dist/client/components/redirect-error";

// ============================================
// Constants
// ============================================

const TABLE_NAME = "automatic_audits" as const;

// Private/reserved IP ranges that must not be accessed via Puppeteer (SSRF protection)
const BLOCKED_HOSTNAMES = ['localhost', '0.0.0.0'];
const BLOCKED_IP_PATTERNS = [
  /^127\./,                   // 127.0.0.0/8 loopback
  /^10\./,                    // 10.0.0.0/8 private
  /^172\.(1[6-9]|2\d|3[01])\./, // 172.16.0.0/12 private
  /^192\.168\./,              // 192.168.0.0/16 private
  /^169\.254\./,              // 169.254.0.0/16 link-local
  /^0\./,                     // 0.0.0.0/8
  /^\[::1\]/,                 // IPv6 loopback
  /^\[fd/i,                   // IPv6 unique local
  /^\[fe80:/i,                // IPv6 link-local
];

/**
 * Validates a URL to prevent SSRF attacks.
 * Blocks private IPs, reserved ranges, and non-http(s) protocols.
 *
 * @param {string} urlString - The URL to validate
 * @throws {Error} If the URL is invalid or targets a private/reserved address
 */
function validateUrlForSSRF(urlString: string): void {
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new Error(`Invalid URL: ${urlString}`);
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Only http and https protocols are allowed, got: ${parsed.protocol}`);
  }

  const hostname = parsed.hostname;

  if (BLOCKED_HOSTNAMES.includes(hostname.toLowerCase())) {
    throw new Error(`Access to ${hostname} is not allowed`);
  }

  for (const pattern of BLOCKED_IP_PATTERNS) {
    if (pattern.test(hostname)) {
      throw new Error(`Access to private/reserved IP range is not allowed: ${hostname}`);
    }
  }
}

/**
 * Fetches multiple reports from the database.
 *
 * @param {SupabaseClient} supabase - Supabase client instance
 * @param {number} limit - Maximum number of reports to retrieve
 * @returns {Promise<ApiResponse<ManualAudit[]>>}
 */
async function fetchMultipleReports(supabase: SupabaseClient, limit: number): Promise<ApiResponse<AutomaticAudit[]>> {
  const t = await getTranslations('report.messageCodes');
  try {
    const { data: audits, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('error')
      });
    }

    return createApiResponse({
      success: true,
      message: t('getMultiSuccess'),
      data: audits as AutomaticAudit[]
    });
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError')
    });
  }
}

/**
 * Fetches a single report from the database by ID.
 *
 * @param {SupabaseClient} supabase - Supabase client instance
 * @param {string} id - Report ID
 * @returns {Promise<ApiResponse<ManualAudit>>}
 */
async function fetchSingleReport(supabase: SupabaseClient, id: string): Promise<ApiResponse<AutomaticAudit>> {
  const t = await getTranslations('report.messageCodes');
  try {
    const { data: audit, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('getError')
      });
    }

    return createApiResponse({
      success: true,
      message: t('getSingleSuccess'),
      data: audit as AutomaticAudit
    });
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError')
    });
  }
}

// ============================================
// Public API - Server Actions
// ============================================

/**
 * Creates a new manual audit.
 * Validates input, authenticates user, and stores audit in database.
 *
 * @param {z.infer<typeof createAuditSchema>} values - Audit data from form
 * @returns {Promise<ApiResponse>} API response with success/error information
 *
 * @example
 * const result = await createAudit({
 *   name: "Homepage Audit",
 *   description: "Accessibility audit for homepage",
 *   status: "pending",
 *   conformance: "AA"
 * });
 */
export async function createReport(values: z.infer<typeof createReportSchema>): Promise<ApiResponse> {
  const t = await getTranslations('report.messageCodes');
  try {
    const formValidation = await validateFormData(
        values,
        createReportSchema,
        t('validationError'),
        ['name', 'description']
    );

    if (!formValidation.success) {
      return formValidation
    }

    const supabase = await createServerSupabase();
    const { userId } = await validateUser(supabase);

    const auditData = {
      ...values,
      user_id: userId
    };

    const { error: insertError } = await supabase
      .from(TABLE_NAME)
      .insert([auditData]);

    if (insertError) {
      return createApiResponse({
        success: false,
        globalError: insertError.message,
        message: t('error')
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('success')
    });

  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('error')),
      errors: [{ field: 'root', error: t('error') }],
      message: t('error')
    });
  }
}

/**
 * Updates an existing manual audit.
 * Validates input and updates audit data in database.
 *
 * @param {z.infer<typeof createAuditSchema>} values - Updated audit data
 * @param {string} auditId - ID of audit to update
 * @returns {Promise<ApiResponse>} API response with success/error information
 */
export async function updateReport(values: z.infer<typeof createReportSchema>, auditId: string): Promise<ApiResponse> {
  const t = await getTranslations('report.messageCodes');
  try {
    const formValidation = await validateFormData(
        values,
        createReportSchema,
        t('validationError'),
        ['name', 'description']
    );

    if (!formValidation.success) {
      return formValidation
    }

    const supabase = await createServerSupabase();

    await validateUser(supabase);

    const { error } = await supabase
      .from(TABLE_NAME)
      .update(values)
      .eq('id', auditId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('updateError')
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('updateSuccess')
    });

  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('updateError')),
      message: t('updateError')
    });
  }
}


/**
 * Deletes an audit from the database.
 * RLS policies ensure users can only delete their own audits.
 *
 * @param {string} auditId - ID of audit to delete
 * @returns {Promise<ApiResponse>} API response with success/error information
 */
export async function deleteReport(auditId: string): Promise<ApiResponse> {
  const t = await getTranslations('report.messageCodes');
  try {
    const supabase = await createServerSupabase();

    await validateUser(supabase);

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', auditId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('deleteError')
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('deleteSuccess')
    });

  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('deleteError')),
      errors: [{ field: 'root', error: t('deleteError') }],
      message: t('deleteError')
    });
  }
}

/**
 * Retrieves audit(s) from the database.
 * If ID is provided, fetches a single audit. Otherwise, fetches multiple audits.
 *
 * @param {string | null} id - Optional audit ID for single fetch
 * @param {number} limit - Maximum number of audits to retrieve (default: 5)
 * @returns {Promise<ApiResponse<ManualAudit[] | ManualAudit>>}
 *
 * @example
 * // Fetch single audit
 * const audit = await getAudit('123-456-789');
 *
 * // Fetch multiple audits
 * const audits = await getAudit(null, 20);
 */
export async function getReport(id: string | null = null, limit: number = 5): Promise<ApiResponse<AutomaticAudit[] | AutomaticAudit>> {
  const t = await getTranslations('report.messageCodes');
  try {
    const supabase = await createServerSupabase();
    await validateUser(supabase);

    if (id) {
      return await fetchSingleReport(supabase, id);
    }
    return await fetchMultipleReports(supabase, limit);

  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError')
    });
  }
}

/**
 * Runs an Axe accessibility report for a specific audit.
 * Executes Axe analysis and stores results in the findings array.
 *
 * @param {string} reportId - ID of the report to run Axe analysis on
 * @returns {Promise<ApiResponse>} API response with success/error information
 */
export async function runAxeReport(reportId: string): Promise<ApiResponse> {
  const t = await getTranslations('report.messageCodes');
  try {
    const supabase = await createServerSupabase();

    await validateUser(supabase);

    // Fetch the report to get URLs
    const { data: report, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', reportId)
      .single();

    if (fetchError || !report) {
      return createApiResponse({
        success: false,
        globalError: fetchError?.message || 'Report not found',
        message: t('getError')
      });
    }
    const audit = report as AutomaticAudit;

    // Validate URLs exist
    if (!audit.urls || audit.urls.length === 0) {
      return createApiResponse({
        success: false,
        globalError: 'No URLs found in report',
        message: t('error')
      });
    }

    // Validate all URLs before running analysis (SSRF protection)
    for (const { url } of audit.urls) {
      validateUrlForSSRF(url);
    }

    // Run Axe analysis for all URLs in parallel
    const axeResultsPromises = audit.urls.map(({ url }) =>
      axeReport(url)
    );

    const axeResults = await Promise.all(axeResultsPromises);

    // Get current findings or initialize empty array
    const currentFindings = audit.findings || [];

    // Create new audit result
    const newAuditResult = {
      summary: null,
      axe_results: axeResults,
      lighthouse_results: null,
      created_at: new Date().toISOString()
    };

    // Add new result to findings
    const updatedFindings = [...currentFindings, newAuditResult];

    // Update the report with new findings
    const { error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ findings: updatedFindings })
      .eq('id', reportId);

    if (updateError) {
      return createApiResponse({
        success: false,
        globalError: updateError.message,
        message: t('updateError')
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('success')
    });

  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('error')),
      message: t('error')
    });
  }
}


/**
 * Runs an Axe accessibility analysis on a given URL using Puppeteer.
 *
 * @param {string} url - The URL to analyze for accessibility issues
 * @returns {Promise<AutomaticAuditAxeResults>} Axe analysis results containing violations, passes, incomplete, and inapplicable tests
 */
async function axeReport(url: string): Promise<AutomaticAuditAxeResults> {
  const puppeteer = await import('puppeteer');
  const { AxePuppeteer } = await import('@axe-core/puppeteer');

  let browser;

  try {
    // Try to find Chrome in common locations or use bundled Chromium
    browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ||
                      process.env.CHROME_BIN ||
                      undefined // Let Puppeteer find Chrome automatically
    });
  } catch (error) {
    // If Chrome is not found, provide helpful error message
    throw new Error(
      'Chrome browser not found. Please install Chrome or run: npx puppeteer browsers install chrome'
    );
  }

  try {
    const page = await browser.newPage();

    // Set viewport for consistent results
    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for page to be fully ready and all frames to load
    await page.evaluate(() => document.readyState);
    await page.waitForFunction(() => document.readyState === 'complete');

    // Additional wait to ensure frames are ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = await new AxePuppeteer(page).analyze();

    return {
      url,
      timestamp: new Date().toISOString(),
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      testEngine: results.testEngine,
      testRunner: results.testRunner,
      testEnvironment: results.testEnvironment
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
