"use client";
import ServicePopUpWrapper from "@/components/Profile/components/ServicePopUpWrapper";
import { ServicesTitle } from "@/constants/landingPage/ServicesTitle";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const serviceCardPopUPData: serviceCardPopUPDataType = {
	serviceTitle: {
		service_title: "",
		square_meters: "",
	},
	additional_details: {
		square_meters: "",
		how_many_rooms: "",
		how_many_floors: "",
	},
	additional_job_description: "",
	images: [],
	location: "",
	working_schedule: "",
	contactDetails: {
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
	},
};
export default function ServicePage({
	setServicePopUP,
	serviceCardData,
}: {
	setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
	servicePopUp: boolean;
	serviceCardData?: string[];
}) {
	const [sendData, setSentData] = React.useState<boolean>(false);
	const [serviceTitle, setServiceTitles] = useState<string[]>([]);
	const params = useParams();
	const route = useRouter();
	if (sendData) {
		//All service card pop up data
		console.log(serviceCardPopUPData);
		setServicePopUP(false);
	}
	useEffect(() => {
		if (serviceCardData) {
			try {
				const serviceKey = Object.keys(ServicesTitle).filter(
					(item) =>
						item.toLocaleLowerCase() ===
						serviceCardData[1]
							.replaceAll("-", "_")
							.toLocaleLowerCase()
				);
				const getTitle = ServicesTitle[serviceKey.join()];
				setServiceTitles(getTitle);
			} catch (err) {
				console.log(err);
				window.alert("Something going wrong!!");
			}
		}
	}, [serviceCardData]);
	return (
		<div className="Container">
			<div className="max-w-[85rem] mx-auto  lg:mt-10 mt-5 shadow-md mb-10 bg-white rounded-md">
				{serviceCardData ? (
					<div className="flex justify-center items-center bg-orange bg-opacity-50 flex-col py-2 px-2  rounded-t-md">
						<div className="bg-white shadow flex justify-center items-center flex-col py-2 rounded-lg px-3">
							<Image
								src={`/ServiciosIcon/${
									serviceCardData && serviceCardData[1]
								}.svg`}
								className="object-contain w-14 sm:w-16 md:w-[4.5rem]"
								alt={(params?.slug as string) || "service"}
								width={70}
								height={70}
							/>
							<h1 className="text-sm md:text-lg">
								{serviceCardData && serviceCardData[0]}
							</h1>{" "}
							{/*Name will be fetch from database...*/}
						</div>
					</div>
				) : (
					<div className="bg-orange bg-opacity-50 w-full py-10 rounded-t-md" />
				)}
				<div className="pb-3">
					<ServicePopUpWrapper
						setServicePopUP={setServicePopUP}
						serviceCardPopUPData={serviceCardPopUPData}
						setSentData={setSentData}
						serviceTitle={serviceTitle}
					/>
				</div>
			</div>
		</div>
	);
}
