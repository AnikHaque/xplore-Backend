import { Cart } from "@prisma/client";
import prisma from "../../instance/prisma";

const addToCart = async (payload: Cart) => {
  const result = await prisma.cart.createMany({
    data: payload,
  });

  return result;
};

const getAllCart = async (user: any): Promise<Cart[]> => {
  const id = user.id;
  const result = await prisma.cart.findMany({
    where: {
      user: {
        id: id,
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

const removeCart = async (id: string): Promise<Cart> => {
  const result = await prisma.cart.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CartServices = {
  addToCart,
  getAllCart,
  removeCart,
};
