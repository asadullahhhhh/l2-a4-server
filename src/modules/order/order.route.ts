import {Router} from 'express';
import { orderController } from './order.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.post("/", authMiddleware(UserRole.USER,  UserRole.ADMIN), orderController.createOrder)


export const orderRouter = router