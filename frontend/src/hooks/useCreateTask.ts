import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import taskService from "../services/task.service";

export default function useCreateTask() {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return useMutation({

        mutationFn: taskService.createTask,

        onSuccess: (response) => {

            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            navigate("/tasks");

        },

        onError: (error: any) => {

            toast.error(
                error.response?.data?.message ??
                "Unable to create task"
            );

        },

    });

}