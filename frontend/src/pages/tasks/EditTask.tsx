import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";

import TaskForm from "../../components/tasks/TaskForm";

import useTask from "../../hooks/useTask";

import useUpdateTask from "../../hooks/useUpdateTask";

// import { TaskFormData } from "../../validations/task.validation";
import type { TaskFormData } from "../../types/task.types";

export default function EditTask() {
  const { id } = useParams();

  const { data, isLoading } = useTask(id!);

  const updateTask = useUpdateTask();

  if (isLoading) return <Loader />;

  const handleSubmit = (form: TaskFormData) => {
    updateTask.mutate({
      id,

      payload: {
        title: form.title,

        description: form.description,

        assignedTo: form.assignedTo,

        status: form.status,
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Task</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <TaskForm
          defaultValues={data.data}
          loading={updateTask.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
