import express from "express";
import cors from "cors";

import errorMiddleware from "./middleware/error.middleware";
import ApiError from "./utils/ApiError";
import authRoutes from "./routes/auth.route";
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Management API Running Successfully",
    });
});



app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api/auth/", authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
    next(new ApiError(404, "Route Not Found"));
});



app.use(errorMiddleware);

export default app;


