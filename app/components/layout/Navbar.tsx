"use client";

import { NavLinks } from "@/constants/landingPage/index";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Login from "@/components/Login";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { userData } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-transparent backdrop-blur-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="Container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 shrink-0">
          <Logo
            whiteAccent={false}
            className="w-auto h-8 lg:h-9 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {[2, 3, 7, 4].map((id) => {
              const link = NavLinks.find((l) => l.id === id);
              if (!link) return null;
              const isActive = pathname === link.url;
              return (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className={`font-inter text-sm font-medium transition-all duration-300 relative group ${
                      isActive
                        ? "text-primary"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {/* Auth Section - Fixed width container to prevent layout shift */}
          <div className="flex items-center justify-end gap-5 min-w-[220px]">
            {!mounted ? (
              <div className="h-10 w-full animate-pulse bg-slate-50 rounded-lg" />
            ) : userData?.length > 0 ? (
              <Link
                href={
                  userData[0]?.role === "admin"
                    ? "/dashboard/admin"
                    : userData[0]?.role === "handwerker"
                      ? "/dashboard/handwerker"
                      : "/dashboard/kunde"
                }
                className="font-inter btn-primary py-2 px-6 text-sm rounded-lg"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="font-inter text-sm font-semibold text-secondary hover:text-primary transition-colors"
                >
                  Anmelden
                </button>
                <Link
                  href="/registrieren"
                  className="font-inter btn-primary py-2.5 px-6 text-sm rounded-lg shadow-soft"
                >
                  Für Handwerker
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-50 p-2 text-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8 p-8">
            <ul className="flex flex-col items-center gap-6">
              {[2, 3, 7, 4].map((id) => {
                const link = NavLinks.find((l) => l.id === id);
                if (!link) return null;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="font-inter text-2xl font-bold text-secondary hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="w-full h-px bg-slate-100 max-w-xs" />
            <div className="flex flex-col w-full max-w-xs gap-4">
              <Link
                href="/registrieren"
                className="font-inter btn-primary w-full py-3 text-center text-base"
                onClick={() => setIsOpen(false)}
              >
                Für Handwerker
              </Link>
              <button
                className="font-inter btn-secondary w-full py-3 text-base"
                onClick={() => {
                  setIsOpen(false);
                  setShowLogin(true);
                }}
              >
                Anmelden
              </button>
            </div>
          </nav>
        </div>
      </div>
      {showLogin && <Login setToggleLogin={setShowLogin} />}
    </header>
  );
}
