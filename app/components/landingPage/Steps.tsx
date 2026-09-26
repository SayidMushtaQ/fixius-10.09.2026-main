'use client'

import { motion, type Variants } from 'framer-motion'
import {
  ClipboardList,
  HardHat,
  MessagesSquare,
} from 'lucide-react'

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

/* --------------------------------
   Animation Variants
--------------------------------- */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

const stepVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

/* --------------------------------
   Trust Visual
--------------------------------- */

function TrustVisual() {
  return (
    <motion.div
      className="relative mx-auto flex min-h-97.5 w-full max-w-130 items-center justify-center sm:min-h-110 lg:min-h-118.75"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {/* Background blob */}
      <motion.div
        className="absolute inset-[8%_5%] rotate-[-8deg] rounded-[48%_52%_43%_57%] bg-slate-50 sm:inset-[9%_8%]"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      />

      {/* Decorative orbit 1 */}
      <motion.div
        className="absolute h-32.5 w-70 rotate-[-26deg] rounded-full border border-slate-200 sm:h-42.5 sm:w-97.5"
        animate={{
          rotate: [-26, -20, -26],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Decorative orbit 2 */}
      <motion.div
        className="absolute h-28.75 w-62.5 rotate-52 rounded-full border border-slate-200 opacity-70 sm:h-35 sm:w-85"
        animate={{
          rotate: [52, 58, 52],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main profile card */}
      <motion.div
        className="relative z-10 w-[78%] max-w-77.5"
        variants={fadeUp}
      >
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_55px_rgba(20,26,46,0.12)] sm:p-6"
          animate={{
            y: -8,
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          }}
        >
          {/* Verified profile */}
          <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            geprüftes Profil
          </div>

          {/* Avatar */}
          <motion.div
            className="mx-auto my-5 grid h-14 w-14 place-items-center rounded-full bg-orange-50 text-lg font-extrabold text-orange-700 sm:my-6 sm:h-16 sm:w-16 sm:text-xl"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            MK
          </motion.div>

          {/* Name */}
          <div className="text-center text-lg font-extrabold sm:text-xl">
            Marek &amp; Team
          </div>

          {/* Profession */}
          <div className="mb-4 mt-1 text-center text-[11px] text-slate-500 sm:text-xs">
            Sanitär · Heizung · Service
          </div>

          {/* Rating */}
          <div className="border-y border-slate-100 py-3 text-center text-xs">
            <strong className="mr-1 text-base text-slate-900">
              4,9
            </strong>

            <span className="tracking-wide text-amber-400">
              ★★★★★
            </span>

            <small className="text-slate-500">
              {' '}
              38 Bewertungen
            </small>
          </div>

          {/* Tags */}
          <div className="my-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
              zuverlässig
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
              pünktlich
            </span>
          </div>

          {/* Button */}
          <motion.button
            type="button"
            className="flex w-full items-center justify-between rounded-lg bg-[#ff6a18] px-4 py-3 text-sm font-bold text-white"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span>Profil ansehen</span>

            <span
              aria-hidden="true"
              className="text-lg"
            >
              →
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Verified badge */}
      <motion.div
        className="absolute right-0 top-[8%] z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg sm:right-[3%] sm:top-[13%] sm:p-3"
        initial={{
          opacity: 0,
          x: 30,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: 'easeOut',
        }}
        animate={{
          y: [0, -5, 0],
        }}
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-50 text-sm font-black text-emerald-600 sm:h-7 sm:w-7">
          ✓
        </span>

        <span>
          <strong className="block text-[10px] sm:text-xs">
            Geprüft
          </strong>

          <small className="mt-0.5 block text-[9px] text-slate-500 sm:text-[10px]">
            Identität bestätigt
          </small>
        </span>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        className="absolute bottom-[2%] left-0 z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-lg pointer-events-none sm:bottom-[5%] sm:left-[1%] sm:px-3 sm:py-2.5"
        initial={{
          opacity: 0,
          x: -30,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          delay: 0.7,
          duration: 0.6,
          ease: 'easeOut',
        }}
        animate={{
          y: [0, -2, 0],
        }}
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-amber-50 text-sm font-black text-amber-500 sm:h-7 sm:w-7">
          ★
        </span>

        <span className="whitespace-nowrap">
          <strong className="block text-[10px] leading-tight sm:text-xs">
            4,9 / 5
          </strong>

          <small className="mt-0.5 block text-[9px] leading-tight text-slate-500 sm:text-[10px]">
            Kundenbewertung
          </small>
        </span>
      </motion.div>
    </motion.div>
  )
}

/* --------------------------------
   CTA Section
--------------------------------- */

function CTASection() {
  return (
    <section
      className="px-5 py-10 sm:px-6 sm:py-14 md:px-12 md:py-16"
      aria-labelledby="cta-title"
    >
      <motion.div
        className="relative mx-auto flex max-w-295 flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-[#141a2e] px-6 py-8 text-white shadow-[0_24px_60px_rgba(20,26,46,0.14)] sm:px-8 sm:py-10 md:flex-row md:items-center md:px-12 md:py-12"
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        animate={{
          y: [0, -6, 0, 5, 0],
        }}
        transition={{
          opacity: {
            duration: 0.7,
            ease: 'easeOut',
          },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-[35%] h-48 w-48 rounded-full bg-orange-500/5 blur-3xl"
        />

        {/* Content */}
        <motion.div
          className="relative z-10"
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-400 sm:text-xs">
            Bereit für den nächsten Schritt?
          </p>

          <h2
            id="cta-title"
            className="max-w-170 text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
          >
            Aus Idee wird{' '}
            <span className="text-orange-400">
              Projekt.
            </span>
          </h2>

          <p className="mt-3 max-w-145 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            Beschreiben Sie Ihr Vorhaben und finden Sie passende
            Fachleute für Ihr Projekt.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          className="relative z-10 inline-flex w-full shrink-0 items-center justify-between gap-8 rounded-xl bg-[#ff6a18] px-5 py-4 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(255,106,24,0.22)] transition-colors hover:bg-[#e85b0d] sm:px-6 sm:py-4 md:w-auto md:justify-start"
          href="#auftrag"
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <span>
            Auftrag kostenlos starten
          </span>

          <motion.span
            aria-hidden="true"
            className="text-xl"
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}

/* --------------------------------
   Main Page
--------------------------------- */

export default function Page() {
  return (
    <main className="overflow-hidden bg-white">

      {/* Main section */}
      <section
        className="mx-auto max-w-295 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
        aria-labelledby="trust-title"
      >

        {/* Header */}
        <motion.div
          className="mx-auto mb-10 max-w-190 text-center sm:mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
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

          {/* Standards link */}
          <motion.a
            href="#ablauf"
            className="inline-flex items-center gap-2 rounded-md border border-orange-200 px-3 py-2 text-sm font-bold text-orange-600"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span
              aria-hidden="true"
              className="grid h-5 w-5 place-items-center rounded-full bg-orange-600 text-sm text-white"
            >
              ↗
            </span>

            Mehr über unsere Qualitätsstandards
          </motion.a>
        </motion.div>

        {/* Content */}
        <div
          id="ablauf"
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:gap-20 xl:gap-24"
        >

          {/* Steps */}
          <motion.div
            className="grid gap-6 sm:gap-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <motion.article
                  key={step.number}
                  variants={stepVariants}
                  className="grid grid-cols-[40px_1fr] gap-4 border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[42px_1fr] sm:gap-4 sm:pb-7"
                >
                  {/* Icon */}
                  <motion.div
                    className="relative grid h-10 w-10 place-items-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 sm:h-10.5 sm:w-10.5"
                    whileHover={{
                      scale: 1.1,
                      rotate: 3,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                    }}
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-orange-600 text-[9px] font-extrabold text-white">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Text */}
                  <div>
                    <h2 className="mb-2 text-lg font-bold leading-tight tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                      {step.title}
                    </h2>

                    <p className="max-w-125 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                      {step.text}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>

          {/* Visual */}
          <TrustVisual />
        </div>
      </section>

      {/* CTA */}
      <CTASection />

    </main>
  )
}