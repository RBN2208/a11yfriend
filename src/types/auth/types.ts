export type ApiValidationResponse<T = any> = {
  success: boolean;
  error: {
    field: string;
    message: string;
  } | null;
  data?: T | null;
};
