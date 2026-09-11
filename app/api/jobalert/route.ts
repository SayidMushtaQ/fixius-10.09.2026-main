import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import JobAlert from "@/backend/models/JobAlert";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const jobAlerts = await JobAlert.findOne({ userId: token._id });
    return NextResponse.json(jobAlerts, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updatedJobAlert = await JobAlert.findOneAndUpdate(
      { userId: token._id },
      body,
      { new: true }
    );
    if (!updatedJobAlert) {
      return NextResponse.json({ message: "Alerta de trabajo no encontrada" }, { status: 404 });
    }
    return NextResponse.json(updatedJobAlert, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
