import Plans from "@/backend/models/Plan";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "admin") return NextResponse.json({ message: "invalid request" }, { status: 401 });

    const body = await req.json();
    const isInputs = Object.values(body).every((i: any, ind, arr) => i && arr.length === 3);

    if (!isInputs) return NextResponse.json({ message: "required params is missing" }, { status: 400 });
    
    const newPlan = new Plans(body);
    await newPlan.save();
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const requestType = req.nextUrl.searchParams.get("requestType");
    let plan = null;

    if (requestType === "get_by_id") {
      const planId = req.nextUrl.searchParams.get("planId");
      if (!planId) return NextResponse.json({ message: "se requiere planid" }, { status: 400 });
      plan = await Plans.findById(planId);
    }

    if (requestType === "all") {
      plan = await Plans.find();
    }
    
    if (!plan) return NextResponse.json({ message: "Plan no encontrado" }, { status: 404 });
    return NextResponse.json(plan, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "admin") return NextResponse.json({ message: "invalid request" }, { status: 401 });

    const planId = req.nextUrl.searchParams.get("planId");
    const payload = await req.json();
    
    const isInputs = Object.values(payload).some((i: any, ind, arr) => i && arr.length === 3);
    if (!isInputs || !planId) return NextResponse.json({ message: "required params is missing" }, { status: 400 });

    const updatedPlan = await Plans.findByIdAndUpdate(planId, payload, { new: true });
    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "admin") return NextResponse.json({ message: "invalid request" }, { status: 401 });

    const planId = req.nextUrl.searchParams.get("planId");
    if (!planId) return NextResponse.json({ message: "required params are missing" }, { status: 400 });

    const deletedPlan = await Plans.findByIdAndDelete(planId);
    return NextResponse.json(deletedPlan, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
