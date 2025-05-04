'use server';

import { createClient } from '@/utils/supabase/server';
import { ApiValidationResponse } from '@/types/auth/types';

export async function changePassword(newPassword: string): Promise<ApiValidationResponse> {
  const supabase = await createClient();

  try {
    const response = await supabase.auth.updateUser({
      password: newPassword
    });
    console.log("response", response)

    if (response.error) {
      return {
        success: false,
        error: {
          field: 'password',
          message: response.error.message,
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
