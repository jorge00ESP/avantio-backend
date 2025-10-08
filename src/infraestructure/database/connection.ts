import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToMongo(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connection database succesfully');
  } catch (error) {
    console.error('Error making connnection to database', error);
    process.exit(1); 
  }
}