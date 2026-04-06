import { Router } from "express";
import { cartItemController } from "./cartItem.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/enums";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.USER, UserRole.ADMIN),
  cartItemController.createCartItem,
);

router.patch(
  "/:id",
  authMiddleware(UserRole.USER, UserRole.ADMIN),
  cartItemController.updateCartItem,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.USER, UserRole.ADMIN),
  cartItemController.deleteCartItem,
);

export const cartItemRoute = router;
