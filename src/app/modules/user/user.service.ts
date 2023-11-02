import { Prisma, User, UserRoles } from "@prisma/client";
import prisma from "../../instance/prisma";
import {
  iGenericResponse,
  iPaginationOptions,
} from "../../../interfaces/common";
import { paginationHelpers } from "../../../handler/paginationHandler";
import { userSearchableFields } from "./user.constants";

const getUserProfile = async (user: any): Promise<User | null> => {
  const email = user.email;
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return result;
};

const getAllUser = async (
  pagOptions: iPaginationOptions,
  filters: { searchTerm?: string; role?: string }
): Promise<iGenericResponse<User[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(pagOptions);
  const { searchTerm, role } = filters;

  const whereConditions: Prisma.UserWhereInput = {};

  if (searchTerm) {
    whereConditions.OR = userSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  if (role) {
    whereConditions.role = {
      equals: role as UserRoles,
    };
  }

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.user.count({});

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getSingleUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleUserById = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const updateUser = async (payload: Partial<User>, user: any): Promise<User> => {
  const { id } = user;

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const updateRole = async (id: string, role: {}) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: role,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const userServices = {
  getUserProfile,
  updateUser,
  getAllUser,
  updateRole,
  getSingleUserById,
  updateSingleUserById,
  deleteUser,
};
