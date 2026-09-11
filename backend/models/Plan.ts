import { Document, Schema, model, models } from "mongoose";

// Define the interface for Plan
 export interface IPlan {
	name: string;
	price: number;
	duration_in_days: number;
	description: string;
}

interface IPlanDoc extends IPlan, Document {}
// Define the schema for Plan
const planSchema = new Schema<IPlanDoc>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	duration_in_days: { type: Number, required: true, min: 1, max: 30 },
	description: { type: String, required: true },
});

// Define and export the Plan model
const Plans =
	models.Plans ?? model<IPlanDoc,IPlan>("Plans", planSchema);

export default Plans;
