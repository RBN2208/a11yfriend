'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { createAuditSchema } from '@/utils/validations/zod-schema';
import {ApiValidationResponse} from "@/types/auth/types";
import {SupaBaseAudit} from "@/types/audit/types";

type AuditResponse = {
  ok: boolean;
  errors?: {
    field: 'name' | 'description' | 'status' | 'customer' | 'project_name' | 'module' | 'version' | 'conformance' | 'miscellaneous' | 'root';
    errors: string[];
  }[];
  message?: string;
};

export async function createAudit(values: z.infer < typeof createAuditSchema > ): Promise<AuditResponse> {
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

    const updatedFormData = {...values, user_id: client.data.user?.id || ""};

    const { error } = await supabase.from('audits').insert([updatedFormData]);
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