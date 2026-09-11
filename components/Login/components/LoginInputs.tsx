"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordResetPopup from "./forgetPasswordModal";

interface LoginInputsPropsType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailError: string;
  passwordError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginInputs({
  email,
  setEmail,
  setPassword,
  password,
  handleSubmit,
  emailError,
  passwordError,
  setEmailError,
  setPasswordError,
}: LoginInputsPropsType) {
  const [passwordViewToggle, setPasswordViewToggle] = useState<Boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-secondary tracking-tight mb-2">
          Willkommen zurück
        </h2>
        <p className="text-gray-500 text-sm">
          Melden Sie sich an, um fortzufahren
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-secondary ml-1">
            E-Mail
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium placeholder:text-gray-400 ${
                emailError 
                  ? "border-red-500 focus:border-red-500" 
                  : "border-transparent focus:border-primary/20 focus:bg-white"
              }`}
              placeholder="name@beispiel.de"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              value={email}
              required
            />
          </div>
          {emailError && (
            <p className="text-xs text-red-500 font-medium ml-1 animate-shake">{emailError}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center ml-1">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-secondary"
            >
              Passwort
            </label>
            <button 
              type="button"
              onClick={openPopup}
              className="text-xs font-bold text-primary hover:text-orange transition-colors"
            >
              Passwort vergessen?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={`${passwordViewToggle ? "text" : "password"}`}
              className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium placeholder:text-gray-400 ${
                passwordError 
                  ? "border-red-500 focus:border-red-500" 
                  : "border-transparent focus:border-primary/20 focus:bg-white"
              }`}
              placeholder="••••••••"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              value={password}
              required
            />
            <button
              type="button"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
              onClick={() => setPasswordViewToggle(!passwordViewToggle)}
            >
              <AiOutlineEyeInvisible size={22} />
            </button>
          </div>
          {passwordError && (
            <p className="text-xs text-red-500 font-medium ml-1 animate-shake">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-orange text-white font-bold py-4 px-6 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 transform active:scale-[0.98] mt-4"
        >
          Anmelden
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm">
            Sie haben noch kein Konto?{" "}
            <Link href={"/registrieren"} className="text-primary font-bold hover:underline">
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </form>
      <PasswordResetPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
