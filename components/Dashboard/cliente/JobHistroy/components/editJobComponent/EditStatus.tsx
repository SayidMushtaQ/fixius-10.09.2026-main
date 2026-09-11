import useUpdateJobpost from "@/hooks/useUpdateJob";
import EditModal from ".";
// import { EditModalProps } from "./EditImage";
export interface ExtendEditModal {
	data: any;
	jobId: any;
	isOpen: string;
	setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}
const EditStatus: React.FC<ExtendEditModal> = ({
	isOpen,
	setIsOpen,
	// data,
	jobId,
}) => {
	const { handleUpdateJobPost, isLoading } = useUpdateJobpost(setIsOpen);
	return (
		<EditModal setIsOpen={setIsOpen} isOpen={isOpen}>
			<div className="flex flex-col gap-4 items-end justify-end md:pr-10">
				<p className="text-[17px]">
					Sind Sie sicher, dass Sie diese Anzeige schließen möchten?
				</p>
				<div className="flex gap-3 ">
					<button
						disabled={isLoading}
						onClick={() => setIsOpen("")}
						className="bg-red-400 hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded w-50">
						Abbrechen
					</button>
					<button
						disabled={isLoading}
						onClick={() =>
							handleUpdateJobPost(jobId, {
								status: "close",
							})
						}
						className="bg-orange hover:bg-orange text-center   disabled:opacity-40 text-white font-bold py-2 px-4 rounded w-50">
						Speichern
					</button>
				</div>
			</div>
		</EditModal>
	);
};

export default EditStatus;
