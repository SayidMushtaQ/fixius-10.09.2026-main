"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [isResettingPassword, setIsResettingPassword] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.oldPassword || !formData.newPassword) {
      toast.error("Alle Felder sind erforderlich");
      return;
    }

    try {
      setIsResettingPassword(true);

      const resetPasswordResponse = await axios.post(
        "/api/reset-password",
        formData
      );

      if (resetPasswordResponse.status === 200) {
        setIsResettingPassword(false);
        toast.success(resetPasswordResponse.data.message || "Passwort erfolgreich zurückgesetzt");
        setFormData({
          email: "",
          oldPassword: "",
          newPassword: "",
        });
        router.push("/");
      }
    } catch (error: any) {
      setIsResettingPassword(false);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Etwas ist schief gelaufen! Bitte versuchen Sie es erneut");
      }
    }
  };

  return (
    <main className="py-8 md:py-12 lg:py-16 xl:py-20">
      <section className="flex flex-col gap-5 md:gap-8 lg:gap-10 2xl:gap-12 justify-center items-center max-w-xs md:max-w-sm lg:max-w-md 2xl:max-w-lg h-[70vh] mx-auto">
        <h3 className="text-base md:text-lg lg:text-xl 2xl:text-2xl text-center font-semibold">
          Fixius
        </h3>
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col justify-center items-stretch gap-5"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
              E-Mail
            </span>
            <input
              type="email"
              name="email"
              className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4 focus:border-orange outline-none transition-colors"
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
              Altes Passwort (oder Code aus der E-Mail)
            </span>
            <input
              type="password"
              name="oldPassword"
              className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4 focus:border-orange outline-none transition-colors"
              placeholder="Code oder altes Passwort"
              value={formData.oldPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
              Neues Passwort
            </span>
            <input
              type="password"
              name="newPassword"
              className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4 focus:border-orange outline-none transition-colors"
              placeholder="Neues Passwort"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-fit px-5 py-2 border border-orange bg-white text-orange hover:bg-orange hover:text-white transition duration-200 ease-in rounded-md font-medium disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent disabled:cursor-not-allowed"
            disabled={isResettingPassword}
          >
            {isResettingPassword ? "Wird geladen..." : "Senden"}
          </button>
        </form>
      </section>
    </main>
  );
}
