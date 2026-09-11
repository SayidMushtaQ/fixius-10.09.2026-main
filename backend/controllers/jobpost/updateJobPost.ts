import JobPost from "@/backend/models/NewJob";
import { createError } from "@/backend/utils/errorHandler";

// Moderation state is admin-only (see blockJobPost.ts) and must never be
// settable through the owner-facing update endpoint.
const MODERATION_FIELDS = [
	"isBlocked",
	"blockedReason",
	"blockedAt",
	"blockedBy",
];

const updateJobPost = async (id: any, data: any, token: any) => {
	try {
		if (!id) {
			createError("Object id is undefined", 400);
		}
		const findCiteria = {
			$and: [
				{ _id: id }, // Match the document with the specified _id
				{ userId: token._id }, // Match the document with the specified userId
			],
		};

		const existingJob = await JobPost.findOne(findCiteria);
		if (!existingJob) {
			createError("trabajo no encontrado", 404);
		}

		if (existingJob!.isBlocked) {
			createError(
				"Diese Anzeige wurde gesperrt und kann nicht bearbeitet werden.",
				403,
			);
		}

		const sanitized = { ...(data || {}) };
		MODERATION_FIELDS.forEach((field) => delete sanitized[field]);

		const updates = { $set: sanitized };
		const updateJob = await JobPost.findOneAndUpdate(findCiteria, updates, {
			new: true,
		});
		if (updateJob) {
			return updateJob;
		} else createError("trabajo no encontrado", 404);
	} catch (error) {
		throw error;
	}
};

export { updateJobPost };
