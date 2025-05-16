import mongoose from 'mongoose'

const connectToDatabase = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/Empora';
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to MongoDB successfully');
    } catch(error){
        console.error('MongoDB connection error:', error);
        throw error; // Rethrow to handle it in the main application
    }
}

export default connectToDatabase;