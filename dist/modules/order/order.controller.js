import { orderService } from "./order.service";
const getOrders = async (req, res, next) => {
    try {
        const role = req.user?.role;
        const { page, limit } = req.query;
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 12;
        const skipNumber = (pageNumber - 1) * limitNumber;
        const result = await orderService.getOrders(req.user?.id, role, skipNumber, limitNumber, pageNumber);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const userOrders = async (req, res, next) => {
    try {
        const result = await orderService.getUserOrders(req.user?.id);
        res.status(200).json({
            success: true,
            message: "User orders fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const createOrder = async (req, res, next) => {
    try {
        const result = await orderService.createOrder(req.body, req.user?.id);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const updateOrder = async (req, res, next) => {
    try {
        const result = await orderService.updateOrder(req.params.id, req.body.status);
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const deleteOrder = async (req, res, next) => {
    try {
        const result = await orderService.deleteOrder(req.params.id);
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: result,
        });
    }
    catch (e) {
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
//# sourceMappingURL=order.controller.js.map