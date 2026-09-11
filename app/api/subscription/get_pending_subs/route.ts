import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized: Missing token" }, { status: 401 });

    if (token?.role === "client" || token?.role === "kunde") {
      return NextResponse.json({ message: "Unauthorized: Invalid role" }, { status: 401 });
    }

    const pendingSubscription = await Subscription.findOne({
      payment_status: "pending",
      craftsmanId: token?.craftsman,
    }).populate({ path: "plan", model: Plans });

    return NextResponse.json(pendingSubscription, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
