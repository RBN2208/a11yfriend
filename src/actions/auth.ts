'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
});

const oneTimeLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

const passwordSchema = z.object({
  newPassword: z.string().min(1, { message: "Password must be at least 1 characters long." })
});

type SignInResponse = {
  ok: boolean;
  errors?: {
    field: 'email' | 'password' | 'root';
    errors: string[];
  }[];
  message?: string;
};

type OneTimeLoginResponse = {
  ok: boolean;
  errors?: {
    field: 'email' | 'root';
    errors: string[];
  }[],
  message?: string;
}

type ChangePasswordResponse = {
  ok: boolean;
  errors?: {
    field: 'newPassword' | 'root';
    errors: string[];
  }[],
  message?: string;
}

export async function signIn(email: string, password: string): Promise<SignInResponse> {
  try {
    const validationResult = loginSchema.safeParse({ email, password });

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

export async function signUp(email: string, password: string): Promise<SignInResponse> {
  try {
    const validationResult = loginSchema.safeParse({ email, password });

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
    const { error } = await supabase.auth.signUp({
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

export async function oneTimeLoginWithOTP(email: string): Promise<OneTimeLoginResponse> {
  try {
    const validationResult = oneTimeLoginSchema.safeParse({ email });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return {
        ok: false,
        errors: [
          {
            field: 'email',
            errors: formattedErrors.email?._errors || []
          },
        ],
        message: "Validation failed"
      };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({email: email});

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

export async function changePassword(password: string): Promise<ChangePasswordResponse> {
  try {
    const validationResult = passwordSchema.safeParse({ newPassword: password });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return {
        ok: false,
        errors: [
          {
            field: 'newPassword',
            errors: formattedErrors.newPassword?._errors || []
          }
        ],
        message: "Validation failed"
      };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({password: password});

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