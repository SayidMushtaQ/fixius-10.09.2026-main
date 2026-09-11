import { RegisterNow } from "@/constants/landingPage";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import RegisterCtaButton from "./RegisterCtaButton";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4" />

      <div className="Container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <Reveal
            y={0}
            x={-20}
            className="lg:w-6/12 text-center lg:text-left space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-secondary leading-tight tracking-tight">
              {RegisterNow.title.split(",")[0]}, <br />
              <span className="text-primary italic">{RegisterNow.title.split(",")[1]}</span>
            </h2>
            <p className="font-inter text-slate-600 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              {RegisterNow.paragraph}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <RegisterCtaButton />
              <Link href="/kontakt" className="font-inter px-10 py-4 text-secondary font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all rounded-xl w-full sm:w-auto text-lg text-center">
                Mehr erfahren
              </Link>
            </div>
          </Reveal>

          <Reveal
            y={0}
            scale={0.95}
            className="lg:w-5/12"
          >
            <div className="relative p-2 rounded-3xl bg-slate-100/50">
              <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="relative aspect-square flex items-center justify-center p-8">
                  <Image
                    src="/FormularioDeRegistro/cta_register.svg"
                    className="w-full h-auto object-contain opacity-90"
                    alt="Register Now"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
