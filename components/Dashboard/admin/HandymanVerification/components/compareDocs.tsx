import Loader from "@/components/Loader";
import { format } from "date-fns";

interface ICompareDocs {
	data: any;
	company_name: string;
}

const CompareDocs = ({ data, company_name }: ICompareDocs) => {
	return (
		<>
			<section className="flex shadow">
				<div className="bg-white border-l border-1 ml-1 rounded-lg overflow-hidden">
					{false ? (
						<Loader />
					) : (
						<>
							<div className="p-4">
								<h2 className="text-xl font-semibold text-gray-800 capitalize">
									{data?.name} {data?.lastName}
								</h2>
								<p className="text-sm text-gray-600">
									{data?.role}
								</p>
							</div>
							<div className="border-t border-gray-200 p-4">
								<p className="text-gray-700">
									<strong>Telefon:</strong> {data?.phone}
								</p>
								<p className="text-gray-700">
									<strong>E-Mail:</strong> {data?.email}
								</p>
								<p className="text-gray-700">
									<strong>Adresse:</strong>{" "}
									{data?.streetAddress}, {data?.zipCode}
								</p>
								<p className="text-gray-700">
									<strong>Wohnadresse:</strong>{" "}
									{data?.address.Place_Name},{" "}
									{data?.address?.zipCode}
								</p>
								<p className="text-gray-700">
									<strong>Firmenname:</strong>{" "}
									{company_name}
								</p>
								<p className="text-gray-700">
									<strong>Erstellungsdatum:</strong>{" "}
									{format(new Date(data?.createdAt || Date.now()), "MM/dd/yyyy")}
								</p>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
};

export default CompareDocs;
