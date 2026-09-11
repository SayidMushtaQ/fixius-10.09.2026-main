import mongoose from "mongoose";
import Conversation, { IMessage } from "../../models/Conversation";

export const createConversation = async (
	sender: IMessage["sender"] | string | any,
	receiver: mongoose.Types.ObjectId | string | any,
	message: IMessage
) => {
	try {
		// Check if a conversation already exists between sender and receiver
		let conversation = await Conversation.findOne({
			participants: { $all: [sender, receiver] },
		});

		if (!conversation) {
			// If no conversation exists, create a new one
			conversation = await Conversation.create({
				participants: [sender, receiver],
			});
		}

		return await addMessage(conversation._id, { ...message, sender });
	} catch (error) {
		throw error;
	}
};

export const addMessage = async (
	convId: mongoose.Types.ObjectId | string | any,
	message: IMessage
) => {
	try {
		const { sender, text, attachment, react, replyRef } = message;

		// Create a new message and add it to the conversation
		const newMessage = await Conversation.findByIdAndUpdate(
			convId,
			{
				$push: {
					messages: {
						sender,
						text,
						attachment,
						react,
						replyRef,
						seenBy: [sender],
					},
				},
			},
			{ new: true }
		);
		return { ...newMessage.messages[newMessage.messages.length-1]._doc, convId: newMessage._id };
	} catch (error) {
		throw error;
	}
};

export const updateSeenStataus = async (userId: string, convId: string) => {
	try {
		// Assuming you have the conversation ID (convId) and user ID (userId)
		const conv = await Conversation.findById(convId);

		// Update all messages in the conversation to mark them as seen by the user
		conv.messages.forEach((message: IMessage) => {
			if (!message.seenBy.includes(userId as any)) {
				message.seenBy.push(userId as any);
			}
		});

		// Save the updated conversation
		await conv.save();
	} catch (error) {
		throw error;
	}
};
