"use client";
import useOfferRequests from "@/ApiRequests/offer";
import { Context } from "@/components/Common/DashboardLayout";
import Loader from "@/components/Loader";
import { statuses } from "@/constants/Dashboard/handwerker";
import { nodataImg } from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import Image from "next/image";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, Search } from "lucide-react";
import Orders from "./components/Orders";
import StatusButton from "./components/StatusButton";

export const NotFoundData = ({ text }: { text: string }) => {
	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-6">
			<div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center text-gray-300">
				<Search size={48} />
			</div>
			<div className="space-y-2">
				<h2 className="text-2xl font-black text-secondary">{text}</h2>
				<p className="text-gray-400 max-w-xs mx-auto">Versuchen Sie es mit anderen Filtern oder schauen Sie später wieder vorbei.</p>
			</div>
		</div>
	);
};

export default function Index() {
	const { GetJobOffer } = useOfferRequests();

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
		GetJobOffer({ pageSize: 5 }, {});

	useScrollFetch({
		hasNextPage,
		fetchNextPage,
		isWindowScroll: true,
	});

	return (
		<div className="w-full p-6 lg:p-10 space-y-10">
			<section>
				<motion.h1 
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="text-4xl font-black text-secondary leading-tight"
				>
					Ihre Handwerksreise:{" "}
					<span className="text-orange">Auftragshistorie</span>
					<p className="text-lg font-medium text-gray-400 mt-2">
						Verfolgen Sie Ihre Angebote und deren aktuellen Status.
					</p>
				</motion.h1>

				<div className="flex gap-2 flex-wrap justify-end mt-8">
					{statuses?.slice(1, 6)?.map((status, idx) => (
						<StatusButton
							showIcons={false}
							key={idx}
							status={status}
						/>
					))}
				</div>
			</section>

			<div className="space-y-6 min-h-100">
				{data?.pages[0]?.data?.length > 0 ? (
					data?.pages.map((page, pageIndex) => (
						<React.Fragment key={pageIndex}>
							{page?.data?.map((item: any, idx: number) => (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.1 }}
									key={item._id}
									className="bg-white rounded-3xl shadow-premium border border-gray-100 hover:border-orange/20 transition-all overflow-hidden"
								>
									<Orders
										key={item._id}
										status={item.status}
										listingId={item?.job?.listingId}
										isNew={item?.isNew}
										title={
											item?.job?.serviceTitle
												?.service_title ||
											item?.job?.serviceTitle?.other_title
										}
										jobDescription={
											item?.job?.additional_job_description
										}
										price={item?.price}
										postedOn={item?.createdAt || ""}
										jobId={item?.job?._id || ""}
										offerId={item?._id || ""}
										clientId={item?.client?._id || ""}
									/>
								</motion.div>
							))}
						</React.Fragment>
					))
				) : isFetching ? (
					<div className="flex justify-center py-20">
						<Loader />
					</div>
				) : (
					<div className="bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden">
						<NotFoundData text="Keine Aufträge vorhanden." />
					</div>
				)}

				{hasNextPage && (
					<div className="flex justify-center pt-8">
						<button 
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							className="btn-secondary py-3 px-8 flex items-center gap-2"
						>
							{isFetchingNextPage ? <Loader /> : "Mehr laden"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
