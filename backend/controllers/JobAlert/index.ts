// Import necessary modules
import JobAlert from "@/backend/models/JobAlert";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

import { Token } from "@/backend/middleware/verifyJwt";

// Function to handle GET request
export async function getJobAlerts(
	req: NextApiRequest,
	res: NextApiResponse,
	token: Token
) {
	try {
		// Fetch all job alerts
		const jobAlerts = await JobAlert.findOne({ userId: token._id });

		res.status(200).json(jobAlerts);
	} catch (error: any) {
		errorResponse(res, error);
	}
}

// Function to handle PUT request
export async function updateJobAlert(
	req: NextApiRequest,
	res: NextApiResponse,
	token: Token
) {
	try {
		// Update an existing job alert
		const updatedJobAlert = await JobAlert.findOneAndUpdate(
			{ userId: token._id },
			req.body,
			{
				new: true,
			}
		);
		if (!updatedJobAlert) {
			createError("Alerta de trabajo no encontrada", 404);
		}
		res.status(200).json(updatedJobAlert);
	} catch (error: any) {
		errorResponse(res, error);
	}
}
