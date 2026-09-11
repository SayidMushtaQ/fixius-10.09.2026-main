import { connectDb } from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const users = await userDb.find({ role: "handwerker" }).limit(5).select("email");
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
