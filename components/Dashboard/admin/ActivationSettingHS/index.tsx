"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
import ActivationSettingHS from './components/ActivationSettingHS';
export default function Index() {
  const { toggleSideBar } = useContext(Context);

  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
        <ActivationSettingHS/>
    </div>
  );
}
