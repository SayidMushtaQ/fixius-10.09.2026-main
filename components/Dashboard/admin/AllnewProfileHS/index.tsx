"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import AllnewProfileHS from "./components/AllnewProfileHS";
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [search, set_search] = useState<string>(""); //user search query
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <div className="w-full lg:mx-auto">
        <div className="flex md:w-1/2   rounded-md shadow-md">
          <input
            type="text"
            className="grow px-3 py-1  rounded-l-md outline-none"
            placeholder="search by email, company name or Listing ID:"
            name="search_service"
            title="Search our services"
            value={search}
            onChange={(e) => set_search(e.target.value)}
          />
          <button className="py-3 px-4 bg-white text-black border-l-2 rounded-r-md">
            Dienst finden
          </button>
        </div>
        <AllnewProfileHS search={search} />
      </div>
    </div>
  );
}
