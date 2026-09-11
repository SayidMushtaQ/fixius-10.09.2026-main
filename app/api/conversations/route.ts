import { addMessage, createConversation } from "@/backend/controllers/Coversation/CreateMessage";
import { getConversationsByUser } from "@/backend/controllers/Coversation/GetCoversation";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const response = await getConversationsByUser(token._id);
    return NextResponse.json({ message: "Los datos recuperan con éxito", response }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const sender = token._id;
    const body = await req.json();
    const { receiver, message } = body;
    if (!receiver) {
      return NextResponse.json({ message: "receptor no encontrado" }, { status: 400 });
    }

    const response = await createConversation(sender, receiver, message);
    return NextResponse.json({ message: "Conversación creada con éxito", response }, { status: 201 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const sender = token._id;
    const body = await req.json();
    let { convId, message } = body;
    message.sender = sender;

    if (!convId) {
      return NextResponse.json({ message: "Falta la identificación de la conversación" }, { status: 400 });
    }

    const response = await addMessage(convId, message);
    return NextResponse.json({ messag: "Mensaje enviado correctamente", response }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
