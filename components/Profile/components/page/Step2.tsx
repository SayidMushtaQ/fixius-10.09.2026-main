import React from "react";

export default function Step2({numberOfElement,setNumberOfElement}:{numberOfElement:NumberOfElementType;setNumberOfElement:React.Dispatch<React.SetStateAction<NumberOfElementType>>}) {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setNumberOfElement(pre =>({
      ...pre,
      [name]:value
    }));
  }
  return (
    <div className="bg-white  my-6 mx-5 md:mx-10 lg:mx-20">
      <ul className="space-y-4">
        <div className="space-y-2 md:flex md:items-center gap-4">
         <div className="bg-white py-2 px-3 rounded-lg  border-2 mt-2">
         <label className="text-sm md:text-[16px] cursor-pointer" htmlFor="square_footage">
            Geben Sie die Quadratmeterzahl an (falls zutreffend)
          </label>
         </div>
          <div className="bg-white py-2 px-3 rounded-lg  border-2">
            <input type="number" className="w-full outline-none" id="square_footage" name="square_meters" placeholder="e.g. 25m2" min={1} onChange={handleChange} value={numberOfElement.square_meters}/>
          </div>
        </div>
        <div className="space-y-2 md:flex md:items-center gap-4">
          <div className="bg-white py-2 px-3 rounded-lg  border-2 mt-2 md:w-[23rem] w-full">
          <label className="text-sm md:text-[16px] cursor-pointer" htmlFor="How_many_rooms">
            Wie viele Zimmer gibt es?
          </label>
          </div>
          <div className="bg-white py-2 px-3 rounded-lg  border-2">
            <input type="number" className="w-full outline-none" id="How_many_rooms" name="how_many_rooms" placeholder="1" min={1} onChange={handleChange} value={numberOfElement.how_many_rooms}/>
          </div>
        </div>
        <div className="space-y-2 md:flex md:items-center gap-4">
          <div className="bg-white py-2 px-3 rounded-lg  border-2 mt-2 md:w-[23rem] w-full">
          <label className="text-sm md:text-[16px] cursor-pointer" htmlFor="How_many_floors">
            Wie viele Stockwerke gibt es?
          </label>
          </div>
          <div className="bg-white py-2 px-3 rounded-lg  border-2">
            <input type="number" className="w-full outline-none" id="How_many_floors" name="how_many_floors" placeholder="1" min={1} onChange={handleChange} value={numberOfElement.how_many_floors}/>
          </div>
        </div>
      </ul>
    </div>
  );
}
