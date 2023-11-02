export interface iGenericResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

export interface iGenericErrorMessage {
  path: string | number;
  message: string;
}

export interface iGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: iGenericErrorMessage[];
}

export type iPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type iOptions = {
  page?: number | string | undefined;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type iOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};
