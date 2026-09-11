import React from "react";
import Image from "next/image";
export default function Logout({ toggleSideBar }: { toggleSideBar: boolean }) {
  return (
    <ul
      className={`w-full ${
        toggleSideBar ? "md:pr-[90px]" : "pr-[70px]"
      }  mt-10`}
    >
      <li
        className={`flex sm:justify-center ${
          toggleSideBar && "ml-6 sm:ml-0"
        } items-center gap-3`}
      >
        <Image
          src="/Dashboard/cliente/logout.svg"
          width={20}
          height={20}
          alt="Abmelden"
          className={`cursor-pointer ${
            toggleSideBar ? "mr-0" : "ml-6 md:ml-10 w-7"
          }`}
        />
        <button
          className={`font-bold cursor-pointer text-lg mb-1 hover:text-orange   ${
            toggleSideBar ? "block" : "hidden"
          }`}
        >
          Abmelden
        </button>
      </li>
    </ul>
  );
}
