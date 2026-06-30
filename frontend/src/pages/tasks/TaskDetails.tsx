import { useParams, useNavigate, Link } from "react-router-dom";
import useTask from "../../hooks/useTask";
import Loader from "../../components/common/Loader";
import { useAuthStore } from "../../store/auth.store";

const STATUS_STYLES: Record<string, string> = {
  "todo": "bg-gray-100 text-gray-700 border-gray-300",
  "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-300",
  "done": "bg-green-50 text-green-700 border-green-300",
};

const STATUS_LABELS: Record<string, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
};

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-4 border-b border-gray-100 last:border-0">
      <span className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
}

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const { data, isLoading, isError } = useTask(id!);

  if (isLoading) return <Loader />;

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-gray-500 text-lg">Task not found.</p>
        <button
          onClick={() => navigate("/tasks")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Tasks
        </button>
      </div>
    );
  }

  const task = data.data;

  const statusStyle = STATUS_STYLES[task.status] ?? "bg-gray-100 text-gray-700";
  const statusLabel = STATUS_LABELS[task.status] ?? task.status;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tasks
      </button>

      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
            {task.description && (
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            )}
          </div>

          {/* Status Badge */}
          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle}`}>
            {statusLabel}
          </span>
        </div>

        {/* Details */}
        <div className="px-6 py-2">
          <InfoRow label="Status" value={
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle}`}>
              {statusLabel}
            </span>
          } />

          <InfoRow label="Assigned To" value={
            <span className="font-medium text-gray-900">{task.assignedTo?.name ?? "—"}</span>
          } />

          <InfoRow label="Assigned Email" value={task.assignedTo?.email ?? "—"} />

          <InfoRow label="Created By" value={task.createdBy?.name ?? "—"} />

          <InfoRow label="Created At" value={
            new Date(task.createdAt).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit",
            })
          } />

          <InfoRow label="Last Updated" value={
            new Date(task.updatedAt).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit",
            })
          } />
        </div>

        {/* Footer Actions */}
        {isAdmin && (
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
            <Link
              to={`/tasks/${task._id}/edit`}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 transition"
            >
              ✏️ Edit Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
