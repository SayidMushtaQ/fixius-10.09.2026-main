import { verifyToken } from "@/backend/middleware/verifyJwt"; // Importing the function to verify JWT tokens
import Craftsman from "@/backend/models/CrafstmanModel"; // Importing the Craftsman model
import Notification from "@/backend/models/Notifications"; // Importing the Notification model
import Review, { Reclaim } from "@/backend/models/ReviewModel"; // Importing the Review and Reclaim models
import { createError, errorResponse } from "@/backend/utils/errorHandler"; // Importing functions for error handling
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types

// Function to handle the update of a reclaim
const updateReclaim = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = verifyToken(req); // Verifying the JWT token
		const { decision, reclaimId } = req.body; // Extracting decision and reclaimId from request body

		// Handling invalid request if reclaimId is missing
		!reclaimId && createError("solicitud no válida", 400);

		// Handling missing required params if decision is missing
		!decision && createError("faltando parámetros requeridos", 400);

		const { type, message } = decision; // Extracting type and message from decision

		// Handling required params is missing if type is missing
		!type && createError("Falta los parámetros requeridos", 400);

		// Adding decisionBy field to the decision if user role is admin
		if (token?.role === "admin") {
			req.body.decision = { ...decision, decisionBy: token._id };
			// Updating the reclaim based on reclaimId
			const update = await Reclaim.findByIdAndUpdate(
				reclaimId,
				req.body,
				{
					new: true,
				}
			);

			// Updating the status of the associated review based on the decision type
			const updateReview = await Review.findByIdAndUpdate(update.review, {
				status: type === "rejected" ? "active" : "deactive",
			}).populate({
				path: "craftsman",
				model: Craftsman,
				select: "user",
			});
		
			// Creating a notification for the craftsman
			const Noti = {
				userId: updateReview?.craftsman?.user,
				type: "review",
				content: {
					text:
						type === "rejected"
							? "Su solicitud de recuperación es rechazada. Detalles de verificación"
							: "Se acepta su solicitud de recuperación",
					senderName: "",
					link: `/dashboard/handwerker/bewertungen-und-kommentare#${update.review._id}`,
				},
			};
			await Notification.create(Noti); // Saving the notification to the database

			// Sending success response with updated data
			res.status(200).json({
				data: update,
				message: "Actualizado con éxito",
			});
		} else createError("invalid request", 400);
	} catch (error: any) {
		errorResponse(res, error); // Handling any errors and sending appropriate response
	}
};

export default updateReclaim; // Exporting the updateReclaim function
