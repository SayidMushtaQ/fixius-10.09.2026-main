import Plans from "@/backend/models/Plan";
import { connectDb } from "@/backend/middleware/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    
    // Clear existing plans to allow re-seeding with updated prices
    await Plans.deleteMany({});

    const defaultPlans = [
      {
        name: "Starter Tarif",
        price: 0,
        duration_in_days: 7,
        description: "Perfekt für den Einstieg."
      },
      {
        name: "Pro Tarif",
        price: 0,
        duration_in_days: 14,
        description: "Für wachsende Handwerksbetriebe."
      },
      {
        name: "Premium Tarif",
        price: 0,
        duration_in_days: 30,
        description: "Maximale Sichtbarkeit und Aufträge."
      }
    ];

    for (const p of defaultPlans) {
      const newPlan = new Plans(p);
      await newPlan.save();
    }

    return NextResponse.json({ message: "Seeded 3 free plans successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
