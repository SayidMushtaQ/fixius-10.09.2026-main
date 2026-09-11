import PostalCode from "@/backend/models/PostalCode";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

export const createPostalCode = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		// console.log(req.body);
		const newPostalCode = new PostalCode(req.body);
		await newPostalCode.save();

		res.status(201).json(newPostalCode);
	} catch (error: any) {
		console.log(error);
		errorResponse(res, error);
	}
};
