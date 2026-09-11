"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import UploadedDocumentsHS from "./components/UploadedDocumentsHS";
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [imageDataPageData, setImagePageData] = useState<string[]>([]); 

  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <UploadedDocumentsHS setImagePageData={setImagePageData} imageDataPageData={imageDataPageData}/>
    </div>
  );
}
