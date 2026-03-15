import { prisma } from "../../lib/prisma";

const createCartItem = async (
  cartItemData: {
    meal_id: string;
  },
  user_id: string,
) => {
  const cart = await prisma.cart.upsert({
    where: {
      user_id,
    },
    update: {},
    create: {
      user_id,
    },
  });

  const alreadyExit = await prisma.cartItem.findFirst({
    where: {
      meal_id: cartItemData.meal_id,
    },
  });

  if (alreadyExit) {
    return await prisma.cartItem.update({
      where: {
        id: alreadyExit.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cart_id: cart.id,
      meal_id: cartItemData.meal_id,
      quantity: 1,
    },
  });

  console.log(cartItem);

  return cartItem;
};

export const cartItemService = {
  createCartItem,
};
