import { connectDb } from "@/backend/middleware/db";
import JobPost from "@/backend/models/NewJob";
import userDb from "@/backend/models/userModel";
import Craftsman from "@/backend/models/CrafstmanModel";
import { checkRequiredQueryParamAppRouter, errorResponseAppRouter } from "@/backend/utils/errorHandler";
import getDistanceAggrQuery from "@/helper/aggregateDistanceQuery";
import { getPaginatedData } from "@/helper/getPaginatedData";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import PostalCode from "@/backend/models/PostalCode";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { pageNumber, pageSize } = checkRequiredQueryParamAppRouter(req);
    const sortedQuery = req.nextUrl.searchParams.get("categories");
    const Place_Name = req.nextUrl.searchParams.get("Place_Name");
    const longitude = req.nextUrl.searchParams.get("Longitude");
    const distance: any = req.nextUrl.searchParams.get("distance");
    const authHeader = req.headers.get("authorization");

    const token = authHeader?.split(" ")[1];
    let authUser: JwtPayload | null = null;
    if (token) {
      authUser = jwt.decode(token as string) as JwtPayload;
    }

    let query: any = { status: "open", isBlocked: { $ne: true } };

    if (sortedQuery) {
      const categories = sortedQuery.split(",").filter((i) => i !== "");
      if (categories.length > 0) {
        query.category = { $in: categories };
      }
    }

    if (distance && !isNaN(Number(distance))) {
      query = { ...query, distance: { $lte: Number(distance) } };
    }
    if (Place_Name) {
      query = { ...query, "location.place_name": Place_Name };
    }

    const totalDocument = await JobPost.countDocuments(query);

    const {
      hasToContinue,
      adjustedPageSize,
      emptyResponse,
      totalPages,
      currentPage,
    } = getPaginatedData(totalDocument, pageSize, pageNumber);

    if (!hasToContinue) {
      return NextResponse.json(emptyResponse, { status: 200 });
    }

    let aggreationPipeline: any = [
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: adjustedPageSize },
    ];

    const user = authUser?._id
      ? await userDb.findOne({ _id: authUser?._id })
      : null;

    if (user?.address?.coordinates?.lng && user?.address?.coordinates?.lat) {
      aggreationPipeline = [
        ...getDistanceAggrQuery(
          user.address.coordinates.lng,
          user.address.coordinates.lat
        ),
        ...aggreationPipeline,
      ];
    }

    let jobPosts = await JobPost.aggregate(aggreationPipeline).exec();

    return NextResponse.json({
      message: "Datos de trabajo público recuperados",
      data: jobPosts,
      totalPages,
      currentPage,
    }, { status: 200 });

  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const sortedData = payload.sortedData;
    const jobPostOrder = payload.jobPostOrder;
    const service = payload.service;
    const status = payload.status;
    const jobId = payload.jobId;
    const newTitle = payload.newTitle;
    const newParagraph = payload.newParagraph;

    let responseData: any = {};

    if (sortedData === undefined) {
      const allJobData = await JobPost.find({ isBlocked: { $ne: true } }).sort({ createdAt: -1 }).lean();
      const filteredData = allJobData.filter((data: any) =>
        data.category.includes(service)
      );
      responseData = { data: filteredData };
    } else {
      if (
        jobPostOrder === "Sort by newest or older order" ||
        jobPostOrder === "Sort by New order"
      ) {
        const allJobData = await JobPost.find({ isBlocked: { $ne: true } }).sort({ createdAt: -1 }).lean();

        if (sortedData.length === 0) {
          responseData = { data: allJobData };
        } else {
          const filteredData = allJobData.filter((data: any) =>
            sortedData.some((category: string) =>
              data.category.includes(category)
            )
          );
          responseData = { data: filteredData };
        }
      } else {
        const allJobData = await JobPost.find({ isBlocked: { $ne: true } }).sort({ createdAt: 1 }).lean();

        if (sortedData.length === 0) {
          responseData = { data: allJobData };
        } else {
          const filteredData = allJobData.filter((data: any) =>
            sortedData.some((category: string) =>
              data.category.includes(category)
            )
          );
          responseData = { data: filteredData };
        }
      }
    }

    if (status) {
      const findCriteria = { _id: new mongoose.Types.ObjectId(jobId) };
      await JobPost.updateOne(findCriteria, {
        $set: { status: status },
      });
    }

    if (newTitle || newParagraph) {
      const findCriteria = { _id: new mongoose.Types.ObjectId(jobId) };
      const updateCriteria = {
        serviceTitle: { service_title: newTitle },
        additional_job_description: newParagraph,
      };

      await JobPost.updateOne(findCriteria, {
        $set: updateCriteria,
      });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to get data" }, { status: 500 });
  }
}
