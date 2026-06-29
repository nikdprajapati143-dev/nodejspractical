import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import taskService from "../services/task.service";

export default function useUpdateTask() {

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            payload,
        }: any) =>

            taskService.updateTask(
                id,
                payload
            ),

        onSuccess: (response) => {

            toast.success(
                response.message
            );

            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["task"],
            });

            navigate("/tasks");

        },

        onError: (error: any) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to update task"

            );

        },

    });

}