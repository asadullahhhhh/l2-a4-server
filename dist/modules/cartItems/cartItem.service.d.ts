export declare const cartItemService: {
    createCartItem: (cartItemData: {
        meal_id: string;
        price: number;
        provider_id: string;
        image_url?: string;
        name: string;
    }, user_id: string) => Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        cart_id: string;
        meal_id: string;
        quantity: number;
    }>;
    updateCartItem: (updateData: {
        quantity: number;
    }, id: string) => Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        cart_id: string;
        meal_id: string;
        quantity: number;
    }>;
    deleteCartItem: (id: string) => Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        cart_id: string;
        meal_id: string;
        quantity: number;
    }>;
    isAddCart: (mealId: string, userId: string) => Promise<boolean>;
    getUserCartItems: (user_id: string) => Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        cart_id: string;
        meal_id: string;
        quantity: number;
    }[]>;
    clearAllCartItems: (userId: string) => Promise<void>;
};
//# sourceMappingURL=cartItem.service.d.ts.map