import { OrderPayload } from "../../types/order.type";
export declare const orderService: {
    createOrder: (payload: OrderPayload, id: string) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        provider_id: string;
        total_price: import("@prisma/client-runtime-utils").Decimal;
        delivery_address: string;
    }>;
    getOrders: (id: string, role: string, skipNumber: number, limitNumber: number, pageNumber: number) => Promise<({
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
    })[] | {
        meta: {
            totalPage: number;
            page: number;
            limit: number;
            totalItems: number;
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
    } | undefined>;
    getUserOrders: (id: string) => Promise<({
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
    })[]>;
    deleteOrder: (id: string) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        provider_id: string;
        total_price: import("@prisma/client-runtime-utils").Decimal;
        delivery_address: string;
    }>;
    updateOrder: (id: string, status: string) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        provider_id: string;
        total_price: import("@prisma/client-runtime-utils").Decimal;
        delivery_address: string;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map