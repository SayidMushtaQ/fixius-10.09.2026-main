import { Metadata } from "next";
import ResetPasswordForm from "@/components/Login/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Passwort zurücksetzen | Fixius",
  description: "Haben Sie Ihr Passwort vergessen? Keine Sorge, setzen Sie Ihr Passwort hier zurück.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
