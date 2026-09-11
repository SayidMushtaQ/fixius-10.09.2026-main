"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
	ClipboardList, 
	UserCog, 
	Lock, 
	MessageSquare, 
	CreditCard, 
	LayoutDashboard, 
	Users, 
	CheckCircle, 
	BarChart3, 
	Star,
	PlusCircle,
	Bell,
  Mail,
  ShieldCheck,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

type NaviagtionLinksType = {
	id: number;
	linkText: string;
	img: any;
	href: string;
};

export default function SidbarNavigationLinks({
	navigation,
	toggleSideBar,
	isAdmin,
}: {
	navigation: NaviagtionLinksType[];
	toggleSideBar: boolean;
	isAdmin?: Boolean;
}) {
	const pathname = usePathname();
	const safePathname = pathname || "";

	const getIconConfig = (img: any, text: string) => {
		const lowerText = text.toLowerCase();
		const imgSrc = typeof img === "string" ? img : (img?.src || "");

		if (imgSrc.includes("orders.svg") || lowerText.includes("auftrag")) {
			return { icon: ClipboardList, color: "bg-purple-100/80 text-purple-600 border-purple-200/50" };
		}
		if (imgSrc.includes("editProfile.svg") || lowerText.includes("profil")) {
			return { icon: UserCog, color: "bg-indigo-100/80 text-indigo-600 border-indigo-200/50" };
		}
		if (imgSrc.includes("password.svg") || lowerText.includes("passwort")) {
			return { icon: Lock, color: "bg-rose-100/80 text-rose-600 border-rose-200/50" };
		}
		if (imgSrc.includes("messages.svg") || lowerText.includes("nachricht")) {
			return { icon: MessageSquare, color: "bg-sky-100/80 text-sky-600 border-sky-200/50" };
		}
		if (imgSrc.includes("paymentPackages.svg") || lowerText.includes("zahlung") || lowerText.includes("abonnement")) {
			return { icon: CreditCard, color: "bg-emerald-100/80 text-emerald-600 border-emerald-200/50" };
		}
		if (lowerText.includes("dashboard")) {
			return { icon: LayoutDashboard, color: "bg-violet-100/80 text-violet-600 border-violet-200/50" };
		}
		if (lowerText.includes("benutzer")) {
			return { icon: Users, color: "bg-amber-100/80 text-amber-600 border-amber-200/50" };
		}
		if (lowerText.includes("überprüfung")) {
			return { icon: ShieldCheck, color: "bg-teal-100/80 text-teal-600 border-teal-200/50" };
		}
		if (lowerText.includes("statistik")) {
			return { icon: BarChart3, color: "bg-blue-100/80 text-blue-600 border-blue-200/50" };
		}
		if (lowerText.includes("bewertung")) {
			return { icon: Star, color: "bg-amber-100/80 text-amber-500 border-amber-200/50" };
		}
		if (lowerText.includes("einstellen") || lowerText.includes("aktivierung")) {
			return { icon: Settings, color: "bg-slate-100 text-slate-600 border-slate-200/50" };
		}
		if (lowerText.includes("alarm") || lowerText.includes("benachrichtigung")) {
			return { icon: Bell, color: "bg-orange-100/80 text-orange-600 border-orange-200/50" };
		}
		if (lowerText.includes("email") || lowerText.includes("e-mail")) {
			return { icon: Mail, color: "bg-cyan-100/80 text-cyan-600 border-cyan-200/50" };
		}
		
		return { icon: null, color: "bg-purple-100/80 text-purple-600 border-purple-200/50" };
	};

	const isActiveLink = (path: string) => {
		return safePathname === path;
	};

	return (
		<ul className={`space-y-2.5 ${!isAdmin && "h-[68vh]"} overflow-y-auto scrollbar-hide py-2 px-1`}>
			{navigation?.map(({ id, linkText, href, img }) => {
        const active = isActiveLink(href);
        const { icon: IconComponent, color: badgeColor } = getIconConfig(img, linkText);
        
        return (
          <Link href={`${href}`} key={id} className="group block">
            <li
              className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-300 ${
                active 
                  ? "bg-white text-slate-900 shadow-md shadow-slate-200/60 border border-slate-100 font-bold" 
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <div className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${badgeColor}`}>
                {IconComponent ? (
                  <IconComponent size={18} className="stroke-[2.2]" />
                ) : (
                  <Image src={img} alt={linkText} width={18} height={18} className="object-contain" />
                )}
              </div>
              
              <span
                className={`text-sm font-semibold transition-all duration-300 ${
                  toggleSideBar ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                } ${active ? "text-slate-900 font-bold" : "text-slate-600 group-hover:text-slate-900"}`}
              >
                {linkText}
              </span>

              {active && toggleSideBar && (
                <div className="ml-auto w-1.5 h-5 rounded-full bg-violet-600 shadow-sm shadow-violet-500/50" />
              )}

              {!toggleSideBar && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {linkText}
                </div>
              )}
            </li>
          </Link>
        );
      })}
		</ul>
	);
}
