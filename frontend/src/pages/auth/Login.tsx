import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginSchema } from "../../validations/auth.validation";
import type { LoginPayload } from "../../types/auth.types";

import useLogin from "../../hooks/useLogin";

export default function Login() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">Task Management</h1>

        <p className="mb-8 text-center text-gray-500">Login to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter email"
            {...register("email")}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
            error={errors.password}
          />

          <Button type="submit" loading={loginMutation.isPending}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
