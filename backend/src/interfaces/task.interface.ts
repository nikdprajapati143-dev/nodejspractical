import { Document, Types } from "mongoose";
import TaskStatus from "../enums/task-status.enum";

export interface ITask extends Document {
    title: string;

    description?: string;

    status: TaskStatus;

    assignedTo: Types.ObjectId;

    createdBy: Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;
}