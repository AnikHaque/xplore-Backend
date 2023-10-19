import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type INotification = {
  title: string;
  message: string;
  status: string;
  user: Types.ObjectId | IUser;
};
