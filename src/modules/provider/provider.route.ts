import {Router} from 'express';
import { providerController } from './provider.controller';
import authMiddleware from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/enums';

const router = Router()

router.get("/", authMiddleware(UserRole.PROVIDER, UserRole.ADMIN), providerController.getProverderById)

router.post('/', authMiddleware(UserRole.ADMIN, UserRole.PROVIDER), providerController.createProvider)

router.patch("/", authMiddleware(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateProvider )

export const providerRouter = router