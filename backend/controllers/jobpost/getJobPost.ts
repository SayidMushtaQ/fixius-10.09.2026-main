import JobPost from "@/backend/models/NewJob";
import userDb from "@/backend/models/userModel";
import { PaginationParams } from "@/backend/utils/pagination";
import getDistanceAggrQuery from "@/helper/aggregateDistanceQuery";
import { getPaginatedData } from "@/helper/getPaginatedData";
export const getUsersJobPost = async (
  userId: any,
  {
    pageNumber,
    pageSize,
    categories = "",
    distance = "",
    placeName = "",
    userCoordinates,
  }: PaginationParams & {
    categories?: string;
    distance?: string;
    placeName?: string;
    userCoordinates?: { lat: number; lon: number };
  },
) => {
  try {
    const totalDocuments = await JobPost.countDocuments({ userId });
    const {
      adjustedPageSize,
      hasToContinue,
      emptyResponse,
      totalPages,
      currentPage,
    } = getPaginatedData(totalDocuments, pageSize, pageNumber);

    if (!hasToContinue) {
      return emptyResponse;
    }

    const findCriteria: any = {
      userId: userId,
    };

    if (categories) {
      findCriteria.category = categories;
    }

    if (placeName) {
      findCriteria["location.place_name"] = {
        $regex: placeName,
        $options: "i",
      };
    }

    let aggregationPipeline: any[] = [
      { $match: findCriteria },
      { $sort: { createdAt: -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: adjustedPageSize },
    ];

    if (userCoordinates && userCoordinates?.lat && userCoordinates?.lon) {
      const distanceAggregation = getDistanceAggrQuery(
        userCoordinates.lon,
        userCoordinates.lat,
      );
      aggregationPipeline = [
        { $match: findCriteria },
        ...distanceAggregation,
        { $sort: { createdAt: -1 } },
        { $skip: (pageNumber - 1) * pageSize },
        { $limit: adjustedPageSize },
      ];

      if (distance) {
        const distanceInMeters = Number(distance) * 1000; // Convert distance to meters
        aggregationPipeline.push({
          $match: { distance: { $lte: distanceInMeters } },
        });
      }
    }

    let allJobs = await JobPost.aggregate(aggregationPipeline).exec();

    return { data: allJobs, totalPages, currentPage };
  } catch (error) {
    throw error;
  }
};
