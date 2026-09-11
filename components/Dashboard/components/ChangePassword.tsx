import React from "react";
import { EmailErroType, EmailType } from '../cliente/ChangePassword/index';

export default function ChangeEmail({
  userPassword,
  setUserPassword,
  handleSave_password,
  userError
}: {
  userPassword: EmailType;
  setUserPassword: React.Dispatch<React.SetStateAction<EmailType>>;
  handleSave_password: () => void;
  userError: EmailErroType;
}) {
  return (
    <div className="bg-white py-12 px-10 rounded-xl w-full md:w-3/4 mx-auto shadow-soft border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-inter text-slate-950">Passwort ändern</h2>
        <p className="text-slate-500 font-inter text-sm mt-1">Sichern Sie Ihr Konto mit einem starken Passwort.</p>
      </div>
        <div className="flex justify-center items-center gap-2 lg:gap-5 w-full lg:flex-row flex-col">
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="newPassword" className="block text-slate-600 font-semibold font-inter mb-2">
              Neues Passwort
            </label>
            <input
              id="newPassword"
              type="password"
              className="h-12 w-full px-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inter"
              value={userPassword.password}
              onChange={e => setUserPassword(pre => ({ ...pre, password: e.target.value }))}
              placeholder="Neues Passwort eingeben"
              required
            />
            {userError.password_Error && (
              <p className="absolute text-sm text-red-500">
                {userError.password_Error}
              </p>
            )}
          </div>
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="confirmPassword" className="block text-slate-600 font-semibold font-inter mb-2">
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="h-12 w-full px-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inter"
              value={userPassword.cPassword}
              onChange={e => setUserPassword(pre => ({ ...pre, cPassword: e.target.value }))}
              placeholder="Passwort bestätigen"
              required
            />
            {userError.password_doNotMatch && (
              <p className="absolute text-sm text-red-500">
                {userError.password_doNotMatch}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-primary hover:bg-black text-white font-bold font-montserrat py-2.5 px-8 rounded-lg transition-all active:scale-95 shadow-soft mt-4"
            onClick={handleSave_password}
          >
            Passwort speichern
          </button>
        </div>
    </div>
  );
}
