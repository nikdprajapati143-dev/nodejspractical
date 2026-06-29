import { Document } from "mongoose";
import UserRole from "../enums/role.enum";

export interface IUser extends Document {
    name: string;

    email: string;

    password: string;

    role: UserRole;

    comparePassword(password: string): Promise<boolean>;
}