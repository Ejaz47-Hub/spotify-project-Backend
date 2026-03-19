import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        console.error("Please ensure your MONGO_URI is properly configured in the .env file.");
        process.exit(1);
    }
}

export default connectDB;