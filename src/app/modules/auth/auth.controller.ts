import { NextFunction, Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import config from "../../../config";

const signUp = AsyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userInfo } = req.body;

    const result = await AuthService.signUp(userInfo);

    ProvideResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Congratulations!! Registration Successful",
      data: result,
    });
  }
);

const login = AsyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...loginInfo } = req.body;

    const result = await AuthService.login(loginInfo);

    res.cookie("refreshToken", result.refreshToken, {
      secure: config.env === "production",
      httpOnly: true,
    });

    ProvideResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login Request Successful",
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
    });
  }
);

const refreshToken = AsyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    const result = await AuthService.refreshToken(refreshToken);

    ProvideResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Refresh Token Generate Successful",
      access_token: result.accessToken,
    });
  }
);

export const AuthController = {
  signUp,
  login,
  refreshToken,
};
