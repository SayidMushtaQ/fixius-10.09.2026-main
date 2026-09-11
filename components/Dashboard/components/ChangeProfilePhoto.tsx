import useUserRequests from "@/ApiRequests/user";
import { useAuth } from "@/context/AuthContext";
import useImageUploader from "@/hooks/useMultipleImageUploader";
import { toast } from "sonner";
import { MdCameraAlt } from "react-icons/md";

const ChangeProfilePhoto = () => {
	const {
		handleFileChange,
		setBase64Images,
		base64Images,
		handleUploadImages,
		handleOpenWidget,
	} = useImageUploader();
	const { UpdateUser } = useUserRequests();
	const { getLoginUser, userData } = useAuth();
	const user = userData[0];
	const handleChangImage = async () => {
		handleOpenWidget(async (info: any) => {
			const imageUrl = info.secure_url;
			try {
				// update user profile photo
				await UpdateUser.mutateAsync(
					{ profile_photo: imageUrl },
					{
						onSuccess(data) {
							toast.success("Profilfoto erfolgreich aktualisiert!");
							getLoginUser();
						},
					}
				);
			} catch (error) {
				toast.error("Fehler beim Aktualisieren des Profilfotos.");
			}
		});
	};
	return (
		<div className="w-full flex items-center justify-center flex-col bg-white p-8 rounded-xl border border-slate-100 shadow-soft transition-all hover:border-primary/20">
			<label className="cursor-pointer">
				<input
					type="file"
					onChange={handleFileChange}
					id="dropzone-file"
					name="myFile"
					title="Bilder hochladen"
					aria-label="Bilder hochladen"
					accept="image/*"
					className="hidden"
				/>
				<div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-50 shadow-soft overflow-hidden relative group/img">
					{base64Images.length > 0 || user?.profile_photo ? (
						<div className="relative w-full h-full group/img">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={
									base64Images[base64Images.length - 1]?.base64 ||
									user?.profile_photo
								}
								alt=""
								className="h-full w-full object-cover transition-all duration-300 group-hover/img:scale-110 group-hover/img:brightness-75"
							/>
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/20">
								<MdCameraAlt className="text-white text-3xl drop-shadow-md" />
							</div>
						</div>
					) : (
						<div className="flex items-center flex-col justify-center font-bold">
							<MdCameraAlt
								className="cursor-pointer text-gray-500  text-6xl"
								title="Foto ändern"
							/>
							<span>Foto hochladen</span>
						</div>
					)}
				</div>
			</label>
			<button
				onClick={handleChangImage}
				disabled={UpdateUser.isPending}
				className="bg-primary hover:bg-black text-white font-bold font-montserrat disabled:opacity-50 py-2.5 px-6 rounded-lg transition-all active:scale-95 shadow-soft mt-6 w-full">
				Foto ändern
			</button>
		</div>
	);
};

export default ChangeProfilePhoto;
