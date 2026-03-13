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

const getCategoryPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoriService.getCategoryPost()

        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const updateCategoryPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params

        const result = await categoriService.updateCategoryPost(req.body, id as string)

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}


export const categoriController = {
    createCategoryPost,
    getCategoryPost,
    updateCategoryPost
}