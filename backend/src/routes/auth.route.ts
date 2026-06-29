import { Router } from "express";
import authController from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import { loginSchema } from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);
router.post('/logout', authMiddleware, authController.logout);
// router.get("/profile", authMiddleware, authController.getProfile);


export default router;