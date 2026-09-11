"use client";
import Page4 from "@/components/Profile/components/page/Step4";
import useUpdateJobpost from "@/hooks/useUpdateJob";
import { useState } from "react";
import EditModal from ".";
import { ExtendEditModal } from "./EditAdditionalDetails";

const EditImage: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	data,
	jobId,
}) => {
	const [imageDataPageData, setImagePageData] = useState<string[]>(data); //page4 data
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);

	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<Page4
				setImagePageData={setImagePageData}
				imageDataPageData={imageDataPageData}
			/>
			<div className="flex items-center justify-end md:pr-10">
				{imageDataPageData && (
					<button
						disabled={isLoading}
						onClick={() =>
							handleUpdateJobPost(jobId, {
								images: [...imageDataPageData, ...data],
							})
						}
						className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
						Speichern
					</button>
				)}
			</div>
		</EditModal>
	);
};

export default EditImage;
