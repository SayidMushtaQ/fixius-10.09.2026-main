import { connectDb } from "@/backend/middleware/db";
import Craftman from "@/backend/models/CrafstmanModel";
import Review from "@/backend/models/ReviewModel";
import userDb from "@/backend/models/userModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ company: string }> }) {
  try {
    await connectDb();
    const { company } = await params;
    
    const craftMan = await Craftman.findOne({ company_name: company })
      .populate({
        path: "user",
        model: userDb,
        select: "name lastName phone zipCode profile_photo streetAddress address",
      })
      .populate({
        path: "reviews",
        model: Review,
        match: { status: "active" },
      })
      .exec();

    if (craftMan) {
      return NextResponse.json(craftMan, { status: 200 });
    }
    return NextResponse.json({ message: "Craftman not exist" }, { status: 404 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
