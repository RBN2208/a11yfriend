'use server';

import { createClient } from '@/utils/supabase/server';
import { ApiValidationResponse } from '@/types/auth/types';

export async function requestPasswordResetEmail(formData: FormData): Promise<ApiValidationResponse> {
  const supabase = await createClient();
  const email = formData.get('email') as string;

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`
    });

    if (error) {
      return {
        success: false,
        error: {
          field: 'email',
          message: error.message,
        },
      };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      error: {
        field: 'email',
        message: 'An error occurred while processing your request.',
      },
    };
  }
}
