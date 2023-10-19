import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';
import paginationFields from '../../../constants/pagination';
import pick from '../../../shared/pick';

//!
const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookingService.getAllBookings(paginationOptions);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `All Booking Retrieved successfully`,
      data: result,
    });
  },
);
//!
const insertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await BookingService.insertIntoDB(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Room Booking successfully`,
      data: result,
    });
  },
);
//!
const myBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await BookingService.myBookings(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Single Booking Data Retrieved successfully`,
      data: result,
    });
  },
);
//!
const cancelBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await BookingService.cancelBooking(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Cancel My Booking successfully`,
      data: result,
    });
  },
);
//!
const updateBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const id = req.params.id;
    const result = await BookingService.updateBooking(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ` Booking update successfully`,
      data: result,
    });
  },
);
//!
const getSIngleBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BookingService.getSIngleBooking(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Booking data retrieved by id successfully`,
      data: result,
    });
  },
);

export const BookingController = {
  insertIntoDB,
  getAllBookings,
  myBookings,
  cancelBooking,
  updateBooking,
  getSIngleBooking,
};
