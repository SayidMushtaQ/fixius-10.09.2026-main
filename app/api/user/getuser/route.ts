import { getUsers } from "@/backend/controllers/user/getUser";
import { connectDb } from "@/backend/middleware/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    // Safely extract query parameters natively
    const { searchParams } = new URL(req.url);
    const query = {
      pageNumber: searchParams.get("pageNumber") || undefined,
      pageSize: searchParams.get("pageSize") || undefined,
      search: searchParams.get("search") || undefined,
      role: searchParams.get("role") || undefined,
    };

    // Construct Express-compatible request and response adaptors
    const mockExpressReq = Object.assign(req, { query }) as any;

    let responseData: any = null;
    let responseStatus = 200;

    const mockExpressRes = {
      status(code: number) {
        responseStatus = code;
        return this;
      },
      json(data: any) {
        responseData = data;
        return this;
      }
    } as any;

    // Call the legacy Express-style controller
    await getUsers(mockExpressReq, mockExpressRes);

    if (responseData) {
      return NextResponse.json(responseData, { status: responseStatus });
    } else {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
