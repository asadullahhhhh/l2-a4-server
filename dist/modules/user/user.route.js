import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/enums";
import { UserController } from "./user.controller";
const router = Router();
router.get("/get-all-users", authMiddleware(UserRole.ADMIN), UserController.getAllUsers);
router.patch("/update-user", authMiddleware(UserRole.ADMIN), UserController.updateUser);
export const UserRoute = router;
//# sourceMappingURL=user.route.js.map