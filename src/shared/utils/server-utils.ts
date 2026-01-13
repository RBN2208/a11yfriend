'use server'

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

import type {ApiResponse } from "@/shared/api/types/types";
import { createApiResponse } from "@/shared/api/response";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {isRedirectError} from "next/dist/client/components/redirect-error";

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
  }}

type ValidateUserParams = {
  auth: boolean;
  userId?: string;
}

export async function validateUser(client: SupabaseClient): Promise<ValidateUserParams> {
  try {
    const { data: userData, error: userError } = await client.auth.getUser();

    if (userError || !userData.user) {
      redirect("/auth/invalid?message=session_expired");
    }

    return { auth: true, userId: userData.user.id };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    redirect("/auth/invalid?message=auth_error");
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