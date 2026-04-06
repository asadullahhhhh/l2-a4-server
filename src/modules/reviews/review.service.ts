import { prisma } from "../../lib/prisma"

const createReview = async (payload: {
    user_id: string,
    meal_id: string,
    rating: number,
    comment: string
}) => {
    const result = await prisma.reviews.create({
        data: payload
    })

    return result
}

export const reviewService = {
    createReview
}