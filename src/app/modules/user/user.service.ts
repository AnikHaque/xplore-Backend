/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from 'ejs';
import jwt, { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/Apierror';
import {
  IActivationToken,
  IProfilePicture,
  IRegistration,
  IUser,
} from './user.interface';
import path from 'path';
import User from './user.model';
import config from '../../../config';
import sendEmail from '../../../utils/sendMail';
import cloudinary from 'cloudinary';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const isEmailExist = await User.findOne({ email: userData.email });

  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  const newUser = await User.create(userData);
  return newUser;
};
//!

//!
const createAdmin = async (payload: IRegistration) => {
  const { name, email, password, role } = payload;
  const user = {
    name,
    email,
    password,
    role,
  };
  user.role = ENUM_USER_ROLE.ADMIN;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  const newUser = await User.create(user);
  return newUser;
};
//!

//!
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
const getSingleUser = async (id: any): Promise<IUser | null> => {
  // console.log(user);
  const result = await User.findById(id);
  // console.log(result);
  return result;
};
const updateProfilePicture = async (req: Request) => {
  const { avatar } = req.body as any;

  //@ts-ignore

  const userId = req?.user?.userId;

  const user = await User.findById(userId);

  if (avatar && user) {
    if (user?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }
  }
  await user?.save();

  return user;
};
//!
const updateUser = async (
  id: any,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'User not found !');
  }

  const { ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};
//!
const updateUserByAdmin = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'User not found !');
  }

  const { ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
  createAdmin,
  updateUserByAdmin,
};
