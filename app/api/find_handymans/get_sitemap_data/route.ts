import { connectDb } from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const result = await userDb.aggregate([
      { $match: { role: "handwerker" } },
      {
        $group: {
          _id: {
            zip: "$address.zipCode",
            city: "$address.placeName",
          },
        },
      },
      {
        $project: {
          _id: 0,
          Postal_Code: "$_id.zip",
          Place_Name: "$_id.city",
        },
      },
    ]);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Method Not Allowed or Error Occurred" }, { status: 500 });
  }
}
