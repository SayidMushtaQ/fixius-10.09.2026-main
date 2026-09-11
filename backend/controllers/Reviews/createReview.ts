import Craftsman from "@/backend/models/CrafstmanModel"; // Import Craftsman model
import OfferDb from "@/backend/models/Offer"; // Import Offer model
import userDb from "@/backend/models/userModel";
import { createError } from "@/backend/utils/errorHandler"; // Import createError function
import getNotificationMessage, {
    N,
    generateLink,
} from "@/helper/getNotificationsMessage";
import Review from "../../models/ReviewModel"; // Import Review model
import { createAndSaveNotification } from "../Notifications";

// Create a new review
const createReview = async (
	offerId: string, // ID of the offer being reviewed
	rating: number, // Rating given in the review
	comment: string // Comment provided in the review
): Promise<Review> => {
	try {
		// Check if the offer has already been reviewed
		const isOfferAlreadyReviewed = await Review.findOne({ offer: offerId });
		isOfferAlreadyReviewed && createError("ya revisado", 400);

		// Find the offer by its ID
		let existedOffer = await OfferDb.findById(offerId);
		if (!existedOffer) createError("Oferta no encontrada", 404);

		// Check if the offer status allows for a review
		!["accepted", "completed"].includes(existedOffer.status) &&
			createError(
				"Solo la oferta aceptada y completa es válida para su revisión",
				400
			);

		// Mark the offer as reviewed
		existedOffer.isReviewed = true;
		const offer = await existedOffer.save();
		if (!offer) createError("Algo salió mal", 500);

		// Extract craftsman and client IDs from the offer
		const craftsman = existedOffer.craftman;
		const client = existedOffer.client;

		// Create a new review document
		const newReview = new Review({
			craftsman,
			client,
			offer: offerId,
			rating,
			comment,
		});
		const review = await newReview.save(); // Save the review to the database

		const populatedReview = await Review.findById(review._id).populate({
			path: "client",
			model: userDb,
			select: "name",
		});

		// Update the craftsman's reviews array with the new review ID
		const crafsman = await Craftsman.findByIdAndUpdate(
			craftsman,
			{
				$push: { reviews: review._id },
			},
			{ new: true }
		);

		// save notification
		const content = getNotificationMessage({
			identifier: N.NewReview,
			fromHandyman: true,
			customerName: populatedReview.client.name,
		});

		createAndSaveNotification({
			contentText: content,
			userId: crafsman.user,
			link: generateLink("handwerker", "bewertungen-und-kommentare", review._id),
			senderName: populatedReview.client.name,
		});

		return review; // Return the created review
	} catch (error) {
		throw error; // Throw any caught errors
	}
};
export { createReview };

