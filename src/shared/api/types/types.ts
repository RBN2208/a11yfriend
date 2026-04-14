export type ApiResponse<T = void> = {
  success: boolean;
  errors?: {
    field: string;
    error: string;
  }[];
  globalError?: string;
  message?: string;
  data?: T | null;
};
