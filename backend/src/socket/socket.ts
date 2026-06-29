import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {

        console.log("Socket Connected :", socket.id);

        socket.on("join", (userId: string) => {

            socket.join(userId);

            console.log(`User ${userId} joined room`);

            console.log(socket.rooms);

        });

        socket.on("disconnect", () => {

            console.log("Socket Disconnected :", socket.id);

        });

    });
};

export const getIO = () => io;