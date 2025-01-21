import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/users_db";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
};