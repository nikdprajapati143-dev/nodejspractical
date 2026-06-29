import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("mongo url:", process.env.MONGO_URI);

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is missing");
        }

        await mongoose.connect(mongoURI);

        console.log(" MongoDB Connected");
    } catch (error) {
        console.error(" MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;