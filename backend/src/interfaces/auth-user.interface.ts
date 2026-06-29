import { Types } from "mongoose";
import UserRole from "../enums/role.enum";

export interface AuthUser {
    id: string;
    _id: Types.ObjectId;
    role: UserRole;
    name: string;
    email: string;
}