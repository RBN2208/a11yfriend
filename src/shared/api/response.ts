import type { ApiResponse } from '@/shared/api/types/types';

export function createApiResponse<T>(config: ApiResponse<T>): ApiResponse<T> {
  return {
    ...config,
    success: !!config.success,
    errors: config.errors ?? [],
  };
}

export type { ApiResponse };


