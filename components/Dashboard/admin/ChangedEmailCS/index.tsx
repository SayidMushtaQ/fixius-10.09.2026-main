"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import ChangeEmail from "./components/ChangedEmailCS";
export interface EmailErroType {
  old_email_addressError: string;
  new_email_addressError:string
}
export type EmailType = {
  old_email:string,
  new_email:string
}
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [userEmail, setUserEmail] = useState<EmailType>({
    old_email: "",
    new_email: "",
  });
  const [userError, setUserError] = useState<EmailErroType>({
    old_email_addressError: "",
    new_email_addressError:''
  });

  const handleSave_email = () => {
    const errors: any = {};
    if (!userEmail.old_email) {
      errors.old_email_addressError = "Alte E-Mail-Adresse erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(userEmail.old_email)) {
      errors.old_email_addressError = "Die alte E-Mail-Adresse ist ungültig";
    }
    if (!userEmail.new_email) {
      errors.new_email_addressError = "Neue E-Mail-Adresse erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(userEmail.new_email)) {
      errors.new_email_addressError = "Die neue E-Mail-Adresse ist ungültig";
    }
    if(Object.keys(errors).length === 0){
      // window.alert('Email change');
      setUserEmail({old_email:'',new_email:''});
      setUserError({ old_email_addressError: "",new_email_addressError:''});
    }else{
      setUserError(errors);
    }
  };
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-12`}>
      <ChangeEmail userEmail={userEmail} setUserEmail={setUserEmail} handleSave_email={handleSave_email} userError={userError}/>
    </div>
  );
}
