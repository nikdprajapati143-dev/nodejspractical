import api from "../api/axios";
import type {
    CreateTaskPayload,
    UpdateTaskPayload,
} from "../types/task.types";

const taskService = {

    getTasks: async () => {
        const { data } = await api.get("/tasks");
        return data;
    },

    getTask: async (id: string) => {

        const { data } = await api.get(`/tasks/${id}`);
        console.log('getTask', data);

        return data;

    },

    createTask: async (
        payload: CreateTaskPayload
    ) => {
        const { data } = await api.post(
            "/tasks/create",
            payload
        );

        return data;
    },

    updateTask: async (
        id: string,
        payload: UpdateTaskPayload
    ) => {
        const { data } = await api.put(
            `/tasks/${id}`,
            payload
        );

        return data;
    },

    deleteTask: async (id: string) => {
        const { data } = await api.delete(
            `/tasks/${id}`
        );

        return data;
    },


    updateStatus: async (
        id: string,
        status: string
    ) => {

        const { data } = await api.patch(
            `/tasks/${id}`,
            {
                status,
            }
        );

        return data;

    },

};

export default taskService;