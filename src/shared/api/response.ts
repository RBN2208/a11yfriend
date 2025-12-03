import type { ApiResponse } from '@/shared/api/types/types';

/**
 * Creates a standardized API response object.
 * @param config
 */
export function createApiResponse<T>(config: ApiResponse<T>): ApiResponse<T> {
  return {
    ...config,
    success: !!config.success,
    errors: config.errors ?? [],
  };
}

export type { ApiResponse };


