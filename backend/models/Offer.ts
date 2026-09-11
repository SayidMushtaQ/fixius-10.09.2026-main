import mongoose, { Document, Model, Schema } from "mongoose";

// Define Offer schema
export interface Offer {
	craftman: mongoose.Types.ObjectId;
	client: mongoose.Types.ObjectId;
	status: string;
	isReviewed?: boolean;
	job: mongoose.Types.ObjectId;
	price: number;
	expires_in: Date;
}

interface IOffer extends Offer, Document {}

const offerSchema = new Schema<IOffer>(
	{
		craftman: {
			type: Schema.Types.ObjectId,
			ref: "Craftsman", // Assuming you have a User model
			required: true,
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "userDb",
			required: true,
		},
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "JobPost",
			required: true,
		},
		status: {
			type: String,
			enum: ["rejected", "accepted", "pending", "withdrawn"],
			default: "pending",
		},
		isReviewed: { type: Boolean, default: false },
		price: { type: Number, required: true },
		expires_in: { type: Date },
	},
	{ timestamps: true }
);

// Offers are queried by client OR craftman, sorted by recency.
offerSchema.index({ client: 1, createdAt: -1 });
offerSchema.index({ craftman: 1, createdAt: -1 });

export type OfferModel = Model<IOffer>;
const OfferDb =
	mongoose.models.OfferDb ??
	mongoose.model<IOffer, OfferModel>("OfferDb", offerSchema);
export default OfferDb;
