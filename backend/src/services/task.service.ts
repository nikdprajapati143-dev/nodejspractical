import mongoose from "mongoose";

import Task from "../models/Task.model";
import User from "../models/User.model";

import ApiError from "../utils/ApiError";

import TaskStatus from "../enums/task-status.enum";
import UserRole from "../enums/role.enum";
import { getIO } from "../socket/socket";

class TaskService {
    async createTask(data: {
        title: string;
        description?: string;
        assignedTo: string;
        createdBy: string;
    }) {

        const assignedUser = await User.findById(
            data.assignedTo
        );

        if (!assignedUser) {
            throw new ApiError(
                404,
                "Assigned user not found"
            );
        }

        const task = await Task.create({
            title: data.title,

            description: data.description,

            assignedTo: data.assignedTo,

            createdBy: data.createdBy,
        });

        return task.populate([
            {
                path: "assignedTo",
                select: "name email role",
            },
            {
                path: "createdBy",
                select: "name email",
            },
        ]);
    }


    async getTasks(user: any) {

        let filter = {};

        if (user.role !== "admin") {

            filter = {
                assignedTo: user._id,
            };
        }

        return Task.find(filter)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email")
            .sort({
                createdAt: -1,
            });

    }


    /*async getTask(id: string) {

        const task = await Task.findById(id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email");

        if (!task) {
            throw new ApiError(
                404,
                "Task not found"
            );
        }

        return task;
    }*/

    async getTask(
        id: string,
        user: AuthUser
    ) {
        const task = await Task.findById(id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email");

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        // Admin can access any task
        if (user.role === UserRole.ADMIN) {
            return task;
        }

        // User can only access their assigned task
        if (task.assignedTo._id.toString() !== user.id) {
            throw new ApiError(
                403,
                "You are not authorized to access this task."
            );
        }

        return task;
    }

    async updateTask(
        id: string,
        body: any
    ) {

        const task = await Task.findById(id);

        if (!task) {

            throw new ApiError(
                404,
                "Task not found"
            );

        }

        if (body.assignedTo) {

            const user = await User.findById(
                body.assignedTo
            );

            if (!user) {

                throw new ApiError(
                    404,
                    "Assigned user not found"
                );

            }

        }

        Object.assign(task, body);

        await task.save();

        return task.populate([
            {
                path: "assignedTo",
                select: "name email role",
            },
            {
                path: "createdBy",
                select: "name email",
            },
        ]);

    }

    async deleteTask(id: string) {

        const task = await Task.findById(id);

        if (!task) {

            throw new ApiError(
                404,
                "Task not found"
            );

        }

        await task.deleteOne();

    }

    async updateTaskStatusOLd(
        id: string,
        userId: string,
        status: TaskStatus
    ) {

        const task = await Task.findById(id);

        if (!task) {

            throw new ApiError(
                404,
                "Task not found"
            );

        }

        if (
            task.assignedTo.toString() !==
            userId
        ) {

            throw new ApiError(
                403,
                "You are not assigned to this task"
            );

        }

        task.status = status;

        await task.save();

        return task.populate([
            {
                path: "assignedTo",
                select: "name email role",
            },
            {
                path: "createdBy",
                select: "name email",
            },
        ]);

    }

    async updateTaskStatus(
        id: string,
        userId: string,
        status: TaskStatus
    ) {

        const task = await Task.findById(id);

        if (!task) {

            throw new ApiError(
                404,
                "Task not found"
            );

        }

        if (
            task.assignedTo.toString() !==
            userId
        ) {

            throw new ApiError(
                403,
                "You are not assigned to this task"
            );

        }

        task.status = status;

        await task.save();

        const populatedTask = await task.populate([
            {
                path: "assignedTo",
                select: "name email role",
            },
            {
                path: "createdBy",
                select: "name email",
            },
        ]);

        const io = getIO();

        const adminId = (
            populatedTask.createdBy as any
        )._id.toString();

        console.log(
            "Sending Socket Event To Admin :",
            adminId
        );

        io.to(adminId).emit(
            "task-status-updated",
            {

                message: `${(populatedTask.assignedTo as any).name
                    } updated "${populatedTask.title}"`,

                task: populatedTask,

            }
        );

        return populatedTask;

    }
}

export default new TaskService();

