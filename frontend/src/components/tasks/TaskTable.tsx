import { Link } from "react-router-dom";
import type { Task, TaskStatus } from "../../types/task.types";

import useUpdateTaskStatus from "../../hooks/useUpdateTaskStatus";
import StatusDropdown from "./StatusDropdown";

interface Props {
  tasks: Task[];
  isAdmin: boolean;
}

export default function TaskTable({ tasks, isAdmin }: Props) {
  if (!tasks.length) {
    return <div className="p-10 text-center text-gray-500">No Tasks Found</div>;
  }

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            {isAdmin && <th className="px-6 py-4 text-left">Assigned To</th>}

            <th className="px-6 py-4 text-center">
              {isAdmin ? "Actions" : "Status"}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition">
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
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    task.status,
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              {isAdmin && <td className="px-6 py-4">{task.assignedTo.name}</td>}

              <td className="px-6 py-4">
                {isAdmin ? (
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/tasks/${task._id}/edit`}
                      className="rounded bg-yellow-500 px-4 py-2 text-white"
                    >
                      Edit
                    </Link>

                    {/* <button
                      onClick={() => handleDelete(task._id)}
                      className="rounded bg-red-500 px-4 py-2 text-white"
                    >
                      Delete
                    </button> */}
                  </div>
                ) : (
                  <StatusDropdown
                    value={task.status}
                    onChange={(status) =>
                      updateStatus.mutate({
                        id: task._id,
                        status,
                      })
                    }
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
