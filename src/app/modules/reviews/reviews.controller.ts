import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import { ReviewsServices } from "./reviews.service";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";

const createReviews = AsyncCatch(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;

  const result = await ReviewsServices.createReviews(reviewData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Post Successful",
    data: result,
  });
});

const getAllReview = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReviewsServices.getAllReview(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Fetched Successful",
    data: result,
  });
});

export const ReviewsController = {
  createReviews,
  getAllReview,
};
