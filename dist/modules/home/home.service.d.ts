export declare const HomeService: {
    featuredMeals: () => Promise<{
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
    }[]>;
    featuredProviders: () => Promise<{
        id: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        resturent_name: string;
        address: string;
        phone: string;
        logo_url: string;
    }[]>;
};
//# sourceMappingURL=home.service.d.ts.map