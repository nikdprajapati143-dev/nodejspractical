import type { User } from "./user.types";

export enum TaskStatus {

    TODO = "todo",

    IN_PROGRESS = "in-progress",

    DONE = "done",

}

export interface Task {
    id: string;

    title: string;

    description?: string;

    status: TaskStatus;

    assignedTo: User;

    createdBy: User;

    createdAt: string;

    updatedAt: string;
}

export interface TaskResponse {
    success: boolean;
    message: string;
    data: Task[];
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    assignedTo: string;
}

export interface UpdateTaskPayload {

    title: string;

    description?: string;

    assignedTo: string;

    status: TaskStatus;

}