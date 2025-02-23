import mongoose from "mongoose";
import { config } from "../config/env.ts";

export const connectToDB = async () => {
    try {
        await mongoose.connect(config.env.DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};
