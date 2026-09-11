"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import ReviewSectionCS from "./components/ReviewSectionCS";
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [rating, setRating] = useState<number>(0);
  const [description,setDescription] = useState<string>('');
  const handleSubmit = () =>{
    console.log(rating,description);
  }
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <ReviewSectionCS rating={rating} setRating={setRating} description={description} setDescription={setDescription} handleSubmit={handleSubmit}/>
    </div>
  );
}
