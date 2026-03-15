import { prisma } from "../../lib/prisma";
import { OrderPayload, MealItem } from "../../types/order.type";

const createOrder = async (payload: OrderPayload, id: string) => {
  const mealIds = payload.items.map((value: MealItem) => value.meal_id);

  const meals = await prisma.meals.findMany({
    where: {
      id: { in: mealIds },
    },
    select: {
      id: true,
      price: true,
      provider_id: true,
    },
  });

  const provider_id = meals[0]?.provider_id;

  let totalPrice = 0;
  payload.items.forEach((item: MealItem) => {
    const meal = meals.find((m) => m.id === item.meal_id);
    totalPrice += Number(meal?.price) * item.quantity;
  });

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.orders.create({
      data: {
        user_id: id,
        provider_id,
        total_price: totalPrice,
        delivery_address: payload.delivery_address,
      },
    });

    await tx.orderItems.createMany({
      data: payload.items.map((item: MealItem) => {
        const meal = meals.find((m) => m.id === item.meal_id);

        return {
          order_id: order.id,
          meal_id: meal?.id!,
          quantity: item.quantity,
          price: meal?.price!,
        };
      }),
    })
    return order
  });

//   console.log(result);

  return result
};

export const orderService = {
  createOrder,
};
