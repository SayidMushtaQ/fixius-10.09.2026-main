import mongoose, { ConnectOptions } from "mongoose";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

// Define a cache to store the connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Ensure MONGO_URL is defined
const MONGODB_URI: string = process.env.NEXT_MONGO_URL as string;
if (!MONGODB_URI) {
  throw new Error("Please define the NEXT_MONGO_URL environment variable in .env");
}

// Use global object to persist connection in dev mode
declare global {
  var mongoose: MongooseCache | undefined;
}

// Create a cache object
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("📡 Connecting to MongoDB...");
    const options: ConnectOptions = {
      bufferCommands: false, // Avoids queueing commands before connection
      maxPoolSize: 10, // Efficient concurrent connections
      serverSelectionTimeoutMS: 5000, // Avoids long delays on connection errors
      socketTimeoutMS: 45000, // Keeps connections alive for a reasonable time
      family: 4, // Forces IPv4 for compatibility
    };

    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Middleware to wrap API routes with DB connection
const connectDbMiddleware =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectDb(); // Ensure DB connection before handling request
      return handler(req, res);
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ error: "Database connection failed" });
    }
  };

// Store the cached connection in the global scope for hot reloads in development
global.mongoose = cached;

export default connectDbMiddleware;
