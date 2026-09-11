import React from "react";

export default function Table({col1,col2,col3,width}:{col1:string,col2:string,col3:string,width:number}) {
  return (
    <div className="flex justify-center items-center bg-white py-5 px-10 ">
      <span className="w-[30rem]">{col1}</span>
      <span className="w-[30rem]">{col2}</span>
      <span className={`w-[${width}rem]`}>{col3}</span>
    </div>
  );
}
