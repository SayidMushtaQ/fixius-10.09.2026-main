import React from "react";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
const TestData = [
  {
    id: 1,
    img: "/Dashboard/admin/admin.png",
    name: "Paul Ben",
    company_name: "OCTANORM",
    email: "xyz@gmail.com",
    IP_address: "103.76.96.0",
    Registration_date: "22/05/2023",
    Verification: [true, false, true, false],
  },
];
const Profile = ({
  img,
  name,
  company_name,
  email,
  IP_address,
  Registration_date,
  Verification,
}: {
  img: string;
  name: string;
  company_name: string;
  email: string;
  IP_address: string;
  Registration_date: string;
  Verification: boolean[];
}) => {
  return (
    <>
      <div className="font-bold w-[10rem]">
        <Image
          src={img}
          className="cursor-pointer"
          title="Click on image"
          alt="handwerker"
          width={80}
          height={80}
        />
      </div>
      <span className="w-[10rem]">{name}</span>
      <span className="w-[10rem]">{company_name}</span>
      <span className="w-[10rem]">{email}</span>
      <span className="w-[10rem]">{IP_address}</span>
      <span className="w-[9rem]">{Registration_date}</span>
      {Verification.map((verify, index) => {
        if (verify) {
          return (
            <span
              className={`w-[10rem] flex  items-center ${
                index == 0 ? "justify-end pr-5" : "justify-center pl-2"
              }`}
              key={index}
            >
              <AiOutlineCheck
                className={`bg-green-500 text-white rounded-full text-lg `}
              />
            </span>
          );
        } else {
          return (
            <span
              className="w-[10rem] flex justify-center items-center"
              key={index}
            >
              <RxCross2 className="bg-red-500 text-white rounded-full text-lg" />
            </span>
          );
        }
      })}
    </>
  );
};

export default function AllnewProfileHS({ search }: { search?: string }) {
  return (
    <div className="mt-10 shadow-md rounded-md">
      <div className="w-full overflow-x-scroll">
        <div className="w-[90rem] lg:w-full">
          <div className="flex justify-center items-center bg-[#F0EAEA] py-3 pl-7 rounded-t-md">
            <span className="font-bold w-[10rem]">Bild</span>
            <span className="font-bold w-[10rem]">Name</span>
            <span className="font-bold w-[10rem]">Firmenname</span>
            <span className="font-bold w-[10rem]">E-Mail</span>
            <span className="font-bold w-[10rem]">IP-Adresse</span>
            <span className="font-bold w-[12rem]">Registrierungsdatum</span>
            <span className="font-bold w-[10rem] text-center">
              Hochgeladene Dokumente
            </span>
            <span className="font-bold w-[10rem]">Verifiziert</span>
            <span className="font-bold w-[10rem]">ONU verifiziert</span>
            <span className="font-bold w-[7rem]">Aktivieren</span>
          </div>
          <div className="flex justify-center items-center bg-white py-3 pl-7  rounded-b-md">
            {TestData.map(
              ({
                id,
                img,
                name,
                company_name,
                email,
                IP_address,
                Registration_date,
                Verification,
              }) => (
                <Profile
                  key={id}
                  {...{
                    img,
                    name,
                    company_name,
                    email,
                    IP_address,
                    Registration_date,
                    Verification,
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
