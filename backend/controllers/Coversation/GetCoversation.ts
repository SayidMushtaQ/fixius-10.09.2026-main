import Conversation from "@/backend/models/Conversation";
import Craftsman from "@/backend/models/CrafstmanModel";
import userDb, { IUserModel } from "@/backend/models/userModel";
export async function getConversationsByUser(userId: string | any) {
	try {
		// Find conversations where the user is a participant
		const conversation = await Conversation.find({
			participants: {
				$in: [userId],
			},
		})
			.populate({
				path: "participants",
				model: userDb,
				select: "name lastName email profile_photo role",
				populate: {
					path: "craftsman",
					model: Craftsman,
					select: "company_name",
				},
			})
			.sort({ updatedAt: -1 })
			.limit(20);

		return conversation;
	} catch (error) {
		throw error;
	}
}
