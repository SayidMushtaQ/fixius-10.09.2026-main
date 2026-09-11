"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Wrench, HardHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface CraftsmanRegistrationCardProps {
  onSelectCard?: (serviceName: string) => void;
  className?: string;
}

export function CraftsmanRegistrationCard({
  onSelectCard,
  className,
}: CraftsmanRegistrationCardProps) {
  const benefits = [
    "Zugang zu geprüften Kundenaufträgen in Ihrer Region",
    "Volle Flexibilität ohne Bindung oder versteckte Kosten",
    "Eigenes Unternehmensprofil & verifizierte Bewertungen",
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] bg-slate-900 text-white p-8 md:p-10 shadow-2xl border border-slate-800 transition-all duration-300 hover:border-primary/50 group",
        className
      )}
    >
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
      
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div>
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-3.5 py-1 text-xs font-bold text-primary tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Für Handwerker & Fachbetriebe
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 leading-snug">
            Jetzt als Handwerker registrieren &amp; <span className="text-primary italic">neue Aufträge</span> sichern
          </h3>

          <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed mb-6">
            Registrieren Sie sich kostenlos auf Fixius und gewinnen Sie neue Kundinnen und Kunden in Ihrer Umgebung.
          </p>

          {/* Benefit Keypoints */}
          <ul className="space-y-3 mb-6">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </div>
  );
}

export default CraftsmanRegistrationCard;
