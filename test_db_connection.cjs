const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.NEXT_MONGO_URL || "";

async function testConnection() {
  console.log(`Connecting to: ${MONGODB_URI.split('@')[1]}`); // Hide credentials
  const options = {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  };

  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log("✅ Connection SUCCESS!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Connection FAILED!");
    console.error(err);
  }
}

testConnection();
