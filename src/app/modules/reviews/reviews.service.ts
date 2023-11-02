import { Review } from "@prisma/client";
import prisma from "../../instance/prisma";

const createReviews = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: payload,
    include: {
      service: true,
      user: true,
    },
  });

  return result;
};

const getAllReview = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      service: {
        id,
      },
    },
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const ReviewsServices = {
  createReviews,
  getAllReview,
};
