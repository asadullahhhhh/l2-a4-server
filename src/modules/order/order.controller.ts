import { NextFunction, Request, Response } from "express"
import { orderService } from "./order.service"

const getOrders = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const result = await orderService.getOrders(req.user?.id as string)

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

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

const deleteOrder = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const result = await orderService.deleteOrder(req.params.id as string)

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}



export const orderController = {
    createOrder,
    getOrders,
    deleteOrder
}