import getNotificationMessage, {
	N,
	generateLink,
} from "@/helper/getNotificationsMessage";
import Review from "../../models/ReviewModel"; // Import Review model
import { createAndSaveNotification } from "../Notifications";
import { reviewPopulationQuery } from "./getReviews";

// Delete a review by its ID

export const deleteReviewById = async (reviewId: string, client: string) => {
	try {
		// Find and delete the review by its ID
		const review = await Review.findOneAndUpdate(
			{ $and: [{ _id: reviewId }, { client }] },
			{ $set: { status: "deactive" } },
			{ new: true }
		)
			.populate(reviewPopulationQuery.client)
			.populate(reviewPopulationQuery.craftsman)
			.populate(reviewPopulationQuery.offer);

		// save notification
		// handyman notification
		const content = getNotificationMessage({
			identifier: N.DeactivatedReview,
			fromHandyman: true,
			customerName: review.client.name,
		});

		await createAndSaveNotification({
			contentText: content,
			userId: review.craftsman.user._id,
			link: generateLink("handwerker", "bewertungen-und-kommentare", review._id),
			senderName: review.client.name,
		});

		// client notification
		const clContent = getNotificationMessage({
			identifier: N.DeactivatedReview,
		});

		await createAndSaveNotification({
			contentText: clContent,
			userId: review.client._id,
			link: generateLink("kunde", "bewertungen-und-kommentare", review._id),
		});
		return review;
	} catch (error) {
		throw error; // Throw any caught errors
	}
};
