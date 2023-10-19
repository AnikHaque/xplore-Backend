import { Request, RequestHandler, Response } from 'express';

import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import catchAsync from '../../../shared/catchasync';
//!
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { ...others } = result;
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User loggedin successfully !',
    data: others,
  });
});
//!
const activateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await AuthService.activateUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User activate successful',
    });
  },
);
//!
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});
//!
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user;

  await AuthService.changePassword(user, passwordData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password change successfully !',
  });
});
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  activateUser,
};
