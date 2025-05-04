'use server'

import { createClient } from '@/utils/supabase/server';
import { SupaBaseAudit } from '@/types/audit/types';
import { ApiValidationResponse } from '@/types/auth/types';

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
