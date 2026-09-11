"use client";
import { Page2 } from "@/components/landingPage/components/service/page";
import useUpdateJobpost from "@/hooks/useUpdateJob";
import { useState } from "react";
import EditModal from ".";
// import { EditModalProps } from "./EditImage";
export interface ExtendEditModal  {
	data: any;
	jobId: any;
	isOpen: string;
	setIsOpen: React.Dispatch<React.SetStateAction<string>>;
};
const EditAdditionalDetails: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	data,
	jobId,
}) => {
	const [numberOfElement, setNumberOfElement] =
		useState<NumberOfElementType>(data);
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);
	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<Page2
				setNumberOfElement={setNumberOfElement}
				numberOfElement={numberOfElement}
			/>
			<div className="flex items-center justify-end md:pr-10">
				<button
					disabled={isLoading}
					onClick={() =>
						handleUpdateJobPost(jobId, {
							additional_details: numberOfElement,
						})
					}
					className="bg-orange hover:bg-orange text-center disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
					Speichern
				</button>
			</div>
		</EditModal>
	);
};

export default EditAdditionalDetails;
