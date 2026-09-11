"use client";
import { Context } from "@/components/Common/DashboardLayout";
import JobPostModal from "@/app/components/landingPage/JobPostModal";
import { useContext, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "@/components/ui/LazySlider";
import type Slider from "react-slick";
import { ServiceCard } from "../../components/ServiceCards";
import Header from "./components/Header";

export default function FindHanyman() {
	const slider = useRef<Slider>(null);
	const { toggleSideBar } = useContext(Context);
	const [servicePopUp, setServicePopUP] = useState<boolean>(false);
	const [serviceCardData, setServiceCardData] = useState<string[]>([]);

	return (
		<div className={`w-full my-12`}>
			<h1 className="text-3xl text-center font-bold font-outfit text-slate-950 max-w-2xl mx-auto leading-tight">
					Erhalte ein <span className="text-primary italic">kostenloses Angebot</span> von einem Profi
					</h1>
					<h2 className="text-center mt-6 font-bold text-xl md:text-2xl mb-8 text-slate-800 font-outfit">
					Wähle den passenden Service für deinen Auftrag:
					</h2>


			<div className="flex justify-between items-center lg:mx-20 my-10 flex-wrap flex-row-reverse">
				<Header />
			</div>
			<div className="mt-3  lg:px-20 py-3 relative">
				<ServiceCard
					slider={slider}
					slidesToShowCustom={4}
					setServicePopUP={setServicePopUP}
					setServiceCardData={setServiceCardData}
				/>
				<div
					className="text-4xl sm:flex justify-between items-center top-[50%] absolute right-4 left-4 lg:right-12 lg:left-12 hidden"
					aria-hidden="true">
					<button
						className="cursor-pointer bg-white rounded-full text-primary shadow-premium border border-slate-100 hover:bg-primary hover:text-white transition-all p-2 z-10 -ml-4"
						onClick={() => slider.current?.slickPrev()}
						aria-label="Desplazamiento a la izquierda"
						aria-hidden="true">
						<IoIosArrowBack className="text-[24px]" />
					</button>
					<button
						className="cursor-pointer bg-white rounded-full text-primary shadow-premium border border-slate-100 hover:bg-primary hover:text-white transition-all p-2 z-10 -mr-4"
						onClick={() => slider.current?.slickNext()}
						aria-label="Desplazamiento a la derecha"
						aria-hidden="true">
						<IoIosArrowForward className="text-[24px]" />
					</button>
				</div>
			</div>
			<JobPostModal
				isOpen={servicePopUp}
				onClose={() => setServicePopUP(false)}
				serviceCardData={serviceCardData}
			/>
		</div>
	);
}
