import httpStatus from "http-status";
import ProvideResponse from "../../../shared/ProviceResponse";
import { CartServices } from "./cart.service";
import AsyncCatch from "../../../shared/AsyncCatch";
import { Request, Response } from "express";

const addToCart = AsyncCatch(async (req: Request, res: Response) => {
  const cartData = req.body;

  const result = await CartServices.addToCart(cartData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart Added Successful",
    data: result,
  });
});

const getAllCart = AsyncCatch(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await CartServices.getAllCart(user);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart Fetched Successful",
    data: result,
  });
});

const removeCart = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const result = await CartServices.removeCart(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart Deleted Successful",
    data: result,
  });
});

export const CartController = {
  addToCart,
  getAllCart,
  removeCart,
};
