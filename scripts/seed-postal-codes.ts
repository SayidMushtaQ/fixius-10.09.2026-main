// Seed script to populate the PostalCode collection with German postal code data
// (Postal_Code, Place_Name, Admin_Name/state, Latitude, Longitude). This data is
// what powers the per-state sitemap generation (scripts/generate-sitemaps.ts) and
// the location/geo JSON-LD schema (lib/serviceSchemas.ts).
// Run with: npm run seed:postal-codes

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import PostalCode from "../backend/models/PostalCode";

interface RawEntry {
  CountryCode: string;
  Postal_Code: number;
  Place_Name: string;
  Admin_Name: string;
  Admin_Code: string;
  Latitude: number;
  Longitude: number;
}

async function seedPostalCodes() {
  try {
    const mongoUri = process.env.NEXT_MONGO_URL;

    if (!mongoUri) {
      console.error("❌ NEXT_MONGO_URL not found in .env file");
      process.exit(1);
    }

    const dataPath = path.join(__dirname, "data", "Postal_Codes_Germany.json");
    const raw = JSON.parse(fs.readFileSync(dataPath, "utf8")) as {
      results: RawEntry[];
    };

    console.log(`📄 Loaded ${raw.results.length} postal code entries from file`);

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const existingCount = await PostalCode.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️  Found ${existingCount} existing PostalCode documents. Skipping seed - delete them first if you want to re-seed.`,
      );
      await mongoose.disconnect();
      process.exit(0);
    }

    const docs = raw.results.map((entry) => ({
      Postal_Code: entry.Postal_Code,
      Place_Name: entry.Place_Name,
      Latitude: entry.Latitude,
      Longitude: entry.Longitude,
      location: {
        type: "Point",
        coordinates: [entry.Longitude, entry.Latitude],
      },
      Admin_Name: entry.Admin_Name,
      Admin_Code: entry.Admin_Code,
      CountryCode: entry.CountryCode,
    }));

    console.log(`🔄 Inserting ${docs.length} postal codes...`);
    const result = await PostalCode.insertMany(docs, { ordered: false });
    console.log(`✅ Successfully seeded ${result.length} postal codes`);

    const states = await PostalCode.distinct("Admin_Name");
    console.log(`📍 Covering ${states.length} states: ${states.join(", ")}`);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding postal codes:", error);
    process.exit(1);
  }
}

seedPostalCodes();
