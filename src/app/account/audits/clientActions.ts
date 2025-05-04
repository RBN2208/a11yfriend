import { SupaBaseAudit } from '@/types/audit/types';
import { ApiValidationResponse } from '@/types/auth/types';
import { createClient } from '@/utils/supabase/client';

type FormDataType = Omit<SupaBaseAudit, 'created_at' | 'updated_at' | 'id' | 'audit' | '' | 'user_id'>;

export async function createAudit(formData: FormDataType): Promise<ApiValidationResponse> {
  const supabase = await createClient();
  const client = await supabase.auth.getUser();

  const updatedFormData = {...formData, user_id: client.data.user?.id || ""};

  const { error } = await supabase.from('audits').insert([updatedFormData]);

  if (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "We couldn't create your audit. Please try again.",
      }
    }
  }

  return {
    success: true,
    error: null
  }
}
