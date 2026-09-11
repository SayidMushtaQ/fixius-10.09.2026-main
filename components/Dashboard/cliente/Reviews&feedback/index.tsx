"use client";
import useReviewsRequests from "@/ApiRequests/reviews";
import Loader from "@/components/Loader";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import ReviewModal from "@/components/Modals/GiveReviewModal";
import clientError from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { NotFoundData } from "../../handwerker/Pedidos";
import deactivatePng from "../AcceptOffers/components/deactivated.png";
export const deactiveSeal = deactivatePng;

export interface Review {
	_id: string;
	craftsman: {
		_id: string;
		user: {
			_id: string;
			profile_photo: string;
			address: string;
		};
		company_name: string;
	};
	client: {
		_id: string;
		name: string;
	};
	offer: {
		_id: string;
		job: {
			serviceTitle: {
				other_title: string;
				service_title: string;
				square_meters: string;
			};
			listingId: number;
			_id: string;
		};
	};
	reclaimId?: any;
	status: string;
	rating: number;
	comment: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

const ReviewsSection = ({ review: item }: { review: Review }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { UpdateReview, DeleteReview } = useReviewsRequests();
	const queryClient = useQueryClient();
	const handleClientError = clientError();
	const [review, setReview] = useState(item);

	const handleEdit = async ({
		rating,
		comment,
	}: {
		rating: number;
		comment: string;
	}) => {
		if (review.createdAt === review.updatedAt) {
			try {
				await UpdateReview.mutateAsync(
					{
						reviewId: review._id,
						data: { rating, comment },
						notifyUser: review.craftsman.user._id,
					},
					{
						onSuccess(res) {
							toast.success(res.message);
							setReview(res.data);
							queryClient.invalidateQueries({
								queryKey: ["getReviews"],
							});
						},
					}
				);
			} catch (error) {
				handleClientError(error);
			}
		} else toast.error("No se puede actualizar más de una vez");
	};

	const handleDelete = async () => {
		try {
			await DeleteReview.mutateAsync(
				{ notifyUser: review.craftsman.user._id, reviewId: review._id },
				{
					onSuccess(res) {
						toast.success(res.message);
						setReview(res.data);
						queryClient.invalidateQueries({
							queryKey: ["getReviews"],
						});
						setIsDeleting(false);
					},
				}
			);
		} catch (error) {
			handleClientError(error);
		}
	};

	// Optional: Add a fallback check if review.offer is missing (without showing loading message)
	if (!review.offer) {
		// Return nothing or handle missing offer differently
		return null; // Or you could skip rendering this review entirely
	}

	return (
		<div
			id={review.offer._id || 'default-id'} // Use fallback id if review.offer is null
			className="w-full  bg-white rounded-lg p-4 shadow my-4 ">
			<section className="flex items-center justify-between p-1">
				<div className="flex items-center gap-3">
					<Image
						height={50}
						alt="profile"
						width={50}
						className="rounded-full w-12 h-12"
						src={review.craftsman.user.profile_photo}
					/>

					<span className="flex flex-col">
						<span className="font-bold">
							{review.craftsman.company_name}
						</span>
					</span>
				</div>
				<div className="text-normal">
					{review.offer?.job?.serviceTitle?.service_title ||
						review.offer?.job?.serviceTitle?.other_title}
				</div>
				<div className="font-semibold flex flex-col text-sm">
					Fecha: {format(new Date(review.createdAt), "do MMM yy", { locale: de })} a las{" "}
					{format(new Date(review.createdAt), "pp", { locale: de })}{" "}
					{format(new Date(review.createdAt), "pp") !==
						format(new Date(review.updatedAt), "pp") && (
						<span>
							Editado:{" "}
							{format(new Date(review.updatedAt), "do MMM yy", { locale: de })} a las{" "}
							{format(new Date(review.updatedAt), "pp", { locale: de })}{" "}
						</span>
					)}
				</div>
			</section>

			<div className="flex relative md:justify-around md:items-center gap-16 px-7  pb-5 flex-col md:flex-row">
				<div className="flex flex-col justify-center items-center">
					<span>{review.rating}.0 estrellas</span>
					<div className="flex">
						{Array.from({
							length: 5,
						})
							.fill(0)
							.map((item, index) => (
								<span
									key={index}
									className={`text-3xl ${
										index < review.rating
											? "text-yellow-400"
											: "text-gray-400"
									} focus:outline-none`}>
									★
								</span>
							))}
					</div>
				</div>
				<p className="flex items-end justify-start flex-col font-medium text-gray-600 md:w-2/3 w-full">
					{review.comment}
				</p>

				{review.status === "deactive" && (
					<Image
						className="absolute rotate-[-10deg]"
						src={deactiveSeal}
						width={100}
						alt="deactive"
					/>
				)}
			</div>

			{review.status !== "deactive" && (
				<div className="mb-4 flex justify-end p-2 gap-2">
					<button
						onClick={() => {
							if (review.updatedAt !== review.createdAt) {
								return toast.error(
									"Kann nur einmal aktualisiert werden"
								);
							}
							setIsEditing(true);
						}}
						disabled={UpdateReview.isPending}
						className=" bg-orange  text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
						Bewertung bearbeiten
					</button>
					<button
						onClick={() => setIsDeleting(true)}
						className=" bg-orange  text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
						Bewertung deaktivieren
					</button>
				</div>
			)}

			{/* modals */}
			<ReviewModal
				isOpen={isEditing}
				isLoading={UpdateReview.isPending}
				onClose={() => setIsEditing(false)}
				onSubmit={handleEdit}
				rating={review?.rating}
				comment={review?.comment}
			/>

			{/* confirm delete */}
			<CustomConfirmPrompt
				isLoading={DeleteReview.isPending}
				isOpen={isDeleting}
				onCancel={() => setIsDeleting(false)}
				onConfirm={handleDelete}
				promptText="Sind Sie sicher, dass Sie diese Bewertung deaktivieren möchten?"
			/>
		</div>
	);
};

export default function ReviewsFromClients() {
	const { GetReviews } = useReviewsRequests();

	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
		GetReviews({ pageSize: 10 }, "filter");
	useScrollFetch({
		fetchNextPage,
		hasNextPage,
		isWindowScroll: true,
	});

	return (
		<div className="my-2 w-full md:mx-32 min-h-[90vh]">
			<h1 className="text-3xl font-bold">
				<span className="text-orange">Echte Bewertungen:</span> Entdecken Sie
                die Bewertungen und Kommentare der Kunden
			</h1>
			<div className="my-7 mx-5">
				{data?.pages[0]?.data.length > 0 ? (
					data?.pages.map((page, index) => (
						<Fragment key={index}>
							{page?.data.map((review: Review) => (
								<ReviewsSection
									key={review._id}
									review={review}
								/>
							))}
						</Fragment>
					))
				) : isFetching ? (
					<Loader />
				) : (
					<NotFoundData text="Es wurden noch keine Bewertungen oder Kommentare abgegeben." />
				)}

				{hasNextPage && isFetchingNextPage && (
					<div className="w-full  bg-white rounded-lg shadow my-4">
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
}
