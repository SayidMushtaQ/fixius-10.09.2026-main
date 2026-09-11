"use client";
import useUserRequests from "@/ApiRequests/user";
import clientError from "@/helper/clientError";
import useChat from "@/hooks/useChat";
import useOnChangeUploadImages from "@/hooks/useUploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BsBook, BsCardImage } from "react-icons/bs";

const UploadDocumens = ({
	onClose,
	convId,
	receiverId,
	company_name,
}: {
	onClose: any;
	receiverId: string;
	convId: string;
	company_name: string;
}) => {
	const {
		sendMessage,
		inputMessage,
		setInputMessage,
		updateSeenStatus,
		isSending,
	} = useChat();

	// State for trade license images
	const [tradeLincence, setTradeLincence] = useState<string[]>([]);
	useEffect(() => {
		setInputMessage(
			`Dokument hochgeladen: ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/handymanverification/${company_name}`
		);
	}, [setInputMessage,company_name]);
	// State for craft card images
	const [craftCard, setCraftCard] = useState<string[]>([]);

	// User requests hooks
	const { UpdateCraftman } = useUserRequests();

	// State for image uploading status and handling
	const { isImgUploading, handleImageUpload } = useOnChangeUploadImages();

	// Error handling function
	const handleError = clientError();

	// Router instance
	const router = useRouter();

	// Function to handle trade license image upload
	const handleTradeLiecenseUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const data = await handleImageUpload(event);
		if (data && data.length > 0) {
			setTradeLincence([data[0]]);
		}
	};

	// Function to handle craft card image upload
	const handleCraftCardUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const data = await handleImageUpload(event);
		if (data && data.length > 0) {
			setCraftCard([data[0]]);
		}
	};

	// Function to handle form submission
	const handleSubmit = async (e: any) => {
		try {
			const userDocument: any = [];
			craftCard.forEach((i) =>
				userDocument.push({
					document_type: "craft_card",
					document_link: i,
				})
			);

			tradeLincence.forEach((i) =>
				userDocument.push({
					document_type: "trade_licence",
					document_link: i,
				})
			);
			if (userDocument.length === 0) {
				return toast.error("Es muss ein Dokument hochgeladen werden");
			}

			await UpdateCraftman.mutateAsync(
				{ document: userDocument },
				{
					onSuccess(data) {
						sendMessage(convId, receiverId);
						onClose();
						toast.success("Dokument gesendet");
					},
				}
			);
		} catch (error) {
			handleError(error);
		}
	};
	return (
		<div>
			<div className="flex flex-col md:flex-col w-full">
				<div>
					<>
						<div className="ml-10 space-y-4 flex items-center flex-row gap-5 justify-center">
							<div className="flex flex-col sm:flex-row">
								<label
									htmlFor="dropzone-file1"
									className={`flex flex-col items-center ${
										isImgUploading
											? "cursor-not-allowed"
											: "cursor-pointer"
									}  justify-center w-28 h-28 border-2 border-orange rounded-xl `}
									style={{
										width: 284,
										height: 226,
										background: "rgba(255, 106, 24, 0.3)",
									}}>
									<div className="flex  items-center justify-center text-black pt-5 pb-6 ">
										<BsBook
											className="font-bold text-black-500 text-2xl"
											style={{
												marginRight: 5,
											}}
										/>{" "}
										<span>
											{isImgUploading
												? "Upload"
												: "Gewerbeanmeldung hochladen"}
										</span>
									</div>
									<input
										type="file"
										onChange={handleTradeLiecenseUpload}
										id="dropzone-file1"
										name="myFile1"
										disabled={isImgUploading}
										title="bilder hochladen"
										aria-label="bilder hochladen"
										accept="image/*"
										className="hidden"
										multiple
									/>
								</label>

								<div className="flex items-center sm:space-x-4 mt-3 sm:mt-0 flex-wrap">
									{tradeLincence.map(
										(dataUrl: string, index: number) => {
											if (tradeLincence[0] !== "") {
												return (
													<Image
														src={dataUrl}
														alt={`Bild hochgeladen ${index}`}
														width={110}
														height={110}
														key={index}
														className="object-cover m-1 w-28 h-auto"
													/>
												);
											}
										}
									)}
								</div>
							</div>
							<div
								style={{ marginTop: 0 }}
								className="flex flex-col sm:flex-row mt-0">
								<label
									htmlFor="dropzone-file2"
									className={`flex flex-col items-center 		${
										isImgUploading
											? "cursor-not-allowed"
											: "cursor-pointer"
									}  justify-center w-28 h-28 border-2 border-orange rounded-xl cursor-pointer`}
									style={{
										width: 284,
										height: 226,
										background: "rgba(255, 106, 24, 0.3)",
									}}>
									<div className="flex  items-center justify-center text-black pt-5 pb-6 ">
										<BsCardImage
											className="font-bold text-black-500 text-2xl"
											style={{
												marginRight: 5,
											}}
										/>{" "}
										<span>
											{isImgUploading
												? "Hochladen"
												: "Handwerkskarte hochladen"}
										</span>
									</div>
									<input
										type="file"
										onChange={handleCraftCardUpload}
										id="dropzone-file2"
										name="myFile2"
										title="bilder hochladen"
										aria-label="bilder hochladen"
										accept="image/*"
										className="hidden"
										multiple
									/>
								</label>
								<div className="flex items-center sm:space-x-4 mt-3 sm:mt-0 flex-wrap">
									{craftCard.map(
										(dataUrl: string, index: number) => (
											<Image
												src={dataUrl}
												alt={`Uploaded Image ${index}`}
												width={110}
												height={110}
												key={index}
												className="object-cover m-1 w-28 h-auto"
											/>
										)
									)}
								</div>
							</div>
						</div>
					</>
				</div>
				<div className="py-5 px-2  gap-2">
					<div className="flex justify-end w-full  items-center gap-5">
						<button
							disabled={UpdateCraftman.isPending}
							onClick={handleSubmit}
							className="bg-orange px-7 py-3 rounded-xl text-md disabled:opacity-50 font-semibold text-white cursor-pointer">
							Senden
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadDocumens;
