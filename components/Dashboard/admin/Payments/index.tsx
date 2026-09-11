"use client";
import usePlanRequest from "@/ApiRequests/plan";
import ModalStruc from "@/components/Common/ModalStruc";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PaymentTable from "../../handwerker/Gestiondesuscripcion/components/table";
import SubscriptionDetails from "./components/showDetails";

export default function Index() {
	const { GetSubscription } = usePlanRequest();
	const [search, setSearch] = useState("");
	const [payment_status, setPayment_status] = useState("pending");
	const {
		data: subscription,
		refetch,
		isFetching,
		isLoading,
		isRefetching,
		fetchNextPage,
		hasNextPage,
	} = GetSubscription(
		{ pageSize: 10 },
		{ payment_status: payment_status, paymentId: search }
	);
	const [item, setItem] = useState<any>(null);
	useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });
	const queryClient = useQueryClient();

	useEffect(() => {
		refetch();
	}, [payment_status, search, refetch]);

	return (
		<div>
			<section className=" my-8">
				<h1 className="font-bold text-4xl text-Heading">
					Verwaltung von Zahlungen für Administratoren: &nbsp; &nbsp;{" "}
					<span className="text-orange font-bold">
						Kontrolle und Überwachung{" "}
					</span>
				</h1>
			</section>

			<div className="flex">
				<div className="flex w-2xl p-4 justify-center relative">
					<span
						style={{ left: "2%" }}
						className="absolute inset-y-0 left-0 pl-3 flex items-center">
						<FaSearch className=" ms-4 text-gray-400" />
					</span>
					<input
						style={{ height: 56 }}
						type="text"
						placeholder="Buscar por ID de pago"
						className="pl-10  pr-4 py-2 border rounded-l-2xl focus:outline-none focus:ring "
						onChange={async (e) => {
							setSearch(e.target.value);
						}}
						value={search}
					/>
					<button
						onClick={() => refetch()}
						className=" bg-white px-4 py-2 border rounded-r-2xl focus:outline-none focus:ring text-[#0E172C]">
						Suchen{" "}
					</button>
				</div>

				<div className="flex items-center ">
					<h1 className="text mr-2">Status der Zahlung : </h1>
					<select
						className="p-4 rounded-2xl"
						onChange={(e) => setPayment_status(e.target.value)}>
						<option value={"pending"}>Ausstehend</option>
						<option value={"paid"}>Bezahlt</option>
					</select>
				</div>
			</div>

			<div className=" rounded-md flex flex-wrap flex-col gap-5 mb-20 ">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<PaymentTable
							subscription={subscription}
							onView={(item: any) => setItem(item)}
						/>
						{isRefetching && <Loader />}
					</>
				)}
			</div>

			<ModalStruc
				isOpen={item ? true : false}
				closeModal={() => setItem(null)}>
				<SubscriptionDetails
					{...item}
					onReject={() => {
						setItem(null);
						refetch();
					}}
					refetch={refetch}
				/>
			</ModalStruc>
		</div>
	);
}
