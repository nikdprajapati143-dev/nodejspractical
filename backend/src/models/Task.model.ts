import mongoose, { Schema } from "mongoose";

import { ITask } from "../interfaces/task.interface";
import TaskStatus from "../enums/task-status.enum";

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.TODO,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


const Task = mongoose.model<ITask>(
    "Task",
    taskSchema
);

export default Task;