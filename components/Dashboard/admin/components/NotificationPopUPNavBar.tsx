import Link from "next/link";
import React from "react";
export default function NotificationPopUPNavBar({name,message_short,href}: {name: string;message_short: string;href: string;}) {
  return (
    <div className="w-[15rem] sm:w-[20rem] space-y-3">
      <Link href={href} className="cursor-pointer hover:bg-gray-100  px-3 py-2 block">
        <h1 className="text-xl font-semibold">{name}</h1>
        <span> {message_short} </span>
      </Link>
    </div>
  )
}
