import JobPost from "@/backend/models/NewJob";
import OfferDb from "@/backend/models/Offer";
import { createError } from "@/backend/utils/errorHandler";
import getNotificationMessage, {
	N,
	generateLink,
} from "@/helper/getNotificationsMessage";
import { createAndSaveNotification } from "../Notifications";
import { offerPopulateQuery } from "./GetOffer";

interface UpdateOfferParams {
	offerId: string;
	userId: string;
	jobId?: string;
	data: {
		status?: "accepted" | "rejected" | "withdrawn";
		price?: number;
		expires_in?: Date;
	};
}

const updateOffer = async ({
	offerId,
	userId,
	jobId,
	data,
}: UpdateOfferParams) => {
	try {
		// Find the offer by its ID
		const offerToUpdate = await OfferDb.findOneAndUpdate(
			{
				_id: offerId,
				$or: [{ craftman: userId }, { client: userId }],
			},
			{
				$set: data,
			},
			{ new: true }
		)
			.populate(offerPopulateQuery.job)
			.populate(offerPopulateQuery.client)
			.populate(offerPopulateQuery.craftsman);

		// If the offer is not found, return null
		if (!offerToUpdate) {
			createError("Oferta no encontrada", 404);
		}

		const clientNotiLink = generateLink(
			"kunde",
			"angebote",
			offerToUpdate._id
		);

		const handymanNotiLink = generateLink(
			"handwerker",
			"bestellungen",
			offerToUpdate._id
		);

		if (data.status === "accepted") {
			await JobPost.findByIdAndUpdate(jobId, {
				$set: { status: data.status },
			});

			const contentforhandyman = getNotificationMessage({
				identifier: N.OfferAcceptance,
				fromHandyman: true,
			});

			// handyman notificaton
			await createAndSaveNotification({
				contentText: contentforhandyman,
				link: handymanNotiLink,
				senderName: offerToUpdate?.client?.name,
				userId: offerToUpdate?.craftman?.user,
			});
		}

		// Notification for rejection offer
		if (data.status === "rejected") {
			// Generate notification messages
			const contentforhandyman = getNotificationMessage({
				identifier: N.OfferRejection,
				fromHandyman: true,
			});

			const contentForClient = getNotificationMessage({
				identifier: N.SuccessfulOfferRejection,
			});

			// Create and save notifications
			// handyman notification
			await createAndSaveNotification({
				contentText: contentforhandyman,
				link: handymanNotiLink,
				senderName: offerToUpdate?.client?.name,
				userId: offerToUpdate?.craftman?.user,
			});

			// client Notification
			await createAndSaveNotification({
				contentText: contentForClient,
				link: clientNotiLink,
				userId,
			});
		}

		// Notify users if the offer status is withdrawn
		if (data.status === "withdrawn") {
			// Generate notification messages
			// handyman notification
			const contentforhandyman = getNotificationMessage({
				identifier: N.OfferWithdrawalConfirmation,
				fromHandyman: true,
			});

			await createAndSaveNotification({
				contentText: contentforhandyman,
				link: handymanNotiLink,
				userId: offerToUpdate.craftman.user,
			});

			// client notification
			const contentForClient = getNotificationMessage({
				identifier: N.OfferWithdrawalByHandyman,
				handymanName: offerToUpdate.craftman.company_name,
			});
			await createAndSaveNotification({
				contentText: contentForClient,
				link: clientNotiLink,
				senderName: offerToUpdate.craftman.company_name,
				userId: offerToUpdate.client._id,
			});
		}

		// Return the updated offer document
		return offerToUpdate;
	} catch (error) {
		throw error;
	}
};

export default updateOffer;
