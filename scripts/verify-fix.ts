// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PostalCode from '../backend/models/PostalCode';

// dotenv.config();

const uri = process.env.NEXT_MONGO_URL;

if (!uri) {
  console.error("❌ NEXT_MONGO_URL is not defined");
  process.exit(1);
}

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Simulate the controller logic for empty search
    console.log("🔄 Simulating empty search request...");
    const postalCodes = await PostalCode.find({}).limit(20);
    
    console.log(`✅ Found ${postalCodes.length} postal codes`);
    if (postalCodes.length > 0) {
      console.log("📄 First item:", JSON.stringify(postalCodes[0], null, 2));
    } else {
      console.error("❌ No postal codes found (unexpected)");
    }

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
