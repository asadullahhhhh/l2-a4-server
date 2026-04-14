import { Router } from "express";
import { cartItemController } from "./cartItem.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/enums";

const router = Router();

router.get("/", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), cartItemController.getUserCartItems);

router.post(
  "/",
  authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN),
  cartItemController.createCartItem,
);

router.post(
  "/clear",
  authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN),
  cartItemController.clearAllCartItems,
)

router.patch(
  "/:id",
  authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN),
  cartItemController.updateCartItem,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN),
  cartItemController.deleteCartItem,
);

router.get(
  "/isAddCart/:mealId",
  authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN),
  cartItemController.isAddCart,
)

export const cartItemRoute = router;
