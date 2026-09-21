"use client";
import { ServicesTitle } from "@/constants/landingPage/ServicesTitle";
import React, { useState } from "react";
interface EditPopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (
		newTitle: string,
		newParagraph: string,
		newDate: string,
		newTime: string,
		jobId: string
	) => void;
	jobId?: string;
	initialTitle: string;
	initialParagraph: string;
	initialDate: string;
	initialTime: string;
	imagesData: any[];
	isUpdatingJobLoading: boolean;
}

const EditPopup: React.FC<EditPopupProps> = ({
	isOpen,
	onClose,
	onSave,
	jobId,
	initialTitle,
	initialParagraph,
	initialDate,
	initialTime,
	imagesData,
	isUpdatingJobLoading,
}) => {
	const [newTitle, setNewTitle] = useState<string>(initialTitle);
	const [newParagraph, setNewParagraph] = useState<string>(initialParagraph);
	const [newDate, setNewDate] = useState<string>(initialDate);
	const [newTime, setNewTime] = useState<string>(initialTime);

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(newTitle, newParagraph, newDate, newTime, jobId as string);
	};

	const [page1Data, setPage1Data] = useState<Page1DataType>({
		//Page1 data
		service_title: "",
		square_meters: "",
	});
	const serviceTitle = ServicesTitle.Assembly_service;
	const [titleError, handleTitleError] = useState<string>("");
	return (
		<div
			className={`fixed inset-0 flex items-center justify-center ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			} transition-opacity duration-300`}>
			<div className="fixed inset-0 z-50 flex items-center justify-center top-20">
				<div className="bg-white p-4 rounded-md shadow-lg ">
					{/* <EditTitle /> */}
				</div>
			</div>
			<div
				className={`fixed inset-0 bg-black opacity-25 ${
					isOpen ? "opacity-100" : "opacity-0"
				} transition-opacity duration-300`}></div>
		</div>
	);
};

export default EditPopup;
