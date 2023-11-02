import { Response } from "express";
import { TApiResponse } from "../types/common";

const ProvideResponse = <T>(res: Response, data: TApiResponse<T>): void => {
  const responseData: TApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    access_token: data.access_token || null || undefined,
    refresh_token: data.refresh_token || null || undefined,
    data: data.data || null || undefined,
    meta: data.meta || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default ProvideResponse;
