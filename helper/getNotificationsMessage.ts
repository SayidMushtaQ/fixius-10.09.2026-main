// Define enum for notification identifiers
export enum N {
	NewReview = "newReview",
	NewOffer = "newOffer",
	DeactivatedReview = "deactivatedReview",
	ChangedReview = "changedReview",
	OfferWithdrawalConfirmation = "offerWithdrawalConfirmation",
	OfferAcceptance = "offerAcceptance",
	OfferRejection = "offerRejection",
	MessageFromHandyman = "messageFromHandyman",
	OfferWithdrawalByHandyman = "offerWithdrawalByHandyman",
	SuccessfulOfferRejection = "successfulOfferRejection",
}

// Define interface for notification message parameters
interface NotificationParams {
	identifier: N;
	fromHandyman?: boolean;
	handymanName?: string;
	customerName?: string;
}

// Function to get notification message
export default function getNotificationMessage(
	params: NotificationParams
): string {
	const {
		identifier,
		handymanName,
		fromHandyman = false,
		customerName = "",
	} = params;

	let message: string = "";

	if (fromHandyman) {
		switch (identifier) {
			case N.NewReview:
				message = `Sie haben eine neue Bewertung von ${customerName} erhalten.`;
				break;
			case N.NewOffer:
				message = `Sie haben erfolgreich ein Angebot an ${customerName} gesendet.`;
				break;
			case N.DeactivatedReview:
				message = `${customerName} hat die Bewertung für diesen Auftrag deaktiviert.`;
				break;
			case N.ChangedReview:
				message = `${customerName} hat die Bewertung für diesen Auftrag geändert.`;
				break;
			case N.OfferWithdrawalConfirmation:
				message = "Sie haben Ihr Angebot für den Auftrag erfolgreich zurückgezogen.";
				break;
			case N.OfferAcceptance:
				message = "Ihr Angebot für den Auftrag wurde vom Kunden akzeptiert.";
				break;
			case N.OfferRejection:
				message = "Ihr Angebot für den Auftrag wurde vom Kunden abgelehnt.";
				break;
			default:
				message = "Unbekannte Benachrichtigung.";
		}
	} else {
		switch (identifier) {
			case N.NewOffer:
				message = `Sie haben ein neues Angebot von ${handymanName} erhalten. Überprüfen Sie den Status im Angebotsbereich.`;
				break;
			case N.DeactivatedReview:
				message = "Ihre Bewertung wurde erfolgreich deaktiviert.";
				break;
			case N.MessageFromHandyman:
				message = `Sie haben eine neue Nachricht von ${handymanName} erhalten. Überprüfen Sie Ihren Posteingang.`;
				break;
			case N.OfferWithdrawalByHandyman:
				message = `${handymanName} hat sein Angebot für den Auftrag zurückgezogen.`;
				break;
			case N.SuccessfulOfferRejection:
				message = "Sie haben das Angebot für den Auftrag erfolgreich abgelehnt.";
				break;
			default:
				message = "Unbekannte Benachrichtigung.";
		}
	}

	return message;
}

export const generateLink = (role: string, path: string, id: string) =>
	`/dashboard/${role}/${path}/#${id}`;
