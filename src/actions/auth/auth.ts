'use server'
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {ApiResponse} from "@/types/api/types";
import {loginSchema, oneTimeLoginSchema, passwordSchema} from "@/actions/auth/schemas";
import {z} from "zod";
import {MessageCodes} from "@/utils/message-codes";
import {createApiResponse} from "@/actions/audit/actions";
import {getErrorOfUnknownError} from "@/lib/utils";

function createSignInValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof loginSchema>, {}>): ApiResponse {
    const fieldKeys = ['email', 'password'];

    return {
        success: false,
        errors: fieldKeys.map(name => {
            return {
                field: name,
                error: (formattedErrors as any)[name]?._errors[0] || []
            }
        }),
        message: MessageCodes.FORM_DATA_VALIDATION_ERROR
    };
}

function createOTPValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof oneTimeLoginSchema>, {}>): ApiResponse {
    const fieldKeys = ['email'];

    return {
        success: false,
        errors: fieldKeys.map(name => {
            return {
                field: name,
                error: (formattedErrors as any)[name]?._errors[0] || []
            }
        }),
        message: MessageCodes.FORM_DATA_VALIDATION_ERROR
    };
}

function createChangePasswordValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof passwordSchema>, {}>): ApiResponse {
    const fieldKeys = ['newPassword'];

    return {
        success: false,
        errors: fieldKeys.map(name => {
            return {
                field: name,
                error: (formattedErrors as any)[name]?._errors[0] || []
            }
        }),
        message: MessageCodes.FORM_DATA_VALIDATION_ERROR
    };
}


export async function signIn(email: string, password: string): Promise<ApiResponse> {
    try {
        const validationResult = loginSchema.safeParse({email, password});

        if (!validationResult.success) {
            return createSignInValidationResponse(validationResult.error.format());
        }

        const supabase = await createClient();

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
                message: MessageCodes.AUTH_LOGIN_ERROR
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: MessageCodes.AUTH_LOGIN_SUCCESS
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [
                {
                    field: 'root',
                    error: MessageCodes.GENERIC_UNEXPECTED_ERROR
                }
            ],
            message: MessageCodes.GENERIC_UNEXPECTED_ERROR
        })
    }
}

export async function signUp(email: string, password: string): Promise<ApiResponse> {
    try {
        const validationResult = loginSchema.safeParse({email, password});

        if (!validationResult.success) {
            return createSignInValidationResponse(validationResult.error.format());
        }

        const supabase = await createClient();

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
                message: MessageCodes.AUTH_REGISTER_ERROR
            })
        }

        revalidatePath('/', 'layout');
        return createApiResponse({
            success: true,
            message: MessageCodes.AUTH_REGISTER_SUCCESS
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [
                {
                    field: 'root',
                    error: MessageCodes.GENERIC_UNEXPECTED_ERROR
                }
            ],
            message: MessageCodes.GENERIC_UNEXPECTED_ERROR
        })
    }
}

export async function oneTimeLoginWithOTP(email: string): Promise<ApiResponse> {
    try {
        const validationResult = oneTimeLoginSchema.safeParse({email});

        if (!validationResult.success) {
            return createOTPValidationResponse(validationResult.error.format());
        }

        const supabase = await createClient();

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
                message: MessageCodes.AUTH_OTP_ERROR
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: MessageCodes.AUTH_OTP_SUCCESS
        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [
                {
                    field: 'root',
                    error: MessageCodes.GENERIC_UNEXPECTED_ERROR
                }
            ],
            message: MessageCodes.GENERIC_UNEXPECTED_ERROR
        })
    }
}

export async function changePassword(password: string): Promise<ApiResponse> {
    try {
        const validationResult = passwordSchema.safeParse({newPassword: password});

        if (!validationResult.success) {
            return createChangePasswordValidationResponse(validationResult.error.format());
        }

        const supabase = await createClient();

        const {error} = await supabase.auth.updateUser({password: password});
        if (error) {
            return createApiResponse({
                success: false,
                globalError: error.message,
                message: MessageCodes.AUTH_PASSWORD_CHANGE_ERROR
            })
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: MessageCodes.AUTH_PASSWORD_CHANGE_SUCCESS
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [
                {
                    field: 'root',
                    error: MessageCodes.GENERIC_UNEXPECTED_ERROR
                }
            ],
            message: MessageCodes.GENERIC_UNEXPECTED_ERROR
        })
    }
}
