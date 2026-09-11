import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
interface CustomConfirmPromptProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading: boolean;
	confirmLabel?: string;
	cancelLabel?: string;
	promptText?: string;
}

const CustomConfirmPrompt: React.FC<CustomConfirmPromptProps> = ({
	isOpen,
	onConfirm,
	onCancel,
	confirmLabel = "Confirmar", // Translated
	cancelLabel = "Cancelar", // Translated
	isLoading,
	promptText = "¿Está seguro de que desea realizar esta acción?", // Translated
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onCancel}
			contentLabel="Modal de Confirmación de Acción" // Translated
			className=" mx-auto my-32 relative p-6 rounded-md bg-white shadow-lg z-100 outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				className="absolute top-5 right-5 text-gray-600 hover:text-red-500 focus:outline-none"
				onClick={onCancel}>
				<FaTimes />
			</button>

			<div className="flex flex-col gap-4 items-end justify-end md:pr-10">
				<p className="text-[17px]">{promptText}</p>
				<div className="flex gap-3">
					<button
						disabled={isLoading}
						onClick={() => onCancel()}
						className="bg-red-400 hover:bg-orange text-center disabled:opacity-40 text-white font-bold py-2 px-4 rounded w-50">
						{cancelLabel}
					</button>
					<button
						disabled={isLoading}
						onClick={() => onConfirm()}
						className="bg-orange hover:bg-orange text-center disabled:opacity-40 text-white font-bold py-2 px-4 rounded w-50">
						{confirmLabel}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default CustomConfirmPrompt;
