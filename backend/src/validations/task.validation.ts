import { z } from "zod";
import TaskStatus from "../enums/task-status.enum";

/*export const createTaskValidation = {
    body: z.object({
        title: z
            .string()
            .trim()
            .min(3, "Title is required"),

        description: z
            .string()
            .trim()
            .optional(),

        assignedTo: z
            .string()
            .min(1, "Assigned user is required"),
    }),
};*/

export const createTaskValidation = {
    body: z.object({
        title: z
            .string()
            .trim()
            .min(1, "Title is required")
            .min(3, "Title must be at least 3 characters")
            .max(100, "Title must not exceed 100 characters"),

        description: z
            .string()
            .trim()
            .max(500, "Description must not exceed 500 characters")
            .optional(),

        assignedTo: z
            .string()
            .trim()
            .min(1, "Assigned user is required"),
    }),
};

/*export const updateTaskValidation = {
    body: z.object({
        title: z
            .string()
            .trim()
            .min(3)
            .optional(),

        description: z
            .string()
            .trim()
            .optional(),

        assignedTo: z
            .string()
            .optional(),
    }),
};*/

/**
 * Update Task Validation
 */
export const updateTaskValidation = {
    body: z.object({
        title: z
            .string()
            .trim()
            .min(1, "Title is required")
            .min(3, "Title must be at least 3 characters")
            .max(100, "Title must not exceed 100 characters")
            .optional(),

        description: z
            .string()
            .trim()
            .max(500, "Description must not exceed 500 characters")
            .optional(),

        assignedTo: z
            .string()
            .trim()
            .min(1, "Assigned user is required")
            .optional(),
    }),
};

// export const updateTaskStatusValidation = {
//     body: z.object({
//         status: z.nativeEnum(TaskStatus),
//     }),
// };


/**
 * Update Task Status Validation
 */
export const updateTaskStatusValidation = {
    body: z.object({
        status: z.nativeEnum(TaskStatus, {
            message: "Invalid task status",
        }),
    }),
};

// export const taskIdValidation = {
//     params: z.object({
//         id: z.string().length(24, "Invalid Task Id"),
//     }),
// };

/**
 * Task Id Validation
 */
export const taskIdValidation = {
    params: z.object({
        id: z
            .string()
            .trim()
            .length(24, "Invalid Task ID"),
    }),
};