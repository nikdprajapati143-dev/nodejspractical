import api from "../api/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";


export const authService = {
    login: async (payload: LoginPayload) => {

        const response = await api.post<LoginResponse>("/auth/login", payload);
        return response.data;

    },

    // profile: () => {
    //     return api.get("/auth/profile");
    // },
};

export default authService;