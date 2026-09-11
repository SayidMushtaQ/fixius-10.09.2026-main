interface Review {
	_id: string;
	rating: number;
}

interface User {
	_id: string;
	address: { _id: string; Place_Name: string };
	profile_photo: string;
}

interface Craftsman {
	_id: string;
	user: User;
	company_name: string;
	reviews: Review[];
}

interface Client {
	_id: string;
	name: string;
}

interface ServiceTitle {
	other_title: string;
	service_title: string;
	square_meters: string;
}

interface Job {
	serviceTitle: ServiceTitle;
	_id: string;
	listingId: number;
	additional_job_description: string;
}

export interface OfferItem {
	_id: string;
	craftman: Craftsman;
	client: Client;
	job: Job;
	status: string;
	isReviewed: boolean;
	price: number;
	expires_in: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
