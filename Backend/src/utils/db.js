import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;