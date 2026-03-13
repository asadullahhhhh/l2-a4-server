import {Router} from 'express';
import { categoriController } from './categorie.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.post("/", authMiddleware(UserRole.ADMIN), categoriController.createCategoryPost)

export const categorieRouter = router