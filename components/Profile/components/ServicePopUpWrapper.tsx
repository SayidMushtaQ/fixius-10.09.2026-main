"use client";
import { useMultiStepForm } from "@/components/landingPage/components/service/useMultiStepForm";
import React, { useEffect, useState } from "react";
import Page1 from "./page/Step1";
import Page2 from "./page/Step2";
import Page3 from "./page/Step3";
import Page4 from "./page/Step4";
import Page5 from "./page/Step5";
import Page6 from "./page/Step6";
import Page7 from "./page/Step7";
import useJobpostRequests from "@/ApiRequests/jobpost";
import clientError from "@/helper/clientError";
import { toast } from "sonner";
export default function Service({
  setServicePopUP,
  serviceCardPopUPData,
  setSentData,
  serviceTitle,
}: {
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
  serviceCardPopUPData: serviceCardPopUPDataType;
  setSentData: React.Dispatch<React.SetStateAction<boolean>>;
  serviceTitle: string[];
}) {
  const [page1Data, setPage1Data] = useState<Page1DataType>({
    //Page1 data
    service_title: "",
    other_title: "",
    square_meters: "",
  });
  // const {userData} = useAuth()
  // const isLoggedIn = userData[0]?.accessToken;
  const [titleError, handleTitleError] = useState<string>("");
  const [textAreaPageData, setTextAreaPageData] = useState<string>(""); //page3 data
  const [imageDataPageData, setImagePageData] = useState<string[]>([]); //page4 data
  const [locationDataPage, setLocationDataPage] = useState<string>(""); //page5 data
  const [addressId, setAddressId] = React.useState<string>("");
  const [locationDataPageError, setlocationDataPageError] =
    useState<string>("");
  const [working_SchedulePage, setWorking_SchedulePage] = useState<
    "flexibel" | "schnell" | "in_einer_woche" | "in_3_monaten"
  >("flexibel"); //page6 data
  const [working_SchedulePageError, setWorking_SchedulePageError] =
    useState<string>("");
  const [contactDetailsPage, setContactDetailsPage] =
    useState<ContactDetailsPageDataType>({
      //page7 data
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
  const [contactDetailsPageError, setContactDetailsPageError] =
    useState<ContactDetailsPageDataTypeError>({
      nameError: "",
      emailError: "",
      phoneError: "",
    });
  const [numberOfElement, setNumberOfElement] = useState<NumberOfElementType>({
    square_meters: "",
    how_many_rooms: "",
    how_many_floors: "",
  });
  const [isNextBtnDisable, setIsNextBtnDisable] = useState<boolean>(false);
  const {
    currentStepIndex,
    step,
    back,
    next,
    isFirstStep,
    isLastStep,
    setIsLastStep,
  } = useMultiStepForm([
    <Page1
      key={1}
      {...{
        setPage1Data,
        page1Data,
        titleError,
        handleTitleError,
        serviceTitle,
      }}
    />,
    <Page2
      key={2}
      numberOfElement={numberOfElement}
      setNumberOfElement={setNumberOfElement}
    />,
    <Page3 key={3} {...{ setTextAreaPageData, textAreaPageData }} />,
    <Page4 key={4} {...{ setImagePageData, imageDataPageData }} />,
    <Page5
      key={5}
      {...{
        setLocationDataPage,
        locationDataPage,
        locationDataPageError,
        setlocationDataPageError,
        setAddressId,
        addressId,
        setIsNextBtnDisable,
      }}
    />,
    <Page6
      key={6}
      {...{
        setWorking_SchedulePage,
        working_SchedulePage,
        working_SchedulePageError,
        setWorking_SchedulePageError,
      }}
    />,
    <Page7
      key={7}
      {...{
        setIsNextBtnDisable,
        setContactDetailsPage,
        contactDetailsPageError,
        contactDetailsPage,
        isNextBtnDisable,
      }}
    />,
  ]);

  useEffect(() => {
    if (currentStepIndex === 6) {
      setIsLastStep(true);
    } else {
      setIsLastStep(false);
    }
  }, [currentStepIndex, setIsLastStep]);
  function handleNext() {
    if (page1Data.service_title !== "" || page1Data.other_title !== "") {
      if (currentStepIndex === 0) {
        next();
      }
    } else handleTitleError("Bitte wählen Sie eine Option aus.");
    if (
      currentStepIndex === 1 ||
      currentStepIndex === 2 ||
      currentStepIndex === 3
    ) {
      next();
    }
    if (locationDataPage !== "" && currentStepIndex === 4) {
      if (isNaN(Number(locationDataPage))) {
        setlocationDataPageError("Die Postleitzahl muss eine Zahl sein");
      } else if (locationDataPage.trim().length !== 5) {
        setlocationDataPageError("El código postal debe tener 4 caracteres");
      } else if (addressId === "") {
        setlocationDataPageError("Die Postleitzahl muss 5 Zeichen lang sein");
      } else {
        next();
      }
    } else if (currentStepIndex === 4)
      setlocationDataPageError("Postleitzahl erforderlich");
    if (currentStepIndex === 5) {
      next();
    }
  }
  function handleBack() {
    back();
    switch (currentStepIndex) {
      case 4:
        setlocationDataPageError("");
        break;
      case 5:
        setWorking_SchedulePageError("");
        break;
      case 6:
        setContactDetailsPageError({
          nameError: "",
          emailError: "",
          phoneError: "",
        });
        break;
      default:
        break;
    }
  }

  // all job queiry hooks
  const { CreateJobPost } = useJobpostRequests();
  const handleError = clientError();

  async function handleSendJOB() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactDetailsPage.name === "") {
      setContactDetailsPageError((e) => ({
        ...e,
        nameError: "Name erforderlich",
      }));
    }
    if (contactDetailsPage.email === "") {
      setContactDetailsPageError((e) => ({
        ...e,
        emailError: "E-Mail erforderlich",
      }));
    } else if (!emailRegex.test(contactDetailsPage.email)) {
      setContactDetailsPageError((e) => ({
        ...e,
        emailError: "Die E-Mail-Adresse ist ungültig",
      }));
    }
    if (contactDetailsPage.phone === "") {
      setContactDetailsPageError((e) => ({
        ...e,
        phoneError: "Telefonnummer erforderlich",
      }));
    } else if (isNaN(Number(contactDetailsPage.phone))) {
      setContactDetailsPageError((e) => ({
        ...e,
        phoneError: "Muss eine Zahl sein",
      }));
    }
    if (
      contactDetailsPage.name !== "" &&
      contactDetailsPage.email !== "" &&
      contactDetailsPage.phone !== "" &&
      emailRegex.test(contactDetailsPage.email) &&
      !isNaN(Number(contactDetailsPage.phone)) &&
      locationDataPageError !== "Standort nicht gefunden"
    ) {
      serviceCardPopUPData.serviceTitle = page1Data;
      serviceCardPopUPData.additional_details.square_meters =
        numberOfElement.square_meters;
      serviceCardPopUPData.additional_details.how_many_floors =
        numberOfElement.how_many_floors;
      serviceCardPopUPData.additional_details.how_many_rooms =
        numberOfElement.how_many_rooms;
      serviceCardPopUPData.additional_job_description = textAreaPageData;
      serviceCardPopUPData.images = imageDataPageData;
      serviceCardPopUPData.location = addressId;
      // serviceCardPopUPData.location_of_job.zip_code = locationDataPage;
      serviceCardPopUPData.working_schedule = working_SchedulePage;
      serviceCardPopUPData.contactDetails = contactDetailsPage;

      // posting data to save in the data base
      try {
        let newData = {
          ...serviceCardPopUPData,
          category: serviceTitle && serviceTitle[0],
        };

        // saving job post to db
        await CreateJobPost.mutateAsync(newData, {
          onSuccess(data) {
            toast.success("Auftrag erfolgreich veröffentlicht");
            setSentData(true);
            setContactDetailsPage({
              name: "",
              email: "",
              phone: "",
              password: "",
              address: "",
            });
          },
        });
      } catch (error) {
        handleError(error);
      }
    }
  }
  return (
    <div>
      {step}
      <div className="pb-5">
        <div className="space-x-8">
          {isFirstStep ? (
            <button
              onClick={() => setServicePopUP(false)}
              className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow ml-5 "
            >
              Zurück
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow bg-white md:ml-9 lg:ml-[5rem] ml-5"
            >
              Zurück
            </button>
          )}
          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={isNextBtnDisable}
              className={`border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white ${
                isNextBtnDisable && "cursor-not-allowed opacity-50"
              }`}
            >
              Weiter
            </button>
          ) : (
            <button
              disabled={isNextBtnDisable}
              onClick={handleSendJOB}
              className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              Veröffentlichen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
