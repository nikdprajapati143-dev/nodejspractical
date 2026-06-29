import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import taskService from "../services/task.service";

export default function useUpdateTaskStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: string;
        }) =>
            taskService.updateStatus(id, status),

        onSuccess: () => {
            toast.success("Status updated");

            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },
    });
}