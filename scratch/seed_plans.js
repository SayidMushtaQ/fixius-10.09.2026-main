const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration_in_days: { type: Number, required: true, min: 1, max: 30 },
  description: { type: String, required: true },
});

const Plans = mongoose.models.Plans || mongoose.model('Plans', planSchema);

async function seedPlans() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");

    const count = await Plans.countDocuments();
    if (count > 0) {
      console.log(`There are already ${count} plans in the database.`);
    }

    // Always clear and re-seed for testing
    await Plans.deleteMany({});

    const defaultPlans = [
      {
        name: "Starter Tarif",
        price: 9.99,
        duration_in_days: 7,
        description: "Perfekt für den Einstieg."
      },
      {
        name: "Pro Tarif",
        price: 29.99,
        duration_in_days: 14,
        description: "Für wachsende Handwerksbetriebe."
      },
      {
        name: "Premium Tarif",
        price: 49.99,
        duration_in_days: 30,
        description: "Maximale Sichtbarkeit und Aufträge."
      }
    ];

    for (const p of defaultPlans) {
      const newPlan = new Plans(p);
      await newPlan.save();
      console.log(`Created plan: ${p.name}`);
    }

    console.log("Finished seeding plans.");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedPlans();
