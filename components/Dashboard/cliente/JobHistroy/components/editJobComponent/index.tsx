import { ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

interface EditModalProps  {
	children: ReactElement | ReactElement[];
	isOpen:string
	setIsOpen:React.Dispatch<React.SetStateAction<string>>;
};
const EditModal: React.FC<EditModalProps> = ({
	isOpen,
	setIsOpen,
	children,
}) => {
	return (
		<Modal
			isOpen={isOpen ? true : false}
			onRequestClose={() => setIsOpen("")}
			contentLabel="Password Change Recommended Modal"
			className=" mx-auto my-32 relative p-6 rounded-md bg-white shadow-lg z-100 outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				className="absolute top-5 right-5 text-gray-600 hover:text-red-500 focus:outline-none"
				onClick={() => setIsOpen("")}>
				<FaTimes />
			</button>
			{children}
			{/* <div className="flex items-center justify-end md:pr-10">
				<button
					onClick={() => setIsOpen("")}
					className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
					Save
				</button>
			</div> */}
		</Modal>
	);
};

export default EditModal;
