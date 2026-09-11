import useOfferRequests from "@/ApiRequests/offer";
import Loader from "@/components/Loader";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";

const JobDetails = ({ offer_id }: { offer_id: string }) => {
	const { GetSingleOffer } = useOfferRequests();
	const { data, isLoading } = GetSingleOffer(offer_id);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="bg-white rounded-lg shadow-md w-full">
					{/* Renderizar imagen del trabajo o imagen por defecto si no hay imagen disponible */}
					{data?.job?.images[0] ? (
						<Image
							src={data?.job?.images[0] || "/default-image.jpg"}
							className="w-full object-cover h-auto rounded-t-lg"
							alt="Nueva oferta de trabajo"
							width={500}
							height={500}
							priority
						/>
					) : (
						<div className="flex flex-col justify-center items-center w-full max-h-[240px] object-contain mx-auto bg-[#eaeaea] rounded-md p-3">
							<BsImage size={160} color="#666666" />
							<p className="text-base 2xl:text-lg font-bold opacity-60">
								Sin imagen
							</p>
						</div>
					)}
					{/* Detalles del trabajo */}
					<section className="py-3 px-4">
						<h1 className="font-bold text-xl text-orange">
							{data?.job?.category}
						</h1>
						<h1 className="text-black">
							{data?.job?.serviceTitle?.service_title}
						</h1>
						{/* Detalles adicionales del trabajo */}
						<section className="w-5/5 flex justify-between">
							{/* Lado izquierdo de los detalles adicionales */}
							<section className="w-2/5 flex flex-col gap-3 pt-20">
								<span>
									M2:{" "}
									{
										data?.job?.additional_details
											?.square_meters
									}
									m2
								</span>
								<span>
									Etagen:{" "}
									{
										data?.job?.additional_details
											?.how_many_floors
									}
								</span>
								<span>
									Anzahl der Zimmer:{" "}
									{
										data?.job?.additional_details
											?.how_many_rooms
									}
								</span>
							</section>
							{/* Lado derecho de los detalles adicionales */}
							<section className="space-y-2 mt-2 w-3/5">
								<h2 className="font-bold text-xl">
									Beschreibung
								</h2>
								<p>{data?.job?.additional_job_description}</p>
							</section>
						</section>
						{/* Detalles de ubicación y tiempo */}
						<div className="flex gap-5 items-center justify-between py-2">
							<div className="flex justify-center items-center gap-2">
								Preis: €{data?.price}
							</div>
							<div className="flex justify-center items-center gap-2">
								<CiClock2 />
								<span>
									Veröffentlicht{" "}
									{data?.job
										? formatTimeDifference(
												data?.job.createdAt
										  )
										: ""}
								</span>
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default JobDetails;
