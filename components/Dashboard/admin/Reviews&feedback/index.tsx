"use client";
import useReviewsRequests from "@/ApiRequests/reviews";
import ModalStruc from "@/components/Common/ModalStruc";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import clientError from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { format } from "date-fns";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { toast } from "sonner";
import JobDetails from "./jobsdetail";
import { HiStar } from "react-icons/hi";
import useApiCaller from "@/hooks/useApiCaller";

const ReviewsSection = ({ item }: { item: any }) => {
	const [offerId, setOfferId] = useState("");
	const [isConfirmAccept, setIsConfirmAccept] = useState(false);
	const [isConfirmRejected, setIsConfirmRejected] = useState(false);
	const [rejectMessage, setRejectMessage] = useState("");
	const [isRejected, setIsRejected] = useState(false);
	const { UpdateReclaim } = useReviewsRequests();

	const handleError = clientError();
	const handleAction = (
		reclaimId: string,
		type: string,
		message: string = ""
	) => {
		try {
			const updateData = {
				decision: {
					type,
					message,
				},
				reclaimId,
			};
			UpdateReclaim.mutateAsync(
				{
					data: updateData,
					notifyUser: item?.review?.craftsman?.user,
				},
				{
					onSuccess(data) {
						toast.success("Reclamación actualizada exitosamente");
						setRejectMessage("");
						setIsConfirmAccept(false);
						setIsRejected(false);
						setIsConfirmRejected(false);
					},
				}
			);
		} catch (error) {
			handleError(error);
		} finally {
			setRejectMessage("");
			setIsConfirmAccept(false);
			setIsRejected(false);
			setIsConfirmRejected(false);
		}
	};
	return (
		<div className="w-full bg-white rounded-lg shadow my-4">
			<section className="flex items-center justify-between p-2">
				<div className="flex items-center gap-3">
					<Link
						className="globalbtn opacity-80"
						href={`/handwerker/${item.review.craftsman.company_name}`}>
						Handwerker ansehen
					</Link>
				</div>
				<div className="text-normal">
					<button
						onClick={() => setOfferId(item.review.offer)}
						className="globalbtn opacity-80">
						Auftrag ansehen
					</button>
				</div>
				<div className="font-semibold">
					Geprüft am: {format(new Date(item.review?.createdAt || Date.now()), "MM/dd/yyyy")}
				</div>
			</section>

			<div className="flex md:justify-around md:items-center gap-16 px-7 pb-5 flex-col md:flex-row">
				<div className="flex flex-col justify-center items-center space-y-3">
					<span>{item.review.rating}.0 Sterne</span>
					<div className="flex">
						{Array.from({ length: 5 })
							.fill(0)
							.map((i, index) => (
								<span
									key={index}
									className={`text-3xl ${
										index < item.review.rating
											? "text-yellow-400"
											: "text-gray-400"
									} focus:outline-none`}>
									★
								</span>
							))}
					</div>
				</div>
				<p className="flex items-end justify-start flex-col font-medium text-gray-600 md:w-2/3 w-full">
					{item?.review?.comment}
				</p>
			</div>
			<hr />
			<div className="font-semibold p-2">
				<p className="">Grund der Reklamation {item?.reason}</p>
				<p className="">
					Reklamiert am: {format(new Date(item?.createdAt || Date.now()), "MM/dd/yyyy")}
				</p>
				{item?.decision?.message && (
					<p className="">
						Ablehnungsgrund:{" "}
						{item?.decision?.message ||
							"No se mencionó ninguna razón"}
					</p>
				)}
			</div>
			<div className="mb-4 flex justify-end p-2 gap-2">
				{item.decision.type === "pending" ? (
					<>
						<button
							onClick={() => setIsConfirmAccept(true)}
							className="bg-orange text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
							Akzeptieren
						</button>
						<button
							onClick={() => setIsRejected(true)}
							className="bg-orange text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
							Ablehnen
						</button>
					</>
				) : (
					<button className="capitalize globalbtn opacity-50">
						{item.decision.type}
					</button>
				)}
			</div>

			{/* modales */}
			<ModalStruc
				isOpen={offerId ? true : false}
				closeModal={() => setOfferId("")}>
				<JobDetails offer_id={offerId} />
			</ModalStruc>

			<CustomConfirmPrompt
				promptText="¿Estás seguro de que quieres aceptar la reclamación?"
				isOpen={isConfirmAccept}
				onConfirm={() => handleAction(item?._id, "accepted")}
				onCancel={() => setIsConfirmAccept(false)}
				isLoading={UpdateReclaim.isPending}
			/>
			<ModalStruc
				isOpen={isRejected}
				closeModal={() => setIsRejected(false)}>
				<div>
					<h1 className="mb-2 font-semibold">Ablehnungsgrund:</h1>
					<textarea
						className="mb-2 min-w-[200px] min-h-[100px] border border-black"
						onChange={(e) =>
							setRejectMessage(e.target.value)
						}></textarea>
					<button
						onClick={() => setIsConfirmRejected(true)}
						className="globalbtn block">
						Senden
					</button>
					<CustomConfirmPrompt
						promptText="Bist du sicher, dass du die Reklamation ablehnen möchtest??"
						isOpen={isConfirmRejected}
						onConfirm={() =>
							handleAction(item?._id, "rejected", rejectMessage)
						}
						onCancel={() => setIsConfirmRejected(false)}
						isLoading={UpdateReclaim.isPending}
					/>
				</div>
			</ModalStruc>
		</div>
	);
};

export default function ReviewsFromClients() {
	const { GetReclaims } = useReviewsRequests();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		GetReclaims({ pageSize: 10 }, {});
	useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });

	const [activeTab, setActiveTab] = useState<"feedback" | "reclaims">("feedback");
	const [feedbacks, setFeedbacks] = useState<any[]>([]);
	const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
	const apiCaller = useApiCaller();

	useEffect(() => {
		fetchFeedbacks();
	}, []);

	const fetchFeedbacks = async () => {
		setLoadingFeedbacks(true);
		try {
			const res = await apiCaller.get("/feedback");
			if (res.status === 200) {
				setFeedbacks(res.data);
			}
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			toast.error("Feedback konnte nicht geladen werden.");
		} finally {
			setLoadingFeedbacks(false);
		}
	};

	return (
		<div className="my-2 w-full lg:mx-32 mx-10">
			<h1 className="text-3xl font-bold">
				<span className="text-orange">Bewertungen & Feedback</span>
			</h1>

			{/* Tabs Header */}
			<div className="flex border-b border-slate-200 mb-8 mt-6">
				<button
					onClick={() => setActiveTab("feedback")}
					className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
						activeTab === "feedback"
							? "border-primary text-primary"
							: "border-transparent text-slate-400 hover:text-slate-600"
					}`}
				>
					Nutzer-Feedback ({feedbacks.length})
				</button>
				<button
					onClick={() => setActiveTab("reclaims")}
					className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
						activeTab === "reclaims"
							? "border-primary text-primary"
							: "border-transparent text-slate-400 hover:text-slate-600"
					}`}
				>
					Bewertungs-Reklamationen
				</button>
			</div>

			{/* Tab Contents */}
			<div className="my-7 mx-5">
				{activeTab === "feedback" ? (
					loadingFeedbacks ? (
						<div className="flex items-center justify-center py-20">
							<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
						</div>
					) : feedbacks.length > 0 ? (
						<div className="grid grid-cols-1 gap-6">
							{feedbacks.map((f: any) => (
								<div key={f._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-soft transition-all duration-300">
									<div className="space-y-4 grow">
										<div className="flex flex-wrap items-center gap-3">
											{/* Type Badge */}
											<span className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
												f.type === "bug" ? "bg-red-50 text-red-500 border border-red-100" :
												f.type === "suggestion" ? "bg-amber-50 text-amber-600 border border-amber-100" :
												f.type === "question" ? "bg-blue-50 text-blue-500 border border-blue-100" :
												"bg-slate-50 text-slate-500 border border-slate-100"
											}`}>
												{f.type === "bug" ? "🐛 Fehler" :
												 f.type === "suggestion" ? "💡 Vorschlag" :
												 f.type === "question" ? "❓ Frage" : "✨ Sonstiges"}
											</span>

											{/* Star Rating */}
											{f.rating && (
												<div className="flex items-center gap-0.5">
													{Array.from({ length: 5 }).map((_, i) => (
														<HiStar
															key={i}
															className={i < f.rating ? "text-yellow-400" : "text-slate-200"}
															size={16}
														/>
													))}
												</div>
											)}

											{/* Date */}
											<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-auto md:ml-0">
												{format(new Date(f.createdAt || Date.now()), "dd.MM.yyyy, HH:mm")} Uhr
											</span>
										</div>

										<p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
											{f.message}
										</p>

										{/* Sender details */}
										<div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
											<span className="flex items-center gap-1">
												👤 {f.name || "Anonymer Nutzer"}
											</span>
											{f.email && (
												<span className="flex items-center gap-1">
													✉️ {f.email}
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
							<p className="text-slate-400 font-medium">Bislang wurden keine Feedback-Nachrichten gesendet.</p>
						</div>
					)
				) : (
					data?.pages.map((page: any, ind: number) => (
						<Fragment key={ind}>
							{page?.data.map((item: any) => (
								<ReviewsSection key={item._id} item={item} />
							))}
						</Fragment>
					))
				)}
			</div>
		</div>
	);
}
