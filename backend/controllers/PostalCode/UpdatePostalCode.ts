import PostalCode from "@/backend/models/PostalCode";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

export const updatePostalCode = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { id } = req.query;
	try {
		const updatedPostalCode = await PostalCode.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		if (!updatedPostalCode) {
			res.status(404).json({ message: "Código postal no encontrado" });
		} else {
			res.status(200).json(updatedPostalCode);
		}
	} catch (error: any) {
		errorResponse(res, error);
	}
};
