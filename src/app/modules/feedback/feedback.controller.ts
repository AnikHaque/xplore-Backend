import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import { FeedbackServices } from "./feedback.service";

const createFeedback = AsyncCatch(async (req: Request, res: Response) => {
  const { ...feedbackData } = req.body;
  const user = req.user;

  const result = await FeedbackServices.createFeedback(feedbackData, user);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thank you for your feedback",
    data: result,
  });
});
const getFeedback = AsyncCatch(async (req: Request, res: Response) => {
  const result = await FeedbackServices.getFeedback();

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch Feedback",
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getFeedback,
};
