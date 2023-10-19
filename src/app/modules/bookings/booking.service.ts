/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/Apierror';
import path from 'path';
import ejs from 'ejs';
import { Service } from '../service/service.model';
import User from '../user/user.model';
import { Booking } from './booking.model';
import sendEmail from '../../../utils/sendMail';
import Notification from '../notification/notification.model';
import { IBooking } from './booking.interface';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

//!
const getAllBookings = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await Booking.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Booking.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//!
const insertIntoDB = async (payload: any) => {
  const { serviceId, startDate, endDate, userId, room } = payload;

  // Check if the user and service exist
  const user = (await User.findById(userId)) as any;
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, 'Room not found');
  }

  // Parse the startDate and endDate as Date objects
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  // Calculate total price based on the number of days
  const numberOfMilliseconds =
    parsedEndDate.getTime() - parsedStartDate.getTime();
  const numberOfDays = Math.ceil(numberOfMilliseconds / (1000 * 60 * 60 * 24));
  if (isNaN(numberOfDays) || numberOfDays < 1) {
    throw new ApiError(400, 'Invalid booking duration');
  }

  const bookingPrice = numberOfDays * service.price;
  const totalPrice = bookingPrice * room;

  // Check if the room is already booked for the specified date range
  const alreadyBookedRooms = await Booking.find({
    $or: [
      {
        startDate: { $lte: parsedEndDate },
        endDate: { $gte: parsedStartDate },
      },
      {
        startDate: { $gte: parsedEndDate }, // Check if startDate is after endDate
      },
    ],
  });

  if (alreadyBookedRooms.length > 0) {
    throw new ApiError(
      400,
      'Rooms are already booked for the specified date range',
    );
  }

  // Create a booking object
  const booking = {
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    totalPrice: totalPrice,
    room: room,
    user: userId,
  };
  // Mail data
  const mailData = {
    order: {
      _id: service._id.toString().slice(0, 6),
      name: service.propertyName,
      price: bookingPrice,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/order-confirmation.ejs'),
    { order: mailData },
  );
  try {
    if (user || service) {
      await sendEmail({
        email: user.email,
        subject: 'Booking Confirmation',
        template: 'order-confirmation.ejs',
        data: mailData,
      });
    }
  } catch (error: any) {
    throw new ApiError(400, `${error.message}`);
  }
  // Add the booking to the service's bookings array
  const result = (await Booking.create(booking)).populate('user');
  await Notification.create({
    user: user?._id,
    title: 'New Booking',
    message: `You have a new order from ${service?.propertyName}`,
  });
  return result;
};
//!

//!
const myBookings = async (user: any) => {
  const { userId } = user;
  console.log(userId);
  const bookings = await Booking.find({
    user: userId,
  }).populate('user');
  return bookings;
};
//!
const cancelBooking = async (data: any) => {
  const { bookingId } = data;
  const bookings = await Booking.findOneAndDelete(bookingId);
  return bookings;
};
//!
const updateBooking = async (id: string, payload: any) => {
  console.log(payload);
  const isBooking = await Booking.findById(id);
  if (!isBooking) {
    throw new ApiError(404, 'Booking not found');
  }
  const { ...bookingData } = payload;
  const updatedBookingData: Partial<IBooking> = { ...bookingData };
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    updatedBookingData,
    {
      new: true,
    },
  );
  return result;
};
const getSIngleBooking = async (id: string) => {
  const service = await Booking.findById(id);
  return service;
};
export const BookingService = {
  getAllBookings,
  insertIntoDB,
  myBookings,
  cancelBooking,
  updateBooking,
  getSIngleBooking,
};
