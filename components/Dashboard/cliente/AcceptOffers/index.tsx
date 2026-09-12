"use client";
import useOfferRequests from "@/ApiRequests/offer";
import { Context } from "@/components/Common/DashboardLayout";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import React, { useContext } from "react";
import { NotFoundData } from "../../handwerker/Pedidos";
import AcceptOffers from "./components/AcceptOffers";

export default function Índice() {
  const { toggleSideBar } = useContext(Context);
  const { GetJobOffer } = useOfferRequests();
  const { data, hasNextPage, fetchNextPage, isFetching } = GetJobOffer(
    { pageSize: 5 },
    {}
  );

  useScrollFetch({
    hasNextPage,
    fetchNextPage,
    isWindowScroll: true,
  });

  return (
    <div className={`w-full my-12`}>
      <div
        className={` ${
          data?.pages[0]?.data?.length > 0 ? "grid" : "flex "
        } justify-center lg:grid-cols-2 xl:grid-cols-3   gap-8 grid-cols-1`}
      >
        {data?.pages[0]?.data?.length > 0 ? (
          data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.data?.map((offer: any) => (
                <AcceptOffers key={offer._id} item={offer} />
              ))}
            </React.Fragment>
          ))
        ) : isFetching ? (
          <Loader />
        ) : (
          <NotFoundData text="Keine Angebote erhalten. Bitte versuchen Sie es später erneut." />
        )}
        {hasNextPage && isFetching && (
          <div className="bg-white h-160 rounded-md shadow-md">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
