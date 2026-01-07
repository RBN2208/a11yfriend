import { z } from "zod";
import { WCAGCriterias } from "@/shared/staticData/audit/criteria";
import { ApiResponse } from "@/shared/api/types/types";
import { createApiResponse } from "@/shared/api/response";

/**
 * Retrieves a filtered list of WCAG criteria based on the selected conformance level.
 *
 * @param {string} conformanceLevel - The selected conformance level ('A', 'AA', or 'AAA').
 * @param {any[]} [data] - An optional array of criteria data to filter. If not provided, a default set of criteria is used.
 * @return {any[]} A filtered array of criteria matching the specified conformance level.
 */
export function getCriteriasForSelectedConformanceLevel(conformanceLevel: string, data?: any[]) {
  const toFilter = (data && data.length) ? data : WCAGCriterias;
  return toFilter.filter(criteria => {
    if (conformanceLevel === 'A') {
      return criteria.conformance === 'A';
    } else if (conformanceLevel === 'AA') {
      return criteria.conformance === 'A' || criteria.conformance === 'AA';
    } else if (conformanceLevel === 'AAA') {
      return true;
    }
    return false;
  })
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
