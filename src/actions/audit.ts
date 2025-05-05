'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  customer: z.string(),
  project_name: z.string(),
  module: z.string(),
  version: z.string(),
  conformance: z.string(),
  miscellaneous: z.string()
});

type AuditResponse = {
  ok: boolean;
  errors?: {
    field: 'email' | 'password' | 'root';
    errors: string[];
  }[];
  message?: string;
};

export async function createAudit(values: z.infer < typeof formSchema > ): Promise<AuditResponse> {
  try {
    const validationResult = formSchema.safeParse(values);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return {
        ok: false,
        errors: [
          {
            field: 'email',
            errors: formattedErrors.email?._errors || []
          },
          {
            field: 'password',
            errors: formattedErrors.password?._errors || []
          }
        ],
        message: "Validation failed"
      };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

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
