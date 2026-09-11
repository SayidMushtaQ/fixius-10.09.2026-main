import { connectDb } from "@/backend/middleware/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    return NextResponse.json({ message: "Not Implemented" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    return NextResponse.json({ message: "Not Implemented" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
