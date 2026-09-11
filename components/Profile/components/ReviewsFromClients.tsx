const ReviewsSection = ({
	comment,
	star,
}: {
	comment: string;
	star: number;
}) => {
	const starArray = Array.from({ length: 5 }).fill(0);
	return (
		<div className="w-full bg-white rounded-lg shadow my-4 ">
			<div className="flex  md:items-center gap-16 px-16 py-16 flex-col md:flex-row">
				<div className="flex justify-center items-center space-y-3">
					<div className="flex items-center  ">
						{starArray.map((item, index) => (
							<span
								key={index}
								className={`text-3xl length
								${
								 index < star
										? "text-yellow-400"
										: "text-gray-400"
								} focus:outline-none`}>
								★
							</span>
						))}
						{star > 0 && <b className="mx-1">{star}</b>}
					</div>
				</div>
				<p className="font-medium  md:w-2/3 w-full">
					{comment || <b>Keine Bewertung verfügbar</b>}
				</p>
			</div>
		</div>
	);
};
export default function ReviewsFromClients({
	reviews = [
		{
			_id: 1,
			comment: "",
			rating: 0,
		},
	],
}: {
	reviews: any;
}) {
	return (
		<div className="my-2 w-full">
			<h1 className="text-3xl font-bold">
				<span className="text-orange">Kunden</span>-Bewertungen
			</h1>
			<div className="my-7 mx-5">
				{reviews.map(({ _id, comment, rating }: any) => (
					<ReviewsSection key={_id} comment={comment} star={rating} />
				))}
			</div>
		</div>
	);
}
