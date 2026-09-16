"use client";
import { useState } from "react";
import { AllServices } from "./components";

export default function Services() {
	const [orderNewOrOld, setOrderNewOrOld] = useState(false);
	const [orderTime, setOrderTime] = useState("Todos los Servicios");

	const toggleOrderDropdown = () => {
		setOrderNewOrOld(!orderNewOrOld);
	};

	const handleSortOptionClick = (option: any) => {
		setOrderTime(option);
		toggleOrderDropdown();
	};

	return (
		<div className="w-full pt-20 pb-10">
			<div className="col-4 w-4/4 flex justify-end">
				<div className="relative">
					{orderNewOrOld && (
						<div
							className={`bg-white shadow p-3 rounded cursor-pointer mt-1 absolute flex flex-col space-y-5 z-40`}>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Nach neuesten Aufträgen sortieren");
								}}>
								Nach neuesten Aufträgen sortieren
							</span>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Nach ältesten Aufträgen sortieren");
								}}>
								Ordenar por pedido antiguo
							</span>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Nach neuesten oder ältesten Aufträgen sortieren");
								}}>
								Nach neuesten oder ältesten Aufträgen sortieren
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="pt-1 flex pr-6 justify-center">
				<div className="col-8 w-4/4">
					<h2 className="ml-6 font-bold text-2xl md:text-3xl text-center">
						Auswahl von Dienstleistungen nach Ihren Wünschen:
						<br />
						<span className="text-orange text-center">
							Entdecken Sie unsere Handwerksbereiche und vergleichen Sie kostenlose Angebote.
						</span>
					</h2>
				</div>
			</div>
			<AllServices />
		</div>
	);
}
