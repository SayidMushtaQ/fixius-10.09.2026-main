"use client";
import useOfferRequests from "@/ApiRequests/offer";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import useApiCaller from "@/hooks/useApiCaller";
import useChat from "@/hooks/useChat";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Image as ImageIcon, Clock, MapPin, Phone, FileText } from "lucide-react";
import ModalStruc from "../Common/ModalStruc";
import PlanCards from "../Common/PlanCards";
import Loader from "../Loader";

// Define the interface for the data of a single job
interface SingleJobData {
  _id: string;
  category: string;
  listingId: number;
  additional_details: {
    how_many_floors: string;
    how_many_rooms: string;
    square_meters: string;
  };
  additional_job_description: string;
  contactDetails: {
    email: string;
    name: string;
    phone: string;
  };
  location: any;
  images: string[];
  serviceTitle: {
    other_title: string;
    service_title: string;
    square_meters: string;
  };
  working_schedule: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  is_offer_sent?: boolean;
  offerId?: string;
  price?: number;
  distance: number;
}

const ICON = <FileText size={20} />;

export default function Job({ slug }: { slug?: string }) {
  // State for toggling offer form visibility
  const [offer, setOffer] = useState<boolean>(false);

  // State for toggling phone number visibility
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  // State for storing the price in the offer form
  const [price, setPrice] = useState<string>("");

  // State for storing the single job data
  const [getSingleJob, setGetSingleJob] = useState<SingleJobData | null>(null);

  //State for payment required
  const [isSubscribed, setIsSubscribed] = useState(false);

  // State for managing loading state
  const [isLoading, setIsLoading] = useState(true);

  // Get the user data from the authentication context
  const { userData } = useAuth();
  const user: any = userData[0];

  // Api caller hook
  const apiCaller = useApiCaller();

  // Get the router instance
  const router = useRouter();

  // Function to handle client errors
  const handleClientError = clientError();

  // Subscription Object
  const active_plan: any =
    user?.craftsman?.current_subscription?.status === "active";

  const [isUserActivated, setIsUserActivated] = useState(false);
  // Function to handle sending a message
  const { createCoversation, inputMessage, setInputMessage, isCreatingConv } =
    useChat();

  const handleMessageSent = async () => {
    console.log(user?.role);
    if (user?.role === "handwerker") {
      if (user?.craftsman?.status === "unverified") {
        return setIsUserActivated(true);
      }
      if (!active_plan) {
        return setIsSubscribed(true);
      }
      if (getSingleJob) createCoversation(getSingleJob?.userId as string);
    } else
      toast.error(
        "Melden Sie sich als Handwerker an, bevor Sie eine Nachricht senden."
      );
  };

  const handleUnSubscription = () => {
    localStorage.setItem("message", inputMessage);
    localStorage.setItem("receiverId", getSingleJob?.userId as string);
    const messageData = {
      message: inputMessage,
      receiverId: getSingleJob?.userId as string,
    };
    const jsonData = JSON.stringify(messageData);
    localStorage.setItem("messageData", jsonData);
    router.push("/dashboard/handwerker/abonnementverwaltung");
  };

  // Function to handle making an offer
  const { CreateJobOffer } = useOfferRequests();
  const handleMakeOffer = async () => {
    try {
      if (user?.role === "handwerker") {
        if (user?.craftsman?.status === "unverified") {
          return setIsUserActivated(true);
        }
        if (!active_plan) {
          return setIsSubscribed(true);
        }
        const offerData = {
          client: getSingleJob?.userId,
          job: getSingleJob?._id,
          price,
          handymanName: user?.craftsman?.company_name as string,
        };

        await CreateJobOffer.mutateAsync(offerData, {
          async onSuccess(data) {
            toast.success(data.message);
            getSingelJob();
            setPrice("");
          },
        });
      } else
        toast.error(
          "Melden Sie sich als Handwerker an, bevor Sie ein Angebot abgeben."
        );
    } catch (error) {
      handleClientError(error);
    }
  };

  const getSingelJob = async () => {
    try {
      const jobSlug = slug || (params?.slug as string);
      const response = await apiCaller.get(
        `/getsinglejob?id=${jobSlug}`
      );
      if (response.status === 200) {
        setGetSingleJob(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      handleClientError(error);
      setIsLoading(false);
    }
  };

  const params = useParams();

  // Effect to fetch single job data
  useEffect(() => {
    const jobSlug = slug || params?.slug;
    if (jobSlug) {
      getSingelJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, params?.slug]);

  // Render loading spinner if data is still loading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="w-full mt-10">
        {user?.craftsman?.status === "unverified" && (
          <p className="text-center bg-orange text-white rounded w-full p-4 text-2xl mb-5">
            Ihr Profil ist noch nicht aktiviert
          </p>
        )}
        {/* Job details section */}
        {getSingleJob && (
          <div className="flex justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0">
            {/* Left side containing job details */}
            <div className="space-y-10 w-full lg:basis-2/5">
              {/* Image display */}
              <div className="bg-white rounded-lg shadow-md w-full">
                {/* Render job image or default image if no image is available */}
                {getSingleJob?.images[0] ? (
                  <Image
                    src={getSingleJob?.images[0] || "/default-image.jpg"}
                    className="w-full object-cover h-auto rounded-t-lg"
                    alt="Neuen Auftrag erstellen"
                    width={500}
                    height={500}
                    priority
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full max-h-[240px] object-contain mx-auto bg-[#eaeaea] rounded-md p-3">
                    <ImageIcon size={160} color="#666666" />
                    <p className="text-base 2xl:text-lg font-bold opacity-60">
                      Kein Bild
                    </p>
                  </div>
                )}
                {/* Job details */}
                <section className="py-3 px-4">
                  <h1 className="font-bold text-xl text-orange">
                    {getSingleJob?.category}
                  </h1>
                  <h1 className="text-black">
                    {getSingleJob?.serviceTitle?.service_title}
                  </h1>
                  {/* Additional job details */}
                  <section className="w-5/5 flex justify-between">
                    {/* Left side of additional details */}
                    <section className="w-2/5 flex flex-col gap-3 pt-20">
                      <span>
                        Sq: {getSingleJob?.additional_details?.square_meters}
                        m2
                      </span>
                      <span>
                        Quadratmeter:{" "}
                        {getSingleJob?.additional_details?.how_many_floors}
                      </span>
                      <span>
                        Unterkunft:{" "}
                        {getSingleJob?.additional_details?.how_many_rooms}
                      </span>
                    </section>
                    {/* Right side of additional details */}
                    <section className="space-y-2 mt-2 w-3/5">
                      <h2 className="font-bold text-xl">Beschreibung</h2>
                      <p>{getSingleJob?.additional_job_description}</p>
                    </section>
                  </section>
                  {/* Location and time details */}
                  <div className="flex gap-5 items-center justify-between py-2">
                    <div className="flex justify-center items-center gap-2">
                      <MapPin size={18} className="text-gray-500" />
                      <span className="mr-2">
                        {getSingleJob?.location?.place_name}
                      </span>
                      <span>
                        {" "}
                        {user &&
                          `Entfernung: ${getSingleJob?.distance.toFixed(2)}
 									km`}
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <Clock size={18} className="text-gray-500" />
                      <span>
                        Auf dem neuesten Stand{" "}
                        {getSingleJob
                          ? formatTimeDifference(getSingleJob.createdAt)
                          : ""}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
              {/* Message input box */}
              {user?.role === "handwerker" && (
                <div className="bg-white flex flex-col rounded-lg shadow">
                  <textarea
                    rows={7}
                    cols={10}
                    placeholder="Nachricht eingeben"
                    name="enter_message"
                    className="p-2 rounded-t-lg outline-none border-b border-orange resize-none"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                  />
                  <div className="flex justify-end m-3">
                    <button
                      disabled={isCreatingConv}
                      onClick={() => handleMessageSent()}
                      className="bg-orange px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg hover:text-gray-200"
                    >
                      Nachricht senden
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side containing offer form and phone number display */}
            <div className="basis-2/5">
              {/* Offer button */}
              {user?.role === "handwerker" && (
                <div className="m-2">
                  <button
                    className="bg-orange px-7 py-3 md:px-14 md:py-4 flex justify-center items-center gap-4 rounded-lg text-white text-xl hover:text-gray-100 group w-full"
                    onClick={() => setOffer(!offer)}
                  >
                    <span className="bg-white p-1 rounded-full group-hover:bg-gray-200">
                      {ICON}
                    </span>
                    Ein Angebot abgeben
                  </button>
                </div>
              )}

              {/* Offer form */}
              {offer && (
                <div className="bg-white py-3 rounded-lg shadow-md my-6">
                  {/* Offer details */}
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h3 className="font-bold text-xl text-black">
                      Beschreibung
                    </h3>
                    <p>{getSingleJob?.additional_job_description}</p>
                  </section>
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h4 className="font-bold text-xl text-black">
                      Berufsbezeichnung
                    </h4>
                    <p>{getSingleJob?.serviceTitle?.service_title}</p>
                  </section>
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h5 className="font-bold text-xl text-black">
                      Preisgestaltung
                    </h5>
                    {getSingleJob?.is_offer_sent ? (
                      <span className="text-lg mt-2 px-1 font-semibold border-2 border-black rounded">
                        ${getSingleJob?.price}
                      </span>
                    ) : (
                      <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="€"
                        min={1}
                        className="text-lg p-1 font-semibold w-20 border-grey hover:border-gray-400 mt-1 rounded-md"
                      />
                    )}
                  </section>
                  <div className="flex justify-end items-center px-4">
                    {getSingleJob?.is_offer_sent ? (
                      <Link
                        className="globalbtn"
                        href={`/dashboard/handwerker/bestellungen/#${getSingleJob?.offerId}`}
                      >
                        Angebot ansehen
                      </Link>
                    ) : (
                      <button
                        disabled={CreateJobOffer.isPending}
                        onClick={handleMakeOffer}
                        className="bg-orange px-4 sm:py-3 py-2 text-white rounded-lg"
                      >
                        Angebot abgeben
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Phone number display */}
              <div className="m-2">
                {user?.role === "handwerker" && (
                  <button
                    onClick={() => {
                      if (user?.role === "handwerker") {
                        if (user?.craftsman?.status === "unverified") {
                          return setIsUserActivated(true);
                        }
                        if (!active_plan) {
                          return setIsSubscribed(true);
                        }
                        setShowPhoneNumber(true);
                      } else
                        toast.error(
                          "Bitte melden Sie sich als Handwerker an, um die Nummer zu sehen"
                        );
                    }}
                    className="bg-orange px-5 py-3 md:px-10 md:py-4 flex justify-center items-center gap-4 rounded-lg text-white text-xl hover:text-gray-100 group w-full"
                  >
                    <div className="bg-white p-2 rounded-full group-hover:bg-gray-200">
                      <Phone size={20} className="text-black" />
                    </div>
                    {showPhoneNumber
                      ? `${getSingleJob?.contactDetails?.phone}`
                      : "Telefonnummer anzeigen"}
                  </button>
                )}
                <div className="mt-5 space-y-5">
                  {/* Listing ID */}
                  <div>
                    <span className="block mb-2 font-bold text-xl">
                      Angebots-ID:
                    </span>
                    <span className="bg-white shadow-md rounded-md py-3 px-5 inline-block">
                      {getSingleJob?.listingId}
                    </span>
                  </div>
                  {/* Project Start Date */}
                  <div>
                    <span className="block mb-2 font-bold text-xl">
                      Startdatum des Projekts
                    </span>
                    <span className="bg-white shadow-md rounded-md py-3 px-5 inline-block">
                      {getSingleJob?.working_schedule}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        className="bg-orange py-2 px-5 my-4 flex ml-auto justify-end rounded-lg text-white text-xl hover:text-gray-100"
        onClick={() => router.back()}
      >
        Zurück
      </button>

      <ModalStruc
        isOpen={isSubscribed}
        closeModal={() => setIsSubscribed(false)}
      >
        <div>
          <p className="mb-4 text-[20px] font-semibold">
            Für diese Funktion ist ein kostenpflichtiges Abonnement
            erforderlich.
          </p>

          <PlanCards />
          {/* <button
 						className="globalbtn"
 						onClick={handleUnSubscription}>
 						Pay and Send
 					</button> */}
        </div>
      </ModalStruc>

      <ModalStruc
        isOpen={isUserActivated}
        closeModal={() => setIsUserActivated(false)}
      >
        <div>
          <p className="mb-4 text-[20px] max-w-[300px] text-center bg-orange text-white rounded p-4 shadow">
            Ihr Profil ist noch nicht aktiviert. Sie können diese Funktion
            nutzen, sobald Ihr Profil aktiviert wurde.
          </p>
        </div>
      </ModalStruc>
    </>
  );
}
