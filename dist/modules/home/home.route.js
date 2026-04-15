import { Router } from "express";
import { HomeController } from "./home.controller";
const router = Router();
router.get("/featured-meals", HomeController.featuredMeals);
router.get("/featured-providers", HomeController.featuredProviders);
export const HomeRoute = router;
//# sourceMappingURL=home.route.js.map