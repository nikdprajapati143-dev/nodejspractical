import dotenv from "dotenv";
dotenv.config();

import { generateToken, verifyToken } from "./utils/jwt";

const token = generateToken({
    id: "123",
    role: "admin",
});

console.log(token);

console.log(verifyToken(token));