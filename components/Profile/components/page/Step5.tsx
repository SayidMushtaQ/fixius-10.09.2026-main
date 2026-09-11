"use client";
import usePostalRequests from "@/ApiRequests/postal";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";

export default function Page5({
  setLocationDataPage,
  locationDataPage,
  locationDataPageError,
  setlocationDataPageError,
  addressId,
  setAddressId,
}: LocationOfJobPage) {
  const [search, setSearch] = useState<any>();
  const { GetPostalsBySearch } = usePostalRequests();
  const { data, refetch, isLoading } = GetPostalsBySearch(search);
  const [address, setAddress] = useState<any>();

  const handleLocation = (address: any) => {
    setAddressId(address._id);
    setAddress(address);
    setLocationDataPage(String(address.Postal_Code));
    setSearch("");
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationDataPage(e.target.value);
    setlocationDataPageError("");
    const { value } = e.target;

    if (!value) {
      return setSearch("");
    }
    if (value.length >= 5) {
      setSearch(value);
    } else {
      setSearch("");
    }
    setAddressId("");
  };

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  return (
    <section className="py-1  md:w-1/2  mb-16 mt-5 mx-[20px] md:mx-10 lg:mx-20  relative">
      <h2 className="text-2xl font-bold">Postleitzahl eingeben</h2>
      <p className="text-gray-500 mb-3 mt-1">
        Geben Sie den Arbeitsort über die Postleitzahl an.
      </p>
      <div className="bg-white py-3 px-2 rounded-lg  border-2 flex items-center w-2/3 relative">
        <CiLocationOn className="text-2xl mr-2 text-gray-500" />
        <input
          type="text"
          className="w-full outline-none"
          name="zip_code"
          placeholder="e.g.   5000"
          maxLength={5}
          pattern="[0-9]{4}"
          onChange={handleChange}
          value={locationDataPage}
        />
        {addressId !== "" && (
          <p className="text-right absolute right-3">{address?.Place_Name}</p>
        )}
        {search && (
          <div className="absolute z-[100] overflow-auto top-full left-0 w-full rounded shadow-lg bg-white flex flex-col gap-2 h-48 p-2">
            {isLoading ? (
              <Loader />
            ) : data?.length > 0 ? (
              data
                ?.filter((item: any) =>
                  item.Postal_Code.toString().startsWith(search)
                )
                .map((item: any, ind: number) => {
                  return (
                    <button
                      onClick={() => handleLocation(item)}
                      key={ind}
                      className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded"
                    >
                      <span className="text-black ">
                        {item?.Postal_Code} {item?.Place_Name}
                      </span>
                    </button>
                  );
                })
            ) : (
              <p className="w-full p-2 text-center">Standort nicht gefunden</p>
            )}
          </div>
        )}
      </div>
      {(locationDataPage === "" ||
        isNaN(Number(locationDataPage)) ||
        String(locationDataPage).trim().length !== 5 ||
        addressId === "") && (
        <p className="text-sm text-red-500 absolute">{locationDataPageError}</p>
      )}
    </section>
  );
}
