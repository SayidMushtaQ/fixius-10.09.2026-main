"use client";
import SidbarNavigationLinks from "@/components/Dashboard/components/SidbarNavigationLinks";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logout from "../Dashboard/handwerker/layout/components/Logout";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User as UserIcon } from "lucide-react";

export default function Sidebar({
  slideNav,
  toggleSideBar,
  setToggleSideBar,
  navigationLinks,
}: {
  slideNav: boolean;
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  navigationLinks: any;
}) {
  const { userData } = useAuth();
  const craftsman = userData[0]?.craftsman;
  const user = userData[1] || userData[0] || {};
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && toggleSideBar) setToggleSideBar(false);
      else if (!mobile && !toggleSideBar) setToggleSideBar(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [toggleSideBar, setToggleSideBar]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isMobile && slideNav && toggleSideBar) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setToggleSideBar(false);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [slideNav, toggleSideBar, setToggleSideBar, isMobile]);

  return (
    <div
      id="mobile-sidebar"
      className={`bg-white border-r border-slate-100 fixed z-10 top-[80px] h-[calc(100vh-80px)] ${
        slideNav
          ? toggleSideBar
            ? "w-[280px] left-0" 
            : "w-[80px] left-0"  
          : "w-[280px] -left-[300px]" 
      } transition-all duration-500 ease-in-out overflow-y-auto group/sidebar`}
    >
      {/* Toggle functionality handled by Header */}

      <nav className="h-full flex flex-col py-8">


        {/* Navigation Links */}
        <div className="flex-1 px-4">
          <SidbarNavigationLinks
            navigation={navigationLinks}
            toggleSideBar={toggleSideBar}
          />
        </div>

        {/* Logout Section */}
        <div className="px-4 mt-auto pt-6 border-t border-gray-50">
          <Logout toggleSideBar={toggleSideBar} />
        </div>
      </nav>
    </div>
  );
}