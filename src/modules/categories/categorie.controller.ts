import { NextFunction, Request, Response } from "express";
import { categoriService } from "./categorie.service";

const createCategoryPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoriService.createCategoryPost()
    } catch (e) {
        next(e)
    }
}


export const categoriController = {
    createCategoryPost
}