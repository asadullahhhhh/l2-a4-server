import { Router } from 'express';
import { orderController } from './order.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';
const router = Router();
router.get("/", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrders);
router.get("/user-orders", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), orderController.userOrders);
router.post("/", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), orderController.createOrder);
router.patch("/:id", authMiddleware(UserRole.PROVIDER), orderController.updateOrder);
router.delete("/:id", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), orderController.deleteOrder);
export const orderRouter = router;
//# sourceMappingURL=order.route.js.map