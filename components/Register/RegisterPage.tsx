"use client";

import { useState } from "react";
import Article from "./components/Article";
import RegisterFormHeader from "./components/RegisterFormHeader";
import RegisterForms from "./components/RegisterForms";
import Steps from "./components/Steps";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const [selectCard, setSelectCard] = useState<string[]>([]);
  const [selectCardError, setSelectCardError] = useState<string>("");
  const [step, setStep] = useState<Number>(2);

  return (
    <main className="w-full bg-mainBackground min-h-screen">
      {/* Hero Section with Form */}
      <section className="relative px-5 py-12 md:py-24 bg-cover bg-center bg-no-repeat bg-registration-hero-img overflow-hidden">
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-secondary/10 backdrop-blur-[2px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <header className="text-center flex flex-col justify-center items-center mb-10 space-y-4">
              {step === 2 ? (
                <>
                  <h1 className="text-3xl md:text-4xl font-black text-secondary leading-tight tracking-tight">
                    Finde Aufträge für <br />
                    <span className="text-primary italic">deinen Beruf</span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl">
                    Finde die passenden Aufträge für deinen Beruf mit unserem Profi-Service.
                  </p>
                </>
              ) : (
                <h1 className="text-xl md:text-2xl font-black text-secondary leading-tight">
                  Lade mindestens ein <br />
                  <span className="text-primary">Dokument hoch</span>
                </h1>
              )}
            </header>

            <div className="relative">
              {selectCard.length <= 0 ? (
                <RegisterFormHeader
                  setSelectCard={setSelectCard}
                  selectCardError={selectCardError}
                  selectCard={selectCard}
                  setSelectCardError={setSelectCardError}
                />
              ) : (
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100/80">
                  <RegisterForms
                    selectCard={selectCard}
                    step={step}
                    setStep={setStep}
                    setSelectCardError={setSelectCardError}
                    setSelectCard={setSelectCard}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <Steps />

      {/* Article Section */}
      <Article />
    </main>
  );
}
