import { NextFunction, Request, Response } from "express";
import { HomeService } from "./home.service";

const featuredMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await HomeService.featuredMeals()

        res.status(200).json({
            success: true,
            message: "Featured meals retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const featuredProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await HomeService.featuredProviders()

        res.status(200).json({
            success: true,
            message: "Featured providers retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const HomeController = {
    featuredMeals,
    featuredProviders
}