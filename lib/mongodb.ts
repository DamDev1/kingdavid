import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectMongo;
