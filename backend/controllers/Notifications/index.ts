import Notification from "../../models/Notifications";

export const getAllNotifications = async (
	userId: string,
	pageSize: number = 5,
	pageNumber: number = 1
) => {
	try {
		// Count total notifications for the user
		const totalNotifications = await Notification.countDocuments({
			userId,
		});

		// Calculate total pages based on total notifications and page size
		const totalPages = Math.ceil(totalNotifications / pageSize);

		// If requested page number is greater than total pages, throw an error
		if (pageNumber > totalPages) {
			return { data: [], totalPages, currentPage: pageNumber }; // Include currentPage
		}

		// Adjust page size if remaining documents are less than default page size
		const remainingDocuments =
			totalNotifications - (pageNumber - 1) * pageSize;
		const adjustedPageSize =
			remainingDocuments < pageSize ? remainingDocuments : pageSize;

		// Fetch notifications for the specified page
		const notifications = await Notification.find({ userId })
			.sort({ createdAt: -1 })
			.limit(adjustedPageSize)
			.skip((pageNumber - 1) * adjustedPageSize);

		const unReadNotification = await Notification.countDocuments({
			userId,
			read: false,
		});
		return {
			data: notifications,
			unReadNotification,
			totalPages,
			currentPage: pageNumber,
		}; // Include currentPage
	} catch (error) {
		throw error;
	}
};

// Create a new notification
export const createNotification = async (
	userId: string,
	type: string,
	content: string
) => {
	try {
		const notification = new Notification({ userId, type, content });
		return await notification.save();
	} catch (error) {
		throw error;
	}
};

// Update a notification's read status
export const markNotificationAsRead = async (id: string) => {
	try {
		return await Notification.findOneAndUpdate(
			{ _id: id, read: false },
			{ read: true },
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};

export const markAllNotificationAsRead = async (userId: string) => {
	try {
		return await Notification.updateMany(
			{ userId, read: false },
			{ read: true }
		);
	} catch (error) {
		throw error;
	}
};

// Delete a notification
export const deleteNotification = async (id: string) => {
	try {
		return await Notification.findByIdAndDelete(id);
	} catch (error) {
		throw error;
	}
};

// Function to create and save notification for offer
interface saveNotification {
	contentText: string;
	link?: string;
	senderName?: string;
	userId: string;
	type?: string;
}
export const createAndSaveNotification = ({
	contentText,
	link,
	senderName,
	userId,
	type,
}: saveNotification) => {
	return new Notification({
		content: {
			text: contentText,
			link,
			senderName,
		},
		type,
		userId,
	}).save();
};
