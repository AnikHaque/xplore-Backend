import { User } from "@prisma/client";
import prisma from "../../instance/prisma";
import { iLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { JwtHelpers } from "../../../handler/JwtHandler";

const signUp = async (payload: User): Promise<Partial<User>> => {
  const { password, ...signupData } = payload;

  const hash = await bcrypt.hash(password, Number(config.bcrypt.salt));

  payload.password = hash;

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      image: true,
      password: false,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const login = async (payload: iLogin) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.FORBIDDEN, "Your Account Not Found");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isExistUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password Not Match");
  }

  const { id, email, role } = isExistUser;

  const accessToken = JwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret as string,
    config.jwt.expiresIn as string
  );

  const refreshToken = JwtHelpers.createToken(
    { id, email, role },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expiresIn as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let verifyUser;
  try {
    verifyUser = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const isExistUser = await prisma.user.findUnique({
    where: {
      id: verifyUser.id,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.FORBIDDEN, "Your Account Not Found");
  }

  const { id, email, role } = isExistUser;

  const accessToken = JwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret as string,
    config.jwt.expiresIn as string
  );

  return {
    accessToken,
  };
};

export const AuthService = { signUp, login, refreshToken };
