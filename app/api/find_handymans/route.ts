import { searchHandymen } from "@/backend/controllers/user/searchHandymen";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const service = req.nextUrl.searchParams.get("service");
    const city = req.nextUrl.searchParams.get("city");
    const pageSize = Number(req.nextUrl.searchParams.get("pageSize")) || 10;
    const pageNumber = Number(req.nextUrl.searchParams.get("pageNumber")) || 1;
    const minRating = req.nextUrl.searchParams.get("rating") || undefined;
    const distance = Number(req.nextUrl.searchParams.get("distance"));

    if (!service) {
      return NextResponse.json({ message: "missing service" }, { status: 400 });
    }

    if (!city) {
      return NextResponse.json({ message: "missing city" }, { status: 400 });
    }

    const result = await searchHandymen({
      service,
      city,
      pageSize,
      pageNumber,
      rating: minRating,
      distance,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error in find_handymans API:", error);
    return errorResponseAppRouter(error);
  }
}
