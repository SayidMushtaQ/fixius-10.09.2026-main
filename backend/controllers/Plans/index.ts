import Plans from "@/backend/models/Plan";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

export const createPlan = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// console.log(req.body);
		const isInputs = Object.values(req.body).every(
			(i: any, ind, arr) => i && arr.length === 3
		);

		if (!isInputs) createError("required params is missing", 400);
		const newPlan = new Plans(req.body);
		await newPlan.save();

		res.status(201).json(newPlan);
	} catch (error: any) {
		console.log(error);
		errorResponse(res, error);
	}
};

export const updatePlan = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const planId = req.query.planId;
		const payload = req.body;
		// console.log(req.body);
		const isInputs = Object.values(payload).some(
			(i: any, ind, arr) => i && arr.length === 3
		);

		if (!isInputs || !planId)
			createError("required params is missing", 400);

		const updatePlan = await Plans.findByIdAndUpdate(planId, payload, {
			new: true,
		});

		res.status(200).json(updatePlan);
	} catch (error: any) {
		console.log(error);
		errorResponse(res, error);
	}
};

export const getPlans = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { requestType } = req.query;
		let plan = null;
		if (requestType === "get_by_id") {
			if (!req.query.planId) createError("se requiere planid", 400);
			plan = await Plans.findById(req.query.planId);
		}

		if (requestType === "all") {
			plan = await Plans.find();
		}
		!plan && createError("Plan no encontrado", 404);
		res.status(200).json(plan);
	} catch (error: any) {
		console.log(error);
		errorResponse(res, error);
	}
};

export const deletePlan = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const planId = req.query?.planId;

		!planId && createError("required params are missing", 400);
		const deletePlan = await Plans.findByIdAndDelete(planId);
		res.status(200).json(deletePlan);
	} catch (error: any) {
		console.log(error);
		errorResponse(res, error);
	}
};
