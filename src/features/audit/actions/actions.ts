"use server"
import {z} from "zod";
import {aiReviewSchema} from "@/features/aiReview/zod-schema";
import { createAuditSchema } from '@/features/audit/zod-schema'
import {createServerSupabase} from "@/shared/supabase/server";
import {revalidatePath} from "next/cache";
import {getCriteriasForSelectedConformanceLevel} from "@/features/audit/utils";
import { getErrorOfUnknownError } from "@/shared/utils"
import {AuditResult, SupabaseAudit} from "@/features/audit/types/types";
import {ApiResponse} from "@/shared/api/types/types";
import {createApiResponse} from "@/shared/api/response";
import {MessageCodes} from "@/shared/message-codes";

/**
 * Creates a default set of audit results for all criteria corresponding to a specific conformance level.
 * This method initializes each audit result with default values including an "id", "name", "conformance level",
 * "status", and empty "findings". These results are intended to be filtered or adjusted on the client side
 * to accommodate changes in audit settings.
 *
 * @return {AuditResult[] | any[]} An array of audit result objects with default values for all criteria.
 */
function createAuditResultsDefault(): AuditResult[] | any[] {
  const criteriasForConformance = getCriteriasForSelectedConformanceLevel('AAA');
  const auditResults: any[] = [];

  criteriasForConformance.forEach(criteria => {
    const baseResultEntry: AuditResult = {
      id: criteria.id,
      name: criteria.name,
      conformance: criteria.conformance,
      referenceLink: criteria.referenceLink,
      status: "not_checked",
      findings: null,
    };
    auditResults.push(baseResultEntry);
  })

  return auditResults;
}

function createAuditValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof createAuditSchema>, {}>): ApiResponse {
  const fieldKeys = ['name', 'description', 'status', 'customer', 'project_name', 'module', 'version', 'conformance', 'miscellaneous'];

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

function createAiReviewValidationResponse(formattedErrors: z.ZodFormattedError<z.infer<typeof aiReviewSchema>, {}>): ApiResponse {
  const fieldKeys = ['code'];

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

// createApiResponse now imported from shared helper

export async function createAudit(values: z.infer<typeof createAuditSchema>): Promise<ApiResponse> {
  try {
    const validationResult = createAuditSchema.safeParse(values);

    if (!validationResult.success) {
      // return the field validations before everything else
      return createAuditValidationResponse(validationResult.error.format());
    }

    const supabase = await createServerSupabase();

    const { error: userError, data: userData } = await supabase.auth.getUser();
    if (userError) {
      return {
        success: false,
        globalError: userError.message,
        message: MessageCodes.AUTH_USER_VERIFY_ERROR
      };
    }

    const updatedFormData = {
      ...values,
      user_id: userData.user?.id || "",
      images: [],
      auditResults: createAuditResultsDefault()
    };

    const { error: insertError } = await supabase.from('audits').insert([updatedFormData]);
    if (insertError) {
      return {
        success: false,
        globalError: insertError.message,
        message: MessageCodes.AUDIT_CREATE_ERROR
      };
    }

    revalidatePath('/', 'layout');

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_CREATE_SUCCESS,
    })
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
      errors: [{ field: 'root', error: MessageCodes.GENERIC_UNEXPECTED_ERROR }],
      message: MessageCodes.AUDIT_CREATE_ERROR_UNEXPECTED
    });
  }
}

export async function deleteAudit(auditId: string): Promise<ApiResponse> {
  try {
    const supabase = await createServerSupabase();
    const {error: deleteError} = await supabase.from('audits')
      .delete()
      .eq('id', auditId);

    if (deleteError) {
      return createApiResponse({
        success: false,
        globalError: deleteError.message,
        message: MessageCodes.AUDIT_DELETE_ERROR
      })
    }

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_DELETE_SUCCESS,
    })
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
      errors: [{ field: 'root', error: MessageCodes.GENERIC_UNEXPECTED_ERROR }],
      message: MessageCodes.AUDIT_DELETE_ERROR_UNEXPECTED
    });
  }
}

export async function updateAudit(values: z.infer<typeof createAuditSchema>, auditId: string): Promise<ApiResponse> {
  try {
    const validationResult = createAuditSchema.safeParse(values);

    if (!validationResult.success) {
      return createAuditValidationResponse(validationResult.error.format());
    }

    const supabase = await createServerSupabase();

    const {error} = await supabase
      .from('audits')
      .update(values)
      .eq('id', auditId);

    if (error) {
      return {
        success: false,
        globalError: error.message,
        message: MessageCodes.AUDIT_UPDATE_ERROR
      };
    }

    revalidatePath('/', 'layout');

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_UPDATE_SUCCESS
    })
  } catch (error) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
      message: MessageCodes.AUDIT_UPDATE_ERROR_UNEXPECTED,
    })
  }
}

export async function updateAuditResults(data: AuditResult[], auditId: string): Promise<ApiResponse> {
  try {
    const supabase = await createServerSupabase();

    const { error } = await supabase
        .from('audits')
        .update({auditResults: data})
        .eq('id', auditId);

    if (error) {
      return createApiResponse({
        success: false,
        globalError: error.message,
        message: MessageCodes.AUDIT_RESULTS_UPDATE_ERROR
      })
    }

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_RESULTS_UPDATE_SUCCESS
    })

  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.AUDIT_RESULTS_UPDATE_ERROR),
      message: MessageCodes.AUDIT_RESULTS_UPDATE_ERROR_UNEXPECTED,
    })
  }


  return createApiResponse({
    success: true,
    message: "Audit results updated successfully",
  })
}

export async function getAudit(id: string | null = null, limit: number = 5): Promise<ApiResponse<SupabaseAudit[] | SupabaseAudit>> {
  try {
    if (id) {
      return getSingleAudit(id);
    } else {
      return getMultipleAudits(limit);
    }
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
      message: MessageCodes.AUDIT_GET_GENERIC_ERROR_UNEXPECTED,
    })
  }
}

async function getMultipleAudits(limit: number): Promise<ApiResponse<SupabaseAudit[]>> {
  try {
    const supabase = await createServerSupabase();

    const {data: audits, error} = await supabase
        .from('audits')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(limit)

    if (error) {
      return createApiResponse({
        success: false,
        message: MessageCodes.AUDIT_GET_GENERIC_ERROR,
        globalError: error.message
      })
    }

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDITS_GET_SUCCESS,
      data: audits as SupabaseAudit[]
    })
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      message: MessageCodes.AUDIT_GET_GENERIC_ERROR,
      globalError: getErrorOfUnknownError(error, MessageCodes.AUDIT_GET_GENERIC_ERROR_UNEXPECTED)
    })
  }
}

async function getSingleAudit(id: string): Promise<ApiResponse<SupabaseAudit>> {
  try {
    const supabase = await createServerSupabase();

    const {data: audit, error} = await supabase
        .from('audits')
        .select('*')
        .eq('id', id);

    if (error) {
      return createApiResponse({
        success: false,
        message: MessageCodes.AUDIT_GET_GENERIC_ERROR,
        globalError: error.message
      })
    }

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_GET_SUCCESS,
      data: audit[0] as SupabaseAudit
    })
  } catch (error: unknown) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.AUDIT_GET_GENERIC_ERROR),
      message: MessageCodes.AUDIT_GET_GENERIC_ERROR_UNEXPECTED,
    })
  }
}

export async function startAiReview(values: z.infer<typeof aiReviewSchema>): Promise<ApiResponse> {
  try {
    const validationResult = aiReviewSchema.safeParse(values);

    if (!validationResult.success) {
      return createAiReviewValidationResponse(validationResult.error.format());
    }

    const response = await mock(false, "Error Review");
    if (!response.data) {
      return createApiResponse({
        success: false,
        globalError: response.error,
        message: MessageCodes.AUDIT_AI_REVIEW_ERROR
      })
    }
    revalidatePath('/', 'layout');

    return createApiResponse({
      success: true,
      message: MessageCodes.AUDIT_AI_REVIEW_SUCCESS
    })
  } catch (error) {
    return createApiResponse({
      success: false,
      globalError: getErrorOfUnknownError(error, MessageCodes.GENERIC_UNEXPECTED_ERROR),
      message: MessageCodes.AUDIT_AI_REVIEW_ERROR_UNEXPECTED,
    })
  }
}

function mock(data: any, error: any): Promise<{data: any, error: any}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: data,
        error: error
      });
    }, 1000);
  });
}