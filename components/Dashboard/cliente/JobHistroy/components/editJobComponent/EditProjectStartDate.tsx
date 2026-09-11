"use client";
import { Page5 } from "@/components/landingPage/components/service/page";
import useUpdateJobpost from "@/hooks/useUpdateJob";
import { useState } from "react";
import EditModal from ".";
import { ExtendEditModal } from "./EditAdditionalDetails";

const EditProjectStartDate: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	data,
	jobId,
}) => {
	const [working_SchedulePage, setWorking_SchedulePage] = useState<
		"quickly" | "in_a_week" | "in_a_3_month" | "flexibel"
	>(data?.toLowerCase().split(" ").join("_"));
	const [working_SchedulePageError, setWorking_SchedulePageError] =
		useState<string>("");
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);

	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<Page5
				setWorking_SchedulePage={setWorking_SchedulePage}
				working_SchedulePage={working_SchedulePage}
				working_SchedulePageError={working_SchedulePageError}
				setWorking_SchedulePageError={setWorking_SchedulePageError}
			/>
			<div className="flex items-center justify-end md:pr-10">
				<button
					disabled={isLoading}
					onClick={() =>
						handleUpdateJobPost(jobId, {
							working_schedule: working_SchedulePage,
						})
					}
					className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
					Speichern
				</button>
			</div>
		</EditModal>
	);
};

export default EditProjectStartDate;
