"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { statuses } from "@/constants/Dashboard/handwerker";
import { useContext } from "react";
import Orders from "./components/Orders";
import StatusButton from "./components/StatusButton";

const TestData = [
	{
		id: 1,
		title: "Vollständiger Abriss von Gebäuden und Strukturen",
		paragraph:
			"Lorem Ipsum ist einfach ein Blindtext der Druck- und Satzindustrie. Lorem Ipsum ist seit langem der Standard-Blindtext der Branche.",
		price: "250 €",
		postedOn: {
			date: "23-05-2023",
			time: "9:45 Uhr",
			day: "Mi",
		},
		status: "open",
		isNew: false,
	},
	{
		id: 2,
		title: "Vollständiger Abriss von Gebäuden und Strukturen",
		paragraph:
			"Lorem Ipsum ist einfach ein Blindtext der Druck- und Satzindustrie. Lorem Ipsum ist seit langem der Standard-Blindtext der Branche.",
		price: "250 €",
		postedOn: {
			date: "23-05-2023",
			day: "Di",
			time: "9:45 Uhr",
		},
		status: "accepted",
		isNew: true,
	},
];

export default function Index() {
	const { toggleSideBar } = useContext(Context);

	return (
		<div className="w-full">
			<div className={` mx-auto my-12 flex flex-col gap-4`}>
				<section className="my-8">
					<h1 className="font-bold text-4xl text-Heading mb-5">
						Überwachung von Stellenausschreibungen für Administratoren:{" "}
						<span className="text-orange font-bold">
							Kundenprojekte auf einen Blick{" "}
						</span>
					</h1>
					<div className="flex gap-3 justify-end my-3">
						{statuses?.slice(1, 4)?.map((status, idx) => (
							<StatusButton
								showIcons={false}
								key={idx}
								status={status}
							/>
						))}
					</div>{" "}
					<span className="text-orange text-sm underline underline-offset-8 flex justify-end">
						Mehr anzeigen
					</span>
				</section>
				{TestData.map((item, idx) => (
					<div
						key={idx}
						className="bg-white rounded-2xl shadow-md h-full">
						<Orders
							key={item.id}
							status={item.status}
							isNew={item.isNew}
							title={item.title}
							paragraph={item.paragraph}
							price={item.price}
							postedOn={item.postedOn}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
