import mongoose, { Document, Model, Schema, model } from "mongoose";

// Define Review schema

// Define Craftsman schema
export interface ICraftsman {
	user: mongoose.Types.ObjectId;
	reviews?: Schema.Types.ObjectId[];
	services: string[];
	company_name: string;
	documents: {
		document_type: "trade_licence" | "craft_card";
		document_link: string;
	}[];
	images: string[];
	description: string;
	status: "verified" | "unverified" | "declined";
	message?: string;
	current_subscription?: mongoose.Types.ObjectId;
}
interface CraftsmanDocument extends ICraftsman, Document {}
const craftsmanSchema = new Schema<CraftsmanDocument>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "userDb", // Assuming you have a User model
			required: true,
		},
		services: [{ type: String }],
		company_name: { type: String, required: true, unique: true },
		documents: [
			{
				document_type: {
					type: String,
					enum: ["trade_licence", "craft_card"],
				},
				document_link: { type: String },
			},
		],
		images: [{ type: String }],
		description: { type: String },
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		status: {
			type: String,
			enum: ["verified", "unverified", "declined"],
			default: "unverified",
		},
		message: String,
		current_subscription: {
			type: Schema.Types.ObjectId,
			ref: "Subscription",
		},
	},
	{ timestamps: true }
);

// Craftsmen are listed/filtered by verification status.
craftsmanSchema.index({ status: 1 });

// Define the model type for the user model
type CraftsmanModel = Model<CraftsmanDocument>;
const Craftsman =
	mongoose.models.Craftsman ??
	model<CraftsmanDocument, CraftsmanModel>("Craftsman", craftsmanSchema);

// Check if the Review model has been registered
const ReviewModel = mongoose.models.Review;
// Populate reviews field conditionally
if (ReviewModel) {
	craftsmanSchema.path("reviews").ref(ReviewModel);
}
export default Craftsman;