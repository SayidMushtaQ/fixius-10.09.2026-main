import { createApproval } from "@/backend/controllers/Approval";
import { updateUserById } from "@/backend/controllers/user/updateUser";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Notification from "@/backend/models/Notifications";
import Craftsman from "@/backend/models/CrafstmanModel";
import userDb from "@/backend/models/userModel";
import { createError, errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const email = req.nextUrl.searchParams.get("email");
    const _id = req.nextUrl.searchParams.get("_id");
    const query: any[] = [];
    if (email) query.push({ email });
    if (_id && _id !== "null") query.push({ _id });

    if (query.length === 0) {
      return NextResponse.json({ message: "missing required params" }, { status: 404 });
    }

    const user = await userDb
      .findOne({ $or: query })
      .select("-accessToken -refreshToken -password -otp")
      .populate({
        path: "craftsman",
        model: Craftsman,
      });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ message: "usuario no encontrado" }, { status: 404 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const token = verifyToken(req);

    if (token) {
      let userId = token._id;
      if (token.role === "admin") {
        userId = payload.user;
        delete payload.user;
      }

      const response = await updateUserById(userId, payload);

      if (token?.role === "admin") {
        const Noti = {
          userId: response._id,
          type: "verification",
          content: {
            text:
              response.active_status === "active"
                ? `Un administrador hizo su cuenta activa`
                : `Un administrador inactivó su cuenta. Comuníquese con nosotros para cualquier consulta.`,
            senderName: "",
            link: "/dashboard/handwerker/",
          },
        };

        await Notification.create(Noti);

        createApproval({
          approver: token._id,
          requested_user: response._id,
          approval_action: response.active_status,
        });
      }

      return NextResponse.json({
        message: "Daten erfolgreich aktualisiert",
        user: response,
      }, { status: 200 });
    }
    return NextResponse.json({ message: "Token no válido" }, { status: 401 });
  } catch (error: any) {
    console.log(error);
    return errorResponseAppRouter(error);
  }
}
