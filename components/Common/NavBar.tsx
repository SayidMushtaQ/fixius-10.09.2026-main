"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MessageNotification from "../Dashboard/components/MessagePopUpNavBar";
import NotificationBar from "../Dashboard/components/NotificationPopUPNavBar";
import { Menu, X, User as UserIcon } from "lucide-react";

export default function NavBar({
  setSlideNav,
  slideNav,
  isCheckingProfile = false,
}: {
  setSlideNav: React.Dispatch<React.SetStateAction<boolean>>;
  slideNav: boolean;
  isCheckingProfile?: boolean;
}) {
  const [messageToggle, setMessageToggle] = useState<Boolean>(false);
  const [notifcationToggle, setNotificationToggle] = useState<Boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useAuth();
  const company_name = userData[0]?.craftsman?.company_name;
  const safePathname = pathname || "";
  const profileRoute = safePathname.split("/")[3];
  const creftmanRoute = safePathname.split("/")[1];

  // Check if admin is viewing a user's dashboard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminViewId = localStorage.getItem("userId_for_admin_req");
      setIsAdminView(!!adminViewId);
    }
  }, []);

  const toggleHamburger = () => {
    setSlideNav((prevState) => !prevState);
  };

  return (
    <div className="bg-white shadow-sm border-b border-slate-100/80 px-5 md:px-12 py-4 w-full fixed z-50 left-0 right-0 top-0">
      <nav className="flex justify-between items-center relative max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all focus:outline-none active:scale-95 cursor-pointer"
            onClick={toggleHamburger}
            aria-label={slideNav ? "Sidebar schließen" : "Sidebar öffnen"}
          >
            {slideNav ? (
              <X className="w-6 h-6 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Menu className="w-6 h-6 transition-all duration-300" />
            )}
          </button>

          <Link
            href={`/dashboard/${userData[0]?.role}`}
            className="cursor-pointer md:block hidden text-orange font-bold text-lg hover:text-orange/80 transition-colors"
          >
            Startseite
          </Link>
        </div>

        <div className="flex items-center gap-5 justify-end">
          <div className="flex items-center justify-center gap-5">
            {(profileRoute === "profil-bearbeiten" ||
              creftmanRoute === "handwerker") && (
              <>
                {isCheckingProfile ? (
                  <button
                    onClick={() => router.back()}
                    className={`bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
								font-medium focus:outline-none disabled:cursor-not-allowed 
								disabled:opacity-50`}
                  >
                    Zurück zum Dashboard
                  </button>
                ) : (
                  <Link
                    href={`/handwerker/${company_name}`}
                    className={`text-sm bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
                  				font-medium focus:outline-none disabled:cursor-not-allowed 
                  				disabled:opacity-50`}
                  >
                    Profil als Kunde ansehen
                  </Link>
                )}
              </>
            )}

            {/* Hide message and notification icons when admin is viewing user dashboard */}
            {!isAdminView && (
              <>
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
              </>
            )}

            {/* User Profile Photo */}
            {userData[0] && (
              <div className="flex items-center pl-2 border-l border-slate-100">
                <Link 
                  href={
                    userData[0]?.role === "handwerker"
                      ? "/dashboard/handwerker/profil-bearbeiten"
                      : userData[0]?.role === "kunde"
                      ? "/dashboard/kunde/profilverwaltung"
                      : `/dashboard/${userData[0]?.role}`
                  } 
                  className="flex items-center gap-2 group transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-sm">
                    {userData[0]?.profile_photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={userData[0]?.profile_photo}
                        alt="Profilbild"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
