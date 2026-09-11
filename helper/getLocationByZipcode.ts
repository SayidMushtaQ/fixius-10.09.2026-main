import { ExampleZipCode } from "@/dummyData";
export const getLocationByZipCode = async (zip_code: string) => {
	const location_name = ExampleZipCode.filter(
		(zip) => zip_code == zip.zip_code
	);
	return location_name ; 
};
