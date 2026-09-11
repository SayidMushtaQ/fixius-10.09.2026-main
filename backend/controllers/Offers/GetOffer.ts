import Craftsman from "@/backend/models/CrafstmanModel";
import JobPost from "@/backend/models/NewJob";
import OfferDb from "@/backend/models/Offer";
import PostalCode from "@/backend/models/PostalCode";
import Review from "@/backend/models/ReviewModel";
import userDb from "@/backend/models/userModel";
import { getPaginatedData } from "@/helper/getPaginatedData";

const craftmanPopulateOptions = {
	path: "craftman",
	model: Craftsman,
	select: "company_name reviews",
	populate: [
		{
			path: "user",
			model: userDb,
			select: "profile_photo address",
			populate: {
				path: "address",
				model: PostalCode,
				select: "Place_Name",
			},
		},
		{
			// Populate reviews only if userType is craftsman and reviews array is not empty
			path: "reviews",
			model: Review,
			select: "rating",
		},
	],
};

export const offerPopulateQuery = {
	job: {
		path: "job",
		model: JobPost,
		select: "listingId serviceTitle additional_job_description",
	},
	client: { path: "client", model: userDb, select: "name" },
	craftsman: craftmanPopulateOptions,
};

// method for get offer by user id
const getOffersByUser = async (
	userId: string,
	{ pageNumber, pageSize }: { pageNumber: number; pageSize: number }
) => {
	try {
		const totalDocument = await OfferDb.countDocuments({
			$or: [{ client: userId }, { craftman: userId }],
		});
		const { adjustedPageSize, hasToContinue, currentPage, totalPages } =
			getPaginatedData(totalDocument, pageSize, pageNumber);

		const notFound = { data: [], currentPage, totalPages };
		if (!hasToContinue) {
			return notFound;
		}
		// Find offers that match the query and populate the 'job', 'client', and 'craftsman' fields
		const offers = await OfferDb.find({
			$or: [{ client: userId }, { craftman: userId }],
		})
			.sort({ createdAt: -1 })
			.populate(offerPopulateQuery.job)
			.populate(offerPopulateQuery.client)
			.populate(offerPopulateQuery.craftsman)
			.limit(adjustedPageSize as number)
			.skip((pageNumber - 1) * pageSize);

		// If no offers are found, throw an error
		if (!offers.length) {
			return notFound;
		}

		// Return the array of populated offers
		return { data: offers, currentPage, totalPages };
	} catch (error) {
		throw error;
	}
};

export default getOffersByUser;
