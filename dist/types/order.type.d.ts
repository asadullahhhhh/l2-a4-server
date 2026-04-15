export type OrderPayload = {
    items: {
        meal_id: string;
        provider_id: string;
        quantity: number;
    }[];
    delivery_address: string;
};
export type MealItem = {
    meal_id: string;
    provider_id: string;
    quantity: number;
};
//# sourceMappingURL=order.type.d.ts.map