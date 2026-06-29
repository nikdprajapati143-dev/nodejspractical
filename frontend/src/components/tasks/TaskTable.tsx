import { Link } from "react-router-dom";
import type { Task, TaskStatus } from "../../types/task.types";
import useUpdateTaskStatus from "../../hooks/useUpdateTaskStatus";
import StatusDropdown from "./StatusDropdown";

type SortField = "title" | "createdAt" | "status";
type SortOrder = "asc" | "desc";

interface Props {
  tasks: Task[];
  isAdmin: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

// Helper: shows ↑ when active + asc, ↓ when active + desc, ↕ when inactive
function SortIcon({
  field,
  sortField,
  sortOrder,
}: {
  field: SortField;
  sortField: SortField;
  sortOrder: SortOrder;
}) {
  const isActive = sortField === field;
  return (
    <span
      className={`ml-1 inline-block text-xs transition-colors ${
        isActive ? "text-blue-600" : "text-gray-400"
      }`}
    >
      {isActive ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );
}

export default function TaskTable({
  tasks,
  isAdmin,
  sortField,
  sortOrder,
  onSort,
}: Props) {
  const updateStatus = useUpdateTaskStatus();

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100";
    }
  };

  if (!tasks.length) {
    return <div className="p-10 text-center text-gray-500">No Tasks Found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {/* Title — sortable, takes most space */}
            <th
              className="w-1/2 px-6 py-4 text-left text-sm font-semibold cursor-pointer select-none hover:bg-gray-100 transition"
              onClick={() => onSort("title")}
            >
              Title
              <SortIcon field="title" sortField={sortField} sortOrder={sortOrder} />
            </th>

            {/* Status — sortable, compact */}
            <th
              className="w-32 px-6 py-4 text-left text-sm font-semibold cursor-pointer select-none hover:bg-gray-100 transition"
              onClick={() => onSort("status")}
            >
              Status
              <SortIcon field="status" sortField={sortField} sortOrder={sortOrder} />
            </th>

            {isAdmin && (
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Assigned To
              </th>
            )}

            <th className="w-36 px-6 py-4 text-center text-sm font-semibold">
              {isAdmin ? "Actions" : "Update Status"}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">{task.title}</div>
                {task.description && (
                  <div className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </div>
                )}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              {isAdmin && (
                <td className="px-6 py-4">{task.assignedTo.name}</td>
              )}

              <td className="px-6 py-4 text-center">
                {isAdmin ? (
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/tasks/${task._id}/edit`}
                      className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <StatusDropdown
                      value={task.status}
                      onChange={(status) =>
                        updateStatus.mutate({ id: task._id, status })
                      }
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
