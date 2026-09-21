"use client";
import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

import Page1 from "./page/Step1";
import Page2 from "./page/Step2";
import Page3 from "./page/Step3";
import Page4 from "./page/Step4";
import Page5 from "./page/Step5";
import Page6 from "./page/Step6";
import Page7 from "./page/Step7";
import Page8 from "./page/Step8";

import useJobpostRequests from "@/ApiRequests/jobpost";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import useApiCaller from "@/hooks/useApiCaller";
import { toast } from "sonner";
import { useMultiStepForm } from "./useMultiStepForm";

export default function Service({
  setServicePopUP,
  serviceCardPopUPData,
  setSentData,
  serviceTitle,
  serviceCardData,
  page1Data,
  setPage1Data,
}: {
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
  serviceCardPopUPData: serviceCardPopUPDataType;
  setSentData: React.Dispatch<React.SetStateAction<boolean>>;
  serviceTitle: string[];
  serviceCardData: string[] | undefined;
  page1Data: Page1DataType;
  setPage1Data: React.Dispatch<React.SetStateAction<Page1DataType>>;
}) {
  const { CreateJobPost } = useJobpostRequests();
  const handleError = clientError();
  const { userData } = useAuth();
  const contacts = { ...userData[0] };
  console.log(userData, "userData");
  const [titleError, handleTitleError] = useState<string>("");
  const [step2Error, setStep2Error] = useState<string>("");
  const [textAreaPageData, setTextAreaPageData] = useState<string>("");
  const [imageDataPageData, setImagePageData] = useState<string[]>([]);
  const [locationDataPage, setLocationDataPage] = useState<string>("");
  const [addressId, setAddressId] = React.useState<string>("");
  const [locationDataPageError, setlocationDataPageError] = useState<string>("");

  const [working_SchedulePage, setWorking_SchedulePage] = useState<
    "flexibel" | "schnell" | "in_einer_woche" | "in_3_monaten"
  >("flexibel");
  const [working_SchedulePageError, setWorking_SchedulePageError] = useState<string>("");

  const apiCaller = useApiCaller();
  const [contactDetailsPage, setContactDetailsPage] = useState<ContactDetailsPageDataType>({
    name: contacts?.name ? contacts?.name : "",
    email: contacts?.email ? contacts?.email : "",
    phone: contacts?.phone ? contacts?.phone : "",
    password: "",
    address: "",
  });

  const [contactDetailsPageError, setContactDetailsPageError] = useState<ContactDetailsPageDataTypeError>({
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
  const [isPostJobBtnDisable, setIsPostJobBtnDisable] = useState<boolean>(false);

  const {
    currentStepIndex,
    step,
    back,
    next,
    isFirstStep,
    isLastStep,
    setIsLastStep,
    goTo,
  } = useMultiStepForm([
    <Page1 key={1} {...{ setPage1Data, page1Data, titleError, handleTitleError, serviceTitle }} />,
    <Page2 key={2} numberOfElement={numberOfElement} setNumberOfElement={setNumberOfElement} step2Error={step2Error} />,
    <Page3 key={3} {...{ setTextAreaPageData, textAreaPageData }} />,
    <Page4 key={4} {...{ setImagePageData, imageDataPageData }} />,
    <Page5 key={5} {...{ setWorking_SchedulePage, working_SchedulePage, working_SchedulePageError, setWorking_SchedulePageError }} />,
    <Page6 key={6} {...{ setContactDetailsPage, contactDetailsPageError, contactDetailsPage, setIsNextBtnDisable, isNextBtnDisable }} />,
    <Page7 key={7} {...{ setIsNextBtnDisable, setContactDetailsPage, contactDetailsPageError, contactDetailsPage, isNextBtnDisable }} />,
    <Page8 key={8} {...{ setLocationDataPage, locationDataPage, locationDataPageError, setlocationDataPageError, setAddressId, addressId, setIsNextBtnDisable }} />,
  ]);

  const isUserLoggedIn = userData?.length > 0;
  const totalSteps = isUserLoggedIn ? 5 : 8;
  const progress = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  useEffect(() => {
    if (isUserLoggedIn) {
      setIsLastStep(currentStepIndex >= 4);
    } else {
      setIsLastStep(currentStepIndex >= 7);
    }
  }, [currentStepIndex, isUserLoggedIn, setIsLastStep]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isHandlingNextRef = React.useRef(false);
  const [isHandlingNext, setIsHandlingNext] = useState(false);
  const stepTransitionRef = React.useRef(false);

  async function handleNext() {
    if (isHandlingNextRef.current || stepTransitionRef.current) return;
    isHandlingNextRef.current = true;
    setIsHandlingNext(true);

    // Capture step index at the start to prevent stale reads
    const stepAtEntry = currentStepIndex;

    try {
      if (stepAtEntry === 0) {
        if (page1Data.service_title !== "") {
          handleTitleError("");
          next();
        } else {
          handleTitleError("Bitte wählen Sie eine Option aus.");
          return;
        }
      }

      if (stepAtEntry === 1) {
        const isFilled = numberOfElement.square_meters !== "" ||
          numberOfElement.how_many_rooms !== "" ||
          numberOfElement.how_many_floors !== "";

        if (!isFilled) {
          setStep2Error("Bitte füllen Sie mindestens ein Feld aus.");
          return;
        }
        setStep2Error("");
        next();
      }

      if (stepAtEntry === 2) {
        if (textAreaPageData.trim().length < 10) {
          toast.error("Bitte beschreiben Sie Ihren Auftrag etwas genauer (mind. 10 Zeichen).");
          return;
        }
        next();
      }

      if (stepAtEntry === 3) {
        next();
      }

      if (stepAtEntry === 4) {
        if (isUserLoggedIn) {
          setContactDetailsPage((pre) => ({
            ...pre,
            phone: contacts?.phone || "",
            email: contacts?.email || "",
          }));

          const userAddress: any = contacts?.address;
          let addressIdToUse = "";
          let zipToUse = "";

          if (userAddress && typeof userAddress === "object" && "zipCode" in userAddress) {
            addressIdToUse = JSON.stringify(userAddress);
            zipToUse = userAddress.zipCode;
            setLocationDataPage(userAddress.zipCode);
          } else if (userAddress && (userAddress as any).Postal_Code) {
            zipToUse = (userAddress as any).Postal_Code;
            setLocationDataPage(zipToUse);
          }

          if (addressIdToUse) {
            setLocationDataPage(String(zipToUse));
            setAddressId(addressIdToUse);
          }

          const hasPhone = !!contacts?.phone;
          const hasAddressId = !!addressIdToUse;

          if (hasPhone && hasAddressId) {
            setIsLastStep(true);
            return;
          }

          if (hasPhone) {
            goTo(7);
            return;
          }

          goTo(6);
          return;
        }
        next();
        return;
      }

      if (stepAtEntry === 5) {
        if (contactDetailsPage.email === "") {
          setContactDetailsPageError((e) => ({ ...e, emailError: "E-Mail ist erforderlich" }));
          return;
        } else if (!emailRegex.test(contactDetailsPage.email)) {
          setContactDetailsPageError((e) => ({ ...e, emailError: "Die E-Mail ist ungültig" }));
          return;
        } else {
          setContactDetailsPageError((e) => ({ ...e, emailError: "" }));
          try {
            const { data, status } = await apiCaller.get(`/user?email=${contactDetailsPage.email}`);
            if (status === 200) {
              if (data.role === "handwerker") {
                handleError("Nur Kunden können Aufträge veröffentlichen");
                return;
              } else {
                setIsNextBtnDisable(true);
                toast.success("Der Benutzer existiert bereits. Bitte geben Sie Ihr Passwort ein.");
                setContactDetailsPage((pre) => ({
                  ...pre,
                  phone: data.phone,
                  email: data.email,
                }));
                if (data.address) {
                  setLocationDataPage(data.address.formattedAddress || data.address.zipCode || "");
                  setAddressId(JSON.stringify(data.address));
                }
                setIsLastStep(true);
                return;
              }
            }
          } catch (error: any) {
            if (error?.response?.status === 404) {
              setContactDetailsPage((pre) => ({
                ...pre,
                phone: contacts?.phone ? contacts?.phone : "",
                password: "",
              }));
              setLocationDataPage("");
              setAddressId("");
              stepTransitionRef.current = true;
              next();
              return;
            }
            console.error("User check failed", error);
            stepTransitionRef.current = true;
            next();
          }
        }
      }

      if (stepAtEntry === 6) {
        if (contactDetailsPage.name.trim() === "") {
          setContactDetailsPageError((e) => ({ ...e, nameError: "Name ist erforderlich" }));
          return;
        } else {
          setContactDetailsPageError((e) => ({ ...e, nameError: "" }));
        }

        const cleanPhone = contactDetailsPage.phone.replace(/[\s\+\-]/g, "");
        if (contactDetailsPage.phone === "") {
          setContactDetailsPageError((e) => ({ ...e, phoneError: "Telefonnummer ist erforderlich" }));
          return;
        } else if (isNaN(Number(cleanPhone))) {
          setContactDetailsPageError((e) => ({ ...e, phoneError: "Es muss eine Zahl sein" }));
          return;
        } else if (cleanPhone.length < 6) {
          setContactDetailsPageError((e) => ({ ...e, phoneError: "Die Telefonnummer ist zu kurz" }));
          return;
        } else {
          setContactDetailsPageError((e) => ({ ...e, phoneError: "" }));
          next();
        }
      }
    } finally {
      isHandlingNextRef.current = false;
      setIsHandlingNext(false);
      if (stepTransitionRef.current) {
        setTimeout(() => {
          stepTransitionRef.current = false;
        }, 300);
      }
    }
  }

  function handleBack() {
    back();
    setIsLastStep(false);
    switch (currentStepIndex) {
      case 4: setlocationDataPageError(""); break;
      case 5: setWorking_SchedulePageError(""); setIsNextBtnDisable(false); break;
      case 6: setContactDetailsPageError({ nameError: "", emailError: "", phoneError: "" }); break;
      default: break;
    }
  }

  async function handleSendJOB() {
    if (currentStepIndex === 5) {
      if (contactDetailsPage.password === "") {
        toast.error("Passwort ist erforderlich");
        return setContactDetailsPageError((e) => ({ ...e, emailError: "Passwort ist erforderlich" }));
      }
      if (contactDetailsPage.password.length < 8) {
        toast.error("Das Passwort muss mindestens 8 Zeichen lang sein");
        return setContactDetailsPageError((e) => ({ ...e, emailError: "Das Passwort muss mindestens 8 Zeichen lang sein" }));
      }
    }

    if (currentStepIndex === 7) {
      if (!addressId) {
        toast.error("Bitte wählen Sie eine Adresse aus der Liste aus.");
        setlocationDataPageError("Bitte wählen Sie eine Adresse aus der Liste aus.");
        return;
      }
      setlocationDataPageError("");
    }

    if (
      contactDetailsPage.email !== "" &&
      contactDetailsPage.phone !== "" &&
      emailRegex.test(contactDetailsPage.email) &&
      !isNaN(Number(contactDetailsPage.phone)) &&
      locationDataPageError !== "Standort nicht gefunden"
    ) {
      serviceCardPopUPData.serviceTitle = page1Data;
      serviceCardPopUPData.additional_details.square_meters = numberOfElement.square_meters;
      serviceCardPopUPData.additional_details.how_many_floors = numberOfElement.how_many_floors;
      serviceCardPopUPData.additional_details.how_many_rooms = numberOfElement.how_many_rooms;
      serviceCardPopUPData.additional_job_description = textAreaPageData;
      serviceCardPopUPData.images = imageDataPageData;
      serviceCardPopUPData.location = addressId;
      serviceCardPopUPData.working_schedule = working_SchedulePage;
      serviceCardPopUPData.contactDetails = { ...contactDetailsPage, address: addressId };

      try {
        let newData = { ...serviceCardPopUPData, category: serviceCardData && serviceCardData[0] };
        await CreateJobPost.mutateAsync(newData, {
          onSuccess() {
            toast.success("Auftrag erfolgreich veröffentlicht");
            setSentData(true);
            setContactDetailsPage({ name: "", email: "", phone: "", password: "", address: "" });
          },
        });
      } catch (error) {
        handleError(error);
      }
    } else {
      if (contactDetailsPage.email === "") toast.error("E-Mail ist erforderlich");
      else if (!emailRegex.test(contactDetailsPage.email)) toast.error("E-Mail ist ungültig");

      if (contactDetailsPage.phone === "") toast.error("Telefonnummer ist erforderlich");
      else if (isNaN(Number(contactDetailsPage.phone))) toast.error("Telefonnummer muss eine Zahl sein");

      if (locationDataPageError === "Standort nicht gefunden") toast.error("Standort nicht gefunden");
      if (!addressId) toast.error("Bitte wählen Sie einen Standort aus");
    }
  }

  useEffect(() => {
    if (!isNextBtnDisable && currentStepIndex === 5) {
      setIsLastStep(false);
    }
    if (!isNextBtnDisable && currentStepIndex === 5 && contactDetailsPage.password) {
      setIsNextBtnDisable(false);
    }
  }, [isNextBtnDisable, currentStepIndex, setIsLastStep, contactDetailsPage.password]);

  const isHandwerker = userData[0]?.role === "handwerker";

  if (isHandwerker) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 py-12 bg-white rounded-xl shadow-soft border border-slate-100 max-w-2xl mx-auto my-10">
        <div className="w-20 h-20 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
          <ShieldAlert size={40} strokeWidth={1.5} />
        </div>
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-950 font-outfit">Kundenkonto erforderlich</h2>
          <p className="text-slate-500 max-w-md mx-auto font-inter leading-relaxed">
            Als registrierter <strong className="text-slate-900">Handwerker</strong> können Sie keine Aufträge veröffentlichen. Bitte loggen Sie sich mit einem Kundenkonto ein, um diesen Service zu nutzen.
          </p>
        </div>
        <button
          onClick={() => setServicePopUP(false)}
          className="w-full sm:w-auto bg-primary hover:bg-black text-white font-bold font-montserrat py-3.5 px-12 rounded-lg transition-all active:scale-95 shadow-soft"
        >
          Verstanden
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden bg-white">
      <div className="shrink-0 pb-3 px-10 space-y-4 bg-white z-20">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">Fortschritt</span>
            <div className="text-lg font-bold text-slate-900 font-inter">
              Schritt <span className="text-primary">{currentStepIndex + 1}</span>
              <span className="text-slate-200 mx-3">/</span>
              <span className="text-slate-400">{totalSteps}</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary leading-none font-inter">{Math.round(progress)}%</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Fertig</span>
            </div>
          </div>
        </div>

        <div className="relative h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-6 scroll-smooth custom-scrollbar">
        <div className="w-full pb-10">
          {step}
        </div>
      </div>

      {/* Footer Buttons - Fixed at Bottom with Glassmorphism */}
      <div className="shrink-0 py-4 px-6 md:px-10 border-t border-slate-50 bg-orange-50 z-20 mt-auto">
        {isLastStep && (
          <p className="text-center text-sm font-bold text-gray-900 mb-4 font-inter">
            Mit dem Klick auf „Veröffentlichen“ akzeptieren Sie unsere <a href="https://www.fixius.de/pie/agb" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">AGB</a>
          </p>
        )}
        <div className="max-w-3xl mx-auto flex flex-col-reverse sm:flex-row gap-4 justify-between items-center">
          {isFirstStep ? (
            <button
              onClick={() => setServicePopUP(false)}
              className="w-full sm:w-auto px-12 py-4 rounded-xl border border-slate-200 text-slate-500 font-bold hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all duration-300 cursor-pointer text-sm tracking-wide font-inter"
            >
              Abbrechen
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-12 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wide font-inter"
            >
              <span className="text-base">←</span>
              Zurück
            </button>
          )}

          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={isNextBtnDisable || isHandlingNext}
              className={`w-full sm:w-auto px-16 py-4 rounded-xl bg-primary hover:bg-orange text-white font-bold tracking-widest shadow-lg shadow-primary/20 transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 text-sm font-inter ${isNextBtnDisable || isHandlingNext ? "opacity-30 cursor-not-allowed grayscale shadow-none" : ""
                }`}
            >
              {isHandlingNext ? "LÄDT..." : "WEITER"}
              {!isHandlingNext && <span className="text-base font-normal">→</span>}
            </button>
          ) : (
            <button
              disabled={CreateJobPost.isPending || isPostJobBtnDisable}
              onClick={handleSendJOB}
              className="w-full sm:w-auto px-16 py-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold tracking-widest shadow-lg shadow-slate-900/20 transition-all duration-300 transform active:scale-[0.98] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm font-inter"
            >
              {CreateJobPost.isPending ? "SENDET..." : "VERÖFFENTLICHEN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
