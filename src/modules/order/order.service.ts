import { UserRole } from "../../constants/enums";
import { prisma } from "../../lib/prisma";
import { MealItem } from "../../types/order.type";

// orders type
enum OrderStatus {
  PLACED,
  PREPARING,
  READY,
  DELIVERED,
  CANCELLED,
  PROCESSING,
}

const getOrders = async (
  id: string,
  role: string,
  skipNumber: number,
  limitNumber: number,
  pageNumber: number,
) => {
  if (role === UserRole.ADMIN) {
    const result = await prisma.orders.findMany({
      skip: skipNumber,
      take: limitNumber,
      include: {
        orderItems: true,
      },
    });

    const totalOrders = await prisma.orders.count();

    const totalPage = Math.ceil(totalOrders / limitNumber);

    return {
      meta: {
        totalPage: totalPage,
        page: pageNumber,
        limit: limitNumber,
        totalItems: totalOrders,
      },
      data: result,
    };
  } else if (role === UserRole.USER) {
    const result = await prisma.orders.findMany({
      where: {
        user_id: id,
      },
      include: {
        orderItems: true,
      },
    });

    return result;
  }
};

const getUserOrders = async (id: string) => {
  const result = await prisma.orders.findMany({
    where: {
      user_id: id,
    },
    include: {
      orderItems: true,
    },
  });

  return result;
};

const createOrder = async (payload: any, id: string) => {
  const mealIds = payload?.item?.items?.map((value: MealItem) => value.meal_id);

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
  payload?.item?.items?.forEach((item: MealItem) => {
    const meal = meals.find((m) => m.id === item.meal_id);
    totalPrice += Number(meal?.price) * item.quantity;
  });

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.orders.create({
      data: {
        user_id: id,
        provider_id: provider_id as string,
        total_price: totalPrice,
        delivery_address: payload.item?.delivery_address,
      },
    });

    await tx.orderItems.createMany({
      data: payload.item?.items.map((item: MealItem) => {
        const meal = meals.find((m) => m.id === item.meal_id);

        return {
          order_id: order.id,
          meal_id: meal?.id!,
          quantity: item.quantity,
          price: meal?.price!,
          image_url: meal?.image_url as string,
          name: meal?.name as string,
        };
      }),

    });

    await tx.payment.create({
      data: {
        user_id: id,
        order_id: order.id,
        paymentIntentId: payload.paymentData.paymentId,
        amount: payload.paymentData.amount,
        currency: payload.paymentData.currency,
      }
    })

    return order;
  });

  return result;
};

const updateOrder = async (id: string, status: string) => {
  const updateStatus = status.toUpperCase() as keyof typeof OrderStatus;

  const order = await prisma.orders.update({
    where: {
      id,
    },
    data: {
      status: updateStatus,
    },
  });

  return order;
};

const deleteOrder = async (id: string) => {
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
  updateOrder,
};
