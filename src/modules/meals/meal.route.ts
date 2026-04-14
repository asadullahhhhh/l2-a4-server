import {Router} from 'express';
import { mealController } from './meal.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.get("/", mealController.getMeals)

router.get("/provider-meals", authMiddleware(UserRole.PROVIDER), mealController.getProviderMeals)

router.get("/:id", mealController.getMealById)

router.post("/", authMiddleware(UserRole.PROVIDER, UserRole.ADMIN) , mealController.postMeal)

router.patch("/:id", authMiddleware(UserRole.PROVIDER, UserRole.ADMIN), mealController.updateMeal)

router.delete("/:id", authMiddleware(UserRole.PROVIDER, UserRole.ADMIN), mealController.deleteMeal)

export const mealRouter = router