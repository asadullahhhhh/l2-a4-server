import { HomeService } from "./home.service";
const featuredMeals = async (req, res, next) => {
    try {
        const result = await HomeService.featuredMeals();
        res.status(200).json({
            success: true,
            message: "Featured meals retrieved successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const featuredProviders = async (req, res, next) => {
    try {
        const result = await HomeService.featuredProviders();
        res.status(200).json({
            success: true,
            message: "Featured providers retrieved successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export const HomeController = {
    featuredMeals,
    featuredProviders
};
//# sourceMappingURL=home.controller.js.map