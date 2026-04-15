import { Meals, SearchMeals, UpdateMeals } from "../../types/meals.type";
export declare const mealService: {
    getMeals: (queries: Partial<SearchMeals<UpdateMeals>>) => Promise<{
        meta: {
            page: number | undefined;
            limit: number | undefined;
            totalItems: number;
            totalPage: number;
        };
        data: {
            id: string;
            name: string;
            description: string;
            created_at: Date;
            updated_at: Date;
            provider_id: string;
            is_available: boolean;
            is_vegetarian: boolean;
            is_vegan: boolean;
            is_halal: boolean;
            is_gluten_free: boolean;
            is_feature: boolean;
            category_id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            image_url: string | null;
        }[];
    }>;
    getMealById: (id: string) => Promise<{
        provider: {
            id: string;
            description: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            resturent_name: string;
            address: string;
            phone: string;
            logo_url: string;
        };
        orderItems: {
            id: string;
            name: string;
            created_at: Date;
            updated_at: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            image_url: string | null;
            meal_id: string;
            quantity: number;
            order_id: string;
        }[];
        reviews: {
            id: string;
            created_at: Date;
            user_id: string;
            meal_id: string;
            rating: number;
            comment: string;
        }[];
        cart_item: {
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
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        is_available: boolean;
        is_vegetarian: boolean;
        is_vegan: boolean;
        is_halal: boolean;
        is_gluten_free: boolean;
        is_feature: boolean;
        category_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
    }>;
    postMeal: (payload: Meals) => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        is_available: boolean;
        is_vegetarian: boolean;
        is_vegan: boolean;
        is_halal: boolean;
        is_gluten_free: boolean;
        is_feature: boolean;
        category_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
    }>;
    updateMeal: (payload: Partial<UpdateMeals>, id: string) => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        is_available: boolean;
        is_vegetarian: boolean;
        is_vegan: boolean;
        is_halal: boolean;
        is_gluten_free: boolean;
        is_feature: boolean;
        category_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
    }>;
    deleteMeal: (id: string) => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        provider_id: string;
        is_available: boolean;
        is_vegetarian: boolean;
        is_vegan: boolean;
        is_halal: boolean;
        is_gluten_free: boolean;
        is_feature: boolean;
        category_id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
    }>;
    getProviderMeals: (provider_id: string, pageNumber: number, limitNumber: number, skip: number) => Promise<{
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPage: number;
        };
        data: {
            id: string;
            name: string;
            description: string;
            created_at: Date;
            updated_at: Date;
            provider_id: string;
            is_available: boolean;
            is_vegetarian: boolean;
            is_vegan: boolean;
            is_halal: boolean;
            is_gluten_free: boolean;
            is_feature: boolean;
            category_id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            image_url: string | null;
        }[];
    }>;
};
//# sourceMappingURL=meal.service.d.ts.map