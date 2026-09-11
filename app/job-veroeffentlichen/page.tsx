import React from "react";
import { Metadata } from "next";
import { HeroSearchAndText, Services, Steps, Craftsman } from "@/components";

export const metadata: Metadata = {
  title: "Neuen Job veröffentlichen | Fixius",
  description: "Veröffentlichen Sie Ihren Auftrag auf Fixius und finden Sie schnell passende Handwerker.",
};

export default function JobVeroeffentlichenPage() {
  return (
    <main>
      <div className="Container space-y-20">
        <HeroSearchAndText homePageOrNOt={false} />
      </div>
      <div className="bg-mainBackground mt-12 md:mt-24">
        <div className="Container px-5 py-3 lg:my-10">
          <Services />
          <Steps isShowHeadingText={true} />
        </div>
        <Craftsman />
      </div>
    </main>
  );
}
