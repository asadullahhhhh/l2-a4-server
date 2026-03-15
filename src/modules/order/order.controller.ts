import { NextFunction, Request, Response } from "express"
import { orderService } from "./order.service"

const createOrder = async (req:Request, res:Response, next: NextFunction) => {
    try {

        const result = await orderService.createOrder(req.body, req.user?.id as string)

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}



export const orderController = {
    createOrder
}