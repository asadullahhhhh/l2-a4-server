import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/enums";
import { profileController } from "./profile.controller";

const router = Router()

router.get("/details", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), profileController.getProfileDetails)
router.patch("/update", authMiddleware(UserRole.USER, UserRole.PROVIDER, UserRole.ADMIN), profileController.updateProfileDetails)

export const profileRoute = router