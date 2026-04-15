import { prisma } from "../../lib/prisma";
const createReview = async (payload) => {
    const result = await prisma.reviews.create({
        data: payload
    });
    return result;
};
export const reviewService = {
    createReview
};
//# sourceMappingURL=review.service.js.map