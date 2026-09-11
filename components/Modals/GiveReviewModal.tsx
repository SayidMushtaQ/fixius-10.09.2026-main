"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";

interface Review {
	rating: number;
	comment: string;
}

interface ReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (review: Review) => Promise<void>;
	isLoading: boolean;
	comment?: string;
	rating?: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	isLoading,
	comment: existingComment = "",
	rating: existingRating = 1,
}) => {
	const [rating, setRating] = useState<number>(existingRating);
	const [comment, setComment] = useState<string>(existingComment);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		setComment(existingComment);
		setRating(existingRating);
		setIsUpdating(true);
	}, [existingComment, existingRating]);

	const handleSubmit = async () => {
		// Validate and submit the review
		await onSubmit({ rating, comment });
		// Reset the form
		setRating(1);
		setComment("");
		// Close the modal
		onClose();
	};

	const handleStarClick = (value: number) => {
		setRating(value);
		if (value !== existingRating) {
			setIsUpdating(false);
		} else setIsUpdating(true);
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className=" mx-auto my-32 relative p-6 rounded-md bg-white shadow-lg z-100 outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<div className="p-4 w-[300px]">
				<h2 className="text-xl font-semibold mb-4">Eine Bewertung hinterlassen</h2>
				<div className="mb-4 flex items-center">
					<label htmlFor="rating" className="block font-medium mr-2">
						Calificación:
					</label>
					{[1, 2, 3, 4, 5].map((value) => (
						<button
							key={value}
							onClick={() => handleStarClick(value)}
							className={`text-3xl ${
								value <= rating
									? "text-yellow-400"
									: "text-gray-300"
							} focus:outline-none`}>
							★
						</button>
					))}
				</div>
				<div className="mb-4">
					<label htmlFor="comment" className="block font-medium">
						Kommentar:
					</label>
					<textarea
						id="comment"
						value={comment}
						onChange={(e) => {
							setComment(e.target.value);
							if (e.target.value !== existingComment) {
								setIsUpdating(false);
							} else setIsUpdating(true);
						}}
						className="border border-gray-300 rounded-md p-2 w-full h-20"
					/>
				</div>
				<div className="flex justify-end">
					<button
						onClick={handleSubmit}
						disabled={isLoading || !rating || !comment || isUpdating}
						className="globalbtn">
						Senden
					</button>
					<button
						onClick={onClose}
						disabled={isLoading}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 ml-2 rounded-md">
						Abbrechen
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ReviewModal;
