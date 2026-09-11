import mongoose, { Document, Model, Schema, model, models } from "mongoose";

// Define Review schema
interface Review extends Document {
	craftsman: mongoose.Types.ObjectId;
	client: mongoose.Types.ObjectId;
	offer: mongoose.Types.ObjectId;
	rating: number;
	comment: string;
	createdAt?: Date;
	status: string;
	reclaimId?: mongoose.Types.ObjectId;
}

export interface IReclaim {
	review: mongoose.Types.ObjectId;
	reason: string;
	decision?: {
		type: "accepted" | "rejected" | "pending";
		decisionBy: mongoose.Types.ObjectId;
		message?: string;
	};
}

const reviewSchema = new Schema<Review>(
	{
		craftsman: {
			type: Schema.Types.ObjectId,
			ref: "Craftsman",
			required: true,
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "userDb",
			required: true,
		},
		offer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "OfferDb",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "active",
			enum: ["active", "deactive", "reclaimed"],
		},
		reclaimId: { type: Schema.Types.ObjectId, path: "reclaim" },
	},
	{ timestamps: true }
);

const reclaimSchema = new Schema<IReclaim>(
	{
		review: {
			type: Schema.Types.ObjectId,
			path: "review",
			required: true,
		},
		decision: {
			type: {
				type: String,
				enum: ["pending", "accepted", "rejected", "withdrawn"],
				default: "pending",
			},
			decisionBy: { type: Schema.Types.ObjectId, path: "userDb" },
			message: String,
		},
		reason: { type: String, required: true },
	},
	{ timestamps: true }
);

type ReviewModel = Model<Review>;

interface ReclaimDoc extends IReclaim, Document {}
type ReclaimModel = Model<ReclaimDoc>;

export const Reclaim =
	models.Reclaim ?? model<IReclaim, ReclaimModel>("Reclaim", reclaimSchema);

const Review =
	models.Review ?? model<Review, ReviewModel>("Review", reviewSchema);

export default Review;
