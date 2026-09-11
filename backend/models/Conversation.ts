import mongoose, { Document, Model, Schema, model, models } from "mongoose";
import { IUserModel } from "../models/userModel";

export interface IMessage {
	sender?: IUserModel["_id"];
	text?: string;
	attachment?: { links: string[]; fileType: string };
	react?: string;
	createdAt?: Date;
	replyRef?: mongoose.Types.ObjectId;
	seenBy: IUserModel["_id"][];
}

interface IConversation {
	participants: string[];
	convType?: string;
	messages: IMessage[];
}

const messageSchema: Schema<IMessageModel> = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "userDb", // Change 'User' to 'userDb'
			required: true,
		},
		text: {
			type: String,
			default: "",
		},
		attachment: { links: [String], fileType: String },
		react: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},
		replyRef: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		seenBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "userDb", // Change 'User' to 'userDb'
			},
		],
	},
	{ timestamps: true }
);

const conversationSchema: Schema<IConversationModel> = new Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "userDb",
			},
		],
		convType: String,
		messages: [messageSchema],
	},
	{ timestamps: true }
);

// Conversations are looked up by participant membership.
conversationSchema.index({ participants: 1 });

// Ensure the Conversation model is defined
interface IMessageModel extends IMessage, Document {}
interface IConversationModel extends IConversation, Document {}

// Define the model type for the user model
export type ConversationModel = Model<IConversationModel>;
const Conversation =
	models.Conversation ??
	model<IConversationModel, ConversationModel>(
		"Conversation",
		conversationSchema
	);

export default Conversation;
