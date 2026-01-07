"use server"

import type { AuditResult, ManualAudit } from "@/features/audit/manual/types/types";
import type { ApiResponse } from "@/shared/api/types/types";
import { z } from "zod";
import { createServerSupabase } from "@/shared/supabase/server";
import { getCriteriasForSelectedConformanceLevel } from "@/features/audit/utils";
import { revalidateCache } from "@/shared/utils/server-utils";
import { createApiResponse } from "@/shared/api/response";
import { createAuditSchema } from "@/features/audit/manual/zod-schema";
import { validateUserAuth } from "@/shared/utils/server-utils";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";
import { getTranslations } from "next-intl/server";

// ============================================
// Constants
// ============================================

const TABLE_NAME = "manual_audits" as const;

// ============================================
// Helper Functions
// ============================================

/**
 * Creates a default set of audit results for all WCAG AAA criteria.
 * Initializes each result with 'not_checked' status and null findings.
 *
 * @returns {AuditResult[]} Array of default audit results
 */
function createDefaultAuditResults(): AuditResult[] {
  const criteria = getCriteriasForSelectedConformanceLevel('AAA');

  return criteria.map(criterion => ({
    id: criterion.id,
    name: criterion.name,
    conformance: criterion.conformance,
    referenceLink: criterion.referenceLink,
    status: "not_checked" as const,
    findings: null,
  }));
}

/**
 * Formats Zod validation errors into API response format.
 *
 * @param {z.ZodFormattedError} formattedErrors - Zod formatted error object
 * @returns {ApiResponse} Formatted API response with field errors
 */
async function formatValidationErrors(formattedErrors: z.ZodFormattedError<z.infer<typeof createAuditSchema>>): Promise<ApiResponse> {
  const t = await getTranslations('audit.messageCodes');
  const fieldKeys: Array<keyof z.infer<typeof createAuditSchema>> = [
    'name',
    'description',
    'status',
    'conformance'
  ];

  const errors = fieldKeys
    .map(field => {
      const fieldError = (formattedErrors as any)[field]?._errors[0];
      return fieldError ? { field: String(field), error: fieldError } : null;
    })
    .filter((error): error is { field: string; error: string } => error !== null);

  return createApiResponse({
    success: false,
    errors,
    message: t('validationError')
  });
}

/**
 * Determines audit status based on findings.
 * Returns 'done' if all findings are checked, otherwise 'pending'.
 *
 * @param {AuditResult[]} findings - Array of audit results
 * @returns {'pending' | 'done'} Computed audit status
 */
function computeAuditStatus(findings: AuditResult[]): 'pending' | 'done' {
  const hasUnchecked = findings.some(result => result.status === 'not_checked');
  return hasUnchecked ? 'pending' : 'done';
}

// ============================================
// Database Operations
// ============================================

/**
 * Fetches multiple audits from the database.
 *
 * @param {number} limit - Maximum number of audits to retrieve
 * @returns {Promise<ApiResponse<ManualAudit[]>>}
 */
async function fetchMultipleAudits(limit: number): Promise<ApiResponse<ManualAudit[]>> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const supabase = await createServerSupabase();

    const { data: audits, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('getError')
      });
    }

    return createApiResponse({
      success: true,
      message: t('getMultiSuccess'),
      data: audits as ManualAudit[]
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
 * Fetches a single audit from the database by ID.
 *
 * @param {string} id - Audit ID
 * @returns {Promise<ApiResponse<ManualAudit>>}
 */
async function fetchSingleAudit(id: string): Promise<ApiResponse<ManualAudit>> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const supabase = await createServerSupabase();

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
      data: audit as ManualAudit
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
export async function createAudit(values: z.infer<typeof createAuditSchema>): Promise<ApiResponse> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const validationResult = createAuditSchema.safeParse(values);
    if (!validationResult.success) {
      return formatValidationErrors(validationResult.error.format());
    }

    const authResult = await validateUserAuth();
    if (!authResult.success) {
      return authResult.error!;
    }

    const auditData = {
      ...values,
      user_id: authResult.user.id,
      status: "pending" as const,
      findings: createDefaultAuditResults()
    };

    const supabase = await createServerSupabase();
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

    revalidateCache();

    return createApiResponse({
      success: true,
      message: t('success')
    });

  } catch (error: unknown) {
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
export async function updateAudit(values: z.infer<typeof createAuditSchema>, auditId: string): Promise<ApiResponse> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const validationResult = createAuditSchema.safeParse(values);
    if (!validationResult.success) {
      return formatValidationErrors(validationResult.error.format());
    }

    const supabase = await createServerSupabase();
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

    revalidateCache();

    return createApiResponse({
      success: true,
      message: t('updateSuccess')
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
 * Updates audit results/findings and automatically computes status.
 * Status is set to 'done' if all findings are checked, otherwise 'pending'.
 *
 * @param {AuditResult[]} findings - Updated audit findings
 * @param {string} auditId - ID of audit to update
 * @returns {Promise<ApiResponse>} API response with success/error information
 */
export async function updateAuditResults(findings: AuditResult[], auditId: string): Promise<ApiResponse> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const status = computeAuditStatus(findings);

    const supabase = await createServerSupabase();
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({
        findings,
        status
      })
      .eq('id', auditId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('updateError')
      });
    }

    return createApiResponse({
      success: true,
      message: t('updateSuccess')
    });

  } catch (error: unknown) {
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
export async function deleteAudit(auditId: string): Promise<ApiResponse> {
  const t = await getTranslations('audit.messageCodes');
  try {
    const supabase = await createServerSupabase();
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

    revalidateCache();

    return createApiResponse({
      success: true,
      message: t('deleteSuccess')
    });

  } catch (error: unknown) {
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
export async function getAudit(id: string | null = null, limit: number = 5): Promise<ApiResponse<ManualAudit[] | ManualAudit>> {
  const t = await getTranslations('audit.messageCodes');
  try {
    if (id) {
      return await fetchSingleAudit(id);
    }
    return await fetchMultipleAudits(limit);

  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError')
    });
  }
}

