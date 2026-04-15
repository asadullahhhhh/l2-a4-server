import { Provider } from "../../types/provider.type.";
export declare const providerService: {
    createProvider: (payload: Provider) => Promise<{
        id: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        resturent_name: string;
        address: string;
        phone: string;
        logo_url: string;
    }>;
    getProverderById: (id: string) => Promise<{
        id: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        resturent_name: string;
        address: string;
        phone: string;
        logo_url: string;
    } | null>;
    updateProvider: (payload: Partial<Provider>, id: string) => Promise<{
        id: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        resturent_name: string;
        address: string;
        phone: string;
        logo_url: string;
    }>;
    getAllProviders: ({ skipNumber, limitNumber, pageNumber, }: {
        skipNumber: number;
        limitNumber: number;
        pageNumber: number;
    }) => Promise<{
        meta: {
            page: number;
            limit: number;
            skip: number;
            totalItems: number;
            totalPage: number;
        };
        data: {
            id: string;
            description: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            resturent_name: string;
            address: string;
            phone: string;
            logo_url: string;
        }[];
    }>;
    getPublicProviderById: (id: string) => Promise<({
        meals: {
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
    } & {
        id: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        resturent_name: string;
        address: string;
        phone: string;
        logo_url: string;
    }) | null>;
    getProvierOrders: (id: string, pageNumber: number, limitNumber: number, skip: number) => Promise<{
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPage: number;
        };
        data: ({
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
        } & {
            id: string;
            status: import("../../../generated/prisma/enums").OrderStatus;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            provider_id: string;
            total_price: import("@prisma/client-runtime-utils").Decimal;
            delivery_address: string;
        })[];
    }>;
};
//# sourceMappingURL=provider.service.d.ts.map