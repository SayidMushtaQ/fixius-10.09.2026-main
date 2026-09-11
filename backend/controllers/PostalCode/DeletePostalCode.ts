import PostalCode from "@/backend/models/PostalCode";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

export const deletePostalCode = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { id } = req.query;
	try {
		const deletedPostalCode = await PostalCode.findByIdAndDelete(id);
		if (!deletedPostalCode) {
			res.status(404).json({ message: "Código postal no encontrado" });
		} else {
			res.status(200).json({
				message: "Código postal eliminado con éxito",
			});
		}
	} catch (error: any) {
		errorResponse(res, error);
	}
};
