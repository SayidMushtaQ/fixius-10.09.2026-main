"use client";
import React, { FC, useState } from "react";
import { toast } from "sonner";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

interface DeclineReasonProps {
	isOpen: boolean;
	onClose: () => void;
	isPending: boolean;
	handleUpdate: (status: string, reason: string) => void;
}

const DeclineReason: FC<DeclineReasonProps> = ({
	isOpen,
	onClose,
	isPending,
	handleUpdate,
}) => {
	const [selectedReason, setSelectedReason] = useState<string>("");
	const [customReason, setCustomReason] = useState<string>("");

	const reasons: string[] = [
		"Información incompleta",
		"Documentos faltantes",
		"Incumplimiento de requisitos",
		"Violación de los Términos de Servicio",
		"Oferta de servicio poco clara",
		"Preocupaciones de seguridad",
		"Falta de experiencia o cualificaciones",
		"Problemas de desempeño en el pasado",
		"Otro",
	];

	const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedReason(e.target.value);
		if (e.target.value !== "Otro") {
			setCustomReason("");
		}
	};

	const handleCustomReasonChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCustomReason(e.target.value);
	};

	const handleSubmit = () => {
		if (selectedReason === "Otro" && customReason.trim() === "") {
			toast.error("Por favor, ingrese un motivo personalizado.");
			return;
		}
		const finalReason =
			selectedReason === "Otro" ? customReason : selectedReason;
		handleUpdate("declined", finalReason);
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Modal de Motivo de Rechazo"
			className="mx-auto relative p-5 my-32 p-6 rounded-md bg-white shadow-lg outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
				<FaTimes size={20} />
			</button>
			<div className="flex flex-col items-center">
				<h2 className="text-xl font-semibold mb-4">
					Wählen Sie einen Ablehnungsgrund aus:
				</h2>
				<select
					value={selectedReason}
					onChange={handleReasonChange}
					className="border p-2 mb-4">
					<option defaultValue={""} value={""}>
						Wählen Sie einen Grund aus
					</option>
					{reasons.map((reason) => (
						<option key={reason} value={reason}>
							{reason}
						</option>
					))}
				</select>
				{selectedReason === "Otro" && (
					<input
						type="text"
						placeholder="Ingrese un motivo personalizado"
						value={customReason}
						onChange={handleCustomReasonChange}
						className="border p-2 mb-4 w-full disabled:opacity-50"
					/>
				)}
				<button
					disabled={isPending}
					onClick={handleSubmit}
					className="globalbtn">
					Enviar
				</button>
			</div>
		</Modal>
	);
};

export default DeclineReason;
