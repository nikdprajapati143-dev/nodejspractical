import { useQuery } from "@tanstack/react-query";
import taskService from "../services/task.service";

export default function useTask(id: string) {

    return useQuery({

        queryKey: ["task", id],

        queryFn: () => taskService.getTask(id),

        enabled: !!id,
    });

}