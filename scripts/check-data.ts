// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PostalCode from '../backend/models/PostalCode';

// dotenv.config();

const uri = process.env.NEXT_MONGO_URL;

if (!uri) {
  console.error("❌ NEXT_MONGO_URL is not defined");
  process.exit(1);
}

console.log(`📡 Connecting to: ${uri.split('@')[1]}`); // Hide credentials

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📂 Database Name: ${dbName}`);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📚 Collections found:");
    collections.forEach(c => console.log(` - ${c.name}`));

    const count = await PostalCode.countDocuments();
    console.log(`🔢 Documents in PostalCode model: ${count}`);

    if (count === 0) {
      console.log("⚠️ No documents found! Checking raw 'postalcodes' collection...");
      const rawCount = await mongoose.connection.db.collection('postalcodes').countDocuments();
      console.log(`🔢 Raw 'postalcodes' count: ${rawCount}`);
    } else {
      const sample = await PostalCode.findOne();
      console.log("📄 Sample Document:", JSON.stringify(sample, null, 2));
    }

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
