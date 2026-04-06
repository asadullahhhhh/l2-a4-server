import { NextFunction, Request, Response } from "express"
import { reviewService } from "./review.service"

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { meal_id, rating, comment } = req.body

        const payload = {
            user_id: req.user?.id as string,
            meal_id,
            rating,
            comment
        }

        const result = await reviewService.createReview(payload)

        res.status(201).json({
            success: true,
            message: "Review created successfully!!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const reviewController = {
    createReview
}