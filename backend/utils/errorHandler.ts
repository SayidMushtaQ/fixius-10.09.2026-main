import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

class CustomError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

const createError = (message: string, status: number): never => {
	throw new CustomError(message, status);
};

const errorResponse = (res: NextApiResponse, error: Error): void => {
	if (error instanceof CustomError) {
		res.status(error.status).json({ error: error.message });
	} else {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const errorResponseAppRouter = (error: Error | any): NextResponse => {
	console.error(error);
	if (error instanceof CustomError) {
		return NextResponse.json({ error: error.message }, { status: error.status });
	} else {
		return NextResponse.json(
			{ 
				error: "Internal Server Error", 
				message: error.message || String(error),
				stack: process.env.NODE_ENV === "development" ? error.stack : undefined
			}, 
			{ status: 500 }
		);
	}
};

// required query error for data fetching
const checkRequiredQueryParam = (req: NextApiRequest) => {
	const { pageSize, pageNumber } = req.query;
	if (!pageNumber && !pageSize) {
		createError("Please add required query `pageSize, pageNumber`", 400);
	}
	return { pageSize: Number(pageSize), pageNumber: Number(pageNumber) };
};

const checkRequiredQueryParamAppRouter = (req: NextRequest) => {
	const pageSize = req.nextUrl.searchParams.get("pageSize");
	const pageNumber = req.nextUrl.searchParams.get("pageNumber");
	if (!pageNumber && !pageSize) {
		createError("Please add required query `pageSize, pageNumber`", 400);
	}
	return { pageSize: Number(pageSize), pageNumber: Number(pageNumber) };
};

export { checkRequiredQueryParam, checkRequiredQueryParamAppRouter, createError, errorResponse, errorResponseAppRouter };

