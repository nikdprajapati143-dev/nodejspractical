import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

import taskService from "../services/task.service";
import TaskStatus from "../enums/task-status.enum";
import { transformTask } from "../transformers/task.transformer";

class TaskController {

    createTask = asyncHandler(async (req: Request, res: Response) => {

        const task = await taskService.createTask({
            ...req.body,
            createdBy: req.user.id,
        });

        return res.status(201).json(
            new ApiResponse(
                true,
                "Task created successfully",
                transformTask(task)
            )
        );

    });

    getTasks = asyncHandler(async (req: Request, res: Response) => {

        const tasks = await taskService.getTasks(req.user);

        return res.json(
            new ApiResponse(
                true,
                "Tasks fetched successfully",
                tasks
            )
        );

    });

    getTask = asyncHandler(async (req: Request, res: Response) => {

        const task = await taskService.getTask(
            req.params.id,
            req.user
        );

        return res.json(
            new ApiResponse(
                true,
                "Task fetched successfully",
                task
            )
        );

    });

    updateTask = asyncHandler(async (req: Request, res: Response) => {

        const task = await taskService.updateTask(
            req.params.id,
            req.body
        );

        return res.json(
            new ApiResponse(
                true,
                "Task updated successfully",
                task
            )
        );

    });

    deleteTask = asyncHandler(async (req: Request, res: Response) => {

        await taskService.deleteTask(
            req.params.id
        );

        return res.json(
            new ApiResponse(
                true,
                "Task deleted successfully"
            )
        );

    });

    updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {

        const task = await taskService.updateTaskStatus(
            req.params.id,
            req.user.id,
            req.body.status as TaskStatus
        );

        return res.json(
            new ApiResponse(
                true,
                "Task status updated successfully",
                task
            )
        );

    });

}

export default new TaskController();