// Seed script to add subscription plans to the database
// Run with: npx ts-node scripts/seed-plans.ts

import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// Plan schema interface
interface IPlan {
  name: string;
  price: number;
  duration_in_days: number;
  description: string;
}

// Define the schema
const planSchema = new mongoose.Schema<IPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration_in_days: { type: Number, required: true },
  description: { type: String, required: true },
});

// Create model
const Plans =
  mongoose.models.Plans || mongoose.model<IPlan>("Plans", planSchema);

// Default plans to seed
const defaultPlans: IPlan[] = [
  {
    name: "Basic Plan",
    price: 10,
    duration_in_days: 90,
    description: "Basic subscription plan for 90 days",
  },
  {
    name: "Standard Plan",
    price: 50,
    duration_in_days: 180,
    description: "Standard subscription plan for 180 days",
  },
  {
    name: "Premium Plan",
    price: 90,
    duration_in_days: 360,
    description: "Premium subscription plan for 360 days",
  },
];

async function seedPlans() {
  try {
    const mongoUri = process.env.NEXT_MONGO_URL;

    if (!mongoUri) {
      console.error("❌ NEXT_MONGO_URL not found in .env file");
      process.exit(1);
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Check if plans already exist
    const existingPlans = await Plans.find({});

    if (existingPlans.length > 0) {
      console.log(`ℹ️  Found ${existingPlans.length} existing plans:`);
      existingPlans.forEach((plan: any) => {
        console.log(
          `   - ${plan.name}: €${plan.price} (${plan.duration_in_days} days)`
        );
      });
      console.log(
        "⚠️  Skipping seed - plans already exist. Delete them first if you want to re-seed."
      );
    } else {
      console.log("🔄 Seeding plans...");
      await Plans.insertMany(defaultPlans);
      console.log("✅ Successfully seeded 3 subscription plans:");
      defaultPlans.forEach((plan) => {
        console.log(
          `   - ${plan.name}: €${plan.price} (${plan.duration_in_days} days)`
        );
      });
    }

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding plans:", error);
    process.exit(1);
  }
}

seedPlans();
