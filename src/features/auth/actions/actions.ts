'use server'
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { loginSchema, oneTimeLoginSchema, passwordSchema } from "@/features/auth/zod-schema";

import type { ApiResponse } from "@/shared/api/types/types";
import { validateFormData } from "@/shared/utils/server-utils";
import { createServerSupabase } from "@/shared/supabase/server";
import { createApiResponse } from "@/shared/api/response";
import { getErrorOfUnknownError } from "@/shared/utils/client-utils";
import { validateUser } from "@/shared/utils/server-utils";

export async function signIn(email: string, password: string): Promise<ApiResponse> {
    const t = await getTranslations('auth.messageCodes');
    try {
        const formValidation = await validateFormData(
            {email, password},
            loginSchema,
            t('validationError'),
            ['email', 'password']
        );

        if (!formValidation.success) {
            return formValidation
        }

        const supabase = await createServerSupabase();

        const {error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            return createApiResponse({
                success: false,
                globalError: error.message,
                errors: [
                    {
                        field: 'root',
                        error: error.message
                    }
                ],
                message: t('loginError')
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: t('loginSuccess')
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, t('error')),
            errors: [
                {
                    field: 'root',
                    error: t('error')
                }
            ],
            message: t('error')
        })
    }
}

export async function signUp(email: string, password: string): Promise<ApiResponse> {
    const t = await getTranslations('auth.messageCodes');
    try {
        const formValidation = await validateFormData(
            {email, password},
            loginSchema,
            t('validationError'),
            ['email', 'password']
        );

        if (!formValidation.success) {
            return formValidation
        }

        const supabase = await createServerSupabase();

        const {error} = await supabase.auth.signUp({email, password});
        if (error) {
            return createApiResponse({
                success: false,
                globalError: error.message,
                errors: [
                    {
                        field: 'root',
                        error: error.message
                    }
                ],
                message: t('registerError')
            })
        }

        revalidatePath('/', 'layout');
        return createApiResponse({
            success: true,
            message: t('registerSuccess')
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, t('errror')),
            errors: [
                {
                    field: 'root',
                    error: t('error')
                }
            ],
            message: t('error')
        })
    }
}

export async function oneTimeLoginWithOTP(email: string): Promise<ApiResponse> {
    const t = await getTranslations('auth.messageCodes');
    try {
        const formValidation = await validateFormData(
            {email},
            oneTimeLoginSchema,
            t('validationError'),
            ['email']
        );

        if (!formValidation.success) {
            return formValidation
        }


        const supabase = await createServerSupabase();

        const {error} = await supabase.auth.signInWithOtp({email: email});
        if (error) {
            return createApiResponse({
                success: false,
                globalError: error.message,
                errors: [
                    {
                        field: 'root',
                        error: error.message
                    }
                ],
                message: t('otpError')
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: t('otpSuccess')
        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, t('error')),
            errors: [
                {
                    field: 'root',
                    error: t('error')
                }
            ],
            message: t('error')
        })
    }
}

export async function changePassword(password: string): Promise<ApiResponse> {
    const t = await getTranslations('auth.messageCodes');
    try {
        const formValidation = await validateFormData(
            {password},
            passwordSchema,
            t('validationError'),
            ['password']
        );

        if (!formValidation.success) {
            return formValidation
        }

        const supabase = await createServerSupabase();
        const validation = await validateUser(supabase);

        if (!validation.success) {
            return validation.error!;
        }

        const {error} = await supabase.auth.updateUser({password: password});
        if (error) {
            return createApiResponse({
                success: false,
                globalError: error.message,
                message: t('pwChangeError')
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: t('pwChangeSuccess')
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, t('error')),
            errors: [
                {
                    field: 'root',
                    error: t('error')
                }
            ],
            message: t('error')
        })
    }
}
