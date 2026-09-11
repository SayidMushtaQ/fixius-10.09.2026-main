"use client";

import { useLogout } from "@/hooks/logout";
import { LogOut } from "lucide-react";

export default function Logout({ toggleSideBar }: { toggleSideBar: boolean }) {
  const logout = useLogout();
  
  return (
    <button
      onClick={logout}
      className={`group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 bg-rose-50 hover:bg-rose-100/80 text-rose-600 border border-rose-100/80 shadow-sm hover:shadow active:scale-95 cursor-pointer`}
      title="Abmelden"
    >
      <div className="flex-none transition-transform group-hover:-translate-x-0.5 text-rose-500">
        <LogOut size={18} className="stroke-[2.2]" />
      </div>
      <span
        className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
          toggleSideBar ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        Abmelden
      </span>

      {!toggleSideBar && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
          Abmelden
        </div>
      )}
    </button>
  );
}
