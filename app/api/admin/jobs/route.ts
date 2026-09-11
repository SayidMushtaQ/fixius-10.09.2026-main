import { setJobPostBlocked } from "@/backend/controllers/jobpost/blockJobPost";
import {
  AdminJobFilter,
  getAllJobPosts,
} from "@/backend/controllers/jobpost/getAllJobPosts";
import { connectDb } from "@/backend/middleware/db";
import { requireAdmin } from "@/backend/middleware/requireAdmin";
import {
  checkRequiredQueryParamAppRouter,
  createError,
  errorResponseAppRouter,
} from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_FILTERS: AdminJobFilter[] = ["all", "blocked", "active"];
const MAX_REASON_LENGTH = 500;

// List every ad on the platform, blocked ones included.
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    await requireAdmin(req);

    const { pageSize, pageNumber } = checkRequiredQueryParamAppRouter(req);
    const search = req.nextUrl.searchParams.get("search") || "";
    const requestedFilter = (req.nextUrl.searchParams.get("filter") ||
      "all") as AdminJobFilter;
    const filter = ALLOWED_FILTERS.includes(requestedFilter)
      ? requestedFilter
      : "all";

    const jobs = await getAllJobPosts({ pageSize, pageNumber, search, filter });

    return NextResponse.json(
      { message: "Anzeigen erfolgreich abgerufen", ...jobs },
      { status: 200 },
    );
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

// Block / unblock a single ad.
export async function PATCH(req: NextRequest) {
  try {
    await connectDb();
    const admin = await requireAdmin(req);

    const body = await req.json();
    const { id, blocked, reason } = body ?? {};

    if (!id || typeof id !== "string") {
      createError("`id` ist erforderlich", 400);
    }
    if (typeof blocked !== "boolean") {
      createError("`blocked` muss true oder false sein", 400);
    }
    if (reason !== undefined && typeof reason !== "string") {
      createError("`reason` muss ein Text sein", 400);
    }
    if (typeof reason === "string" && reason.length > MAX_REASON_LENGTH) {
      createError(
        `Die Begründung darf höchstens ${MAX_REASON_LENGTH} Zeichen lang sein`,
        400,
      );
    }

    const job = await setJobPostBlocked(id, {
      blocked,
      reason,
      adminId: String(admin._id),
    });

    return NextResponse.json(
      {
        message: blocked
          ? "Anzeige wurde gesperrt"
          : "Anzeige wurde wieder freigegeben",
        data: job,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
