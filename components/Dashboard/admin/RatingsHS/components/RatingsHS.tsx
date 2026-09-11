import React from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";

type RatingHSPropsType = {
  id: number;
  rating: {
    star: number;
    description: string;
    isEdit?: boolean;
  };
  hanldeDelete: (id: number) => void;
  isActive: (id: number, payload: boolean) => void;
  active: boolean;
  hanldeEdit: (id: number, payload: string) => void;
  editing?: boolean;
  setRatings: React.Dispatch<
    React.SetStateAction<{
        id: number;
        rating: {
          star: number;
          description: string;
        };
        active: boolean;
        editing?: boolean | undefined;
    }[]>>;
  hanldeStartEdit: (id: number, payload: number) => void;
};
export default function RatingsHS({id,rating,hanldeDelete,isActive,active,hanldeEdit,editing,setRatings,hanldeStartEdit}: RatingHSPropsType) {
  const { star, description } = rating;
  const toggleEdit = (isEdit: boolean, id: number) => {
    setRatings((rating) =>
      rating.map((item) =>
        item.id === id ? { ...item, editing: isEdit } : item
      )
    );
  };
  return (
    <div className={`${active ? "bg-white" : "bg-gray-100"} rounded-md shadow-md`}>
      <div className="px-6 py-4">
        <div className="my-2 md:flex md:justify-between md:gap-20 mb-8 space-y-7 md:space-y-0">
          <div className="flex justify-center items-center flex-col text-center gap-2 md:w-[32rem]">
            <span className={`${!active && "text-gray-500"}`}>
              {star}.0 stars
            </span>
            <div className="flex">
              {[...Array(5)].map((a, index) => {
                index+=1;
                return (
                  <div key={index}>
                      {index <= star ? (
                        <AiTwotoneStar className={`text-3xl ${editing && 'cursor-pointer'} ${active && 'text-orange'}`} onClick={() =>{editing && hanldeStartEdit(id,index)}}/>
                      ) : (
                        <AiOutlineStar className={`text-3xl ${editing && 'cursor-pointer hover:text-orange'}`} onClick={() =>{editing && hanldeStartEdit(id,index)}}/>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grow">
            {editing && active ? (
              <textarea rows={3} cols={200} value={description} onChange={(e) => hanldeEdit(id, e.target.value)} className="w-full border-gray-400 rounded-md outline-none border resize-none p-1"/>
            ) : (
              <p className={`${!active && "text-gray-500"} w-[42rem]`}>
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center md:justify-end items-center space-x-5">
          <div className="sm:space-x-5">
            <button className={`bg-orange px-4 py-1  rounded-md hover:text-black mr-4 sm:mr-0 mb-4 sm:mb-0 ${active ? "text-black" : "text-white" }`} onClick={() => isActive(id, true)}>
              Aktivieren
            </button>
            <button className={`bg-orange px-4 py-1  rounded-md hover:text-black ${   active ? "text-white" : "text-black" }`} onClick={() => isActive(id, false)}>
              Deaktivieren
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <MdDelete className={`text-3xl bg-orange ${active? "text-white hover:text-black cursor-pointer": "text-gray-300" } p-1 rounded-md`} aria-label="Delete" onClick={() => {active && hanldeDelete(id); }}/>
            {editing && active ? (
              <IoMdAddCircle className={`text-3xl bg-orange text-white p-1 rounded-md cursor-pointer hover:text-black`} onClick={() => toggleEdit(false, id)}/>
            ) : (
              <BiEdit className={`text-3xl bg-orange ${active? "text-white hover:text-black cursor-pointer": "text-gray-300 " } p-1 rounded-md`} aria-label="Edit" onClick={() => {active && toggleEdit(true, id); }}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
