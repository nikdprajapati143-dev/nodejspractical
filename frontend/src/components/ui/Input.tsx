import { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        {...props}
        className={clsx(
          "w-full rounded-lg border px-4 py-3 outline-none transition",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500",
        )}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
