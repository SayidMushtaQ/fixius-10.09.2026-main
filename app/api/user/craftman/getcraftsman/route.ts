import { GetCraftsmans } from "@/backend/controllers/craftsman/GetCraftsman";
import { connectDb } from "@/backend/middleware/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    return await GetCraftsmans(req as any, null as any);
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
