import User from "../models/User.model";
import UserRole from "../enums/role.enum";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
    console.log("Seeding Users...");

    await User.deleteMany({});

    await User.create([
        {
            name: "Super Admin",
            email: "superadmin@test.com",
            password: "12345678",
            role: UserRole.ADMIN,
        },
        {
            name: "John Doe",
            email: "john@test.com",
            password: "12345678",
            role: UserRole.USER,
        },
        {
            name: "Niks Prajapati",
            email: "niksprajapati@test.com",
            password: "12345678",
            role: UserRole.USER,
        },
    ]);

    console.log("Users Seeded");
};