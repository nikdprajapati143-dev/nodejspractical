import type { Task } from "../../types/task.types";
import { Link } from "react-router-dom";

interface Props {
  tasks: Task[];
}

export default function TaskTable({ tasks }: Props) {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Title</th>

          <th>Status</th>

          <th>Assigned</th>

          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-t">
            <td className="p-3">{task.title}</td>

            <td >{task.status}</td>

            <td>{task.assignedTo.name}</td>

            <td>
              <div className="flex gap-2">
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="rounded bg-yellow-500 px-3 py-2 text-white"
                >
                  Edit
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
