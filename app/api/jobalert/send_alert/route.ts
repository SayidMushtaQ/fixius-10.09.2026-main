import { findMatchingJobsAndSendEmail } from "@/backend/controllers/JobAlert/matchJobs";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    return await findMatchingJobsAndSendEmail(req);
  } catch (error: any) {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
