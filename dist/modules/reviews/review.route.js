import { Router } from "express";
import { reviewController } from "./review.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/enums";
const router = Router();
router.post("/", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), reviewController.createReview);
export const reviewRouter = router;
//# sourceMappingURL=review.route.js.map