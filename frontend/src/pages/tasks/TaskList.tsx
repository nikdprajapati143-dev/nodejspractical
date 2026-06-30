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

const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE) || 5; // tasks per page (set via .env VITE_PAGE_SIZE)

export default function TaskList() {
  const { data, isLoading } = useTasks();

  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusUpdated = (data: any) => {
      console.log("Socket Received :", data);

      // Show a styled notification toast for admin
      toast(data.message, {
        icon: "🔔",
        style: {
          background: "#eff6ff",
          color: "#1e40af",
          border: "1px solid #bfdbfe",
          fontWeight: "500",
        },
        duration: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };
    socket.on("task-status-updated", handleStatusUpdated);
    return () => {
      socket.off("task-status-updated", handleStatusUpdated);
    };
  }, [queryClient]);

  if (isLoading) return <Loader />;

  const allTasks = data?.data ?? [];

  // 1️⃣ Filter by search
  const filteredTasks = allTasks.filter((task: Task) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      task.title.toLowerCase().includes(q) ||
      (task.description ?? "").toLowerCase().includes(q)
    );
  });

  // 2️⃣ Sort
  const sortedTasks = [...filteredTasks].sort((a: Task, b: Task) => {
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

  // 3️⃣ Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedTasks = sortedTasks.slice(startIndex, startIndex + PAGE_SIZE);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Page numbers to show (show up to 5 page buttons)
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const left = Math.max(1, safePage - delta);
    const right = Math.min(totalPages, safePage + delta);
    for (let i = left; i <= right; i++) range.push(i);
    return range;
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

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />

        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count */}
      {searchQuery && (
        <p className="text-sm text-gray-500">
          {sortedTasks.length === 0
            ? `No tasks found for "${searchQuery}"`
            : `${sortedTasks.length} task${sortedTasks.length !== 1 ? "s" : ""} found for "${searchQuery}"`}
        </p>
      )}

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
        <TaskTable
          tasks={paginatedTasks}
          isAdmin={isAdmin}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
            {/* Info */}
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">{startIndex + 1}</span>
              {" – "}
              <span className="font-medium text-gray-700">
                {Math.min(startIndex + PAGE_SIZE, sortedTasks.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">{sortedTasks.length}</span>{" "}
              tasks
            </p>

            {/* Page Controls */}
            <div className="flex items-center gap-1">
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              {/* First page + ellipsis */}
              {getPageNumbers()[0] > 1 && (
                <>
                  <button onClick={() => setCurrentPage(1)} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">1</button>
                  {getPageNumbers()[0] > 2 && <span className="px-1 text-gray-400">…</span>}
                </>
              )}

              {/* Page numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${page === safePage
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Last page + ellipsis */}
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                <>
                  {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                    <span className="px-1 text-gray-400">…</span>
                  )}
                  <button onClick={() => setCurrentPage(totalPages)} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
