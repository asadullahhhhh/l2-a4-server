import {Router} from 'express';
import { categoriController } from './categorie.controller';

const router = Router()

router.post("/", categoriController.createCategoryPost)

export const categorieRouter = router