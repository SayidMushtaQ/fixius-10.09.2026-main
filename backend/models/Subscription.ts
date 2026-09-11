import { Document, Model, Schema, Types, model, models } from "mongoose";

// Define the interface for Subscription
export interface ISubscription {
	craftsmanId: Types.ObjectId;
	plan: Types.ObjectId;
	paymentId: String;
	start_date: Date;
	end_date: Date;
	payment_details: {
		payment_method: "paypal" | "stripe" | "bank_transfer";
		card_details: any;
		paypal_details: any;
		stripe_details: any;
		bank_details: any;
	};
	payment_status: "paid" | "unpaid" | "pending";
	status: "active" | "pending" | "inactive" | "cencelled" | "expired";
}

interface ISubscriptionDoc extends ISubscription, Document {}
// Define the schema for Subscription

const subscriptionSchema = new Schema(
	{
		craftsmanId: { type: Types.ObjectId, ref: "Craftsman", required: true },
		plan: {
			type: Schema.Types.ObjectId,
			ref: "Plans",
			required: true,
		},
		paymentId: { type: String, required: true },
		start_date: { type: Date, required: true },
		end_date: { type: Date, required: true },
		payment_details: {
			payment_method: {
				type: String,
				enum: ["paypal", "stripe", "bank_transfer"],
				required: true,
			},
			bank_details: {},
			paypal_details: {},
			stripe_details: {},
			card_details: {},
		},

		payment_status: {
			type: String,
			enum: ["paid", "unpaid", "pending"],
			default: "pending",
		},
		status: {
			type: String,
			enum: ["pending", "active", "inactive", "cencelled", "expired"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

// Define and export the Subscription model
const Subscription: Model<ISubscriptionDoc> =
	models.Subscription ??
	model<ISubscriptionDoc, ISubscription>("Subscription", subscriptionSchema);

export default Subscription;
