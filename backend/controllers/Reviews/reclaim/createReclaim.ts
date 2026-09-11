import { verifyToken } from "@/backend/middleware/verifyJwt"; // Importing the function to verify JWT tokens
import Review, { Reclaim } from "@/backend/models/ReviewModel"; // Importing Review and Reclaim models
import { createError, errorResponse } from "@/backend/utils/errorHandler"; // Importing functions for error handling
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types

// Function to handle the creation of a reclaim
const createReclaim = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = verifyToken(req); // Verifying the JWT token
		console.log(token);
		if (token?.role === "handwerker") {
			// Checking if the user role is "handwerker"
			const review = await Review.findOne({ craftsman: token?.craftsman }); // Finding the review associated with the craftsman

			// Handling authentication failure if review is not found
			if (!review) createError("La autenticación falló", 401);

			// Retrieving reviewId and message from request body
			const { reviewId, reason } = req.body;

			// Checking if required parameters are missing
			if (!reviewId || !reason)
				createError("missing required params", 400);

			// Creating a new reclaim object
			const reclaim = {
				review: reviewId,
				reason,
			};

			// Creating a new reclaim in the database
			const createReclaim = await Reclaim.create(reclaim);

			// Updating the status and reclaimId of the review
			const updateReview = await Review.findByIdAndUpdate(
				review._id,
				{
					status: "reclaimed",
					reclaimId: createReclaim._id,
				},
				{ new: true }
			);

			//Sending notification to admin

			// Sending the response with reclaim and review details
			res.status(201).json({
				reclaim: createReclaim,
				review: updateReview,
				message: "Reclamar creado con éxito",
			});
		} else {
			createError("invalid request", 400);
		}
	} catch (error: any) {
		errorResponse(res, error);
	}
};

export default createReclaim;
