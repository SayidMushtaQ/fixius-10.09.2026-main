'use client'

import { motion } from 'motion/react'
import { ClipboardList, HardHat, MessagesSquare } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Beschreiben Sie Ihr Vorhaben',
    text: 'Erstellen Sie kostenlos einen Auftrag und erzählen Sie uns, was rund ums Haus oder im Garten ansteht. Je genauer Ihre Angaben, desto besser passen die Vorschläge.',
  },
  {
    number: '02',
    icon: HardHat,
    title: 'Vergleichen Sie passende Profis',
    text: 'Sie erhalten Rückmeldungen von geprüften Fachbetrieben und entscheiden selbst, welche Profile und Bewertungen zu Ihnen passen.',
  },
  {
    number: '03',
    icon: MessagesSquare,
    title: 'Starten Sie direkt den Austausch',
    text: 'Nehmen Sie unkompliziert Kontakt auf, klären Sie offene Fragen und vergeben Sie den Auftrag mit einem guten Gefühl.',
  },
]

function TrustVisual() {
  return (
    <div
      className="relative mx-auto flex min-h-97.5 w-full max-w-130 items-center justify-center sm:min-h-110 lg:min-h-118.75"
      aria-label="Illustration eines Handwerkerprofils"
    >
      {/* Background blob */}
      <div className="absolute inset-[8%_5%] rotate-[-8deg] rounded-[48%_52%_43%_57%] bg-slate-50 sm:inset-[9%_8%]" />

      {/* Decorative orbits */}
      <div className="absolute h-32.5 w-70 rotate-[-26deg] rounded-full border border-slate-200 sm:h-42.5 sm:w-97.5" />

      <div className="absolute h-28.75 w-62.5 rotate-52 rounded-full border border-slate-200 opacity-70 sm:h-35 sm:w-85" />

      {/* Main profile card */}
      <motion.div
        className="relative z-10 w-[78%] max-w-77.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_55px_rgba(20,26,46,0.12)] sm:w-[72%] sm:p-6"
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 sm:text-[10px]">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          geprüftes Profil
        </div>

        <div className="mx-auto my-5 grid h-14 w-14 place-items-center rounded-full bg-orange-50 text-lg font-extrabold text-orange-700 sm:my-6 sm:h-16 sm:w-16 sm:text-xl">
          MK
        </div>

        <div className="text-center text-lg font-extrabold sm:text-xl">
          Marek &amp; Team
        </div>

        <div className="mb-4 mt-1 text-center text-[11px] text-slate-500 sm:text-xs">
          Sanitär · Heizung · Service
        </div>

        <div className="border-y border-slate-100 py-3 text-center text-xs">
          <strong className="mr-1 text-base text-slate-900">4,9</strong>

          <span className="tracking-wide text-amber-400">★★★★★</span>

          <small className="text-slate-500"> 38 Bewertungen</small>
        </div>

        <div className="my-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
            zuverlässig
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
            pünktlich
          </span>
        </div>

        {/* Regular button */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg bg-orange-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700 active:bg-orange-800"
        >
          <span>Profil ansehen</span>
          <span aria-hidden="true" className="text-lg">
            →
          </span>
        </button>
      </motion.div>

      {/* Verified badge */}
      <div className="absolute right-0 top-[8%] z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg sm:right-[3%] sm:top-[13%] sm:p-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-50 text-sm font-black text-emerald-600 sm:h-7 sm:w-7">
          ✓
        </span>

        <span>
          <strong className="block text-[10px] sm:text-xs">Geprüft</strong>

          <small className="mt-0.5 block text-[9px] text-slate-500 sm:text-[10px]">
            Identität bestätigt
          </small>
        </span>
      </div>

      {/* Rating badge */}
      <div className="absolute bottom-[7%] left-0 z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg sm:bottom-[14%] sm:left-[2%] sm:p-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-amber-50 text-sm font-black text-amber-500 sm:h-7 sm:w-7">
          ★
        </span>

        <span>
          <strong className="block text-[10px] sm:text-xs">
            4,9 / 5
          </strong>

          <small className="mt-0.5 block text-[9px] text-slate-500 sm:text-[10px]">
            Kundenbewertung
          </small>
        </span>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Main section */}
      <section
        className="mx-auto max-w-295 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
        aria-labelledby="trust-title"
      >
        {/* Header */}
        <div className="mx-auto mb-10 max-w-190 text-center sm:mb-12 md:mb-16">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600 sm:mb-4 sm:text-xs">
            So funktioniert&apos;s
          </p>

          <h1
            id="trust-title"
            className="mb-4 text-[34px] font-bold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-[42px] md:text-[52px] lg:text-[62px]"
          >
            Gute Arbeit beginnt
            <br className="hidden md:block" />
            mit dem richtigen Kontakt.
          </h1>

          <p className="mx-auto mb-5 max-w-142.5 text-sm leading-relaxed text-slate-500 sm:text-base">
            Von der ersten Idee bis zum fertigen Projekt: Finden Sie
            Fachleute, denen Sie Ihre vier Wände anvertrauen möchten.
          </p>

          {/* Regular link/button */}
          <a
            href="#ablauf"
            className="inline-flex items-center gap-2 rounded-md border border-orange-200 px-3 py-2 text-sm font-bold text-orange-600 transition-colors hover:border-orange-300 hover:bg-orange-50"
          >
            <span
              aria-hidden="true"
              className="grid h-5 w-5 place-items-center rounded-full bg-orange-600 text-sm text-white"
            >
              ↗
            </span>

            Mehr über unsere Qualitätsstandards
          </a>
        </div>

        {/* Content */}
        <div
          id="ablauf"
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:gap-20 xl:gap-24"
        >
          {/* Steps */}
          <div className="grid gap-6 sm:gap-7">
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.number}
                  className="grid grid-cols-[40px_1fr] gap-4 border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[42px_1fr] sm:gap-4 sm:pb-7"
                >
                  {/* Icon */}
                  <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 sm:h-10.5 sm:w-10.5">
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-orange-600 text-[9px] font-extrabold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className="mb-2 text-lg font-bold leading-tight tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                      {step.title}
                    </h2>

                    <p className="max-w-125 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                      {step.text}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Visual */}
          <TrustVisual />
        </div>
      </section>

      {/* CTA section */}
      <section
        className="bg-[#141a2e] px-5 py-9 text-white sm:px-6 sm:py-10 md:px-12 md:py-12"
        aria-labelledby="cta-title"
      >
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6 sm:gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-500 sm:text-xs">
              Bereit für den nächsten Schritt?
            </p>

            <h2
              id="cta-title"
              className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl"
            >
              Aus Idee wird Projekt.
            </h2>
          </div>

          {/* Regular CTA button */}
          <a
            href="#auftrag"
            className="inline-flex w-full items-center justify-between gap-6 rounded-lg bg-orange-600 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 sm:w-auto sm:px-6 sm:py-4"
          >
            <span>Auftrag kostenlos starten</span>

            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  )
}
