import api from "../api/axios";
import type { User } from "../types/user.types";

interface UserResponse {

    success: boolean;

    message: string;

    data: User[];

}

const userService = {

    getUsers: async () => {

        const { data } =
            await api.get<UserResponse>("/users");

        return data;

    },

};

export default userService;