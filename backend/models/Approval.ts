import { ExtendDoc } from "@/context/AuthContext";
import mongoose, { Document, Model, Schema, model, models } from "mongoose";

export interface IApproval {
	approval_id: string;
	approver: mongoose.Types.ObjectId;
	requested_user: mongoose.Types.ObjectId;
	approval_action:
		| "approved"
		| "rejected"
		| "pending"
		| "declined"
		| "verified"
		| "unverified"
		| "active"
		| "inactive";
}

const approvalSchema = new Schema<IApprovalModel>(
	{
		approval_id: {
			type: String,
			required: true,
			unique: true,
		},
		approver: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "userDb",
		},
		requested_user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "userDb",
		},
		approval_action: {
			type: String,
			required: true,
			enum: [
				"approved",
				"rejected",
				"declined",
				"pending",
				"verified",
				"unverified",
				"active",
				"inactive",
			], // Define possible action types
		},
	},
	{ timestamps: true }
);

// Ensure the Approval model is defined
interface IApprovalModel extends IApproval, Document {}

// Define the model type for the approval model
export type ApprovalModel = Model<IApprovalModel>;

const Approval = models.Approval
	? (models.Approval as ApprovalModel)
	: model<IApprovalModel, ApprovalModel>("Approval", approvalSchema);

export default Approval;

export interface IApprovalResult extends IApproval, ExtendDoc {}
