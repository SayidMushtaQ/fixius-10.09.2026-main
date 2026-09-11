// import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

// dotenv.config();

const uri = process.env.NEXT_MONGO_URL;

if (!uri) {
  console.error("❌ NEXT_MONGO_URL is not defined in process.env");
  process.exit(1);
}

console.log(`✅ NEXT_MONGO_URL is defined (starts with ${uri.substring(0, 15)}...)`);

const options: ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

console.log("📡 Attempting to connect to MongoDB with APP OPTIONS...");
console.log("Options:", JSON.stringify(options, null, 2));

mongoose.set("strictQuery", true);

mongoose.connect(uri, options)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB with app options");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB with app options:", err);
    process.exit(1);
  });
