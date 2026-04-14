"use server"

import { z } from "zod";
import { getTranslations } from "next-intl/server";

import { AutomaticAudit, AutomaticAuditAxeResults } from "@/features/audit/automatic/types/types";
import { createReportSchema } from "@/features/audit/automatic/zod-schema";

import type { ApiResponse } from "@/shared/api/types/types";
import { createServerSupabase } from "@/shared/supabase/server";
import { revalidateCache, validateUser } from "@/shared/utils/server-utils";
import { createApiResponse } from "@/shared/api/response";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";

import {
  type AuditActionConfig,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecord,
} from "@/features/audit/shared/base-actions";

// ============================================
// Configuration
// ============================================

const TABLE_NAME = "automatic_audits" as const;
const TRANSLATION_NS = "report.messageCodes" as const;

const automaticAuditConfig: AuditActionConfig<z.infer<typeof createReportSchema>, AutomaticAudit> = {
  tableName: TABLE_NAME,
  translationNamespace: TRANSLATION_NS,
  createSchema: createReportSchema,
  validationKeys: ['name', 'description'],
};

// ============================================
// SSRF Protection
// ============================================

const BLOCKED_HOSTNAMES = ['localhost', '0.0.0.0'];
const BLOCKED_IP_PATTERNS = [
  /^127\./,                       // 127.0.0.0/8 loopback
  /^10\./,                        // 10.0.0.0/8 private
  /^172\.(1[6-9]|2\d|3[01])\./,  // 172.16.0.0/12 private
  /^192\.168\./,                  // 192.168.0.0/16 private
  /^169\.254\./,                  // 169.254.0.0/16 link-local
  /^0\./,                         // 0.0.0.0/8
  /^\[::1\]/,                     // IPv6 loopback
  /^\[fd/i,                       // IPv6 unique local
  /^\[fe80:/i,                    // IPv6 link-local
];

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

// ============================================
// Public API - Server Actions (thin wrappers)
// ============================================

export async function createReport(values: z.infer<typeof createReportSchema>): Promise<ApiResponse> {
  return createRecord(automaticAuditConfig, values);
}

export async function updateReport(values: z.infer<typeof createReportSchema>, auditId: string): Promise<ApiResponse> {
  return updateRecord(automaticAuditConfig, values, auditId);
}

export async function deleteReport(auditId: string): Promise<ApiResponse> {
  return deleteRecord(TABLE_NAME, TRANSLATION_NS, auditId);
}

export async function getReport(id: string | null = null, limit: number = 5): Promise<ApiResponse<AutomaticAudit[] | AutomaticAudit>> {
  return getRecord<AutomaticAudit>(TABLE_NAME, TRANSLATION_NS, id, limit);
}

// ============================================
// Automatic-specific: Axe Report
// ============================================

export async function runAxeReport(reportId: string): Promise<ApiResponse> {
  const t = await getTranslations(TRANSLATION_NS);
  try {
    const supabase = await createServerSupabase();
    await validateUser(supabase);

    const { data: report, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', reportId)
      .single();

    if (fetchError || !report) {
      return createApiResponse({
        success: false,
        globalError: fetchError?.message || 'Report not found',
        message: t('getError'),
      });
    }
    const audit = report as AutomaticAudit;

    if (!audit.urls || audit.urls.length === 0) {
      return createApiResponse({
        success: false,
        globalError: 'No URLs found in report',
        message: t('error'),
      });
    }

    // Validate all URLs before running analysis (SSRF protection)
    for (const { url } of audit.urls) {
      validateUrlForSSRF(url);
    }

    const axeResults = await Promise.all(
      audit.urls.map(({ url }) => axeReport(url))
    );

    const currentFindings = audit.findings || [];
    const newAuditResult = {
      summary: null,
      axe_results: axeResults,
      lighthouse_results: null,
      created_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ findings: [...currentFindings, newAuditResult] })
      .eq('id', reportId);

    if (updateError) {
      return createApiResponse({
        success: false,
        globalError: updateError.message,
        message: t('updateError'),
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('success'),
    });
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('error')),
      message: t('error'),
    });
  }
}

// ============================================
// Puppeteer Axe analysis
// ============================================

async function axeReport(url: string): Promise<AutomaticAuditAxeResults> {
  const puppeteer = await import('puppeteer');
  const { AxePuppeteer } = await import('@axe-core/puppeteer');

  let browser;

  try {
    browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ||
                      process.env.CHROME_BIN ||
                      undefined,
    });
  } catch {
    throw new Error(
      'Chrome browser not found. Please install Chrome or run: npx puppeteer browsers install chrome'
    );
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await page.evaluate(() => document.readyState);
    await page.waitForFunction(() => document.readyState === 'complete');
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
      testEnvironment: results.testEnvironment,
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
