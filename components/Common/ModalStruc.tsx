import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	closeModal: () => void;
}

const ModalStruc: React.FC<ModalProps> = ({ children, isOpen, closeModal }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className="w-fit overflow-hidden mx-auto my-32 p-6 rounded-md bg-white shadow-lg z-100 outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}>
			<div className="relative mx-auto bg-white">
				<button
					className="text-gray-600 hover:text-red-500 w-full focus:outline-none"
					onClick={closeModal}>
					<FaTimes className="w-fit ms-auto" />
				</button>
				{children}
			</div>
		</Modal>
	);
};

export default ModalStruc;
