import Craftsman from "@/backend/models/CrafstmanModel"; // Import Craftsman model
import JobPost from "@/backend/models/NewJob";
import OfferDb from "@/backend/models/Offer"; // Import Offer model
import userDb from "@/backend/models/userModel";
import { PaginationParams } from "@/backend/utils/pagination";
import { getPaginatedData } from "@/helper/getPaginatedData";
import Review from "../../models/ReviewModel"; // Import Review model

export const reviewPopulationQuery = {
	offer: {
		path: "offer",
		model: OfferDb,
		select: "job",
		populate: {
			path: "job",
			model: JobPost,
			select: "serviceTitle listingId",
		},
	},

	craftsman: {
		path: "craftsman",
		model: Craftsman,
		select: "company_name",
		populate: {
			path: "user",
			model: userDb,
			select: "profile_photo address",
		},
	},
	client: { path: "client", model: userDb, select: "name" },
};

// Get a review by its ID
const getReviewById = async (id: string): Promise<Review | null> => {
	try {
		// Find and return the review by its ID
		const review = await Review.findOne({ _id: id, status: "active" });
		return review; // Return the found review
	} catch (error) {
		throw error; // Throw any caught errors
	}
};

// Get reviews by user ID (either craftsman or client)
const getReviewsByUserId = async (
	userId: string,
	{ pageNumber, pageSize }: PaginationParams
) => {
	try {
		const totalDocuments = await Review.countDocuments({
			$or: [
				{ client: userId }, // Check if the client ID matches
				{ craftsman: userId }, // Check if the craftsman ID matches
			],
		});
		const {
			totalPages,
			currentPage,
			adjustedPageSize,
			hasToContinue,
			emptyResponse,
		} = getPaginatedData(totalDocuments, pageSize, pageNumber);
		if (!hasToContinue) {
			return emptyResponse;
		}

		// Find reviews where either client or craftsman matches the given user ID
		const reviews = await Review.find({
			$or: [
				{ client: userId }, // Check if the client ID matches
				{ craftsman: userId }, // Check if the craftsman ID matches
			],
		})
			.sort({ createdAt: -1 })
			.populate(reviewPopulationQuery.client)
			.populate(reviewPopulationQuery.craftsman)
			.populate(reviewPopulationQuery.offer)
			.limit(adjustedPageSize as number)
			.skip((pageNumber - 1) * pageSize);

		return { data: reviews, currentPage, totalPages }; // Return the found reviews
	} catch (error) {
		throw error; // Throw any caught errors
	}
};

export { getReviewById, getReviewsByUserId };

