/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  password: string;
  location?: string;
  role?: ENUM_USER_ROLE;
  // room?: Types.ObjectId | IRoom;
};
export type IRegistration = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: ENUM_USER_ROLE;
};
export type IActivationToken = {
  token: string;
  activationCode: string;
};

export type IEmailOptions = {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
};

export type IActivationRequest = {
  activation_token: string;
  activation_code: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};
export type IProfilePicture = {
  avatar: string;
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
