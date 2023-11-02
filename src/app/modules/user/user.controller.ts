import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import { userServices } from "./user.service";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields, userPaginationOptions } from "./user.constants";

const getUserProfile = AsyncCatch(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await userServices.getUserProfile(user);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile Get Successful",
    data: result,
  });
});

const getAllUser = AsyncCatch(async (req: Request, res: Response) => {
  const pagOptions = pick(req.query, userPaginationOptions);
  const filters = pick(req.query, userFilterableFields);

  const result = await userServices.getAllUser(pagOptions, filters);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User Fetched Successful",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUserById = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userServices.getSingleUserById(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Get Successful",
    data: result,
  });
});
const updateSingleUserById = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  const result = await userServices.updateSingleUserById(id, updatedData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Update Successful",
    data: result,
  });
});

const updateUser = AsyncCatch(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const user = req.user;

  const result = await userServices.updateUser(userData, user);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile Update Successful",
    data: result,
  });
});

const updateRole = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const result = await userServices.updateRole(id, { role });

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role Update Successful",
    data: result,
  });
});
const deleteUser = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userServices.deleteUser(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted Successful",
    data: result,
  });
});

export const UserController = {
  getUserProfile,
  updateUser,
  getAllUser,
  updateRole,
  getSingleUserById,
  updateSingleUserById,
  deleteUser,
};
