import Image from "next/image";
import React from "react";
import { GoPlus } from "react-icons/go";

export default function Page4({
	setImagePageData,
	imageDataPageData,
}: {
	setImagePageData: React.Dispatch<React.SetStateAction<string[]>>;
	imageDataPageData: string[];
}) {
	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const files: FileList = event.target.files!;
		const images: string[] = [];
		for (let i = 0; i < files.length; i++) {
			const render: FileReader = new FileReader();
			render.onload = (event: ProgressEvent<FileReader>) => {
				images.push(event.target!.result as string);
				if (images.length === files.length) {
					setImagePageData([...imageDataPageData, ...images]);
				}
			};
			render.readAsDataURL(files[i]);
		}
	};
	return (
		<div className="md:mx-10 lg:mx-20 mx-5  mb-16 mt-5">
			<section className="py-1">
				<h2 className="text-2xl font-bold">Hochgeladene Dokumente</h2>
				<div className="mt-6 flex sm:space-x-5 flex-col sm:flex-row">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-28 h-28 border-2 border-green-500 border-dashed rounded-xl cursor-pointer">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<GoPlus className="font-bold text-green-500 text-2xl" />
						</div>
						<input
							type="file"
							onChange={handleImageUpload}
							id="dropzone-file"
							name="myFile"
							title="upload images"
							aria-label="upload images"
							accept="image/*"
							className="hidden"
							multiple
						/>
					</label>
					<div className="flex items-center sm:space-x-4 mt-3 sm:mt-0 flex-wrap">
						{imageDataPageData.map(
							(dataUrl: string, index: number) => {
								if (imageDataPageData[0] !== "") {
									return (
										<Image
											src={dataUrl}
											alt={`Uploaded Image ${index}`}
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
			</section>
		</div>
	);
}
