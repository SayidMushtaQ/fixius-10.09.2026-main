"use client";
import { Page1 } from "@/components/landingPage/components/service/page";
import { ServicesTitle } from "@/constants/landingPage/ServicesTitle";
import useUpdateJobpost from "@/hooks/useUpdateJob";
import React, { useState } from "react";
import EditModal from ".";
import { ExtendEditModal } from "./EditAdditionalDetails";
const EditTitle: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	data,
	jobId,
}) => {
	const serviceTitle =
		ServicesTitle[
			data?.category
				.split(" ")
				.join("_")
				.toLowerCase()
				.replace(/^\w/, (match: any) => match.toUpperCase())
		];
	const [titleError, setTitleError] = useState("");
	const [page1Data, setPage1Data] = useState<Page1DataType>(
		data?.serviceTitle
	);
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);

	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<Page1
				setPage1Data={setPage1Data}
				page1Data={page1Data}
				titleError={titleError}
				handleTitleError={setTitleError}
				serviceTitle={serviceTitle}
			/>
			<div className="flex items-center justify-end md:pr-10">
				<button
					disabled={isLoading}
					onClick={() =>
						handleUpdateJobPost(jobId, { serviceTitle: page1Data })
					}
					className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
					Speichern
				</button>
			</div>
		</EditModal>
	);
};

export default EditTitle;
