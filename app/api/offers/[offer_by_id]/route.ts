import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import OfferDb from "@/backend/models/Offer";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ offer_by_id: string }> }) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const p = await params;
    const offer_id = p.offer_by_id;

    const data = await OfferDb.findById(offer_id).populate("job");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
