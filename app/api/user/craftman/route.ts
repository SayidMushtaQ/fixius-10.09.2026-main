import GetCraftManByUserId from "@/backend/controllers/craftsman/GetCraftsman";
import updateCraftman from "@/backend/controllers/craftsman/updateCraftman";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import userDb from "@/backend/models/userModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const userId = req.nextUrl.searchParams.get("userId") as string;
    const response = await GetCraftManByUserId(userId);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    return await updateCraftman(req as any, null as any);
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = token._id;
    await Craftsman.deleteOne({ user: userId });
    await userDb.deleteOne({ _id: userId });
    
    return NextResponse.json({ message: "User Deleted Successfully" }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
