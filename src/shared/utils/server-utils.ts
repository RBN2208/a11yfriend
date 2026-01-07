'use server'

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

import type {ApiResponse } from "@/shared/api/types/types";
import { createApiResponse } from "@/shared/api/response";
import { MessageCodes } from "@/shared/i18n/message-codes";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";

const REVALIDATION_PATH = "/" as const;
const REVALIDATION_TYPE = "layout" as const;

/**
 * Revalidates the application cache after data mutations.
 */
export async function revalidateCache(): Promise<void> {
  revalidatePath(REVALIDATION_PATH, REVALIDATION_TYPE);
}

type ValidateUserParams = {
  success: boolean;
  user?: any;
  error?: ApiResponse;
}

export async function validateUser(client: SupabaseClient): Promise<ValidateUserParams> {
  try {
    const { data: userData, error: userError } = await client.auth.getUser();

    if (userError || !userData.user) {
      return {
        success: false,
        error: createApiResponse({
          success: false,
          globalError: userError?.message,
          message: MessageCodes.AUTH_USER_VERIFY_ERROR
        })
      };
    }

    return { success: true, user: userData.user };
  } catch (error) {
    return {
      success: false,
      error: createApiResponse({
        success: false,
        globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
        message: MessageCodes.AUTH_USER_VERIFY_ERROR
      })
    };
  }
}

/**
 * Formats validation errors based on a schema and returns a structured API response.
 *
 * @param {any} values - The form values that were validated.
 * @param {any} schema - The validation schema used to validate the form inputs.
 * @param {string} message - A custom message to include in the API response.
 * @param {string[]} keys - An array of field names to extract errors for.
 * @return {Promise<ApiResponse>} A promise resolving to an API response object containing success status, formatted errors, and the provided message.
 */
export async function validateFormData(values: any, schema: any, message: string, keys: string[]): Promise<ApiResponse> {
  const validationResult = schema.safeParse(values);

  if (!validationResult.success) {
    const formattedErrors: z.ZodFormattedError<z.infer<typeof schema>> = validationResult.error.format();
    const fieldKeys: Array<keyof z.infer<typeof schema>> = keys;

    const errors = fieldKeys
        .map(field => {
          const fieldError = (formattedErrors as any)[field]?._errors[0];
          return fieldError ? { field: String(field), error: fieldError } : null;
        })
        .filter((error): error is { field: string; error: string } => error !== null);

    return createApiResponse({
      success: false,
      errors,
      message: message
    });
  }

  return createApiResponse({
    success: true
  });
}