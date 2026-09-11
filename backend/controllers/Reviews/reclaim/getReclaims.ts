import { verifyToken } from "@/backend/middleware/verifyJwt"; // Importing the function to verify JWT tokens
import Review, { Reclaim } from "@/backend/models/ReviewModel"; // Importing the Reclaim model
import { createError, errorResponse } from "@/backend/utils/errorHandler"; // Importing functions for error handling
import { getPaginatedData } from "@/helper/getPaginatedData"; // Importing helper function for pagination
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types

// Function to handle the retrieval of paginated reclaim data
const getReclaim = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let pageNumber = Number(req.query.pageNumber) || 1; // Parsing and defaulting page number
		let pageSize = Number(req.query.pageSize) || 10; // Parsing and defaulting page size
		const token = verifyToken(req); // Verifying the JWT token
		if (token?.role === "admin") {
			// Checking if the user role is "admin"
			const totalDocuments = await Reclaim.countDocuments(); // Counting total pending reclaims

			// Calculating pagination data
			const {
				totalPages,
				currentPage,
				adjustedPageSize,
				hasToContinue,
				emptyResponse,
			} = getPaginatedData(totalDocuments, pageSize, pageNumber);

			// Returning empty response if no data to fetch
			if (!hasToContinue) {
				return emptyResponse;
			}

			// Fetching paginated reclaim data
			const reclaim = await Reclaim.find()
				.populate({
					path: "review",
					model: Review,
					populate: ["craftsman"],
				})
				.limit(adjustedPageSize as number)
				.skip((pageNumber - 1) * pageSize)
				.sort({ createdAt: -1 });

			// Sending success response with paginated data
			res.status(200).json({
				totalDocuments,
				totalPages,
				currentPage,
				data: reclaim,
			});
		} else {
			createError("invalid request", 400); // Handling invalid request
		}
	} catch (error: any) {
		errorResponse(res, error); // Handling any errors and sending appropriate response
	}
};

export default getReclaim; // Exporting the getReclaim function
