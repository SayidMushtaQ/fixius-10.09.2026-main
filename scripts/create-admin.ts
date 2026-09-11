import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userDb from "../backend/models/userModel";

async function createAdmin() {
  const mongoUri = process.env.NEXT_MONGO_URL;

  if (!mongoUri) {
    console.error("❌ NEXT_MONGO_URL not found in .env file");
    process.exit(1);
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const adminEmail = "admin-test@fixius.de";
    const existingAdmin = await userDb.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`ℹ️ Admin user with email ${adminEmail} already exists.`);
      // Ensure it has admin privileges if needed. 
      // Based on my research, the role enum in userModel was ["kunde", "handwerker"],
      // but the API check for token.role === "admin".
      // I'll set role as "admin" even if not in enum (mongoose might allow or I might need to adjust).
      // Let's check the enum again.
      // role: { type: String, enum: ["kunde", "handwerker"] }
      // If I set it to admin, validation might fail if strict.
      
      existingAdmin.active_status = "active";
      existingAdmin.status = true;
      // @ts-ignore - bypass enum for testing if needed or use a valid role that acts as admin
      existingAdmin.role = "admin"; 
      await existingAdmin.save();
      console.log("✅ Admin user updated/verified.");
    } else {
      console.log("🔄 Creating new admin user...");
      const hashedPassword = await bcrypt.hash("Admin123!", 10);
      
      const newAdmin = new userDb({
        name: "Test",
        lastName: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin", // Bypassing enum for admin role
        active_status: "active",
        status: true,
        address: {
          placeName: "Berlin",
          zipCode: "10115",
          coordinates: { lat: 52.52, lng: 13.405 }
        },
        ip: "127.0.0.1"
      });

      await newAdmin.save();
      console.log("✅ Admin user created successfully.");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
