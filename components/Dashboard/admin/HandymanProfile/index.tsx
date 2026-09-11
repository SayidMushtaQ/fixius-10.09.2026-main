"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import HandymanProfile from './components/HandymanProfile';
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [search,set_search] = useState<string>(''); //user search query

  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
        <HandymanProfile search={search} setSearch={set_search}/>
    </div>
  );
}
