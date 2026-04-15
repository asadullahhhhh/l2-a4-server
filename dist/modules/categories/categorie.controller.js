import { categoriService } from "./categorie.service";
const createCategoryPost = async (req, res, next) => {
    try {
        const result = await categoriService.createCategoryPost(req.body);
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: result
        });
    }
    catch (e) {
        next(e);
    }
};
const getCategoryPost = async (req, res, next) => {
    try {
        const result = await categoriService.getCategoryPost();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result
        });
    }
    catch (e) {
        next(e);
    }
};
const updateCategoryPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categoriService.updateCategoryPost(req.body, id);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result
        });
    }
    catch (e) {
        next(e);
    }
};
export const categoriController = {
    createCategoryPost,
    getCategoryPost,
    updateCategoryPost
};
//# sourceMappingURL=categorie.controller.js.map