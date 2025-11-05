export type ApiResponse<T = any> = {
  success: boolean;
  errors?: {
    field: string;
    error: string;
  }[],
  globalError?: string;
  message?: string;
  data?: T | null;
}
