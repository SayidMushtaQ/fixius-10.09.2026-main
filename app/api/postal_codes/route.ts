import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const search = req.nextUrl.searchParams.get("search") || "";
    const isNameSearch = req.nextUrl.searchParams.get("isNameSearch");

    if (!search) {
      const postalCodes = await PostalCode.find({}).limit(20);
      return NextResponse.json(postalCodes, { status: 200 });
    }

    const numericSearch = parseInt(search);
    let postalCodes: any;

    if (!isNaN(numericSearch)) {
      if (search.length < 3) {
        return NextResponse.json([], { status: 200 });
      }
      postalCodes = await PostalCode.aggregate([
        {
          $addFields: {
            postalCodeStr: { $toString: "$Postal_Code" },
          },
        },
        {
          $match: {
            postalCodeStr: { $regex: new RegExp(`^${search}`) },
          },
        },
        { $limit: 20 },
      ]);
    } else {
      if (isNameSearch === "true") {
        postalCodes = await PostalCode.find({
          Place_Name: { $regex: new RegExp(search, "i") },
        }).limit(5);
      } else {
        postalCodes = [];
      }
    }

    if (search === "") {
      postalCodes = [];
    }
    return NextResponse.json(postalCodes, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    const newPostalCode = new PostalCode(body);
    await newPostalCode.save();

    return NextResponse.json(newPostalCode, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return errorResponseAppRouter(error);
  }
}
