import SidbarNavigationLinks from "@/components/Dashboard/components/SidbarNavigationLinks";
import { navigation } from "@/constants/Dashboard/kunde";
import { useAuth } from "@/context/AuthContext";
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
  // * CONTEXT variables * //
  const { userData } = useAuth();

  return (
    <div
      className={`bg-white shadow-lg border-2  py-6 ${
        toggleSideBar ? "sm:w-64 w-60" : "w-24"
      } fixed top-0 ${!slideNav ? "left-0" : "-left-96"} overflow-y-scroll`}
    >
      <nav className="h-screen flex  flex-col py-20 justify-between">
        <div
          className={`flex justify-start items-center  ${
            toggleSideBar ? "sm:mx-9 mx-5" : "justify-center pr-2"
          } gap-3`}
        >
          <div className="bg-white  shadow rounded-full my-4 p-1">
            <FaRegUserCircle
              className="cursor-pointer text-6xl"
              title="Click on image"
              onClick={() => setToggleSideBar(!toggleSideBar)}
            />
          </div>
          <section className={`${toggleSideBar ? "block" : "hidden"}`}>
            {userData && userData[0]?.name?.split(" ")?.length > 0 ? (
              <>
                <h1 className="text-xl font-bold">
                  {userData[0]?.name?.split(" ")[0]}
                </h1>
                <p className="text-gray-600 font-medium">
                  {userData[0]?.name?.split(" ")[1]}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">{userData[0]?.name}</h1>
              </>
            )}
          </section>
        </div>
        <SidbarNavigationLinks
          navigation={navigation}
          toggleSideBar={toggleSideBar}
        />
        <Logout toggleSideBar={toggleSideBar} />
      </nav>
    </div>
  );
}
