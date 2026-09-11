"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import Forms from "./forms";
export interface EmailErroType {
  password_Error: string;
  password_doNotMatch: string;
}
export type EmailType = {
  password: string;
  cPassword: string;
};
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [userPassword, setUserPassword] = useState<EmailType>({
    password: "",
    cPassword: "",
  });
  const [userError, setUserError] = useState<EmailErroType>({
    password_Error: "",
    password_doNotMatch: "",
  });

  const handleSave_password = () => {
    const errors: any = {};
    if (!userPassword.password) {
      errors.password_Error = "Passwort ist erforderlich";
    } else if (userPassword.password.length <= 5) {
      ("Das Passwort muss mindestens 6 Zeichen lang sein");
    } else if (userPassword.password !== userPassword.cPassword) {
      errors.password_doNotMatch = "Die Passwörter stimmen nicht überein";
    }
    if (Object.keys(errors).length === 0) {
      // window.alert('Email change');
      setUserPassword({ password: "", cPassword: "" });
      setUserError({ password_Error: "", password_doNotMatch: "" });
    } else {
      setUserError(errors);
    }
  };

  return (
    <div>
      <section className="md:my-10 ">
        <h1 className="font-bold text-xl lg:text-4xl md:w-fit text-Heading">
          Verwalten Sie Ihr{" "}
          <span className="text-orange font-bold">Passwort</span>
        </h1>
      </section>
      <div className="rounded-md flex flex-col md:gap-5 ">
        <Forms />
      </div>
    </div>
  );
}
