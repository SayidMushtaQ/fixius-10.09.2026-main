"use client";
import { NavLinks } from "@/constants/landingPage";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="z-50 py-5 fixed w-full bg-white left-0 sm:px-24 px-5 right-0 top-0">
      <div className={`flex justify-between  flex-wrap gap-4 ${toggle ? 'flex-col' : 'items-center'}`}>
        <span className="font-bold text-2xl lg:text-xl">
          <Link href={NavLinks[0].url} title={NavLinks[0].linkTitle} >
            {NavLinks[0].title}
          </Link>
        </span>
        <div className="sm:hidden absolute block  right-3 top-6">
          <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={() => setToggle(!toggle)}/>
        </div>
        <nav className={`${toggle ? 'block  mb-5 absolute left-0 right-0 top-16 bg-white h-11' : 'hidden'} sm:block `}>
          <ul className={`flex gap-4 ${toggle && 'absolute'}`}>
            <li className="border border-orange px-4 py-1 rounded-full hover:bg-orange hover:text-white ml-5">
              <Link href="#" title={"Post Job as Client"} aria-label={"Post Job as Client"}>
                Publicar trabajo como cliente
              </Link>
            </li>
            <li className="border border-orange px-4 py-1 rounded-full hover:bg-orange hover:text-white">
              <Link href="#" title={"Login"} aria-label={"Login"}>
                Acceso
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
