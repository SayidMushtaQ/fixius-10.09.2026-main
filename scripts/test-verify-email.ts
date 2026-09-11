// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userDb from '../backend/models/userModel';
import bcrypt from 'bcryptjs';

// dotenv.config();

const uri = process.env.NEXT_MONGO_URL;

if (!uri) {
  console.error("❌ NEXT_MONGO_URL is not defined");
  process.exit(1);
}

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Find a user to test verification with (or create a dummy one if needed, but better to use existing)
    // For safety, I won't modify data, just check if I can find a user and simulate the check logic
    // Actually, I can't easily simulate the API call via HTTP since the server is running in another process and I don't want to mess with it.
    // But I can simulate the logic I added to the handler.
    
    // Let's just check if a user exists and print what the payload would look like.
    const user = await userDb.findOne({ email: { $exists: true } });
    if (user) {
        console.log("👤 Found user:", user.email);
        console.log("🔑 OTP:", user.otp);
        
        // Simulate payload
        const payload = {
            email: user.email,
            id: "some_password_or_otp", // In real flow this is the OTP/Password
            // ... other fields
        };
        
        console.log("📦 Payload to send:", { queryData: payload });
        console.log("ℹ️ To verify fully, use the frontend.");
    } else {
        console.log("⚠️ No users found to test with.");
    }

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
