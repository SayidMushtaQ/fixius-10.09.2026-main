import SidbarNavigationLinks from "@/components/Dashboard/components/SidbarNavigationLinks";
import { navigation } from "@/constants/Dashboard/admin";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from "./Logout";
export default function Sidebar({
	slideNav,
	toggleSideBar,
	setToggleSideBar,
}: {
	slideNav: boolean;
	toggleSideBar: boolean;
	setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div
			className={`bg-white shadow-lg border-2   ${
				toggleSideBar ? "sm:w-72 w-60" : "w-24"
			} fixed top-0 ${
				!slideNav ? "left-0" : "-left-96"
			} overflow-y-auto`}>
			<nav className="h-screen flex  flex-col py-20 justify-between">
				<div
					className={`flex flex-col justify-start items-center  ${
						toggleSideBar ? "sm:mx-9 mx-5" : "justify-center pr-2"
					} gap-3`}>
					<div className="bg-white  shadow rounded-full my-4 p-1">
						<FaRegUserCircle
							className="cursor-pointer text-6xl"
							title="Click on image"
							onClick={() => setToggleSideBar(!toggleSideBar)}
						/>
					</div>
					<section
						className={`${toggleSideBar ? "block" : "hidden"}`}>
						<h1 className="text-xl font-bold">Administratorin</h1>
						<p className="text-gray-600 font-medium">Bruno Hans</p>
					</section>
					<SidbarNavigationLinks
						navigation={navigation.client}
						toggleSideBar={toggleSideBar}
						isAdmin={true}
					/>
				</div>
				{/* {toggleSideBar && 
          <span className="text-xl font-bold ml-10">Client Section</span>
        } */}
				{/* {toggleSideBar &&
        <span className="text-xl font-bold ml-10 my-2">Handyman Section</span>
        } */}
				{/* <SidbarNavigationLinks navigation={navigation.handyman} toggleSideBar={toggleSideBar} isAdmin={true}/> */}
				<Logout toggleSideBar={toggleSideBar} />
			</nav>
		</div>
	);
}
