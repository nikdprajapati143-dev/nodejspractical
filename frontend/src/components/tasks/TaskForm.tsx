import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Task } from "../../types/task.types";

import { taskSchema } from "../../validations/task.validation";

import useUsers from "../../hooks/useUsers";

import Input from "../ui/Input";
import Button from "../ui/Button";

import UserSelect from "./UserSelect";
import StatusSelect from "./StatusSelect";

import type { TaskFormData } from "../../types/task.types";

interface Props {
  defaultValues?: Partial<Task>;

  loading?: boolean;

  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({
  defaultValues,

  loading,

  onSubmit,
}: Props) {
  const { data } = useUsers();

  const {
    register,

    handleSubmit,

    control,

    reset,

    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),

    defaultValues: {
      title: "",

      description: "",

      assignedTo: "",

      status: "todo",
    },
  });

  //   useEffect(() => {
  //     if (defaultValues) {
  //       reset({
  //         title: defaultValues.title,

  //         description: defaultValues.description,

  //         assignedTo: defaultValues.assignedTo?.id,

  //         status: defaultValues.status,
  //       });
  //     }
  //   }, [defaultValues, reset]);

  useEffect(() => {
    if (defaultValues && data?.data?.length) {
      reset({
        title: defaultValues.title ?? "",
        description: defaultValues.description ?? "",

        assignedTo:
          defaultValues.assignedTo?.id ??
          (defaultValues.assignedTo as any)?._id ??
          "",

        status: defaultValues.status ?? "todo",
      });
    }
  }, [defaultValues, data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Title"
        placeholder="Enter task title"
        error={errors.title}
        {...register("title")}
      />

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={4}
          className="w-full rounded-lg border p-3"
          {...register("description")}
        />

        <p className="text-sm text-red-500">{errors.description?.message}</p>
      </div>

      <Controller
        control={control}
        name="assignedTo"
        render={({ field }) => (
          <UserSelect
            users={data?.data || []}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.assignedTo && (
        <p className="text-sm text-red-500">{errors.assignedTo.message}</p>
      )}

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <StatusSelect value={field.value} onChange={field.onChange} />
        )}
      />

      <Button loading={loading} type="submit">
        Save Task
      </Button>
    </form>
  );
}
