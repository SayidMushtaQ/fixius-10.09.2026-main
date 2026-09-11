import { createError } from "@/backend/utils/errorHandler"; // Import createError function
import getNotificationMessage, {
    N,
    generateLink,
} from "@/helper/getNotificationsMessage";
import Review from "../../models/ReviewModel"; // Import Review model
import { createAndSaveNotification } from "../Notifications";
import { reviewPopulationQuery } from "./getReviews";
// Update an existing review
const updateReview = async (
	_id: string, // ID of the review to update
	client: string,
	rating: number, // New rating to set in the review
	comment: string // New comment to set in the review
) => {
	try {
		// Find and update the review by its ID, returning the updated document
		const review = await Review.findOne({ _id, client })
			.populate(reviewPopulationQuery.client)
			.populate(reviewPopulationQuery.craftsman)
			.populate(reviewPopulationQuery.offer);

		if (review.createdAt.toString() === review.updatedAt.toString()) {
			review.comment = comment;
			review.rating = rating;

			// save notification for handyman
			const content = getNotificationMessage({
				identifier: N.ChangedReview,
				fromHandyman: true,
				customerName: review.client.name,
			});

			await createAndSaveNotification({
				contentText: content,
				userId: review.craftsman?.user?._id,
				link: generateLink(
					"handwerker",
					"bewertungen-und-kommentare",
					review._id
				),
				senderName: review.client.name,
			});

			return await review.save();
		} else createError("no se puede editar más de una vez", 400);
	} catch (error) {
		throw error; // Throw any caught errors
	}
};

export { updateReview };

