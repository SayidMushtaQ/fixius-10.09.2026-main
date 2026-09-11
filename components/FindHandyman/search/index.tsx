"use client";
import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchResult from "./components/SearchResult";
import ServiceCardsCarousel from "./components/ServiceCards";
import { HeroSearchAndText, Services } from "@/components";
import { changeServiceFormat } from "@/helper/changeServiceFormat";

import ServiceRequestCard from "./components/ServiceRequestCard";
import OtherServicesModal from "./components/OtherServicesModal";
import { components } from "@/components/handwerker-in-der-naehe/componentsMap";

type SearchProps = {
  id: number;
  icon: string;
  shortText: string;
  slug: string;
};

export default function Search({ params }: any) {
  const [showServices, setShowServices] = useState(false);
  const router = useRouter();

  // const [Services, setServices] = useState<SearchProps[]>([
  // 	{
  // 		id: 0,
  // 		icon: "",
  // 		shortText: "",
  // 		slug: "",
  // 	},
  // ]);
  const initialService = params?.handyman?.split("-").join(" ");
  const serviceTitle =
    components[params?.handyman]?.title?.replace(" in der Nähe", "") ||
    changeServiceFormat(params?.handyman);
  // const [userType, setUserType] = useState<string[]>([]);
  // const initialLoadRef = useRef(true);

  // const HandleChange = useCallback(
  // 	(e: any) => {
  // 		const SearchVal = ServiceCards
  // 		// .sort((a, b) =>
  // 		// 	a.shortText.localeCompare(b.shortText)
  // 		// )
  // 		.filter((item) =>
  // 			item.shortText
  // 				.toLowerCase()
  // 				.includes(e.target.value.toLowerCase())
  // 		);
  // 		setServices(SearchVal);
  // 		setUserType([e.target.value]);
  // 	},
  // 	[setServices]
  // );

  // const FindService = () => {
  // 	if (initialLoadRef.current) {
  // 		const item = Services[0];
  // 		initialLoadRef.current = false;
  // 		setServiceCardData([item.shortText, item.slug]);
  // 		setServicePopUP(true);
  // 		return;
  // 	}
  // 	if (userType[0] !== "") {
  // 		setServiceCardData(userType);
  // 		setServicePopUP(true);
  // 		setUserType([""]);
  // 	}
  // };

  // useEffect(() => {
  // 	HandleChange({ target: { value: initialService } });
  // }, [HandleChange, initialService]);

  return (
    <div className="w-full Container">
      <div className="py-10">
        <ServiceRequestCard
          serviceName={serviceTitle}
          icon={
            ServiceCards.find((s) => s.slug === params?.handyman)?.icon || ""
          }
          onOpenServices={() => setShowServices(true)}
          onRequestQuote={() => {
            router.push(`/auftrag-erstellen?service=${params?.handyman}`);
          }}
        />

        <SearchResult params={params} />
      </div>

      {/* Quote Request Popup */}


      {/* Other Services Modal */}
      <OtherServicesModal
        isOpen={showServices}
        onClose={() => setShowServices(false)}
      />
    </div>
  );
}
