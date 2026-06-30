import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import taskService from "../services/task.service";
import type { TaskStatus } from "../types/task.types";

// Human-readable status label map
const STATUS_LABELS: Record<string, string> = {
    "todo": "To Do",
    "in-progress": "In Progress",
    "done": "Done",
};

export default function useUpdateTaskStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: TaskStatus;
        }) => taskService.updateStatus(id, status),

        onSuccess: (_data, variables) => {
            const label = STATUS_LABELS[variables.status] ?? variables.status;
            toast.success(`Task status updated to "${label}"`);

            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },

        onError: () => {
            toast.error("Failed to update task status. Please try again.");
        },
    });
}