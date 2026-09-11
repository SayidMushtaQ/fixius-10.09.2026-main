
export default function AcceptedOfferCS({
	job_title,
	listing_ID,
	price,
	posted_on,
	status,
}: {
	job_title: string;
	listing_ID: string;
	price: string;
	posted_on: { date: string; time: string };
	status: string;
}) {
	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="px-10 py-5">
				<section className="space-y-2 mb-2 relative">
					<h1 className="font-bold text-xl">Bezeichnung der Handwerkstätigkeit</h1>
					<p className="lg:w-2/3 w-full">{job_title}</p>
					<li className="text-gray-500 absolute right-0 -top-2">
						{status}
					</li>
				</section>
				<div className="my-2 space-y-1">
					<div>
						<h2 className="font-bold text-xl">Anzeige-ID</h2>
						<span>{listing_ID}</span>
					</div>
					<div>
						<h3 className="font-bold text-xl">Preis</h3>
						<span>{price}</span>
					</div>
				</div>
				<div className="py-1">
					<div className="flex md:gap-10 gap-2 flex-col md:flex-row flex-wrap">
						<h4 className="font-semibold">Veröffentlicht am</h4>
						<ul className="flex gap-7 list-disc mx-4 md:mx-0">
							<li className="text-gray-500">{posted_on.date}</li>
							<li className="text-gray-500">{posted_on.time}</li>
						</ul>
					</div>
					{/* <Link href={"/dashboard/admin/reviewsectioncs"}>
						<button className=" bg-orange hover:text-black text-white font-bold py-2 px-4 rounded-lg focus:outline-none mt-4">
							Edi Review
						</button>
					</Link> */}
				</div>
			</div>
		</div>
	);
}
