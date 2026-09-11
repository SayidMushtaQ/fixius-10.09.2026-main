"use client";
import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, ShieldCheck } from "lucide-react";

import { NotFoundData } from "../../handwerker/Pedidos";
import VerificationCard from "./components/verificationCard";

export default function Index() {
	const { GetHandymans } = useUserRequests();
	const [status, setStatus] = useState("unverified");
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = GetHandymans({ pageSize: 10 }, { status: status });
	
	useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });
	
	useEffect(() => {
		refetch();
	}, [status, refetch]);

	const tabs = [
		{ id: "unverified", label: "Ausstehend", icon: Clock, color: "text-primary" },
		{ id: "declined", label: "Abgelehnt", icon: XCircle, color: "text-red-500" },
		{ id: "verified", label: "Verifiziert", icon: CheckCircle2, color: "text-emerald-500" },
	];

	return (
		<div className="w-full p-6 lg:p-10 space-y-10">
			<section>
				<motion.h1 
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="text-3xl lg:text-4xl font-bold text-slate-950 leading-tight font-outfit"
				>
					Überprüfung der <span className="text-primary italic">Handwerker</span>
					<p className="text-lg font-medium text-slate-500 mt-2 font-inter">
						Genehmigung und Validierung neuer Anmeldungen für Administratoren.
					</p>
				</motion.h1>
			</section>

			<div>
				<div className="flex bg-slate-50 p-1.5 rounded-xl w-fit mb-8 shadow-soft border border-slate-100">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = status === tab.id;
						return (
							<button
								key={tab.id}
								className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold font-inter transition-all duration-300 ${
									isActive 
										? `bg-white shadow-soft ${tab.color} scale-105` 
										: "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
								}`}
								onClick={() => setStatus(tab.id)}
							>
								<Icon size={18} />
								{tab.label}
							</button>
						);
					})}
				</div>

				<div className="space-y-6 min-h-[400px]">
					{isLoading || isRefetching ? (
						<div className="flex justify-center items-center h-64">
							<Loader />
						</div>
					) : data?.pages[0]?.data?.length ? (
						<div className="grid grid-cols-1 gap-6">
							{data?.pages.map((page: any, index: number) => (
								<React.Fragment key={index}>
									{page?.data?.map((item: any) => (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.1 }}
											key={item?._id}
										>
											<VerificationCard
												name={item?.company_name}
												time={item?.createdAt}
												message={item?.message}
												documents={item?.documents}
												user={item?.user}
												status={item?.status}
											/>
										</motion.div>
									))}
								</React.Fragment>
							))}
						</div>
					) : (
						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="bg-white rounded-xl p-20 shadow-soft border border-slate-100 text-center"
						>
							<NotFoundData text="Es wurden keine Anfragen in dieser Kategorie gefunden." />
						</motion.div>
					)}
					
					{hasNextPage && (
						<div className="flex justify-center pt-8">
							<button 
								onClick={() => fetchNextPage()}
								className="bg-primary text-white py-2.5 px-8 rounded-lg font-bold font-montserrat shadow-soft hover:bg-black transition-all"
							>
								Mehr laden
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
