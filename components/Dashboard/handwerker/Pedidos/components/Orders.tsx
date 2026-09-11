"use client";
import useOfferRequests from "@/ApiRequests/offer";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import clientError from "@/helper/clientError";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Hash, AlertCircle, Trash2, ArrowRight } from "lucide-react";
import StatusButton from "./StatusButton";
import FeedbackPopup from "./feedback";
import { statusMap } from "@/constants/Dashboard/handwerker";

interface OrderItem {
	title: string;
	clientId: string;
	price: string;
	postedOn: Date;
	isNew: boolean;
	status: string;
	jobDescription: string;
	listingId: number;
	offerId: string;
	jobId: string;
}

export default function Orders({
	title,
	jobDescription,
	price,
	postedOn,
	isNew,
	status,
	listingId,
	offerId,
	jobId,
	clientId,
}: OrderItem) {
	const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
	const [isOfferWithdraw, setIsOfferWithdraw] = useState(false);
	const { UpdateJobOffer } = useOfferRequests();
	const translatedStatus = statusMap[status as keyof typeof statusMap];
	const handleClientError = clientError();

	const handleWithdraw = async () => {
		try {
			await UpdateJobOffer.mutateAsync(
				{
					notifyUser: clientId,
					offerId,
					jobId,
					data: { status: "withdrawn" },
				},
				{
					onSuccess() {
						toast.success("Angebot erfolgreich zurückgezogen");
						setIsOfferWithdraw(false);
					},
				}
			);
		} catch (error) {
			handleClientError(error);
		}
	};

	return (
		<>
			<div className="w-full p-6 md:p-8 space-y-6">
				<div className="flex flex-col lg:flex-row justify-between gap-6">
					<div className="flex items-start gap-4 flex-1">
						<div className="bg-orange/10 p-3 rounded-2xl text-orange flex-none">
							<Clock size={24} />
						</div>
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<span className="text-sm font-black text-secondary uppercase tracking-widest">
									{format(postedOn ? new Date(postedOn) : new Date(), "dd. MMM yyyy", { locale: de })}
								</span>
								{isNew && (
									<span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full uppercase">
										Neu
									</span>
								)}
							</div>
							<p className="text-gray-400 text-xs font-bold">
								{format(postedOn ? new Date(postedOn) : new Date(), "HH:mm")} Uhr
							</p>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 flex-[3]">
						<div className="flex-1 space-y-2">
							<h3 className="text-xl font-black text-secondary group-hover:text-orange transition-colors">
								{title}
							</h3>
							<div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
								<Hash size={12} />
								<span>Listing ID: {listingId}</span>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
							<div className="text-2xl font-black text-secondary">
								€{price}
							</div>
							<div className="flex items-center gap-3">
								{status === "pending" && (
									<button
										onClick={() => setIsOfferWithdraw(true)}
										className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all group/btn"
										title="Angebot zurückziehen"
									>
										<Trash2 size={20} />
									</button>
								)}
								<StatusButton
									showIcons={status !== "accepted"}
									status={translatedStatus}
								/>
							</div>
						</div>
					</div>
				</div>

				{jobDescription && (
					<div className="relative group/desc">
						<div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-500 leading-relaxed italic">
							{jobDescription}
						</div>
					</div>
				)}
			</div>

			<FeedbackPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
			
			<CustomConfirmPrompt
				isOpen={isOfferWithdraw}
				onConfirm={handleWithdraw}
				onCancel={() => setIsOfferWithdraw(false)}
				promptText="Sind Sie sicher, dass Sie dieses Angebot zurückziehen möchten?"
				isLoading={UpdateJobOffer.isPending}
			/>
		</>
	);
}
