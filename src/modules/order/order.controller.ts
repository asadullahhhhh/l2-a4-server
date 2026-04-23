import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role as string;

    const { page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 12;
    const skipNumber = (pageNumber - 1) * limitNumber;

    const result = await orderService.getOrders(
      req.user?.id as string,
      role,
      skipNumber,
      limitNumber,
      pageNumber,
    );

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const userOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.getUserOrders(req.user?.id as string);

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.createOrder(
      req.body,
      req.user?.id as string,
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.updateOrder(
      req.params.id as string,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.deleteOrder(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const orderController = {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrder,
  userOrders
};
