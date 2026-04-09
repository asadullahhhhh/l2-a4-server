import { NextFunction, Request, Response } from "express";
import { cartItemService } from "./cartItem.service";

const createCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = {
      meal_id: req.body.meal_id,
      price: Number(req.body.price),
      provider_id: req.body.provider_id,
      image_url: req.body.image_url,
      name: req.body.name,
    };
    const result = await cartItemService.createCartItem(
      payload,
      req.user?.id as string,
    );

    res.status(201).json({
      success: true,
      message: "Cart Item created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getUserCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await cartItemService.getUserCartItems(
      req.user?.id as string,
    );

    res.status(200).json({
      success: true,
      message: "User cart items retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await cartItemService.updateCartItem(
      req.body,
      req.params.id as string,
    );

    res.status(201).json({
      success: true,
      message: "Cart Item created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await cartItemService.deleteCartItem(
      req.params.id as string,
    );

    res.status(201).json({
      success: true,
      message: "Cart Item deleted successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const isAddCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;
    const mealId = req.params.mealId as string;

    const result = await cartItemService.isAddCart(mealId, userId);

    res.status(201).json({
      success: true,
      message: "Item is already in the cart",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const clearAllCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;

    const result = await cartItemService.clearAllCartItems(userId);

    res.status(200).json({
      success: true,
      message: "All cart items cleared successfully"
    });
  } catch (error) {
    next(error);
  }
}

export const cartItemController = {
  createCartItem,
  updateCartItem,
  deleteCartItem,
  isAddCart,
  getUserCartItems,
  clearAllCartItems,
};
