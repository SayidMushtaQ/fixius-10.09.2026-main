"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import MessageNotification from "../../../components/MessagePopUpNavBar";
import NotificationBar from "../../../components/NotificationPopUPNavBar";
export default function NavBar({
	setSlideNav,
}: {
	setSlideNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [messageToggle, setMessageToggle] = useState<Boolean>(false);
	const [notifcationToggle, setNotificationToggle] = useState<Boolean>(false);

	return (
		<div className="bg-white shadow-lg px-2 md:px-20 py-6 w-full fixed z-50 left-0 right-0 top-0">
			<nav className="flex justify-between  md:justify-around items-center relative">
				<div className="hidden md:block w-2/5">
					<button className="cursor-pointer flex items-center justify-center gap-3">
						<FaArrowLeft className="text-xl " />
						<Link
							href={`/dashboard/kunde/profilverwaltung
`}
							className="text-xl font-bold inline-block mb-1">
							Zur Startseite zurückkehren
						</Link>
					</button>
				</div>
				<GiHamburgerMenu
					className="block left-0 absolute  md:hidden text-3xl ml-3 cursor-pointer"
					onClick={() => setSlideNav((e) => !e)}
				/>
				<div className="w-2/3"></div>
				<div className="flex gap-5  w-full  md:w-2/3  justify-end">
					<div className="flex items-center justify-center gap-5">
						<MessageNotification
							setMessageToggle={setMessageToggle}
							messageToggle={messageToggle}
							removeOtherBar={() => setNotificationToggle(false)}
						/>

						<NotificationBar
							setMessageToggle={setNotificationToggle}
							messageToggle={notifcationToggle}
							removeOtherBar={() => setMessageToggle(false)}
						/>
					</div>
					<button className="bg-orange font-semibold ml-1.5 cursor-pointer px-3 py-1.5 text-white rounded-md hover:text-black">
						<span className="hidden sm:block">Konto löschen</span>
						<span className="block sm:hidden">A. löschen</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
