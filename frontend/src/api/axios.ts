import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { storage } from "../utils/storage";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = storage.getToken();
        // console.log("Token from storage:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // console.log("Authorization Header:", config.headers.Authorization);

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            storage.removeToken();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;