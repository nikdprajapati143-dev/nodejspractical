import { ITask } from "../interfaces/task.interface";

export const transformTask = (task: ITask | any) => {
    return {
        id: task._id,

        title: task.title,

        description: task.description,

        status: task.status,

        assignedTo: task.assignedTo
            ? {
                id: task.assignedTo._id,
                name: task.assignedTo.name,
                email: task.assignedTo.email,
                role: task.assignedTo.role,
            }
            : null,

        createdBy: task.createdBy
            ? {
                id: task.createdBy._id,
                name: task.createdBy.name,
                email: task.createdBy.email,
            }
            : null,

        createdAt: task.createdAt,

        updatedAt: task.updatedAt,
    };
};