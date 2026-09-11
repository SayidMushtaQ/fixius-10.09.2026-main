import Subscription from "@/backend/models/Subscription";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

// ✅ Update Subscription
export const updateSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const subscriptionId = req.query.subscriptionId as string;
    const payload = req.body;

    // ✅ Validate subscriptionId
    if (!subscriptionId) {
      throw createError("Abonnement-ID fehlt", 400);
    }

    console.log("Updating Subscription:", { subscriptionId, payload });

    // ✅ Update the subscription
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      payload,
      { new: true }
    );

    if (!updatedSubscription) {
      throw createError("Subscription not found", 404);
    }

    return res.status(200).json(updatedSubscription);
  } catch (error: any) {
    console.error("Update Subscription Error:", error);
    return errorResponse(res, error);
  }
};

// ✅ Get Subscriptions (With Pagination)
export const getSubscriptions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const status = req.query?.status as string;
    const payment_status = req.query?.payment_status as string;
    let paymentId = req.query?.paymentId as string;
    const token = req.body?.token;

    console.log("Fetching Subscriptions:", { pageSize, pageNumber, token });

    let findCriteria: any = {};

    // ✅ Role validation
    if (token?.role === "handwerker") {
      findCriteria.craftsmanId = new mongoose.Types.ObjectId(token.craftsman);
    }

    // ✅ Filtering criteria
    if (status && status !== "undefined") {
      findCriteria.status = status;
    }

    if (payment_status && payment_status !== "undefined") {
      findCriteria.payment_status = payment_status;
    }

    if (paymentId === "") paymentId = "undefined";
    if (paymentId && paymentId !== "undefined") {
      findCriteria.paymentId = { $regex: paymentId, $options: "i" };
    }

    // ✅ Count total documents
    const totalDocuments = await Subscription.countDocuments(findCriteria);

    // ✅ Pagination Handling
    const {
      adjustedPageSize,
      hasToContinue,
      emptyResponse,
      totalPages,
      currentPage,
    } = getPaginatedData(totalDocuments, pageSize, pageNumber);

    if (!hasToContinue) {
      return res.status(200).json(emptyResponse);
    }

    // ✅ Aggregation query
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

    // ✅ Fetch subscriptions
    const subscriptions = await Subscription.aggregate(aggregationPipeline);
    const result = { data: subscriptions, totalPages, currentPage };

    console.log("Fetched Subscriptions:", subscriptions.length);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Get Subscriptions Error:", error);
    return errorResponse(res, error);
  }
};

// ✅ Delete Subscription
export const deleteSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const subscriptionId = req.query.subscriptionId as string;

    // ✅ Validate subscriptionId
    if (!subscriptionId) {
      throw createError("Abonnement-ID fehlt", 400);
    }

    console.log("Deleting Subscription:", { subscriptionId });

    // ✅ Delete the subscription
    const deletedSubscription = await Subscription.findByIdAndDelete(
      subscriptionId
    );

    if (!deletedSubscription) {
      throw createError("Subscription not found", 404);
    }

    return res.status(200).json(deletedSubscription);
  } catch (error: any) {
    console.error("Delete Subscription Error:", error);
    return errorResponse(res, error);
  }
};
