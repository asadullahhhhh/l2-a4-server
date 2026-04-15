import { UserRole } from "../../constants/enums";
import { prisma } from "../../lib/prisma";
// orders type
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PLACED"] = 0] = "PLACED";
    OrderStatus[OrderStatus["PREPARING"] = 1] = "PREPARING";
    OrderStatus[OrderStatus["READY"] = 2] = "READY";
    OrderStatus[OrderStatus["DELIVERED"] = 3] = "DELIVERED";
    OrderStatus[OrderStatus["CANCELLED"] = 4] = "CANCELLED";
    OrderStatus[OrderStatus["PROCESSING"] = 5] = "PROCESSING";
})(OrderStatus || (OrderStatus = {}));
const getOrders = async (id, role, skipNumber, limitNumber, pageNumber) => {
    if (role === UserRole.ADMIN) {
        const result = await prisma.orders.findMany({
            skip: skipNumber,
            take: limitNumber,
            include: {
                orderItems: true
            }
        });
        const totalOrders = await prisma.orders.count();
        const totalPage = Math.ceil(totalOrders / limitNumber);
        return {
            meta: {
                totalPage: totalPage,
                page: pageNumber,
                limit: limitNumber,
                totalItems: totalOrders
            },
            data: result
        };
    }
    else if (role === UserRole.USER) {
        const result = await prisma.orders.findMany({
            where: {
                user_id: id,
            },
            include: {
                orderItems: true
            }
        });
        return result;
    }
};
const getUserOrders = async (id) => {
    const result = await prisma.orders.findMany({
        where: {
            user_id: id,
        },
        include: {
            orderItems: true,
        }
    });
    return result;
};
const createOrder = async (payload, id) => {
    const mealIds = payload.items.map((value) => value.meal_id);
    const meals = await prisma.meals.findMany({
        where: {
            id: { in: mealIds },
        },
        select: {
            id: true,
            price: true,
            provider_id: true,
            image_url: true,
            name: true,
        },
    });
    const provider_id = meals[0]?.provider_id;
    let totalPrice = 0;
    payload.items.forEach((item) => {
        const meal = meals.find((m) => m.id === item.meal_id);
        totalPrice += Number(meal?.price) * item.quantity;
    });
    const result = await prisma.$transaction(async (tx) => {
        const order = await tx.orders.create({
            data: {
                user_id: id,
                provider_id: provider_id,
                total_price: totalPrice,
                delivery_address: payload.delivery_address,
            },
        });
        await tx.orderItems.createMany({
            data: payload.items.map((item) => {
                const meal = meals.find((m) => m.id === item.meal_id);
                return {
                    order_id: order.id,
                    meal_id: meal?.id,
                    quantity: item.quantity,
                    price: meal?.price,
                    image_url: meal?.image_url,
                    name: meal?.name,
                };
            }),
        });
        return order;
    });
    return result;
};
const updateOrder = async (id, status) => {
    const updateStatus = status.toUpperCase();
    const order = await prisma.orders.update({
        where: {
            id
        },
        data: {
            status: updateStatus
        }
    });
    return order;
};
const deleteOrder = async (id) => {
    const order = await prisma.orders.findUnique({
        where: {
            id,
        },
    });
    if (order?.status !== "PROCESSING") {
        throw new Error("Only orders with status 'PROCESSING' can be deleted");
    }
    const deletedOrder = await prisma.orders.delete({
        where: {
            id,
        },
    });
    return deletedOrder;
};
export const orderService = {
    createOrder,
    getOrders,
    getUserOrders,
    deleteOrder,
    updateOrder
};
//# sourceMappingURL=order.service.js.map