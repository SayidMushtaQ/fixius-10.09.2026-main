"use client";
import { ServiceCard } from "@/components/ServiceCard";
import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";

import CraftsmanRegistrationCard from "./CraftsmanRegistrationCard";

export default function RegisterForms({
	setSelectCard,
	selectCardError,
	selectCard,
	setSelectCardError,
}: {
	setSelectCard: React.Dispatch<React.SetStateAction<string[]>>;
	selectCardError: string;
	selectCard: string[];
	setSelectCardError: React.Dispatch<React.SetStateAction<string>>;
}) {
	const slider = useRef<SliderCrouserl>(null);
	return (
		<div className="register-card-box max-w-5xl mx-auto space-y-8">
			{/* Standalone Craftsman Registration Hero Card */}
			<CraftsmanRegistrationCard className="w-full" />
			
			<div className="relative rounded-2xl sm:px-3 my-3 mb-5">
				<ServiceCard
					slider={slider}
					slidesToShowCustom={6}
					setSelectCard={setSelectCard}
					selectCard={selectCard}
					setSelectCardError={setSelectCardError}
				/>
				{selectCardError && (
					<p className="absolute text-sm text-red-500 left-0 mt-1">
						{selectCardError}
					</p>
				)}
				<div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 lg:-mx-12">
					<button
						className="pointer-events-auto cursor-pointer bg-white/80 backdrop-blur-md rounded-full text-slate-600 shadow-premium border border-slate-200/50 hover:text-primary hover:border-primary/30 transition-all p-3 z-10"
						onClick={() => slider.current?.slickPrev()}
						aria-label="Nach links scrollen"
					>
						<IoIosArrowBack size={20} />
					</button>
					<button
						className="pointer-events-auto cursor-pointer bg-white/80 backdrop-blur-md rounded-full text-slate-600 shadow-premium border border-slate-200/50 hover:text-primary hover:border-primary/30 transition-all p-3 z-10"
						onClick={() => slider.current?.slickNext()}
						aria-label="Nach rechts scrollen"
					>
						<IoIosArrowForward size={20} />
					</button>
				</div>
			</div>




		</div>
	);
}
