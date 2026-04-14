"use server"

import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { ApiResponse } from "@/shared/api/types/types";
import { createApiResponse } from "@/shared/api/response";
import { createServerSupabase } from "@/shared/supabase/server";
import { revalidateCache, validateUser, validateFormData } from "@/shared/utils/server-utils";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";

// ============================================
// Configuration type for audit CRUD operations
// ============================================

export type AuditActionConfig<TCreate, TEntity> = {
  tableName: string;
  translationNamespace: string;
  createSchema: z.ZodSchema<TCreate>;
  validationKeys: string[];
  defaultValues?: (values: TCreate, userId: string) => Record<string, unknown>;
};

// ============================================
// Generic fetch operations
// ============================================

export async function fetchMultiple<T>(
  supabase: SupabaseClient,
  tableName: string,
  translationNamespace: string,
  limit: number
): Promise<ApiResponse<T[]>> {
  const t = await getTranslations(translationNamespace);
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('error'),
      });
    }

    return createApiResponse({
      success: true,
      message: t('getMultiSuccess'),
      data: data as T[],
    });
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError'),
    });
  }
}

export async function fetchSingle<T>(
  supabase: SupabaseClient,
  tableName: string,
  translationNamespace: string,
  id: string
): Promise<ApiResponse<T>> {
  const t = await getTranslations(translationNamespace);
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('getError'),
      });
    }

    return createApiResponse({
      success: true,
      message: t('getSingleSuccess'),
      data: data as T,
    });
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError'),
    });
  }
}

// ============================================
// Generic CRUD operations
// ============================================

export async function createRecord<TCreate>(
  config: AuditActionConfig<TCreate, unknown>,
  values: TCreate
): Promise<ApiResponse> {
  const t = await getTranslations(config.translationNamespace);
  try {
    const formValidation = await validateFormData(
      values,
      config.createSchema,
      t('validationError'),
      config.validationKeys
    );

    if (!formValidation.success) {
      return formValidation;
    }

    const supabase = await createServerSupabase();
    const { userId } = await validateUser(supabase);

    const defaults = config.defaultValues?.(values, userId) ?? {};
    const insertData = {
      ...values,
      user_id: userId,
      ...defaults,
    };

    const { error: insertError } = await supabase
      .from(config.tableName)
      .insert([insertData]);

    if (insertError) {
      return createApiResponse({
        success: false,
        globalError: insertError.message,
        message: t('error'),
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('success'),
    });
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('error')),
      errors: [{ field: 'root', error: t('error') }],
      message: t('error'),
    });
  }
}

export async function updateRecord<TCreate>(
  config: AuditActionConfig<TCreate, unknown>,
  values: TCreate,
  recordId: string
): Promise<ApiResponse> {
  const t = await getTranslations(config.translationNamespace);
  try {
    const formValidation = await validateFormData(
      values,
      config.createSchema,
      t('validationError'),
      config.validationKeys
    );

    if (!formValidation.success) {
      return formValidation;
    }

    const supabase = await createServerSupabase();
    await validateUser(supabase);

    const { error } = await supabase
      .from(config.tableName)
      .update(values)
      .eq('id', recordId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('updateError'),
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('updateSuccess'),
    });
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('updateError')),
      message: t('updateError'),
    });
  }
}

export async function deleteRecord(
  tableName: string,
  translationNamespace: string,
  recordId: string
): Promise<ApiResponse> {
  const t = await getTranslations(translationNamespace);
  try {
    const supabase = await createServerSupabase();
    await validateUser(supabase);

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', recordId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: t('deleteError'),
      });
    }

    await revalidateCache();

    return createApiResponse({
      success: true,
      message: t('deleteSuccess'),
    });
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('deleteError')),
      errors: [{ field: 'root', error: t('deleteError') }],
      message: t('deleteError'),
    });
  }
}

export async function getRecord<T>(
  tableName: string,
  translationNamespace: string,
  id: string | null = null,
  limit: number = 5
): Promise<ApiResponse<T[] | T>> {
  const t = await getTranslations(translationNamespace);
  try {
    const supabase = await createServerSupabase();
    await validateUser(supabase);

    if (id) {
      return await fetchSingle<T>(supabase, tableName, translationNamespace, id);
    }
    return await fetchMultiple<T>(supabase, tableName, translationNamespace, limit);
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, t('getError')),
      message: t('getError'),
    });
  }
}
