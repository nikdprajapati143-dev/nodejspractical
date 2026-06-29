import useTasks from "../../hooks/useTasks";
import TaskTable from "../../components/tasks/TaskTable";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../socket/socket";
import type { Task } from "../../types/task.types";

export type SortField = "title" | "createdAt" | "status";
export type SortOrder = "asc" | "desc";

export default function TaskList() {
  const { data, isLoading } = useTasks();

  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  // Sort state
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Call all hooks before any return
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusUpdated = (data: any) => {
      console.log("Socket Received :", data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    socket.on("task-status-updated", handleStatusUpdated);
    return () => {
      socket.off("task-status-updated", handleStatusUpdated);
    };
  }, [queryClient]);

  // Return after all hooks
  if (isLoading) {
    return <Loader />;
  }

  // Sort tasks client-side
  const sortedTasks = [...(data?.data ?? [])].sort((a: Task, b: Task) => {
    let valA = "";
    let valB = "";

    if (sortField === "title") {
      valA = a.title.toLowerCase();
      valB = b.title.toLowerCase();
    } else if (sortField === "createdAt") {
      valA = a.createdAt;
      valB = b.createdAt;
    } else if (sortField === "status") {
      valA = a.status;
      valB = b.status;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle: if same column clicked → flip direction; else → switch column + reset to asc
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {isAdmin ? "Tasks" : "My Tasks"}
          </h1>
          <p className="mt-1 text-gray-500">
            {isAdmin
              ? "Manage and assign tasks to users"
              : "View and update your assigned tasks"}
          </p>
        </div>

        {isAdmin && (
          <Link
            to="/tasks/create"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
          >
            + Create Task
          </Link>
        )}
      </div>

      {/* Table — column headers handle sorting */}
      <div className="rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
        <TaskTable
          tasks={sortedTasks}
          isAdmin={isAdmin}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}
