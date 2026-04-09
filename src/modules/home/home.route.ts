import { Router } from "express";
import { HomeController } from "./home.controller";

const router = Router()

router.get("/featured-meals", HomeController.featuredMeals)

export const HomeRoute = router