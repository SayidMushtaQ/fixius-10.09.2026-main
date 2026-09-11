import mongoose from "mongoose";

interface Document {
	document_type: string;
	document_link: string;
}

export interface CraftmanDetails {
	user?: mongoose.Types.ObjectId;
	services: string[];
	company_name: string;
	documents: Document[];
	images: string[];
	description: string;
}
