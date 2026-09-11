"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import ChangeEmail from "../../components/ChangeEmail";
export interface EmailErroType {
  email_addressError: string;
  email_doNotMatch: string;
}
export type EmailType = {
  email: string;
  cEmail: string;
};
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [userEmail, setUserEmail] = useState<EmailType>({
    email: "",
    cEmail: "",
  });
  const [userError, setUserError] = useState<EmailErroType>({
    email_addressError: "",
    email_doNotMatch: "",
  });

  const handleSave_email = () => {
    const errors: any = {};
    if (!userEmail.email) {
      errors.email_addressError = "E-Mail ist erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(userEmail.email)) {
      errors.email_addressError = "Die E-Mail-Adresse ist ungültig";
    } else if (userEmail.email !== userEmail.cEmail) {
      errors.email_doNotMatch = "Die E-Mail-Adresse stimmt nicht überein";
    }
    if (Object.keys(errors).length === 0) {
      // window.alert('Email change');
      setUserEmail({ email: "", cEmail: "" });
      setUserError({ email_addressError: "", email_doNotMatch: "" });
    } else {
      setUserError(errors);
    }
  };
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <ChangeEmail
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        handleSave_email={handleSave_email}
        userError={userError}
      />
    </div>
  );
}
