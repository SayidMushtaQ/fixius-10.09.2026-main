import createJob from "@/backend/controllers/jobpost/createJob";
import { getUsersJobPost } from "@/backend/controllers/jobpost/getJobPost";
import { updateJobPost } from "@/backend/controllers/jobpost/updateJobPost";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import userDb from "@/backend/models/userModel";
import {
  checkRequiredQueryParamAppRouter,
  errorResponseAppRouter,
} from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    const { pageSize, pageNumber } = checkRequiredQueryParamAppRouter(req);
    if (token) {
      let targetUserId = token._id;
      const requestedUserId = req.nextUrl.searchParams.get("userId");

      if (requestedUserId) {
        const caller = await userDb.findById(token._id);
        if (caller && caller.role === "admin") {
          targetUserId = requestedUserId;
        }
      }

      const jobs = await getUsersJobPost(targetUserId, {
        pageSize,
        pageNumber,
      });
      return NextResponse.json({
        message: "Datos de trabajo recuperados con éxito",
        ...jobs,
      }, { status: 200 });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    return await createJob(req);
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token) {
      const id = req.nextUrl.searchParams.get("id");
      const body = await req.json();
      const response = await updateJobPost(id, body, token);

      return NextResponse.json({
        message: "Auftrag erfolgreich aktualisiert",
        response,
      }, { status: 200 });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
