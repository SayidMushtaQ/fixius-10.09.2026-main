// Seed script to add sample subscription data
// Run with: npx ts-node scripts/seed-subscriptions.ts

import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// Subscription schema
const subscriptionSchema = new mongoose.Schema(
  {
    craftsmanId: {
      type: mongoose.Types.ObjectId,
      ref: "Craftsman",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",
      required: true,
    },
    paymentId: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    payment_details: {
      payment_method: {
        type: String,
        enum: ["paypal", "stripe", "bank_transfer"],
        required: true,
      },
      bank_details: {},
      paypal_details: {},
      stripe_details: {},
      card_details: {},
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive", "cencelled", "expired"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Plan schema
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration_in_days: { type: Number, required: true },
  description: { type: String, required: true },
});

// Craftsman schema (minimal)
const craftsmanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userDb", required: true },
  company_name: { type: String, required: true },
  current_subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
});

// Create models
const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
const Plans = mongoose.models.Plans || mongoose.model("Plans", planSchema);
const Craftsman =
  mongoose.models.Craftsman || mongoose.model("Craftsman", craftsmanSchema);

function generatePaymentId(): string {
  return "PAY-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function seedSubscriptions() {
  try {
    const mongoUri = process.env.NEXT_MONGO_URL;

    if (!mongoUri) {
      console.error("❌ NEXT_MONGO_URL not found in .env file");
      process.exit(1);
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Get all plans
    const plans = await Plans.find({});
    if (plans.length === 0) {
      console.error("❌ No plans found. Run seed-plans.ts first.");
      process.exit(1);
    }
    console.log(`ℹ️  Found ${plans.length} plans`);

    // Get all craftsmen
    const craftsmen = await Craftsman.find({}).limit(5);
    if (craftsmen.length === 0) {
      console.log(
        "⚠️  No craftsmen found in database. Creating sample subscriptions with dummy craftsman IDs..."
      );

      // Create dummy craftsman IDs for demo purposes
      const dummyCraftsmanIds = [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ];

      const now = new Date();
      const sampleSubscriptions = [
        {
          craftsmanId: dummyCraftsmanIds[0],
          plan: plans[0]._id, // Basic Plan
          paymentId: generatePaymentId(),
          start_date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          end_date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          payment_details: { payment_method: "bank_transfer" },
          payment_status: "paid",
          status: "active",
        },
        {
          craftsmanId: dummyCraftsmanIds[1],
          plan: plans[1]._id, // Standard Plan
          paymentId: generatePaymentId(),
          start_date: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
          end_date: new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000), // 120 days from now
          payment_details: { payment_method: "paypal" },
          payment_status: "paid",
          status: "active",
        },
        {
          craftsmanId: dummyCraftsmanIds[2],
          plan: plans[2]._id, // Premium Plan
          paymentId: generatePaymentId(),
          start_date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          end_date: new Date(now.getTime() + 350 * 24 * 60 * 60 * 1000), // 350 days from now
          payment_details: { payment_method: "stripe" },
          payment_status: "pending",
          status: "pending",
        },
      ];

      console.log("🔄 Seeding sample subscriptions...");
      await Subscription.insertMany(sampleSubscriptions);
      console.log("✅ Successfully seeded 3 sample subscriptions");
    } else {
      console.log(`ℹ️  Found ${craftsmen.length} craftsmen`);

      // Check existing subscriptions
      const existingCount = await Subscription.countDocuments({});
      if (existingCount > 0) {
        console.log(
          `⚠️  ${existingCount} subscriptions already exist. Skipping seed.`
        );
      } else {
        const now = new Date();
        const sampleSubscriptions = craftsmen
          .slice(0, 3)
          .map((craftsman: any, index: number) => ({
            craftsmanId: craftsman._id,
            plan: plans[index % plans.length]._id,
            paymentId: generatePaymentId(),
            start_date: new Date(
              now.getTime() - (index + 1) * 15 * 24 * 60 * 60 * 1000
            ),
            end_date: new Date(
              now.getTime() +
                plans[index % plans.length].duration_in_days *
                  24 *
                  60 *
                  60 *
                  1000
            ),
            payment_details: {
              payment_method: ["bank_transfer", "paypal", "stripe"][index],
            },
            payment_status: index < 2 ? "paid" : "pending",
            status: index < 2 ? "active" : "pending",
          }));

        console.log("🔄 Seeding subscriptions for existing craftsmen...");
        await Subscription.insertMany(sampleSubscriptions);
        console.log(
          `✅ Successfully seeded ${sampleSubscriptions.length} subscriptions`
        );
      }
    }

    // Show created subscriptions
    const allSubs = await Subscription.find({}).populate("plan");
    console.log("\n📋 Current subscriptions:");
    allSubs.forEach((sub: any) => {
      console.log(
        `   - ${sub.paymentId}: ${sub.plan?.name || "Unknown Plan"} | Status: ${
          sub.status
        } | Payment: ${sub.payment_status}`
      );
    });

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding subscriptions:", error);
    process.exit(1);
  }
}

seedSubscriptions();
