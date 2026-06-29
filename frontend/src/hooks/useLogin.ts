import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export default function useLogin() {

    const navigate = useNavigate();

    const loginStore =
        useAuthStore((state) => state.login);

    return useMutation({

        mutationFn: authService.login,

        onSuccess: (response) => {

            loginStore(
                response.data.token,
                response.data.user
            );

            toast.success(response.message);

            /*if (
                response.data.user.role === "admin"
            ) {

                navigate("/admin/dashboard");

            } else {

                navigate("/dashboard");

            }*/
            if (response.data.user.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }

        },

        onError: (error: any) => {

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        },

    });

}