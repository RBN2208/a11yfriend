"use server"

import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { AuditResult, ManualAudit } from "@/features/audit/manual/types/types";
import { getCriteriasForSelectedConformanceLevel } from "@/features/audit/utils";
import { createAuditSchema } from "@/features/audit/manual/zod-schema";

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

const TABLE_NAME = "manual_audits" as const;
const TRANSLATION_NS = "audit.messageCodes" as const;

const manualAuditConfig: AuditActionConfig<z.infer<typeof createAuditSchema>, ManualAudit> = {
  tableName: TABLE_NAME,
  translationNamespace: TRANSLATION_NS,
  createSchema: createAuditSchema,
  validationKeys: ['name', 'description', 'status', 'conformance'],
  defaultValues: () => ({
    status: "pending" as const,
    findings: createDefaultAuditResults(),
  }),
};

// ============================================
// Manual-specific helpers
// ============================================

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

function computeAuditStatus(findings: AuditResult[]): 'pending' | 'done' {
  const hasUnchecked = findings.some(result => result.status === 'not_checked');
  return hasUnchecked ? 'pending' : 'done';
}

// ============================================
// Public API - Server Actions (thin wrappers)
// ============================================

export async function createAudit(values: z.infer<typeof createAuditSchema>): Promise<ApiResponse> {
  return createRecord(manualAuditConfig, values);
}

export async function updateAudit(values: z.infer<typeof createAuditSchema>, auditId: string): Promise<ApiResponse> {
  return updateRecord(manualAuditConfig, values, auditId);
}

export async function deleteAudit(auditId: string): Promise<ApiResponse> {
  return deleteRecord(TABLE_NAME, TRANSLATION_NS, auditId);
}

export async function getAudit(id: string | null = null, limit: number = 5): Promise<ApiResponse<ManualAudit[] | ManualAudit>> {
  return getRecord<ManualAudit>(TABLE_NAME, TRANSLATION_NS, id, limit);
}

// ============================================
// Manual-specific: Update audit findings
// ============================================

export async function updateAuditResults(findings: AuditResult[], auditId: string): Promise<ApiResponse> {
  const t = await getTranslations(TRANSLATION_NS);
  try {
    const status = computeAuditStatus(findings);

    const supabase = await createServerSupabase();
    await validateUser(supabase);

    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ findings, status })
      .eq('id', auditId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: t('error'),
        message: t('updateError'),
      });
    }

    return createApiResponse({
      success: true,
      message: t('updateSuccess'),
    });
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('updateError')),
      message: t('updateError'),
    });
  }
}
