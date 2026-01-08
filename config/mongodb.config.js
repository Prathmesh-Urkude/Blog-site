import mongoose from "mongoose";

const connectMongoDb = async (url) => {
    try {
        await mongoose.connect(url); 
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectMongoDb;