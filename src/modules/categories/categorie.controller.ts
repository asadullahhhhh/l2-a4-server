import { NextFunction, Request, Response } from "express";
import { categoriService } from "./categorie.service";

const createCategoryPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoriService.createCategoryPost(req.body)

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}


export const categoriController = {
    createCategoryPost
}