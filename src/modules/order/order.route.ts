import {Router} from 'express';
import { orderController } from './order.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.get("/", authMiddleware(UserRole.USER, UserRole.ADMIN), orderController.getOrders)

router.post("/", authMiddleware(UserRole.USER,  UserRole.ADMIN), orderController.createOrder)

router.delete("/:id", authMiddleware(UserRole.USER, UserRole.ADMIN), orderController.deleteOrder)


export const orderRouter = router