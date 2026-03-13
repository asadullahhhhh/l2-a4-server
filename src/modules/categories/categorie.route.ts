import {Router} from 'express';
import { categoriController } from './categorie.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.get("/", categoriController.getCategoryPost)

router.post("/", authMiddleware(UserRole.ADMIN), categoriController.createCategoryPost)

router.patch("/:id", authMiddleware(UserRole.ADMIN), categoriController.updateCategoryPost)

export const categorieRouter = router