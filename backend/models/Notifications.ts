import { Document, Model, Schema, model, models } from "mongoose";

// Define the interface for the Notification document
interface NotificationModel extends Document {
	userId: Schema.Types.ObjectId;
	type?: "message" | "other" | "offer" | "review" | 'verification';
	content: {
		text: string;
		senderName?: string;
		link?: String;
	};
	createdAt: Date;
	read: boolean;
}

// Define the Notification Schema
const notificationSchema = new Schema<NotificationModel>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "userDb", // Reference to the user who will receive the notification
			required: true,
		},
		type: {
			type: String,
			enum: ["message", "review", "other", "offer",'verification'], // Example notification types
		},
		content: {
			type: {
				text: String,
				link: String,
				senderName: String,
			},
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// Notifications are always fetched per-user, newest first.
notificationSchema.index({ userId: 1, createdAt: -1 });

// Define a Notification model based on the schema
type NotificationM = Model<NotificationModel>;

const Notification =
	models.Notification ??
	model<NotificationModel, NotificationM>("Notification", notificationSchema);

export default Notification;
