"use client";
import usePostalRequests from "@/ApiRequests/postal";
import { ServiceCard } from "@/components/ServiceCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SliderCrouserl from "react-slick";
import Loader from "../Loader";
import { useDebounce } from "@/hooks/useDebounce";
import { useUpdateFilter } from "@/ApiRequests/filter";

const Filters = ({ setFilter = () => {}, filter = { distance: "50", pin_code: "", categories: [] } }: FilterPropsType) => {
  const [address, setAddress] = useState<any>("");
  const { userData } = useAuth();
  const user = userData[0];
  //console.log('===user==',user);
  const [search, setSearch] = useState(true);
  const [zipCode, setZipcode] = useState<any>(user?.address?.zipCode);
  const [distance, setDistance] = useState("");
  const { mutate: handleUpdateFilters } = useUpdateFilter();
  // const { GetPostalsBySearch } = usePostalRequests();
  // const { data, refetch, isLoading } = GetPostalsBySearch(zipCode);
  // const handleLocation = (address: any) => {
  // 	setSearch(false);
  // 	setFilter((p) => ({ ...p, address: address }));
  // 	setAddress(address);
  // };
  useEffect(() => {
    setDistance(filter?.distance);
  }, [filter?.distance]);

  const handleDistance = (e: any) => {
    const newFilter = { ...filter, distance: e.target.value };
    setDistance(e.target.value);
    handleDistanceChange(newFilter);
  };

  const handleDistanceChange = useDebounce((filter) => {
    setFilter(filter);
    handleUpdateFilters({ distance: filter.distance });
  }, 500);

  return (
    <div className="flex gap-5 mt-3 flex-wrap md:relative">
      <div>
        <p className="font-semibold mb-4">Umkreis (km)</p>

        <div className="bg-white px-3 py-3 rounded-lg  shadow">
          <input
            type="number"
            className="w-full outline-none"
            id="filter_km"
            name="filter_km"
            placeholder="50 km"
            value={distance}
            min={1}
            onChange={handleDistance}
          />
        </div>
      </div>
      <div className="hidden sm:block"></div>
    </div>
  );
};

export default function Index({
  selectCard = [],
  setSelectCard = () => {},
  filter = { distance: "50", pin_code: "", categories: [] },
  setFilter = () => {},
  orderTime = "Nach Neu sortieren",
  setOrderTime = () => {},
  selectedServices,
  setSelectedServices = () => {},
}: NewListedOrderPropsType) {
  const slider = useRef<SliderCrouserl>(null);
  return (
    <div className="lg:px-[100px] md:px-10 px-4 my-4 lg:my-10 border red-500">
      <div className="mx-5">
        <h2 className="font-semibold my-2">
          <span className="text-orange">Aufträge</span> finden
        </h2>

        <h2 className="font-semibold">Nach Filtern suchen</h2>
        <Filters
          setFilter={setFilter}
          filter={filter}
          orderTime={orderTime}
          setOrderTime={setOrderTime}
          selectCard={selectCard}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      </div>

      <div className="relative">
        <div className="mt-3 px-5 sm:px-16  py-3">
          <h3 className="font-semibold">Nach Kategorie filtern</h3>
          <ServiceCard
            slider={slider}
            slidesToShowCustom={7}
            setSelectCard={setSelectCard}
            selectCard={selectCard}
            selectedServices={selectedServices}
            jobType="listing"
          />
          <div
            className="text-4xl flex justify-between items-center top-[45%] absolute right-10 left-8 "
            aria-hidden="true"
          >
            <button
              onClick={() => slider.current?.slickPrev()}
              aria-label="Nach links scrollen"
            >
              <IoIosArrowBack className="lg:text-[32px] sm:text-[25px]" />
            </button>
            <button
              onClick={() => slider.current?.slickNext()}
              aria-label="Nach links scrollen"
            >
              <IoIosArrowForward className=" lg:text-[32px] sm:text-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
