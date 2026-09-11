// app/api/notifications/route.ts
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { connectDb } from "@/backend/middleware/db";
import { NextRequest, NextResponse } from "next/server";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "@/backend/controllers/Notifications/index";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const pageSize = Number(req.nextUrl.searchParams.get("pageSize")) || 10;
    const pageNumber = Number(req.nextUrl.searchParams.get("pageNumber")) || 1;
    
    const notifications = await getAllNotifications(token._id, pageSize, pageNumber);
    return NextResponse.json({
      message: "notification retrived",
      ...notifications,
    }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { receiver, type, content } = body;
    
    const notification = await createNotification(receiver, type, content);
    return NextResponse.json(notification, { status: 201 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.searchParams.get("id");
    let notification: any = {};
    if (id) {
      notification = await markNotificationAsRead(id);
    } else {
      notification = await markAllNotificationAsRead(token._id);
    }
    return NextResponse.json(notification, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    await deleteNotification(id);
    return NextResponse.json({ message: "Notification deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
