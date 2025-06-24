import mongoose from "mongoose";

let isConnected = false;
export const connectToMDB = async () => {
    mongoose.set('strictQuery', true)
    if (!process.env.MONGODB_URL) {
        return console.log("mongodb url not found");
    }
    if (isConnected) return console.log("Mogodb is already connected");
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected  = true;
        console.log("connected to Mongodb");
        
    } catch (error) {
        console.log(error);
        
    }
}