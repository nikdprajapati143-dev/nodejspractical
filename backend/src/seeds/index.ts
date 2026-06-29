import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDatabase from "../config/database";

import { seedUsers } from "./user.seed";

async function main() {
    try {
        await connectDatabase();

        // Run seeders in order
        await seedUsers();

        // await seedPermissions();
        // await seedTasks();

        console.log("Seeding completed");
    } catch (error) {
        console.error("Seeding failed");
        console.error(error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

main();