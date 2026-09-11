"use client";
import useReviewsRequests from "@/ApiRequests/reviews";
import ModalStruc from "@/components/Common/ModalStruc";
import Loader from "@/components/Loader";
import clientError from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { Review, deactiveSeal } from "../../cliente/Reviews&feedback";
import { NotFoundData } from "../Pedidos";
import TrackReclaim from "./TrackReclaim";

const ReviewsSection = ({ review }: { review: Review }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [text, setText] = useState("");
  const { CreateReclaim } = useReviewsRequests();
  const [reclaimId, setReclaimId] = useState("");
  const handleTextAreaChange = (e: any) => {
    setText(e.target.value);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleError = clientError();
  const handleSubmit = async () => {
    try {
      await CreateReclaim.mutateAsync(
        {
          reviewId: review._id,
          reason: text,
          notifyAdmin: "",
        },
        {
          onSuccess(data) {
            toast.success("Beschwerde erfolgreich erstellt");
          },
        }
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsPopupOpen(false);
    }
  };
  console.log(review)
  return (
    <>
      <div className="w-full bg-white rounded-lg shadow my-4">
        <div className="flex item-center justify-between pt-3 mx-4">
          <div className="font-bold flex flex-col gap-2">
            {format(new Date(review.createdAt || Date.now()), "dd MMM yy")}
            <p className="font-normal">
              {format(new Date(review.createdAt || Date.now()), "p")}
            </p>
          </div>
          <div className="text-normal">
            {review?.offer?.job?.serviceTitle?.service_title ||
              review?.offer?.job?.serviceTitle?.other_title}
          </div>
          <div className="font-bold">
            ID de Anuncio: {review?.offer?.job?.listingId}
          </div>
        </div>
        <div className="flex relative md:justify-around md:items-center gap-16 px-7 pt-10 pb-20 flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center">
            <span>{review?.rating}.0 estrellas</span>
            <div className="flex">
              {Array.from({
                length: 5,
              })
                .fill(0)
                .map((item, index) => (
                  <span
                    key={index}
                    className={`text-3xl ${
                      index < review?.rating
                        ? "text-yellow-400"
                        : "text-gray-400"
                    } focus:outline-none`}>
                    ★
                  </span>
                ))}
            </div>
          </div>
          {review.status === "deactive" && (
            <Image
              className="absolute rotate-[-10deg]"
              src={deactiveSeal}
              width={100}
              alt="deactive"
            />
          )}
          <p className="font-medium text-gray-600 md:w-2/3 w-full">
            {review.comment}
            {review.reclaimId ? (
              <button
                className="rounded-xl mt-3 float-right bg-orange text-white p-3"
                onClick={() => setReclaimId(review.reclaimId)}>
                Beschwerde verfolgen
              </button>
            ) : (
              <button
                className="rounded-xl mt-3 float-right bg-orange text-white p-3"
                onClick={togglePopup}>
                Beschwerde
              </button>
            )}
          </p>
        </div>
      </div>
      <ModalStruc
        isOpen={isPopupOpen}
        closeModal={() => setIsPopupOpen(false)}>
        <div>
          <div className="bg-white">
            <h2 className="text-lg font-semibold mb-4">Beschwerde</h2>
            <div className="flex flex-col justify-between align-center">
              <textarea
                className="border rounded p-2 mb-4"
                value={text}
                onChange={handleTextAreaChange}
                placeholder="Geben Sie hier Ihren Text ein"
              />
              <button
                className="bg-orange text-white rounded mt-4 px-4 py-2 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={CreateReclaim.isPending}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </ModalStruc>
      <ModalStruc
        isOpen={reclaimId ? true : false}
        closeModal={() => setReclaimId("")}>
        <TrackReclaim reclaimId={reclaimId} />
      </ModalStruc>
    </>
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
        <span className="text-orange">Erfahrungsberichte</span>{" "}
        Bewertungen und Kommentare
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
          <NotFoundData text="Es wurden noch keine Bewertungen oder Kommentare abgegeben" />
        )}

        {hasNextPage && isFetchingNextPage && (
          <div className="w-full bg-white rounded-lg shadow my-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
