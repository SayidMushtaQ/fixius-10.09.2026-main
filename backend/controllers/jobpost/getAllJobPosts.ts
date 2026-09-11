import JobPost from "@/backend/models/NewJob";
import { PaginationParams } from "@/backend/utils/pagination";
import { getPaginatedData } from "@/helper/getPaginatedData";

export type AdminJobFilter = "all" | "blocked" | "active";

/**
 * Admin-wide ad listing: every ad, from every user, blocked ones included.
 */
export const getAllJobPosts = async ({
  pageNumber,
  pageSize,
  search = "",
  filter = "all",
}: PaginationParams & { search?: string; filter?: AdminJobFilter }) => {
  const findCriteria: any = {};

  if (filter === "blocked") {
    findCriteria.isBlocked = true;
  } else if (filter === "active") {
    findCriteria.isBlocked = { $ne: true };
  }

  const term = search.trim();
  if (term) {
    const regex = { $regex: term, $options: "i" };
    const or: any[] = [
      { "serviceTitle.service_title": regex },
      { "serviceTitle.other_title": regex },
      { category: regex },
      { "contactDetails.email": regex },
      { "location.place_name": regex },
    ];
    if (!isNaN(Number(term))) {
      or.push({ listingId: Number(term) });
    }
    findCriteria.$or = or;
  }

  const totalDocuments = await JobPost.countDocuments(findCriteria);
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

  const data = await JobPost.find(findCriteria)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(adjustedPageSize)
    .lean();

  return { data, totalPages, currentPage };
};
