// Import necessary modules
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

import { Token } from "@/backend/middleware/verifyJwt";
import Filter from "@/backend/models/filterModel";



// Function to handle GET request
export async function getFilter(
	req: NextApiRequest,
	res: NextApiResponse,
	token: Token
) {
	try {
		// Fetch all job alerts
		const filter = await Filter.findOne({ userId: token._id });

		res.status(200).json(filter);
	} catch (error: any) {
		errorResponse(res, error);
	}
}

// Function to handle PUT request
export async function updateFilter(
    req: NextApiRequest,
    res: NextApiResponse,
    token: Token
) {
    try {
        // Update an existing job alert
        const updatedFilter = await Filter.findOneAndUpdate(
            { userId: token._id },
            req.body,
            { new: true, upsert: true }
        );
        if (!updatedFilter) {
            createError("Filtro no encontrado", 404);
        }
        res.status(200).json(updatedFilter);
    } catch (error: any) {
        console.error(error)
        errorResponse(res, error);
    }
}

