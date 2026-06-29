import * as yup from "yup";

export const taskSchema = yup.object({

    title: yup
        .string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: yup
        .string()
        .nullable()
        .default(""),

    assignedTo: yup
        .string()
        .required("Please select a user"),

    status: yup
        .string()
        .oneOf(
            ["todo", "in-progress", "done"],
            "Invalid status"
        )
        .required(),

});

export type TaskFormData = yup.InferType<typeof taskSchema>;