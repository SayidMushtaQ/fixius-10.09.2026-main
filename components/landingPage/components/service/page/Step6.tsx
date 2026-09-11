"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Mail, Lock } from "lucide-react";

export default function Page6({
  setContactDetailsPage,
  contactDetailsPageError,
  contactDetailsPage,
  isNextBtnDisable,
  setIsNextBtnDisable,
}: ContactDetailsPropsTypePag) {
  const { userData } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetailsPage((pre: ContactDetailsPageDataType) => ({
      ...pre,
      [name]: value,
    }));

    if (name === "email") {
      // If email changes, check if we need to reset the "next button disabled" state (which implies user exists)
      if (value !== contactDetailsPage.email) {
        setIsNextBtnDisable(false);
      }
    }
  };

  const isDisabled = userData[0]?.accessToken ? true : false;
  const showPassword = isNextBtnDisable;

  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">
          Ihre <span className="text-primary italic">Kontaktinformationen</span>
        </h2>
        <p className="text-gray-500 text-xs">
          {showPassword 
            ? "Willkommen zurück! Bitte geben Sie Ihr Passwort ein." 
            : "Geben Sie Ihre E-Mail-Adresse ein, um fortzufahren."}
        </p>
      </div>

      <div className="space-y-4">
        {/* Email Input */}
        <div className="group space-y-3">
          <label 
            htmlFor="page6PopUP_email__number" 
            className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors"
          >
            E-Mail-Adresse
          </label>
          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Mail size={20} />
            </div>
            <input
              disabled={isDisabled}
              type="email"
              id="page6PopUP_email__number"
              name="email"
              autoComplete="email"
              placeholder="z.B. max@mustermann.de"
              onChange={handleChange}
              value={contactDetailsPage.email}
              className={`w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-semibold shadow-xs text-sm ${
                isDisabled ? "cursor-not-allowed opacity-60" : ""
              }`}
            />
          </div>
          {contactDetailsPageError.emailError && !showPassword && (
            <p className="text-xs font-semibold text-red-500 ml-2 animate-shake">
              {contactDetailsPageError.emailError}
            </p>
          )}
        </div>

        {/* Password Input (Only for existing users) */}
        {showPassword && (
          <div className="group space-y-3 ">
            <label 
              htmlFor="page6PopUP_password" 
              className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors"
            >
              Passwort
            </label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                id="page6PopUP_password"
                name="password"
                autoComplete="current-password"
                placeholder="Ihr Passwort"
                onChange={handleChange}
                value={contactDetailsPage.password}
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-medium"
              />
            </div>
            {contactDetailsPageError.emailError && (
              <p className="text-xs font-semibold text-red-500 ml-2 animate-shake">
                {contactDetailsPageError.emailError}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="bg-primary/5 p-4 rounded-2xl flex items-start gap-3">
        <div className="mt-1 shrink-0">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Ihre Daten sind bei uns sicher und werden nur zur Kontaktaufnahme bezüglich Ihres Auftrags verwendet.
        </p>
      </div>
    </div>
  );
}
