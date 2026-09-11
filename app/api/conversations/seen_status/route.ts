import { updateSeenStataus } from "@/backend/controllers/Coversation/CreateMessage";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const sender = token._id;
    const body = await req.json();
    let { convId } = body;

    if (!convId) {
      return NextResponse.json({ message: "Falta la identificación de la conversación" }, { status: 400 });
    }

    const response = await updateSeenStataus(sender, convId);
    return NextResponse.json({ messag: "Estado visto actualizado", response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
