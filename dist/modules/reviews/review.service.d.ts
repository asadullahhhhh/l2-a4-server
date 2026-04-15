export declare const reviewService: {
    createReview: (payload: {
        user_id: string;
        meal_id: string;
        rating: number;
        comment: string;
    }) => Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        meal_id: string;
        rating: number;
        comment: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map