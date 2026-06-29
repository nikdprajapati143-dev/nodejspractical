import { Router } from "express";
import taskController from "../controller/task.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import UserRole from "../enums/role.enum";

import { createTaskValidation, updateTaskValidation, updateTaskStatusValidation, taskIdValidation } from "../validations/task.validation";


const router = Router();

router.post('/create', authMiddleware, authorize(UserRole.ADMIN), validate(createTaskValidation), taskController.createTask);
router.get("/", authMiddleware, authorize(UserRole.ADMIN, UserRole.USER), taskController.getTasks);
router.get("/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.USER), validate(taskIdValidation), taskController.getTask);


router.put("/:id", authMiddleware, authorize(UserRole.ADMIN), validate({
    params: taskIdValidation.params,
    body: updateTaskValidation.body,
}), taskController.updateTask);
router.patch("/:id", authMiddleware, authorize(UserRole.USER), validate(updateTaskStatusValidation), taskController.updateTaskStatus);
router.delete("/:id", authMiddleware, authorize(UserRole.ADMIN), taskController.deleteTask);


export default router;