import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import userDb from "@/backend/models/userModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import { transporter } from "@/helper/mailTransporter";
import { sendBankDetailsEmail } from "@/backend/controllers/Subscription/emails/PaymentDetailsTemplate";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "handwerker") return NextResponse.json({ message: "invalid request" }, { status: 401 });

    const body = await req.json();
    const { planId, payment_details, craftsman } = body;
    const userId = token._id;

    if (!craftsman || !planId || !payment_details) {
      const missingParams: string[] = [];
      if (!craftsman) missingParams.push("craftsmanId");
      if (!planId) missingParams.push("planId");
      if (!payment_details?.payment_method) missingParams.push("payment_method");

      if (payment_details?.payment_method === "bank_transfer" && !payment_details?.bank_details) {
        missingParams.push("bank details");
      }

      return NextResponse.json({ message: `Required parameters are missing: ${missingParams.join(", ")}` }, { status: 400 });
    }

    const plan = await Plans.findById(planId);
    if (!plan) return NextResponse.json({ message: "Plan not found" }, { status: 404 });

    const start_date = Date.now();
    let end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + plan.duration_in_days);

    const paymentId = `pmt${Date.now()}`;
    const newSubscription = new Subscription({
      craftsmanId: craftsman,
      plan,
      start_date,
      end_date,
      payment_details,
      paymentId: paymentId,
    });

    await newSubscription.save();

    const user = await userDb.findById(userId);
    await transporter.sendMail(sendBankDetailsEmail(user.email, user.name, plan, paymentId));

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "handwerker" && token?.role !== "admin") {
      return NextResponse.json({ message: "Invalid request" }, { status: 401 });
    }

    const pageSize = Number(req.nextUrl.searchParams.get("pageSize")) || 10;
    const pageNumber = Number(req.nextUrl.searchParams.get("pageNumber")) || 1;
    const status = req.nextUrl.searchParams.get("status");
    const payment_status = req.nextUrl.searchParams.get("payment_status");
    let paymentId = req.nextUrl.searchParams.get("paymentId");

    let findCriteria: any = {};

    if (token.role === "handwerker") {
      findCriteria.craftsmanId = new mongoose.Types.ObjectId(token.craftsman);
    }

    if (status && status !== "undefined") findCriteria.status = status;
    if (payment_status && payment_status !== "undefined") findCriteria.payment_status = payment_status;
    if (paymentId && paymentId !== "undefined") findCriteria.paymentId = { $regex: paymentId, $options: "i" };

    const totalDocuments = await Subscription.countDocuments(findCriteria);
    const { adjustedPageSize, hasToContinue, emptyResponse, totalPages, currentPage } = getPaginatedData(totalDocuments, pageSize, pageNumber);

    if (!hasToContinue) return NextResponse.json(emptyResponse, { status: 200 });

    const aggregationPipeline: any = [
      { $match: findCriteria },
      { $sort: { createdAt: -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: adjustedPageSize },
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "plan",
        },
      },
      { $unwind: { path: "$plan", preserveNullAndEmptyArrays: true } },
    ];

    if (token.role === "admin") {
      aggregationPipeline.push(
        {
          $lookup: {
            from: "craftsmen",
            localField: "craftsmanId",
            foreignField: "_id",
            as: "craftsmanId",
          },
        },
        { $unwind: "$craftsmanId" }
      );
    }

    const subscriptions = await Subscription.aggregate(aggregationPipeline);
    const result = { data: subscriptions, totalPages, currentPage };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
