"use client";
/* eslint-disable @next/next/no-img-element */
import useOfferRequests from "@/ApiRequests/offer";
import useReviewsRequests from "@/ApiRequests/reviews";
import ReviewModal from "@/components/Modals/GiveReviewModal";
import clientError from "@/helper/clientError";
import getAverageRating from "@/helper/getAverageRatings";
import { useQueryClient } from "@tanstack/react-query";
import { format, differenceInDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { HiLocationMarker } from "react-icons/hi";
import acceptedPng from "./accepted.png.png";
import completedPng from "./completed.png";
import { OfferItem } from "./item";
import rejectedPng from "./rejected.png.png";
import withdrawnPng from "./withdrawn.png";

export default function AcceptOffers({ item: data }: { item: OfferItem }) {
  const router = useRouter();
  const handleClientError = clientError();
  const { UpdateJobOffer } = useOfferRequests();
  const queryClient = useQueryClient();
  const [isGivingReview, setIsGivingReview] = useState(false);
  const [item, setItem] = useState(data);

  async function handleOfferStatus(status: string) {
    try {
      await UpdateJobOffer.mutateAsync(
        {
          notifyUser: item.craftman?.user._id,
          offerId: item?._id,
          jobId: item?.job?._id,
          data: { status },
        },
        {
          onSuccess(data) {
            setItem(data);
            toast.success(`Angebot ${status}`);
            queryClient.invalidateQueries({
              queryKey: ["getOfferData"],
            });
          },
        }
      );
    } catch (error) {
      handleClientError(error);
    }
  }

  const { CreateReview } = useReviewsRequests();

  // handle review submit
  async function handleReviewSubmit({
    rating,
    comment,
  }: {
    rating: number;
    comment: string;
  }) {
    try {
      const data = {
        offerId: item?._id,
        comment,
        rating,
        notifyUser: item.craftman?.user._id,
      };
      await CreateReview.mutateAsync(data, {
        onSuccess(data) {
          toast.success(data.message);

          queryClient.invalidateQueries({
            queryKey: ["getOfferData"],
          });
        },
      });
    } catch (error) {
      handleClientError(error);
    }
  }

  return (
    <div className="bg-white h-[40rem] rounded-md shadow-md">
      <>
        {" "}
        <div className="px-10 h-[80%] py-5 relative">
          <section>
            <div className="flex items-center justify-between">
              <img
                src={item?.craftman?.user?.profile_photo}
                alt=""
                className="w-20 h-20 mb-2 rounded"
              />
              <Link
                href={`/handwerker/${item?.craftman?.company_name}?from=offers`}
                className="border border-orange px-3 py-1 rounded-md"
              >
                Profil ansehen
              </Link>
            </div>
            <p className="font-semibold text-lg">
              {item.craftman.company_name}
            </p>
            <div className="flex items-center">
              {item?.craftman?.reviews ? (
                Array.from({
                  length: 5,
                })
                  .fill(0)
                  .map((a, index) => {
                    return (
                      <span
                        key={index}
                        className={`text-3xl ${
                          index < getAverageRating(item?.craftman?.reviews)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } focus:outline-none`}
                      >
                        ★
                      </span>
                    );
                  })
              ) : (
                <span className="font-semibold">Keine Bewertungen</span>
              )}
              <span className="font-semibold mt-1 ms-2">
                {" "}
                {item?.craftman?.reviews &&
                  `(${item?.craftman?.reviews?.length})`}
              </span>
            </div>
            <section className="flex items-center gap-2 mt-2">
              <HiLocationMarker /> {item?.craftman?.user?.address?.Place_Name}
            </section>
          </section>
          <section className="space-y-2 mb-2">
            <h1 className="font-bold text-xl">Auftragstitel</h1>
            <p className="w-full">
              {item?.job?.serviceTitle?.service_title ||
                item?.job?.serviceTitle?.other_title}
            </p>
          </section>
          <div className="my-2 space-y-1">
            <div>
              <h2 className="font-bold text-xl">Auftrags-ID:</h2>
              <span>{item?.job?.listingId}</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Preis</h3>
              <span>${item?.price}</span>
            </div>
          </div>
          <div className="py-1">
            <div className="flex md:gap-10 gap-2 flex-col md:flex-row flex-wrap">
              <h4 className="font-semibold">Veröffentlicht am</h4>
              <ul className="flex gap-7 list-disc mx-4 md:mx-0">
                <li className="text-gray-500">
                  {format(new Date(item?.createdAt || Date.now()), "MM/dd/yyyy")}
                </li>
                <li className="text-gray-500">
                  {format(new Date(item?.createdAt || Date.now()), "p")}
                </li>
              </ul>
            </div>
          </div>

          {item?.status !== "pending" && (
            <Image
              className="absolute h-[50px] top-2/3 rotate-[-25deg] right-10"
              src={
                item?.status === "accepted"
                  ? acceptedPng
                  : item?.status === "rejected"
                  ? rejectedPng
                  : item?.status === "withdrawn"
                  ? withdrawnPng
                  : completedPng
              }
              alt=""
              width={150}
            />
          )}
        </div>
        <section className="flex flex-col h-[20%] px-10 py-5 bg-orange rounded-sm">
          {item?.status === "pending" && (
            <span>{`läuft ab in ${differenceInDays(new Date(item?.expires_in || Date.now()), new Date())} Tagen`}</span>
          )}

          <div className="flex justify-between">
            {["completed", "accepted"].includes(item?.status) ? (
              !item?.isReviewed ? (
                <button
                  className="text-black bg-white px-3 py-2 mt-4 w-fit rounded"
                  onClick={() => setIsGivingReview(true)}
                >
                  Bewertung abgeben
                </button>
              ) : (
                <button
                  className="text-black bg-white px-3 mt-4 py-2 w-fit rounded"
                  onClick={() =>
                    router.push(
                      `/dashboard/kunde/bewertungen-und-kommentare/#${item?._id}`
                    )
                  }
                >
                  Bewertung bearbeiten
                </button>
              )
            ) : (
              <>
                <button
                  disabled={
                    UpdateJobOffer.isPending ||
                    !["pending"].includes(item?.status)
                  }
                  onClick={() => handleOfferStatus("accepted")}
                  className="bg-[#2D9F4CF2] hover:text-black disabled:opacity-50 font-bold py-2 px-4 rounded focus:outline-none mt-4"
                >
                  Akzeptieren
                </button>{" "}
                <button
                  disabled={
                    UpdateJobOffer.isPending ||
                    !["pending"].includes(item?.status)
                  }
                  onClick={() => handleOfferStatus("rejected")}
                  className="bg-[#FD2E00] hover:text-black  disabled:opacity-50 font-bold py-2 px-4 rounded focus:outline-none mt-4"
                >
                  Ablehnen
                </button>
              </>
            )}
          </div>
        </section>
        {/* review modal  */}
        <ReviewModal
          isOpen={isGivingReview}
          onClose={() => setIsGivingReview(false)}
          onSubmit={handleReviewSubmit}
          isLoading={CreateReview.isPending}
        />
      </>
    </div>
  );
}
