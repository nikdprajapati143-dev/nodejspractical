import dotenv from "dotenv";
dotenv.config();
import http from "http";

import app from "./app";

import connectDB from "./config/database";
import { env } from "./config/env";
import { initSocket } from "./socket/socket";


const PORT = env.PORT || 5000;

const startServer = async () => {
    try {

        // MongoDB Connection
        await connectDB();

        // HTTP Server
        const server = http.createServer(app);
        // Initialize Socket.io
        console.log("Initializing Socket.io");
        initSocket(server);

        server.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();