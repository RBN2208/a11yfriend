'use server'

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

import type { ApiResponse } from "@/shared/api/types/types";
import { createApiResponse } from "@/shared/api/response";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const REVALIDATION_PATH: string = "/";
const REVALIDATION_TYPE: "layout" | "page" = "layout";

/**
 * Revalidates the application server cache after data mutations.
 */
export async function revalidateCache(path = REVALIDATION_PATH, type = REVALIDATION_TYPE): Promise<void> {
  try {
    let pathToRevalidate = path;

    if (!pathToRevalidate) {
      const headersList = await headers();
      const referer = headersList.get('referer');
      if (referer) {
        pathToRevalidate = new URL(referer).pathname;
      }
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate, type);
    }
  } catch (error) {
    console.error("Failed to revalidate cache:", error);
    revalidatePath('/', 'layout');
  }
}

type ValidateUserResult = {
  auth: boolean;
  userId: string;
};

/**
 * Validates the current user session via Supabase auth.
 * Redirects to the invalid auth page if the session is expired or invalid.
 *
 * @param {SupabaseClient} client - The Supabase client instance
 * @returns {Promise<ValidateUserResult>} The validated user info
 */
export async function validateUser(client: SupabaseClient): Promise<ValidateUserResult> {
  try {
    const { data: userData, error: userError } = await client.auth.getUser();

    if (userError || !userData.user) {
      redirect("/auth/invalid?message=session_expired");
    }

    return { auth: true, userId: userData.user.id };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    redirect("/auth/invalid?message=auth_error");
  }
}

/**
 * Validates form data against a Zod schema and returns a structured API response.
 *
 * @template T - The inferred type of the Zod schema
 * @param {unknown} values - The form values to validate
 * @param {z.ZodSchema<T>} schema - The Zod schema to validate against
 * @param {string} message - Error message to include in the response
 * @param {string[]} keys - Field names to extract errors for
 * @returns {Promise<ApiResponse>} Structured API response with validation result
 */
export async function validateFormData<T>(
  values: unknown,
  schema: z.ZodSchema<T>,
  message: string,
  keys: string[]
): Promise<ApiResponse> {
  const validationResult = schema.safeParse(values);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.format();

    const errors = keys
      .map((field) => {
        const fieldError = (formattedErrors as Record<string, { _errors?: string[] }>)[field]?._errors?.[0];
        return fieldError ? { field: String(field), error: fieldError } : null;
      })
      .filter((err): err is { field: string; error: string } => err !== null);

    return createApiResponse({
      success: false,
      errors,
      message,
    });
  }

  return createApiResponse({
    success: true,
  });
}
