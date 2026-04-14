import type { ApiResponse } from '@/shared/api/types/types';

/**
 * Creates a standardized API response object.
 *
 * @template T - The type of the response data
 * @param {ApiResponse<T>} config - The response configuration
 * @returns {ApiResponse<T>} A normalized API response
 */
export function createApiResponse<T = void>(config: ApiResponse<T>): ApiResponse<T> {
  return {
    ...config,
    success: !!config.success,
    errors: config.errors ?? [],
  };
}

export type { ApiResponse };
