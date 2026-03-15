import { NextFunction, Request, Response } from "express";
import { cartItemService } from "./cartItem.service";

const createCartItem = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const result = await cartItemService.createCartItem(req.body, req.user?.id as string)

        res.status(201).json({
            success: true,
            message: "Cart Item created successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export const cartItemController = {
    createCartItem
}