import { z } from "zod";

export const loginSchema = z.object({
    body: z.object({

        email: z
            .string()
            .min(1, "Email is required"),
        password: z.string().trim()
            .refine(
                (value) => value.length > 0,
                {
                    message: "Password is required",
                }
            )
            .refine(
                (value) =>
                    value.length >= 8 ||
                    value.length === 0,
                {
                    message:
                        "Password must be at least 8 characters",
                }
            ),
    }),
});

export default { loginSchema };
