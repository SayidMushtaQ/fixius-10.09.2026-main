"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
import PaymentPackages from './components/PaymentPackages';
const TestData = [
  {
    id: 1,
    month: '3 Monate',
    price: '20 €'
  },
  {
    id: 2,
    month: '6 Monate',
    price: '40 €'
  },
  {
    id: 3,
    month: '1 Jahr',
    price: '80 €'
  },
]
export default function Index() {
  const { toggleSideBar } = useContext(Context);

  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} lg:pt-14`}>
        <PaymentPackages testData={TestData}/>
    </div>
  );
}
