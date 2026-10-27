import mongoose from "mongoose";

const connectDB = async () => {
    const URI = process.env.MONGODB_URI;

    try {
        await mongoose.connect(URI);
        console.log("MongoDB CONNECTED");

    } catch (error) {
        console.error("MongoDB Connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;