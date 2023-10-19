import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { Servey } from './servey.model';

//!
const getAllServey: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await Servey.find().populate('user');
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `All Servey Retrieved successfully`,
      data: result,
    });
  },
);
//!
const insertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await (await Servey.create(data)).populate('user');
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Successful`,
      data: result,
    });
  },
);

export const ServeyController = {
  insertIntoDB,
  getAllServey,
};
