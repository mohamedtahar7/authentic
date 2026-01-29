import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("Please define DATABASE_URL in your .env file");
}

// Global cache (important for Next.js dev mode)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "authentic", // optional but recommended
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
