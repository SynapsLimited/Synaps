// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
};
