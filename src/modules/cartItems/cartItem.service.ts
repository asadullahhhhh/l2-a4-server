import { prisma } from "../../lib/prisma";

const createCartItem = async (
  cartItemData: {
    meal_id: string;
    price: number;
    provider_id: string;
    image_url?: string;
    name: string;
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
      price: cartItemData.price,
      provider_id: cartItemData.provider_id,
      image_url: cartItemData.image_url ?? null,  
      name: cartItemData.name,
    },
  });

  return cartItem;
};

const getUserCartItems = async (user_id: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cart: {
        user_id
      }
    }
  })

  return cartItems
}

const updateCartItem = async (updateData: { quantity: number }, id: string) => {
  const result = prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: updateData.quantity,
    },
  });

  return result;
};

const deleteCartItem = async (id: string) => {
  const result = prisma.cartItem.delete({
    where: {
      id,
    },
  });

  return result;
};

const isAddCart = async (mealId: string, userId: string) => {
  const isExist = await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.upsert({
      where: {
        user_id: userId,
      },
      update: {},
      create: {
        user_id: userId,
      },
    })

    const alreadyExists = await tx.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        meal_id: mealId,
      },
    });

    return alreadyExists ? true : false;
  });

  // console.log(isExist);

  return isExist;
};

const clearAllCartItems = async (userId: string) => {
  await prisma.$transaction(async (tx) => {
    const userCartId = await tx.cart.findUnique({
    where: {
      user_id: userId
    },
    select: {
      id: true
    }
  }) 

  if(!userCartId) {
    throw new Error("Cart not found for the user");
  }

  await tx.cartItem.deleteMany({
    where: {
      cart_id: userCartId?.id
    }
  })
  })
}

export const cartItemService = {
  createCartItem,
  updateCartItem,
  deleteCartItem,
  isAddCart,
  getUserCartItems,
  clearAllCartItems,
};
