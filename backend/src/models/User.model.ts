import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../interfaces/user.interface";
import UserRole from "../enums/role.enum";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
        token: {
            type: String,
            default: null,
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);



userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword =

    async function (password: string) {

        console.log("Entered Password:", password);
        console.log("Stored Password:", this.password);

        const matched = await bcrypt.compare(password, this.password);

        console.log("Matched:", matched);

        return matched;

    };

const User = mongoose.model<IUser>(
    "User",
    userSchema
);

export default User;