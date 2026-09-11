import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDb();
    const { id } = await params;
    const postalCode = await PostalCode.findById(id);
    if (!postalCode) {
      return NextResponse.json({ message: "Código postal no encontrado" }, { status: 404 });
    }
    return NextResponse.json(postalCode, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDb();
    const { id } = await params;
    const body = await req.json();
    const updatedPostalCode = await PostalCode.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedPostalCode) {
      return NextResponse.json({ message: "Código postal no encontrado" }, { status: 404 });
    }
    return NextResponse.json(updatedPostalCode, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDb();
    const { id } = await params;
    const deletedPostalCode = await PostalCode.findByIdAndDelete(id);
    
    if (!deletedPostalCode) {
      return NextResponse.json({ message: "Código postal no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ message: "Código postal eliminado con éxito" }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
