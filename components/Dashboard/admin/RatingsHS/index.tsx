"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import RatingHS from "./components/RatingsHS";
const TestData = [
  {
    id:1,
    rating:{
      star:5,
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    active:true,

  },
  {
    id:2,
    rating:{
      star:3,
      description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    active:true,
  },
]
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [ratings,setRatings] = useState<{id:number;rating:{star:number,description:string};active:boolean;editing?:boolean}[]>(TestData);
  const hanldeDelete = (id:number) =>{
      const newRatings = ratings.filter(item=>item.id !== id);
      setRatings(newRatings);
  }
  const isActive = (id:number,payload:boolean)=>{
    const isActive = ratings.map(rating => rating.id === id ? {...rating,active:payload}: rating);
    setRatings(isActive);
  }
  const hanldeEdit = (id:number,payload:string)=>{
     setRatings(pre=>pre.map((item)=>item.id === id ? {...item,rating:{...item.rating,description:payload}} : item))
  }
  const hanldeStartEdit = (id:number,payload:number)=>{
    setRatings(pre=>pre.map((item)=>item.id === id ? {...item,rating:{...item.rating,star:payload}} : item));
  }
  useEffect(()=>{
    console.log(ratings);
  },[ratings]);
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <div className="px-7  py-5 w-full md:w-3/4 mx-auto">
        <section className="my-5">
          <h1 className="font-bold text-2xl">Bewertungen</h1>
        </section>
        <div className="space-y-5">
        {ratings.length != 0 ?  ratings.map(({id,rating,active,editing},index)=>(
          <RatingHS key={index} id={id} rating={rating}  hanldeDelete={hanldeDelete} isActive={isActive} active={active} hanldeEdit={hanldeEdit} editing={editing} setRatings={setRatings} hanldeStartEdit={hanldeStartEdit}/>
        )): <span className="text-gray-500">Der Handwerker hat noch keine Bewertung.</span>}
        </div>
      </div>
    </div>
  );
}
