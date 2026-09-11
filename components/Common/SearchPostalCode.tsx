"use client";
import usePostalRequests from "@/ApiRequests/postal";
import { Fragment, useEffect, useState } from "react";
import Loader from "../Loader";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function SearchPostalCode({
  search,
  onSelect,
  position,
}: {
  search: string;
  onSelect: any;
  position: string;
}) {
  const { GetPostalsBySearch } = usePostalRequests();
  const debouncedSearch = useDebounce(search, 500);
  const { data, refetch, isLoading } = GetPostalsBySearch(debouncedSearch);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 5) {
      refetch();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch, refetch]);

  return (
    <Fragment>
      {search && isOpen && (
        <div
          className={`absolute z-10 max-h-48 w-full overflow-y-auto ${position} rounded shadow-lg bg-white flex flex-col gap-2 p-2`}
        >
          {isLoading ? (
            <Loader />
          ) : data?.length > 0 ? (
            data
              ?.filter((item: any) =>
                item.Postal_Code.toString().startsWith(debouncedSearch)
              )
              .map((item: any, ind: number) => {
                const spliedPlaceName = item?.Place_Name.split("-");
                const upperCasePlaceName = spliedPlaceName.map(
                  (data: string) => data.charAt(0).toUpperCase() + data.slice(1)
                );
                const placeName = upperCasePlaceName.join("-");
                return (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSelect(item);
                    }}
                    key={ind}
                    className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded"
                  >
                    <span className="text-black ">
                      {item?.Postal_Code} {placeName}
                      {/* {item?.Admin_Name},{" "} */}
                      {/* {item?.Admin_Name2}, {item?.Admin_Name3} */}
                    </span>
                  </button>
                );
              })
          ) : (
            <p className="w-full p-2 text-center">Ort nicht gefunden</p>
          )}
        </div>
      )}
    </Fragment>
  );
}
