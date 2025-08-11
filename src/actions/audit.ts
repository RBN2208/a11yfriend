'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { createAuditSchema } from '@/utils/validations/zod-schema';
import {ApiValidationResponse} from "@/types/auth/types";
import {AuditResult, SupaBaseAudit} from "@/types/audit/types";
import {getCriteriasForSelectedConformanceLevel} from "@/lib/utils";
import {PostgrestError} from "@supabase/supabase-js";

type AuditResponse = {
  ok: boolean;
  errors?: {
    field: 'name' | 'description' | 'status' | 'customer' | 'project_name' | 'module' | 'version' | 'conformance' | 'miscellaneous' | 'root';
    errors: string[];
  }[];
  message?: string;
};

/**
 * Creates a default set of audit results for all criteria corresponding to a specific conformance level.
 * This method initializes each audit result with default values including an "id", "name", "conformance level",
 * "status", and empty "findings". These results are intended to be filtered or adjusted on the client side
 * to accommodate changes in audit settings.
 *
 * @return {AuditResult[] | any[]} An array of audit result objects with default values for all criteria.
 */
function createAuditResultsDefault(): AuditResult[] | any[] {
  const criteriasForConformance = getCriteriasForSelectedConformanceLevel('AAA');
  const auditResults: any[] = [];

  criteriasForConformance.forEach(criteria => {
    const baseResultEntry: AuditResult = {
      id: criteria.id,
      name: criteria.name,
      conformance: criteria.conformance,
      status: "not_checked",
      findings: null,
    };
    auditResults.push(baseResultEntry);
  })

  return auditResults;
}

export async function createOrUpdateAudit(values: z.infer < typeof createAuditSchema >, auditId: string | null = null ): Promise<AuditResponse> {
  try {
    const validationResult = createAuditSchema.safeParse(values);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return {
        ok: false,
        errors: [
          {
            field: 'name',
            errors: formattedErrors.name?._errors || []
          },
          {
            field: 'description',
            errors: formattedErrors.description?._errors || []
          },
          {
            field: 'status',
            errors: formattedErrors.status?._errors || []
          },
          {
            field: 'customer',
            errors: formattedErrors.customer?._errors || []
          },
          {
            field: "project_name",
            errors: formattedErrors.project_name?._errors || []
          },
          {
            field: "module",
            errors: formattedErrors.module?._errors || []
          },
          {
            field: "version",
            errors: formattedErrors.version?._errors || []
          },
          {
            field: "conformance",
            errors: formattedErrors.conformance?._errors || []
          },
          {
            field: "miscellaneous",
            errors: formattedErrors.miscellaneous?._errors || []
          }
        ],
        message: "Validation failed"
      };
    }

    const supabase = await createClient();
    const client = await supabase.auth.getUser();

    const updatedFormData = {
      ...values,
      user_id: client.data.user?.id || "",
      auditResults: createAuditResultsDefault()
    };

    let error: PostgrestError | null;

    if (auditId === null) {
      const response = await supabase.from('audits').insert([updatedFormData]);
      error = response.error;
    } else {
      const response = await supabase
          .from('audits')
          .update(values)
          .eq('id', auditId);
      error = response.error;
    }

    if (error) {
      return {
        ok: false,
        errors: [
          {
            field: 'root',
            errors: [error.message]
          }
        ],
        message: error.message
      };
    }

    revalidatePath('/', 'layout');
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      errors: [
        {
          field: 'root',
          errors: ["An unexpected error occurred"]
        }
      ],
      message: "An unexpected error occurred"
    };
  }
}


export async function getAudits(limit: number = 5): Promise<ApiValidationResponse<SupaBaseAudit[]>> {
  const supabase = await createClient();
  const { data: audits, error } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

  if (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "We couldn't fetch your audits. Please try again.",
      },
      data: null
    }
  }

  return {
    success: true,
    error: null,
    data: audits as SupaBaseAudit[]
  }
}

export async function updateAuditResults(data: AuditResult[], auditId: string) {
  const supabase = await createClient();
  const { error } = await supabase
      .from('audits')
      .update({ auditResults: data })
      .eq('id', auditId);

  if (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "Sorry, we couldn't update your audit. Please try again.",
      }
    }
  }

  return {
    success: true,
    error: null
  }
}

export async function getAudit(id: string): Promise<ApiValidationResponse<SupaBaseAudit>> {
  const supabase = await createClient();
  const { data: audit, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)

  if (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "We couldn't fetch your audit. Please try again.",
      }
    }
  }

  return {
    success: true,
    error: null,
    data: audit[0] as SupaBaseAudit
  }
}

export async function deleteAudit(auditId: string): Promise<ApiValidationResponse> {
  const supabase = await createClient();
  const { error } = await supabase.from('audits')
      .delete()
      .eq('id', auditId);

  if (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "We couldn't delete your audit. Please try again.",
      }
    }
  }

  return {
    success: true,
    error: null
  }
}