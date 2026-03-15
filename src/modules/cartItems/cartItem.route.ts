import {Router} from 'express';
import { cartItemController } from './cartItem.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router();

router.post("/", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), cartItemController.createCartItem)

export const cartItemRoute = router;