import TaskForm from "../../components/tasks/TaskForm";
import useCreateTask from "../../hooks/useCreateTask";
// import { TaskFormData } from "../../validations/task.validation";
import type { TaskFormData } from "../../types/task.types";

export default function CreateTask() {
  const createTask = useCreateTask();

  const handleSubmit = (data: TaskFormData) => {
    createTask.mutate({
      title: data.title,

      description: data.description,

      assignedTo: data.assignedTo,
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Task</h1>

        <p className="text-gray-500">Assign a task to a user</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <TaskForm loading={createTask.isPending} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
