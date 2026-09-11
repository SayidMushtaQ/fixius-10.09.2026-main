import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Feedback from "@/backend/models/Feedback";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const { name, email, type, rating, message, images } = payload;

    if (!message) {
      return NextResponse.json({ message: "Feedback-Nachricht ist erforderlich." }, { status: 400 });
    }

    const feedback = await Feedback.create({
      name,
      email,
      type,
      rating,
      message,
      images,
    });

    return NextResponse.json({ message: "Feedback erfolgreich gesendet!", data: feedback }, { status: 200 });
  } catch (error: any) {
    console.error("Feedback POST API error:", error);
    return NextResponse.json({ message: "Fehler beim Senden des Feedbacks." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);

    if (!token || token.role !== "admin") {
      return NextResponse.json({ message: "Zugriff verweigert. Nur Administratoren." }, { status: 403 });
    }

    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error: any) {
    console.error("Feedback GET API error:", error);
    return NextResponse.json({ message: "Fehler beim Laden des Feedbacks." }, { status: 500 });
  }
}
