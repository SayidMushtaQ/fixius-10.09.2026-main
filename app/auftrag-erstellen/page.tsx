"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ServicePopUP from "@/components/landingPage/components/ServicePopUP";
import { ServiceCards } from "@/constants/landingPage/index";
import { HeroSearchAndText, Services, Steps, Craftsman } from "@/components";

function AuftragErstellenContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceSlug = searchParams?.get("service");

  const serviceCardData = useMemo(() => {
    if (!serviceSlug) return undefined;
    const card = ServiceCards.find((c) => c.slug === serviceSlug);
    if (card) {
      return [card.shortText, card.slug, card.icon];
    }
    return undefined;
  }, [serviceSlug]);

  const handleClose = () => {
      // Navigate back to home or previous page
      if (window.history.length > 1) {
          router.back();
      } else {
          router.push("/");
      }
  };

  // If a specific service slug is provided, show the form immediately inline
  if (serviceSlug) {
    return (
      <div className="Container px-5">
        <div className="max-w-7xl mx-auto shadow-sm rounded-2xl bg-white my-10 md:my-12">
          <ServicePopUP
            setServicePopUP={(val) => {
              if (typeof val === "boolean" && !val) {
                handleClose();
              }
            }}
            servicePopUp={true}
            serviceCardData={serviceCardData}
          />
        </div>
      </div>
    );
  }

  // If no service slug is provided, show the full categories list, search bar, steps, and craftsman overview
  return (
    <div className="w-full">
      <div className="Container space-y-12 md:space-y-20 pt-4 md:pt-8">
        <HeroSearchAndText homePageOrNOt={false} />
      </div>
      <div className="bg-mainBackground mt-12 md:mt-24">
        <div className="Container px-5 py-3 lg:my-10">
          <Services />
          <Steps isShowHeadingText={true} />
        </div>
        <Craftsman />
      </div>
    </div>
  );
}

export default function AuftragErstellenPage() {
  return (
    <main className="min-h-screen bg-mainBackground pt-24 md:pt-32">
      <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Lädt...</div>}>
        <AuftragErstellenContent />
      </Suspense>
    </main>
  );
}

