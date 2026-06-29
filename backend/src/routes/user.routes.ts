import { Router } from "express";

import userController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";

import UserRole from "../enums/role.enum";

const router = Router();

router.get(
    "/",
    authMiddleware,
    authorize(UserRole.ADMIN),
    userController.getUsers
);

export default router;