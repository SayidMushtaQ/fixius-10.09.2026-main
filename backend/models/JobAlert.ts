import mongoose, { Document, Model, Schema, model, models } from "mongoose";

// Define interface for job alert
interface JobAlertD extends Document {
	userId: mongoose.Types.ObjectId;
	keywords: string[];
	location: number[];
	radius: number; // Radius in miles
	frequency: "daily" | "weekly" | "monthly";
	status: "active" | "inactive";
}

// Define schema for job alert
const JobAlertSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "userDb", required: true },
		keywords: { type: [String], required: true },
		location: { type: [Number], required: true,},
		radius: { type: Number, default: 50 }, // Radius in miles
		frequency: {
			type: String,
			enum: ["daily", "weekly", "monthly"],
			default: "daily",
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
);

type JobAlertM = Model<JobAlertD>;
// Check if the model already exists before defining it
const JobAlert =
	models.JobAlert ?? model<JobAlertD, JobAlertM>("JobAlert", JobAlertSchema);

export default JobAlert;
