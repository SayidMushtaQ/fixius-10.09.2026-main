import { StepsCardsData } from "@/constants/landingPage";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Steps({ isShowHeadingText = true }: { isShowHeadingText?: boolean }) {
  return (
    <section className="pt-12 pb-20 bg-white">
      <div className="Container">
        {isShowHeadingText && (
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Reveal
              as="h2"
              y={15}
              className="text-3xl md:text-4xl font-inter font-bold text-secondary tracking-tight"
            >
              So einfach <span className="text-primary italic">funktioniert es</span>
            </Reveal>
            <Reveal
              as="p"
              y={15}
              delay={0.1}
              className="font-inter text-secondary-light text-lg font-medium"
            >
              In nur drei Schritten zum passenden Handwerker für Ihr Projekt.
            </Reveal>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {StepsCardsData.map((step, index) => (
            <Reveal
              key={step.id}
              delay={index * 0.1}
              className="relative group text-center space-y-6"
            >
              <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
                {/* Subtle Step Number Badge */}
                <div className="absolute top-0 right-0 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-inter font-bold text-lg shadow-soft z-20">
                  {step.step}
                </div>

                {/* Image Container */}
                <div className="w-full h-full p-8 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-premium transition-all duration-300">
                  <Image
                    src={step.img}
                    alt={step.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>

              <div className="space-y-3 px-4">
                <h3 className="text-xl font-inter font-bold text-secondary">
                  {step.title}
                </h3>
                <p className="font-inter text-secondary-light text-base leading-relaxed font-medium">
                  {step.paragraph}
                </p>
              </div>
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
}
