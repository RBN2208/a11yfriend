"use server"
import {z} from "zod";
import {createAuditSchema} from "@/utils/validations/zod-schema";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {getCriteriasForSelectedConformanceLevel} from "@/lib/utils";
import {AuditResult, SupaBaseAudit} from "@/types/audit/types";
import {ApiResponse} from "@/types/api/types";

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
    message: "Validation failed"
  };
}

export async function createApiResponse(config: ApiResponse): Promise<ApiResponse> {
  return {
    success: config.success,
    errors: config.errors,
    message: config.message,
    data: config.data,
  }
}

export async function createAudit(values: z.infer<typeof createAuditSchema>): Promise<ApiResponse> {
  try {
    const validationResult = createAuditSchema.safeParse(values);

    if (!validationResult.success) {
      return createAuditValidationResponse(validationResult.error.format());
    }

    const supabase = await createClient();
    const client = await supabase.auth.getUser();

    const updatedFormData = {
      ...values,
      user_id: client.data.user?.id || "",
      auditResults: createAuditResultsDefault()
    };

    const {error} = await supabase.from('audits').insert([updatedFormData]);

    if (error) {
      return {
        success: false,
        errors: [
          {
            field: 'root',
            error: error.message
          }
        ],
        globalError: error.message
      };
    }

    revalidatePath('/', 'layout');

    return createApiResponse({
      success: true,
      message: "Audit created successfully",
    })
  } catch (error) {
    return createApiResponse({
      success: false,
      globalError: "We couldn't create your audit. Please try again.",
      errors: [
        {
          field: 'root',
          error: "An unexpected error occurred"
        }
      ]
    })
  }
}

export async function deleteAudit(auditId: string): Promise<ApiResponse> {
  const supabase = await createClient();
  const {error} = await supabase.from('audits')
    .delete()
    .eq('id', auditId);

  if (error) {
    return createApiResponse({
      success: false,
      globalError: "We couldn't delete your audit. Please try again.",
    })
  }

  return createApiResponse({
    success: true,
    message: "Audit deleted successfully",
  })
}

export async function updateAudit(values: z.infer<typeof createAuditSchema>, auditId: string): Promise<ApiResponse> {
  try {
    const validationResult = createAuditSchema.safeParse(values);

    if (!validationResult.success) {
      return createAuditValidationResponse(validationResult.error.format());
    }

    const supabase = await createClient();

    const {error} = await supabase
      .from('audits')
      .update(values)
      .eq('id', auditId);

    if (error) {
      return {
        success: false,
        globalError: error.message
      };
    }

    revalidatePath('/', 'layout');

    return createApiResponse({
      success: true,
      message: "Audit updated successfully",
    })
  } catch (error) {
    return createApiResponse({
      success: false,
      globalError: "An unexpected error occurred",
    })
  }
}

export async function updateAuditResults(data: AuditResult[], auditId: string): Promise<ApiResponse> {
  const supabase = await createClient();
  const {error} = await supabase
    .from('audits')
    .update({auditResults: data})
    .eq('id', auditId);

  if (error) {
    return createApiResponse({
      success: false,
      globalError: "Sorry, we couldn't update your audit results. Please try again."
    })
  }

  return createApiResponse({
    success: true,
    message: "Audit results updated successfully",
  })
}

export async function getAudit(id: string | null = null, limit: number = 5): Promise<ApiResponse<SupaBaseAudit[] | SupaBaseAudit>> {
  try {
    if (id) {
      return getSingleAudit(id);
    } else {
      return getMultipleAudits(limit);
    }
  } catch (error) {
    return createApiResponse({
      success: false,
      globalError: "An unexpected error occurred while collection the data"
    })
  }
}

async function getMultipleAudits(limit: number): Promise<ApiResponse<SupaBaseAudit[]>> {
  const supabase = await createClient();
  const {data: audits, error} = await supabase
    .from('audits')
    .select('*')
    .order('created_at', {ascending: false})
    .limit(limit)

  if (error) {
    return createApiResponse({
      success: false,
      globalError: "We couldn't fetch your audits. Please try again."
    })
  }

  return createApiResponse({
    success: true,
    message: "Audits fetched successfully",
    data: audits as SupaBaseAudit[]
  })
}

async function getSingleAudit(id: string): Promise<ApiResponse<SupaBaseAudit>> {
  const supabase = await createClient();
  const {data: audit, error} = await supabase
    .from('audits')
    .select('*')
    .eq('id', id);

  if (error) {
    return createApiResponse({
      success: false,
      globalError: "We couldn't fetch your audit. Please try again."
    })
  }

  return createApiResponse({
    success: true,
    message: "Audit fetched successfully",
    data: audit[0] as SupaBaseAudit
  })
}
