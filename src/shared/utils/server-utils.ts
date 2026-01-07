'use server'

import {revalidatePath} from "next/cache";
import type {ApiResponse} from "@/shared/api/types/types";
import {createServerSupabase} from "@/shared/supabase/server";
import {createApiResponse} from "@/shared/api/response";
import {MessageCodes} from "@/shared/i18n/message-codes";
import {getErrorOfUnknownError} from "@/shared/utils/client-utils";
import {SupabaseClient} from "@supabase/supabase-js";
import {getTranslations} from "next-intl/server";

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