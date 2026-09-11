"use client";
import useJobAlertRequests from "@/ApiRequests/jobalert";
import usePostalRequests from "@/ApiRequests/postal";
import Switcher1 from "@/components/Common/Switch";
import Loader from "@/components/Loader";
import { ServiceCard } from "@/components/ServiceCard";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SliderCrouserl from "@/components/ui/LazySlider";
import type Slider from "react-slick";

export default function JobAlerts() {
  // API requests
  const { GetJobAlert, UpdatedJobAlert } = useJobAlertRequests();
  const { GetPostalsBySearch } = usePostalRequests();
  const { data, isLoading } = GetJobAlert();
  const { userData } = useAuth();
  const user = userData[0];
  const zipCode = user?.address?.zipCode?.toString() || "";

  // States
  const [isChecked, setIsChecked] = useState<boolean>(
    data?.status === "active",
  ); // Switcher state
  const [searchZip, setSearchZip] = useState<number>(); // Postal code search
  const [enableAddLocationBtn, setEnableAddLocationBtn] =
    useState<boolean>(false); // Add location button
  const [selectedService, setSelectedService] =
    useState<string>("Select Service"); // Selected service
  const [selectCard, setSelectCard] = useState<string[]>(data?.keywords || []); // Selected cards
  const [zipCodes, setZipcodes] = useState<any[]>(data?.location || []); // Zip codes
  const [radius, setRadius] = useState<number>(100); // Search radius
  const [isCatUpAvl, setIsCatUpAvl] = useState<boolean>(false); // Category update availability

  // Refs
  const slider = useRef<Slider>(null);

  const { data: postals, refetch } = GetPostalsBySearch(searchZip);

  //Router instance
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get("unsubscribe");

  // Error handler
  const handleErorr = clientError();

  useEffect(() => {
    setSearchZip(Number(zipCode));
  }, []);
  // Effects
  useEffect(() => {
    // Initial state setup
    setSelectCard(data?.keywords || []);
    setZipcodes(data?.location || []);
    setRadius(data?.radius);
    setIsChecked(data?.status === "active");
  }, [data]);

  useEffect(() => {
    // Postal code search and button enable/disable
    refetch();
    if (postals?.some((i: any) => i.Postal_Code !== searchZip)) {
      setEnableAddLocationBtn(false);
    }
  }, [searchZip, postals]);

  useEffect(() => {
    // Category update availability check
    const isCategoryUpdateAvl =
      data?.keywords.length === selectCard?.length &&
      JSON.stringify(data?.keywords) === JSON.stringify(selectCard);
    setIsCatUpAvl(isCategoryUpdateAvl);
  }, [selectCard]);

  useEffect(() => {
    if (query === "true") {
      handleUpdate({ status: "inactive" });
      if (pathname) {
        router.push(pathname);
      }
    }
  }, [query]);

  // Handlers
  const handleUpdate = async (data: any) => {
    try {
      await UpdatedJobAlert.mutateAsync(data, {
        onSuccess(data) {
          toast.success("Erfolgreich aktualisiert");
          setSearchZip(undefined);
        },
      });
      return undefined;
    } catch (error) {
      handleErorr(error);
      return undefined;
    }
  };

  // Filter postal codes
  const filterPostal = postals
    ?.map((i: any) => i.Postal_Code)
    ?.filter(
      (item: any, index: any, self: any) =>
        self?.findIndex((i: any) => i === item) === index,
    )
    .filter((item: any) => !data?.location?.some((i: any) => i === item));

  const handleUpdateDebounce = useDebounce((radius) => {
    handleUpdate({ radius });
  }, 500);

  // JSX
  if (isLoading) return <Loader />;

  return (
    <div className="my-2 w-full">
      <h1 className="text-2xl lg:text-3xl font-bold font-outfit text-slate-950">
        <span className="text-primary italic">Benachrichtigungen für </span> Abgleich
        Aufträge
      </h1>
      {/* Switcher */}
      <div className="my-6 flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-soft w-fit">
        <b className="text-base font-semibold text-slate-700 font-inter">Warnstatus aktivieren:</b>
        <Switcher1
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleAction={(status: boolean) => {
            handleUpdate({
              status: status ? "active" : "inactive",
            });
          }}
        />
      </div>
      {/* Filters */}
      <div className="w-full flex gap-2">
        <div className="flex gap-5 mt-3 items-center flex-wrap md:relative">
          {/* Radius filter */}
          <div className="w-full max-w-xs">
            <p className="font-semibold text-slate-600 font-inter mb-2">Benachrichtigungs-Radius (km)</p>
            <div className="flex gap-2">
              <input
                type="number"
                className="h-12 w-full outline-none bg-slate-50 border border-slate-200 px-4 rounded-lg font-inter focus:ring-2 focus:ring-primary/20 transition-all"
                id="filter_km"
                name="filter_km"
                placeholder="50 km"
                min={1}
                value={radius || ""}
                onChange={(e) => {
                  setRadius(Number(e.target.value));
                  handleUpdateDebounce(Number(e.target.value));
                }}
              />
            </div>
          </div>
              {/* <button
								onClick={() => {
									handleUpdate({ radius });
								}}
								disabled={
									!radius ||
									(radius && data?.radius === radius
										? true
										: false)
								}
								className="bg-orange px-2 w-fit disabled:opacity-50 text-nowrap text-white rounded font-semitbold">
								Update
							</button> */}
          </div>
        </div>
      {/* Category filter */}
      <div className="relative mt-12 bg-slate-50/50 -mx-4 lg:-mx-10 px-4 lg:px-10 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-950 font-outfit">Nach Kategorie filtern</h3>
            <div className="flex gap-2">
              <button
                onClick={() => slider.current?.slickPrev()}
                className="p-2 bg-white rounded-xl shadow-soft border border-slate-100 hover:text-primary hover:border-primary/20 transition-all active:scale-95"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                onClick={() => slider.current?.slickNext()}
                className="p-2 bg-white rounded-xl shadow-soft border border-slate-100 hover:text-primary hover:border-primary/20 transition-all active:scale-95"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>

          <div className="sep-slider-box">
            <ServiceCard
              slider={slider}
              slidesToShowCustom={7}
              setSelectCard={setSelectCard}
              selectCard={selectCard}
              selectedServices={selectedService}
              jobType="alert"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => handleUpdate({ keywords: selectCard })}
              className="bg-primary hover:bg-black text-white font-bold font-montserrat py-2.5 px-8 rounded-lg transition-all active:scale-95 shadow-soft"
            >
              Präferenzen speichern
            </button>
          </div>
        </div>
        {/* Zip codes */}
        {/* <div className="mt-5 sm:px-5 py-3">
					<h1 className="mb-2 font-semibold">Zip Codes</h1>
					<div className="flex gap-2 flex-wrap">
						{zipCodes?.map((i: any, ind: number) => (
							<div
								key={ind}
								className=" relative rounded-lg shadow  p-4 bg-white w-fit ">
								<RxCross2
									onClick={() => {
										handleUpdate({
											location: zipCodes.filter(
												(f: any) => f !== i
											),
										});
									}}
									className="absolute top-1 right-1 cursor-pointer hover:text-orange"
								/>
								<span>{i}</span>
							</div>
						))}
					</div>
				</div> */}
      </div>
    </div>
  );
}
