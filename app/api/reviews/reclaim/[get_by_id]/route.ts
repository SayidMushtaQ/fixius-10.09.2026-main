import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { Reclaim } from "@/backend/models/ReviewModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ get_by_id: string }> }) {
  try {
    await connectDb();
    const { get_by_id } = await params;
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reclaimId = get_by_id;
    const reclaim = await Reclaim.findById(reclaimId);
    return NextResponse.json(reclaim, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
