'use server'

import {AxePuppeteer} from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';
import {AxeReport, AxeReportConfig} from "@/types/report/types";
import {z} from "zod";
import {createReportSchema} from "@/utils/validations/zod-schema";
import {ApiResponse} from "@/types/api/types";
import {createClient} from "@/utils/supabase/server";
import {MessageCodes} from "@/utils/message-codes";
import {revalidatePath} from "next/cache";
import {getErrorOfUnknownError} from "@/lib/utils";
import {createApiResponse} from "@/actions/audit/actions";
import {SupabaseReport} from "@/types/report/types";

export async function initAxeReport(config: AxeReportConfig, reportId: string): Promise<ApiResponse> {
    const browser = await puppeteer.launch();
    const supabase = await createClient();

    const page = await browser.newPage();
    const results = [];

    try {
        for (const url of config.urls.split(',')) {
            await page.goto(url);
            try {
                const result = await new AxePuppeteer(page).analyze();
                results.push(result);
            } catch (e) {
                console.error(`Error analyzing ${url}:`, e);
            }
        }

        // save report to axeReport in table

        return await saveReportToDB(results, reportId);
    } catch (e) {
        return createApiResponse({
            success: false,
            message: "Error in try,catch loop block"
        })
    } finally {
        await browser.close();
    }
}

function createReportValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof createReportSchema>, {}>): ApiResponse {
    const fieldKeys = ['name', 'urls'];

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

export async function createReport(values: z.infer<typeof createReportSchema>): Promise<ApiResponse> {
    try {
        const validationResult = createReportSchema.safeParse(values);

        if (!validationResult.success) {
            // return the field validations before everything else
            return createReportValidationResponse(validationResult.error.format());
        }

        const supabase = await createClient();

        const { error: userError, data: userData } = await supabase.auth.getUser();
        if (userError) {
            return {
                success: false,
                globalError: userError.message,
                message: MessageCodes.AUTH_USER_VERIFY_ERROR
            };
        }

        const updatedFormData = {
            name: values.name,
            urls: values.urls,
            user_id: userData.user?.id || "",
            axeReports: []
        };

        const { data , error: insertError } = await supabase.from('reports').insert([updatedFormData]).select();
        if (insertError) {
            return {
                success: false,
                globalError: insertError.message,
                message: MessageCodes.REPORT_CREATE_ERROR
            };
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: MessageCodes.REPORT_CREATE_SUCCESS,
            data: {
                id: data[0].id
            }

        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [{ field: 'root', error: MessageCodes.GENERIC_UNEXPECTED_ERROR }],
            message: MessageCodes.REPORT_CREATE_ERROR_UNEXPECTED
        });
    }
}

export async function saveReportToDB(reportData: AxeReport[], reportId: string): Promise<ApiResponse> {
    try {
        const supabase = await createClient();
        const { error: userError, data: userData } = await supabase.auth.getUser();

        const {error} = await supabase
            .from('reports')
            .update([{axeReports: reportData}])
            .eq('id', reportId || "");

        if (error) {
            return {
                success: false,
                globalError: error.message,
                message: "Error saving report to database"
            };
        }

        revalidatePath('/', 'layout');

        return createApiResponse({
            success: true,
            message: "Report saved successfully",
        })
    } catch (error) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            message: MessageCodes.AUDIT_UPDATE_ERROR_UNEXPECTED,
        })
    }
}

export async function deleteReport(reportId: string): Promise<ApiResponse> {
    try {
        const supabase = await createClient();
        const {error: deleteError} = await supabase.from('reports')
            .delete()
            .eq('id', reportId);

        if (deleteError) {
            return createApiResponse({
                success: false,
                globalError: deleteError.message,
                message: MessageCodes.REPORT_DELETE_ERROR
            })
        }

        return createApiResponse({
            success: true,
            message: MessageCodes.REPORT_DELETE_SUCCESS,
        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            errors: [{ field: 'root', error: MessageCodes.GENERIC_UNEXPECTED_ERROR }],
            message: MessageCodes.REPORT_DELETE_ERROR_UNEXPECTED
        });
    }
}

export async function getReport(id: string | null = null, limit: number = 5): Promise<ApiResponse<SupabaseReport[] | SupabaseReport>> {
    try {
        if (id) {
            return getSingleReport(id);
        } else {
            return getMultipleReports(limit);
        }
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
            message: MessageCodes.REPORT_GET_GENERIC_ERROR_UNEXPECTED,
        })
    }
}

async function getMultipleReports(limit: number): Promise<ApiResponse<SupabaseReport[]>> {
    try {
        const supabase = await createClient();

        const {data: reports, error} = await supabase
            .from('reports')
            .select('*')
            .order('created_at', {ascending: false})
            .limit(limit)

        if (error) {
            return createApiResponse({
                success: false,
                message: MessageCodes.REPORT_GET_GENERIC_ERROR,
                globalError: error.message
            })
        }

        return createApiResponse({
            success: true,
            message: MessageCodes.REPORT_GET_SUCCESS,
            data: reports as SupabaseReport[]
        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            message: MessageCodes.REPORT_GET_GENERIC_ERROR_UNEXPECTED,
            globalError: getErrorOfUnknownError(error, MessageCodes.REPORT_GET_GENERIC_ERROR)
        })
    }
}

async function getSingleReport(id: string): Promise<ApiResponse<SupabaseReport>> {
    try {
        const supabase = await createClient();

        const {data: report, error} = await supabase
            .from('reports')
            .select('*')
            .eq('id', id);

        if (error) {
            return createApiResponse({
                success: false,
                message: MessageCodes.REPORT_GET_GENERIC_ERROR,
                globalError: error.message
            })
        }

        return createApiResponse({
            success: true,
            message: MessageCodes.REPORT_GET_SUCCESS,
            data: report[0] as SupabaseReport
        })
    } catch (error: unknown) {
        return createApiResponse({
            success: false,
            globalError: getErrorOfUnknownError(error, MessageCodes.REPORT_GET_GENERIC_ERROR),
            message: MessageCodes.REPORT_GET_GENERIC_ERROR_UNEXPECTED,
        })
    }
}
