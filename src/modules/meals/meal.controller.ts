import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";
import { SearchMeals, UpdateMeals } from "../../types/meals.type";

const getMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      is_available,
      category_id,
      is_vegetarian,
      is_vegan,
      is_halal,
      is_gluten_free,
      is_feature,
      min_price,
      max_price,
      price_order,
      search,
      page,
      limit
    } = req.query;

    const pageNumber = Number(page ?? 1)
    const limitNumber = Number(limit ?? 12)

    const skip = (pageNumber - 1) * limitNumber

    const query: Partial<SearchMeals<UpdateMeals>> = {
      is_available: is_available
        ? is_available === "true"
          ? true
          : is_available === "false"
            ? false
            : undefined
        : undefined,
      category_id: typeof category_id === "string" ? category_id : undefined,
      is_vegan: is_vegan
        ? is_vegan === "true"
          ? true
          : is_vegan === "false"
            ? false
            : undefined
        : undefined,
      is_vegetarian: is_vegetarian
        ? is_vegetarian === "true"
          ? true
          : is_vegetarian === "false"
            ? false
            : undefined
        : undefined,
      is_halal: is_halal
        ? is_halal === "true"
          ? true
          : is_halal === "false"
            ? false
            : undefined
        : undefined,
      is_gluten_free: is_gluten_free
        ? is_gluten_free === "true"
          ? true
          : is_gluten_free === "false"
            ? false
            : undefined
        : undefined,
      is_feature: is_feature
        ? is_feature === "true"
          ? true
          : is_feature === "false"
            ? false
            : undefined
        : undefined,
      min_price: isNaN(Number(min_price)) ? undefined : Number(min_price),
      max_price: isNaN(Number(max_price)) ? undefined : Number(max_price),
      price_order: price_order
        ? price_order === "asc"
          ? "asc"
          : price_order === "desc"
            ? "desc"
            : undefined
        : undefined,
      search: typeof search === "string" ? search : undefined,
      pageNumber,
      limitNumber,
      skip
    };

    const result = await mealService.getMeals(query);

    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProviderMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider_id = req.user?.id as string
    const pageNumber = Number(req.query.page ?? 1)
    const limitNumber = Number(req.query.limit ?? 12)
    const skip = (pageNumber - 1) * limitNumber

    const result = await mealService.getProviderMeals(provider_id, pageNumber, limitNumber, skip);

    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await mealService.getMealById(id as string);

    res.status(200).json({
      success: true,
      message: "Meal fetched successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const postMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mealsData = {
      user_id: req.user?.id,
      ...req.body,
    };

    const result = await mealService.postMeal(mealsData);

    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await mealService.updateMeal(req.body, id as string);

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await mealService.deleteMeal(id as string);

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const mealController = {
  getMeals,
  getMealById,
  postMeal,
  updateMeal,
  deleteMeal,
  getProviderMeals,
};
