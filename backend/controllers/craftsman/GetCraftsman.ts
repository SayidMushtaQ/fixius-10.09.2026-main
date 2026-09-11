import { verifyToken } from "@/backend/middleware/verifyJwt";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import Craftsman from "../../models/CrafstmanModel";

export const GetCraftManByUserId = async (user: string) => {
	try {
		const craftsman = await Craftsman.findOne({ user });
		return craftsman;
	} catch (error) {
		throw error;
	}
};

export const GetCraftsmans = async (
	req: NextApiRequest | any,
	res: NextApiResponse | null
) => {
	try {
        // Handle both Pages Router (req.query) and App Router (req.nextUrl.searchParams)
        const getQueryParam = (name: string) => {
            if (req.query?.[name]) return req.query[name];
            if (req.nextUrl?.searchParams?.get) return req.nextUrl.searchParams.get(name);
            return null;
        };

		const status = getQueryParam("status") as string;
		const tokenUser = verifyToken(req);
		if (tokenUser?.role !== "admin") {
			createError("authentication failed", 401);
		}

		let pageNumber = Number(getQueryParam("pageNumber")) || 1;
		let pageSize = Number(getQueryParam("pageSize")) || 10;
		const totalDocuments = await Craftsman.countDocuments({
			status,
		});

		const {
			hasToContinue,
			emptyResponse,
			totalPages,
			currentPage,
		} = getPaginatedData(totalDocuments, pageSize, pageNumber);

		if (!hasToContinue) {
            if (res) return res.status(200).json(emptyResponse);
			return NextResponse.json(emptyResponse);
		}

		const craftsman = await Craftsman.find({ status }).populate("user");
        const responseData = {
			data: craftsman,
			totalPages,
			totalDocuments,
			currentPage,
			fetchedDocs: craftsman.length,
		};

        if (res) return res.status(200).json(responseData);
        return NextResponse.json(responseData);
	} catch (error: any) {
        if (res) return errorResponse(res, error);
		return errorResponseAppRouter(error);
	}
};
export default GetCraftManByUserId;
