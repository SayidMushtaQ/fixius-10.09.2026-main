"use client";
import useUserRequests from "@/ApiRequests/user";
import { Context } from "@/components/Common/DashboardLayout";
import AddServices from "@/components/Modals/AddServiceModal";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import EditBusinessText from "@/components/Modals/EditDescription";
import dynamic from "next/dynamic";
// Lazy-load the lightbox (yet-another-react-lightbox + its CSS) so it only
// downloads when the user actually opens an image, not on page load.
const ImageViewer = dynamic(() => import("@/components/Modals/ImageViewer"), {
	ssr: false,
});
import UploadImagesModal from "@/components/Modals/UploadImageModal";
import { ServiceCards } from "@/constants/landingPage";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/logout";
import useMultipleImageUploader from "@/hooks/useMultipleImageUploader";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { BiUpload } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import EditProfile from "./components/EditProfile";
import ServiceList from "./components/ServiceList";

const dummyText = `Lorem Ipsum ist einfach fiktiver Text aus der Druck- und Satzindustrie. 
Lorem Ipsum ist seit den 1500er Jahren der Standard-Fiktivtext der Branche, 
als ein unbekannter Drucker eine Sammlung von Lettern nahm und sie durcheinanderbrachte, 
um ein Musterbuch zu erstellen. Es hat nicht nur fünf Jahrhunderte überdauert, 
sondern auch den Sprung in die elektronische Satztechnik, wobei es im Wesentlichen unverändert geblieben ist.`;

export default function Index() {
	// State hooks
	const [selectCard, setSelectCard] = useState<string[]>([]);
	const [openUploadModals, setOpenUploadModals] = useState(false);
	const [index, setIndex] = useState(-1);
	const [isOpen, setIsOpen] = useState("");
	const [isOpenEditText, setIsOpenEditText] = useState(false);
	const [isConfirmDelete, setIsConfirmDelete] = useState(false);

	// Context and hook initialization
	const { toggleSideBar } = useContext(Context);
	const { userData, getLoginUser } = useAuth();
	const { UpdateCraftman, DeleteCraftman } = useUserRequests();
	const logout = useLogout();

	// Multiple image uploader hook
	const {
		setBase64Images,
		base64Images,
		isUploading,
		handleFileChange,
		handleUploadImages,
	} = useMultipleImageUploader();

	// User data
	const userService = userData[0]?.craftsman?.services;
	const images = userData[0]?.craftsman?.images;
	const text = userData[0]?.craftsman?.description;

	// Filtered user service list
	const userServiceList = ServiceCards.filter((i) =>
		userService?.includes(i.shortText)
	);

	// Remove image or service based on identifier
	const handleRemove = async (index: number, identifier: string) => {
		const updatedImage = images?.filter((i, ind) => ind !== index);
		const updateServices = userServiceList
			.filter((i, ind) => ind !== index)
			.map((i) => i.shortText);

		try {
			let data = {};
			if (identifier === "images") {
				data = {
					images: updatedImage,
				};
			}

			if (identifier === "services") {
				data = {
					services: updateServices,
				};
			}

			// Update user data after removing image or service
			await UpdateCraftman.mutateAsync(data, {
				onSuccess(data) {
					getLoginUser();
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Update business text and refresh user data
	const updateBusinessText = async (description: string) => {
		try {
			await UpdateCraftman.mutateAsync(
				{ description },
				{
					onSuccess(data) {
						toast.success(data.message);
						getLoginUser();
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	// On handle profile detele confirm
	const handleProfileDelete = async () => {
		try {
			await DeleteCraftman.mutateAsync(null, {
				onSuccess(data) {
					toast.success(data.message);
					logout();
				},
			});
		} catch (error: any) {
			const errorRes = error?.response?.data;
			if (errorRes) {
				toast.error(errorRes.error);
			} else toast.error(error.message);
		}
	};

	// On cancel profile detele confirm
	const handleCancelProfileDelete = () => setIsConfirmDelete(false);

	// Open image upload modal when base64Images change
	useEffect(() => {
		base64Images?.length > 0 && setOpenUploadModals(true);
	}, [base64Images]);

	return (
		<div className={`w-full`}>
			{/* Personalize profile section */}
			<section className="text-center flex justify-center flex-col items-center my-8">
				<h1 className="font-bold text-2xl lg:text-3xl text-slate-950 font-outfit">
					Passen Sie Ihr Profil an:{" "}
					<span className="text-primary italic">
						Verwalten Sie Ihre Informationen
					</span>
				</h1>
			</section>

			{/* EditProfile component */}
			<EditProfile />

			{/* About Business section */}
			<section className="w-full text-center flex  justify-between md:justify-start md:gap-5 items-center mb-4 mt-8">
				<h1 className="font-bold lg:text-2xl text-xl text-slate-950 font-outfit">
						Über <span className="text-primary italic">das Unternehmen</span>
						</h1>
				<button
					onClick={() => setIsOpenEditText(true)}
					className="bg-primary px-6 py-2.5 font-bold font-montserrat flex items-center text-white rounded-lg transition-all hover:bg-black shadow-soft">
					Bearbeiten <BsPencil className="ml-2 text-white" />
				</button>
			</section>

			{/* Business description */}
			<section>
				{" "}
				<p className="text-slate-600 font-inter font-medium leading-relaxed max-w-4xl">{text ? text : dummyText}</p>
				{/* Photos section */}
				<section className="text-center flex justify-between items-center mb-4 mt-8 border-t border-slate-100 pt-8">
					<h1 className="font-bold lg:text-2xl text-xl text-slate-950 font-outfit">
						Bilder
					</h1>
				</section>
				{/* Image display and upload section */}
				<section className="flex flex-wrap items-center flex-row gap-4">
					{/* Display existing images */}
					{images?.length && images?.length > 0 ? (
						<>
							{images?.map((imgSrc, idx) => (
								<div className="relative  group" key={idx}>
									<Image
										onClick={() => setIndex(idx)}
										src={imgSrc}
										alt=""
										width={100}
										height={100}
										className="rounded-xl w-32 h-32  cursor-pointer group-hover:opacity-75 bg-black transition-opacity"
									/>
									<button
										onClick={() =>
											handleRemove(idx, "images")
										}
										className="hidden group-hover:block absolute bg-gray-700 top-3 right-3 rounded items-center justify-center">
										<MdDelete className="text-white text-xl cursor-pointer" />
									</button>
								</div>
							))}
						</>
					) : (
						// Display default image if no images exist
						<Image
							alt=""
							width={200}
							height={150}
							src={
								"https://www.svgrepo.com/show/357001/add-image.svg"
							}
						/>
					)}

					{/* Upload images label and input */}
					{(images?.length as number) < 9 && (
						<label
							className={`bg-primary flex h-fit items-center ms-5 px-6 py-2.5 cursor-pointer font-bold font-montserrat text-white rounded-lg transition-all hover:bg-black shadow-soft`}>
							Hochladen <BiUpload className="ml-2 text-white" />
							<input
								type="file"
								onChange={handleFileChange}
								id="dropzone-file1"
								name="myFile1"
								title="upload images"
								aria-label="upload images"
								accept="image/*"
								className="hidden"
								multiple
							/>
						</label>
					)}
				</section>
				{/* Services section */}
				<section className="text-center flex justify-between items-center mb-4 mt-8 border-t border-slate-100 pt-8">
					<h1 className="font-bold lg:text-2xl text-xl text-slate-950 font-outfit">
						Dienstleistungen
					</h1>
				</section>
				{/* Display list of services */}
				<section className="flex flex-wrap items-center">
					<ServiceList
						data={userService || []}
						handleRemove={handleRemove}
					/>

					{/* View More Card */}
					<div
						className={`w-16 h-16 bg-primary cursor-pointer m-3 px-3 flex justify-center items-center text-center flex-col py-5 rounded-xl shadow-soft h-[4rem] transition-all hover:bg-black hover:scale-105`}>
						<button
							disabled={userService?.length === 12}
							onClick={() => setIsOpen("open")}
							className="w-20 h-20 bg-transparent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center">
							<span className="text-white text-4xl">+</span>
						</button>
					</div>
				</section>
				{/* Delete Profile button */}
				<section className="my-10 flex justify-end">
					<button
						onClick={() => setIsConfirmDelete(true)}
						className="bg-slate-950 text-white px-6 py-2.5 rounded-lg font-bold font-montserrat transition-all hover:bg-red-600 shadow-soft">
						PROFIL LÖSCHEN
					</button>
				</section>
			</section>

			{/* Modals */}

			{/* EditBusinessText modal */}
			<EditBusinessText
				currentDescription={text || dummyText}
				onUpdateDescription={updateBusinessText}
				isOpen={isOpenEditText}
				onClose={() => setIsOpenEditText(false)}
			/>

			{/* Images Upload Modal */}
			<UploadImagesModal
				handleFileChange={handleFileChange}
				handleUploadImages={handleUploadImages}
				setBase64Images={setBase64Images}
				isOpen={openUploadModals}
				setIsOpen={setOpenUploadModals}
				base64Images={base64Images}
				isUploading={isUploading}
			/>

			{/* AddServices modal */}
			<AddServices
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setSelectCard={setSelectCard}
				selectCard={selectCard}
			/>

			{/* ImageViewer modal — only mount (and fetch its chunk) once opened */}
			{index >= 0 && (
				<ImageViewer
					index={index}
					setIndex={setIndex}
					images={images || []}
				/>
			)}

			<CustomConfirmPrompt
				isLoading={DeleteCraftman.isPending}
				isOpen={isConfirmDelete}
				onCancel={handleCancelProfileDelete}
				onConfirm={handleProfileDelete}
				promptText="Sind Sie sicher, dass Sie dieses Profil löschen möchten?"

			/>
		</div>
	);
}
