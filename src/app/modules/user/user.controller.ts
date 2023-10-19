/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';

import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import catchAsync from '../../../shared/catchasync';
//!
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const result = await UserService.createUser(userData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);
//!
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...adminData } = req.body;

    const result = await UserService.createAdmin(adminData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  },
);
//!
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
//!
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(user);

  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
//!
const updateProfilePicture: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.body, 'Body');
    //@ts-ignore
    const result = await UserService.updateProfilePicture(req);
    sendResponse(res, {
      statusCode: 400,
      success: true,
      message: 'Picture updated successfully',
      data: result,
    });
  },
);
//!
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
//!
const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateUserByAdmin(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
//!
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
export const UserController = {
  createUser,
  createAdmin,
  getAllUsers,
  getSingleUser,
  updateProfilePicture,
  updateUser,
  deleteUser,
  updateUserByAdmin,
};
