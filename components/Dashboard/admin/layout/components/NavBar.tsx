"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import NotificationBar from "../../../components/NotificationPopUPNavBar";
const TestData = [
	{
		id: 1,
		name: "Jhon",
		message_short: "Lorem ipsum dolor sit amet consectetur adipisicing... ",
		href: "#",
	},
	{
		id: 2,
		name: "Akol",
		message_short: "Lorem ipsum dolor sit amet consectetur adipisicing... ",
		href: "#",
	},
];
export default function NavBar({
	setSlideNav,
}: {
	setSlideNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [notifcationToggle, setNotificationToggle] = useState<Boolean>(false);
	const router = useRouter();
	return (
		<div className="bg-white shadow-lg px-5 md:px-20 py-6 w-full fixed z-50 left-0 right-0 top-0">
			<nav className="flex justify-between  md:justify-around items-center relative">
				<div className="hidden md:block w-2/5">
					<button
						onClick={() => router.back()}
						className="cursor-pointer flex items-center justify-center gap-3">
						<FaArrowLeft className="text-xl " />
						<span className="text-xl font-bold inline-block mb-1">
							Zurück
						</span>
					</button>
				</div>
				<GiHamburgerMenu
					className="block left-0 absolute  md:hidden text-3xl ml-3 cursor-pointer"
					onClick={() => setSlideNav((e) => !e)}
				/>
				<div className="w-2/3">
					<Link
						href={"/dashboard/admin/"}
						title="dashboard"
						className="text-xl font-bold  hidden md:block mb-1">
						Admin-Dashboard
					</Link>
				</div>
				<div className="flex   w-full  md:w-2/3  justify-end">
					<div className="flex items-center justify-center">
						<NotificationBar
							setMessageToggle={setNotificationToggle}
							messageToggle={notifcationToggle}
							removeOtherBar={() => {}}
						/>
					</div>
				</div>
			</nav>
		</div>
	);
}
