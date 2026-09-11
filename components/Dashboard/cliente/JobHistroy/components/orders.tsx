"use client";
import StatusButton from "@/components/Dashboard/handwerker/Pedidos/components/StatusButton";
import FeedbackPopup from "@/components/Dashboard/handwerker/Pedidos/components/feedback";
import { isNewJob } from "@/helper/isNewJob";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { BsImage } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import EditAdditionalDetails from "./editJobComponent/EditAdditionalDetails";
import EditDescription from "./editJobComponent/EditDescription";
import EditImage from "./editJobComponent/EditImage";
import EditProjectStartDate from "./editJobComponent/EditProjectStartDate";
import EditStatus from "./editJobComponent/EditStatus";
import EditTitle from "./editJobComponent/EditTitle";
import { statusMap } from "@/constants/Dashboard/handwerker";

interface additinal_details {
  how_many_rooms: string;
  how_many_floors: string;
  square_meters: string;
}

export default function Orders({ item }: any) {
  // formatting time and dates
  const createdAt = item?.createdAt ? new Date(item?.createdAt) : new Date();

  const dateFormatter = new Intl.DateTimeFormat("de", {
    day: "2-digit",
    month: "long",
  });
  const formattedDate = dateFormatter.format(createdAt);

  // * States * //
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);

  const [newDate, setNewDate] = useState<string>(formattedDate);

  //// * job status [state] new or old * ////
  const isNew = isNewJob(item?.createdAt);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [isEdit, setIsEdit] = useState("");

  // A blocked ad is read-only for its owner; updateJobPost rejects edits
  // server-side as well, so the pencils are hidden rather than disabled.
  const isBlocked = Boolean(item?.isBlocked);
  const editIcon = (target: string, className?: string) =>
    isBlocked ? null : (
      <FaEdit
        style={{ cursor: "pointer" }}
        className={className}
        onClick={() => setIsEdit(target)}
      />
    );

  return (
    <>
      <div className="w-full py-5 px-3">
        {isBlocked && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-outfit font-bold text-red-700">
              Diese Anzeige wurde von unserem Team gesperrt
            </p>
            <p className="mt-1 font-inter text-sm text-red-600">
              Sie ist nicht mehr öffentlich sichtbar, nimmt keine neuen Angebote
              an und kann nicht bearbeitet werden.
              {item?.blockedReason ? ` Begründung: ${item.blockedReason}` : ""}
            </p>
            <p className="mt-2 font-inter text-sm text-red-600">
              Bei Fragen wenden Sie sich bitte an unseren Support.
            </p>
          </div>
        )}
        <section className="w-full flex justify-between items-start flex-wrap">
          <div className="ext-xl font-semibold flex flex-col">
            <div className="flex relative">
              {item?.images?.length !== 0 ? (
                <>
                  {item?.images?.map((img: string, id: number) => (
                    <div key={id} className="h-20 items-center">
                      <Image
                        src={img}
                        alt={`crousel ${id}`}
                        width={80}
                        height={80}
                        style={{ maxHeight: 60 }}
                        className="object-cover p-2 rounded-2xl"
                      />
                    </div>
                  ))}

                  {editIcon("image", "absolute top-2 right-2")}
                </>
              ) : (
                <>
                  <div className="flex flex-col relative justify-center items-center w-full max-h-[90px] object-contain mx-auto bg-[#eaeaea] rounded-md p-3">
                    <BsImage size={80} color="#666666" />
                    {editIcon("image", "absolute right-2 top-2")}
                    <p className="text-base 2xl:text-lg font-bold opacity-60">
                      Ohne Bild
                    </p>
                  </div>
                </>
              )}
            </div>
            <h1 className="text-xl font-semibold flex flex-row gap-3 items-end">
              <section className="">
                {newDate}
                {isNew && (
                  <span className="ml-2 text-[#67B554] ">
                    neu <span className="text-5xl">.</span>
                  </span>
                )}
              </section>
            </h1>

            <section className="my-3 font-normal">
              {format(item?.createdAt ? new Date(item.createdAt) : new Date(), "HH:mm")}
            </section>
          </div>

          <div>
            {/* additional details  */}
            <p className="font-bold flex items-center gap-2">
              Weitere Details
              {editIcon("additional")}
            </p>
            <p>Zimmer: {item?.additional_details.how_many_rooms} </p>
            <p>Etagen: {item?.additional_details.how_many_floors}</p>
            <p>Quadratmeter: {item?.additional_details.square_meters}</p>
          </div>

          <div>
            {/* additional details  */}
            <p className="font-bold flex items-center gap-2">
              Startdatum des Projekts
              {editIcon("working_schedule")}
            </p>
            <p className="">
              {item?.working_schedule
                .split("_")
                .join(" ")
                .replace(/^\w/, (match: any) => match.toUpperCase())}
            </p>
          </div>

          {item?.status == "complete" && !isEditing && !isBlocked && (
            <button
              onClick={openPopup}
              className="rounded px-3 py-1 cursor-pointer text-white flex gap-2 items-center capitalize bg-orange"
            >
              Feedback geben
            </button>
          )}

          {isBlocked ? null : isEditing ? (
            <button
              className="rounded px-3 py-1 cursor-pointer text-white flex gap-2 items-center capitalize bg-orange"
              onClick={() => setEditing(false)}
            >
              Senden
            </button>
          ) : (
            <StatusButton
              status={statusMap[item?.status as keyof typeof statusMap]}
              jobId={item?._id}
              showIcons={true}
              showEditIcon={false}
              setIsEdit={setIsEdit}
            />
          )}
        </section>

        {item?.serviceTitle && (
          <div className="">
            <h2 className="font-bold text-orange">{item?.category}</h2>
            <section className="mb-3 flex items-center gap-1">
              {item?.serviceTitle?.service_title ||
                item?.serviceTitle?.other_title ||
                "Kein Text"}
              {editIcon("title")}
            </section>
          </div>
        )}

        <section className="my-3">
          <div className="flex justify-between">
            <p className="flex items-center gap-1">
              {item?.additional_job_description ||
                "Auftragsbeschreibung angeben"}
              {editIcon("description")}
            </p>

            <p>Anzeigen-ID: {item?.listingId}</p>
          </div>
        </section>

        <span className="text-6xl font-normal inline-block my-3 float-right">
          {/* {price} */}
        </span>
      </div>
      <FeedbackPopup isOpen={isPopupOpen} onClose={closePopup} />

      {isEdit === "image" && (
        <EditImage
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={item?.images}
          jobId={item?._id}
        />
      )}

      {isEdit === "additional" && (
        <EditAdditionalDetails
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={item?.additional_details}
          jobId={item?._id}
        />
      )}
      {isEdit === "title" && (
        <EditTitle
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={item}
          jobId={item?._id}
        />
      )}
      {isEdit === "description" && (
        <EditDescription
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={item?.additional_job_description}
          jobId={item?._id}
        />
      )}
      {isEdit === "working_schedule" && (
        <EditProjectStartDate
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={item?.working_schedule}
          jobId={item?._id}
        />
      )}
      {isEdit === "status" && (
        <EditStatus
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          data={""}
          jobId={item?._id}
        />
      )}
    </>
  );
}
