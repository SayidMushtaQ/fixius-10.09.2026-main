import { verifyToken } from "@/backend/middleware/verifyJwt";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import { NextApiRequest, NextApiResponse } from "next";

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenUser = verifyToken(req);
    if (tokenUser?.role !== "admin") {
      createError("authentication failed", 401);
    }

    let pageNumber = Number(req.query.pageNumber) || 1;
    let pageSize = Number(req.query.pageSize) || 10;
    const totalDocuments = await userDb.countDocuments();

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

    const search = req.query?.search as string;

    const users = await userDb.aggregate([
      {
        $lookup: {
          from: "craftsmen",
          let: { craftsmanId: "$craftsman" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$craftsmanId"] },
                // status: "verified",
              },
            },
            {
              $project: {
                _id: 0,
                company_name: 1,
                status: 1,
              },
            },
          ],
          as: "craftsmanArray",
        },
      },
      {
        $addFields: {
          craftsman: { $arrayElemAt: ["$craftsmanArray", 0] },
        },
      },
      {
        $match: {
          $or: [
            {
              role: req.query.role || "handwerker",
              ...(req.query.role === "handwerker" && {
                "craftsman.status": "verified",
              }),
            },
            { role: req.query.role || "kunde" },
          ],
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: new RegExp(search, "i") } },
            { email: { $regex: new RegExp(search, "i") } },
            { role: { $regex: new RegExp(search, "i") } },
            {
              "craftsman.company_name": {
                $regex: new RegExp(search, "i"),
              },
            },
          ],
        },
      },
      {
        $project: {
          accessToken: 0,
          refreshToken: 0,
          otp: 0,
          password: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (pageNumber - 1) * pageSize,
      },
      {
        $limit: adjustedPageSize,
      },
    ]);

    res.status(200).json({
      data: users,
      totalPages,
      currentPage,
      fetchedDocs: users.length,
    });
  } catch (error: any) {
    errorResponse(res, error);
  }
};
