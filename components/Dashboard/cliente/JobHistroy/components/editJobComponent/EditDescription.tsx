"use client";
import Page3 from "@/components/Profile/components/page/Step3";
import useUpdateJobpost from "@/hooks/useUpdateJob";
import React, { useState } from "react";
import EditModal from ".";
import { ExtendEditModal } from "./EditAdditionalDetails";
const EditDescription: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	data,
	jobId,
}) => {
	const [textAreaPageData, setTextAreaPageData] = useState<string>(data); //page3 data
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);
	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<Page3
				setTextAreaPageData={setTextAreaPageData}
				textAreaPageData={textAreaPageData}
			/>
			<div className="flex items-center justify-end md:pr-10">
				<button
					disabled={isLoading}
					onClick={() =>
						handleUpdateJobPost(jobId, {
							additional_job_description: textAreaPageData,
						})
					}
					className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
					Speichern
				</button>
			</div>
		</EditModal>
	);
};

export default EditDescription;
