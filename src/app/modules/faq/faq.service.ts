import { FAQ } from "@prisma/client";
import prisma from "../../instance/prisma";

const createFAQ = async (payload: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data: payload,
  });

  return result;
};

const getAllFAQ = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany();
  return result;
};

const getSingleFAQ = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateFAQ = async (id: string, payload: Partial<FAQ>): Promise<FAQ> => {
  const result = await prisma.fAQ.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteFAQ = async (id: string): Promise<FAQ> => {
  const result = await prisma.fAQ.delete({
    where: { id },
  });

  return result;
};

export const FAQServices = {
  createFAQ,
  getAllFAQ,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
