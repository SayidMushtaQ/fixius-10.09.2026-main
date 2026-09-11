import { connectDb } from "@/backend/middleware/db";
import JobPost from "@/backend/models/NewJob";
import OfferDb from "@/backend/models/Offer";
import userDb from "@/backend/models/userModel";
import { createError, errorResponseAppRouter } from "@/backend/utils/errorHandler";
import getDistanceAggrQuery from "@/helper/aggregateDistanceQuery";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const id = req.nextUrl.searchParams.get("id");
    const authHeader = req.headers.get("authorization");
    
    let user: JwtPayload | null = null;
    if (authHeader) {
      const token = authHeader?.split(" ")[1];
      user = jwt.decode(token as string) as JwtPayload;
    }

    let findCriteria: any = {
      _id: new mongoose.Types.ObjectId(id as string),
      status: "open",
      isBlocked: { $ne: true },
    };

    // Admins keep full visibility, including blocked ads.
    if (user?.role === "admin") {
      delete findCriteria.status;
      delete findCriteria.isBlocked;
    }

    const userData = user?._id ? await userDb.findOne({ _id: user?._id }) : null;

    const hasValidCoordinates =
      userData?.address?.coordinates?.lat &&
      userData?.address?.coordinates?.lng;
      
    const distanceArg = hasValidCoordinates
      ? getDistanceAggrQuery(
          userData.address.coordinates.lng,
          userData.address.coordinates.lat,
        )
      : [];

    const aggregationQuery = [
      ...distanceArg,
      { $match: findCriteria },
      { $limit: 1 },
    ];
    
    const jobData = await JobPost.aggregate(aggregationQuery);

    if (jobData.length === 0) {
      return NextResponse.json({ message: "Este trabajo ya no está disponible públicamente" }, { status: 404 });
    }

    let singleJobData = jobData[0];
    
    if (user?.role === "handwerker") {
      const offers = await OfferDb.findOne({
        $and: [
          { craftman: user.craftsman },
          { job: singleJobData._id },
          { status: { $ne: "withdrawn" } },
        ],
      });

      if (offers) {
        singleJobData = {
          ...singleJobData,
          is_offer_sent: true,
          offerId: offers._id,
          price: offers.price,
        };
      }
    }

    return NextResponse.json({
      data: singleJobData,
      status: 200,
      succeed: 1,
    }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
