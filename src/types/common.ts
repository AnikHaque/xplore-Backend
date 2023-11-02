export type TApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
  access_token?: string | null;
  refresh_token?: string | null;
};
