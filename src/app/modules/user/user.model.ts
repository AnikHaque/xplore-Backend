import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const emailRegexPatternL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function (value: string) {
          return emailRegexPatternL.test(value);
        },
        message: 'Please enter a valid email',
      },
      unique: true,
    },

    avatar: {
      public_id: String,
      url: String,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  // {
  //   timestamps: true,
  //   toJSON: {
  //     virtuals: true,
  //     transform: function (_doc, ret) {
  //       delete ret.password;
  //       return ret;
  //     },
  //   },
  // },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Create a unique index for phoneNumber field
// Check if User exists
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, '_id' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email },
    {
      _id: 1,
      email: 1,
      password: 1,
      role: 1,
    },
  );
};

// Check password match
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Statics
const User = model<IUser, UserModel>('User', UserSchema);

export default User;
