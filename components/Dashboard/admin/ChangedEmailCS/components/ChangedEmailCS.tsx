import React from "react";
import {EmailErroType,EmailType} from '../index';


export default function ChangeEmail({userEmail,setUserEmail,handleSave_email,userError}:{ userEmail: EmailType;setUserEmail: React.Dispatch<React.SetStateAction<EmailType>>; handleSave_email: () => void;userError:EmailErroType}) {
  return (
    <div className="bg-white px-7 py-5 rounded-md shadow w-full md:w-3/4 mx-auto">
      <div className="w-full">
        <h1 className="text-xl font-bold my-5">E-Mail geändert</h1>
        <div className="flex justify-center items-center gap-2 lg:gap-5 w-full lg:flex-row flex-col">
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="newEmail" className="block text-gray-700  font-bold mb-2">
              Alte E-Mail-Adresse
            </label>
            <input id="newEmail" type="email" className="w-full px-3 py-3 border border-gray-600 rounded outline-none" value={userEmail.old_email} onChange={e=>setUserEmail(pre=>({...pre,old_email:e.target.value}))} placeholder="Enter old email" required/>
            {userError.old_email_addressError && (
            <p className="absolute text-sm text-red-500">
              {userError.old_email_addressError}
            </p>
          )}
          </div>
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="confirmEmail" className="block text-gray-700  font-bold mb-2">
            Neue E-Mail-Adresse
            </label>
            <input id="confirmEmail" type="email" className="w-full px-3 py-3 border border-gray-600 rounded outline-none" value={userEmail.new_email}  onChange={e=>setUserEmail(pre=>({...pre,new_email:e.target.value}))} placeholder="Enter new email" required/>
            {userError.new_email_addressError && (
            <p className="absolute text-sm text-red-500">
              {userError.new_email_addressError}
            </p>
          )}  
          </div>
        </div>
        <div className="flex justify-end items-center">
        <button type="submit" className=" bg-orange hover:text-black text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4" onClick={handleSave_email}>
          Änderungen speichern
        </button>
        </div>
      </div>
    </div>
  );
}
