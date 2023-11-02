import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import { BookingServices } from "./booking.service";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { bookingPaginationOptions } from "./booking.constants";

const createBooking = AsyncCatch(async (req: Request, res: Response) => {
  const { ...bookingData } = req.body;

  const result = await BookingServices.createBooking(bookingData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Added Successful",
    data: result,
  });
});

const getBooking = AsyncCatch(async (req: Request, res: Response) => {
  const pagOptions = pick(req.query, bookingPaginationOptions);

  const result = await BookingServices.getBooking(pagOptions);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Fetched Successful",
    meta: result.meta,
    data: result.data,
  });
});

const getUserByBooking = AsyncCatch(async (req: Request, res: Response) => {
  const pagOptions = pick(req.query, bookingPaginationOptions);
  const user = req.user;

  const result = await BookingServices.getUserByBooking(pagOptions, user);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Fetched Successful",
    meta: result.meta,
    data: result.data,
  });
});

const updateBookingByStatus = AsyncCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = req.body;

    const result = await BookingServices.updateBookingByStatus(status, id);

    ProvideResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Status Update Successful",
      data: result,
    });
  }
);

const updateBookingSchedule = AsyncCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const schedule = req.body;

    const result = await BookingServices.updateBookingSchedule(schedule, id);

    ProvideResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Schedule Update Successful",
      data: result,
    });
  }
);

const deleteBooking = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingServices.deleteBooking(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Deleted Successful",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  deleteBooking,
  getBooking,
  getUserByBooking,
  updateBookingByStatus,
  updateBookingSchedule,
};
