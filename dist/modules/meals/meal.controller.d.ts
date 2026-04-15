import { NextFunction, Request, Response } from "express";
export declare const mealController: {
    getMeals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMealById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProviderMeals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=meal.controller.d.ts.map