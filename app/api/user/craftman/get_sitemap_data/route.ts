import { connectDb } from "@/backend/middleware/db";
import Craftsman from "@/backend/models/CrafstmanModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const agrr = [
      { $match: { status: "verified" } },
      {
        $lookup: {
          from: "userdbs",
          let: { userId: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            { $project: { _id: 0, active_status: 1 } },
          ],
          as: "userArray",
        },
      },
      { $addFields: { user: { $arrayElemAt: ["$userArray", 0] } } },
      { $match: { "user.active_status": "active" } },
      { $project: { company_name: 1, updatedAt: 1 } },
    ];

    const response = await Craftsman.aggregate(agrr);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
