import { connectDb } from "@/backend/middleware/db";
import JobPost from "@/backend/models/NewJob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const sortedData = payload.data || [];

    const allJobData = await JobPost.find({
      status: "open",
      isBlocked: { $ne: true },
    }).sort({
      createdAt: -1,
    }).lean();

    if (sortedData.length === 0) {
      return NextResponse.json({ data: allJobData }, { status: 200 });
    }

    const filteredData = allJobData.filter((data: any) =>
      sortedData.some((category: string) =>
        data.category?.includes(category)
      )
    );

    return NextResponse.json({ data: filteredData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No se pudo obtener datos" }, { status: 500 });
  }
}
