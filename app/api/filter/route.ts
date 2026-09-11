import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Filter from "@/backend/models/filterModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const filter = await Filter.findOne({ userId: token._id });
    return NextResponse.json(filter, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const updatedFilter = await Filter.findOneAndUpdate(
      { userId: token._id },
      body,
      { new: true, upsert: true }
    );
    if (!updatedFilter) {
      return NextResponse.json({ error: "Filtro no encontrado" }, { status: 404 });
    }
    return NextResponse.json(updatedFilter, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return errorResponseAppRouter(error);
  }
}
