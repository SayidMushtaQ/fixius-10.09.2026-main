import React from "react";

import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";

import {
  searchHandymen,
  SearchHandymenResult,
} from "@/backend/controllers/user/searchHandymen";

import { components } from "@/components/handwerker-in-der-naehe/componentsMap";

import {
  serviceSchemas,
  generateOrganizationSchema,
  generateCollectionPageSchema,
} from "@/lib/serviceSchemas";

import { changeServiceFormat } from "@/helper/changeServiceFormat";

import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  MapPin,
  Star,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                              TRANSLITERATION                               */
/* -------------------------------------------------------------------------- */

export const transliterateFn = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type SearchPageData = {
  handyman: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  locationData: any[];
  region: string | null;
  initialResults: SearchHandymenResult | null;
};

/* -------------------------------------------------------------------------- */
/*                              SEARCH PAGE DATA                              */
/* -------------------------------------------------------------------------- */

export async function getSearchData(
  handyman: string,
  query: {
    city?: string;
    postleitzahl?: string;
  }
): Promise<SearchPageData> {
  let cityValue = "";
  let latitude: number | null = null;
  let longitude: number | null = null;
  let locationData: any[] = [];
  let region: string | null = null;

  await connectDb();

  /* ---------------------------------------------------------------------- */
  /*                         POSTAL CODE LOOKUP                              */
  /* ---------------------------------------------------------------------- */

  if (query.postleitzahl) {
    const postalData = await PostalCode.findOne({
      Postal_Code: Number(query.postleitzahl),
    }).lean();

    if (postalData) {
      const rawPlaceName =
        (postalData as any).Place_Name || "";

      const parts = rawPlaceName.split("-");

      if (
        parts.length > 1 &&
        /^\d+$/.test(parts[parts.length - 1])
      ) {
        parts.pop();
        cityValue = parts.join("-").trim();
      } else {
        cityValue = rawPlaceName;
      }

      latitude =
        (postalData as any).Latitude || null;

      longitude =
        (postalData as any).Longitude || null;

      region =
        (postalData as any).Admin_Name || null;

      const allCityDocs = await PostalCode.find({
        Place_Name: {
          $regex: new RegExp(
            `^${cityValue}`,
            "i"
          ),
        },
      })
        .select(
          "Postal_Code Place_Name Latitude Longitude"
        )
        .lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pName = doc.Place_Name;

          const pParts = pName.split("-");

          if (
            pParts.length > 1 &&
            /^\d+$/.test(
              pParts[pParts.length - 1]
            )
          ) {
            pParts.pop();
          }

          const pCity = pParts.join("-").trim();

          return (
            pCity.toLowerCase() ===
            cityValue.toLowerCase()
          );
        })
        .map((doc: any) => ({
          zip: doc.Postal_Code,
          lat: doc.Latitude,
          lon: doc.Longitude,
          placeName: doc.Place_Name,
        }));
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                            CITY LOOKUP                                  */
  /* ---------------------------------------------------------------------- */

  const lookupSlug = (
    query.city ||
    query.postleitzahl ||
    ""
  ).toString();

  if (cityValue === "" && lookupSlug) {
    const distinctPlaces =
      await PostalCode.distinct("Place_Name");

    const targetSlug =
      lookupSlug.toLowerCase();

    const match = distinctPlaces.find((place) => {
      let cleanName = place;

      const parts = place.split("-");

      if (
        parts.length > 1 &&
        /^\d+$/.test(
          parts[parts.length - 1].trim()
        )
      ) {
        parts.pop();

        cleanName = parts.join("-").trim();
      }

      return (
        transliterateFn(cleanName) ===
        targetSlug
      );
    });

    if (match) {
      let cleanName = match;

      const parts = match.split("-");

      if (
        parts.length > 1 &&
        /^\d+$/.test(
          parts[parts.length - 1].trim()
        )
      ) {
        parts.pop();

        cleanName = parts.join("-").trim();
      }

      cityValue = cleanName;

      const placeData =
        await PostalCode.findOne({
          Place_Name: match,
        }).lean();

      if (placeData) {
        latitude =
          (placeData as any).Latitude ||
          null;

        longitude =
          (placeData as any).Longitude ||
          null;

        region =
          (placeData as any).Admin_Name ||
          null;
      }

      const allCityDocs = await PostalCode.find({
        Place_Name: {
          $regex: new RegExp(
            `^${cityValue}`,
            "i"
          ),
        },
      })
        .select(
          "Postal_Code Place_Name Latitude Longitude"
        )
        .lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pName = doc.Place_Name;

          const pParts = pName.split("-");

          if (
            pParts.length > 1 &&
            /^\d+$/.test(
              pParts[pParts.length - 1]
            )
          ) {
            pParts.pop();
          }

          const pCity =
            pParts.join("-").trim();

          return (
            pCity.toLowerCase() ===
            cityValue.toLowerCase()
          );
        })
        .map((doc: any) => ({
          zip: doc.Postal_Code,
          lat: doc.Latitude,
          lon: doc.Longitude,
          placeName: doc.Place_Name,
        }));
    } else {
      cityValue = lookupSlug;
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                              FALLBACK                                   */
  /* ---------------------------------------------------------------------- */

  if (
    !cityValue &&
    lookupSlug &&
    lookupSlug.trim() !== ""
  ) {
    cityValue = lookupSlug;
  }

  /* ---------------------------------------------------------------------- */
  /*                     REAL HANDYMAN RESULTS                               */
  /* ---------------------------------------------------------------------- */

  let initialResults:
    | SearchHandymenResult
    | null = null;

  if (cityValue) {
    initialResults =
      await searchHandymen({
        service:
          changeServiceFormat(handyman),

        city: cityValue,

        pageSize: 10,

        pageNumber: 1,

        distance: 50,
      });
  }

  return {
    handyman,
    city: cityValue,
    latitude,
    longitude,
    locationData,
    region,
    initialResults,
  };
}

/* -------------------------------------------------------------------------- */
/*                              SEO METADATA                                  */
/* -------------------------------------------------------------------------- */

export function buildServiceMetadata(
  handyman: string,
  city: string | undefined,
  canonicalPath: string
) {
  const config =
    serviceSchemas[handyman];

  const cityText = city
    ? ` ${changeServiceFormat(city)}`
    : "";

  if (config) {
    const suffix = config.titleSuffix
      ? ` – ${config.titleSuffix}`
      : ` – ${config.name}`;

    return {
      title: `${config.name}${cityText}${suffix}`,

      description:
        config.description.replace(
          " –",
          `${
            city
              ? ` in ${changeServiceFormat(city)}`
              : ""
          } –`
        ),

      alternates: {
        canonical: canonicalPath,
      },
    };
  }

  return {
    title: `${changeServiceFormat(
      handyman
    )} in ${
      city
        ? changeServiceFormat(city)
        : "deiner Nähe"
    }`,

    description: `Suchst du einen ${changeServiceFormat(
      handyman
    )} in ${
      city
        ? changeServiceFormat(city)
        : "deiner Nähe"
    }?`,

    alternates: {
      canonical: canonicalPath,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              COVERAGE LIST                                 */
/* -------------------------------------------------------------------------- */

function CoverageList({
  serviceTitle,
  locationData,
}: {
  serviceTitle: string;
  locationData: any[];
}) {
  if (
    !locationData ||
    locationData.length === 0
  ) {
    return null;
  }

  const zips = locationData
    .slice(0, 12)
    .map((d: any) => d.zip)
    .filter(Boolean);

  if (zips.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-5 pb-10 text-center sm:px-6">
      <p className="text-sm font-medium leading-7 text-gray-500">
        {serviceTitle} in den
        Postleitzahlgebieten{" "}
        <span className="font-bold text-secondary">
          {zips.join(", ")}
        </span>
        {locationData.length > zips.length
          ? " und Umgebung"
          : ""}
        .
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              HERO                                           */
/* -------------------------------------------------------------------------- */

function ServiceHero({
  serviceTitle,
  cityDisplay,
  locationData,
}: {
  serviceTitle: string;
  cityDisplay: string;
  locationData: any[];
}) {
  const zipCodes = locationData
    .slice(0, 5)
    .map((item: any) => item.zip)
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        {/* Breadcrumb */}

        <div className="mb-9 text-[11px] font-medium text-gray-400">
          Handwerker finden
          <span className="mx-2">/</span>
          {serviceTitle}
          <span className="mx-2">/</span>
          {cityDisplay}
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_360px]">
          {/* Left */}

          <div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-secondary sm:text-5xl md:text-6xl">
              {serviceTitle} in{" "}
              <span className="text-secondary">
                {cityDisplay}
              </span>
            </h1>

            <p className="mt-5 text-sm font-extrabold text-primary">
              {serviceTitle} in den
              Postleitzahlgebieten{" "}
              {zipCodes.join(", ")}
              {locationData.length >
              zipCodes.length
                ? " und Umgebung"
                : ""}
              .
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              Suchst du einen {serviceTitle} in{" "}
              {cityDisplay}? Unsere Plattform
              verbindet dich direkt mit
              Handwerkern aus deiner Nähe.
              Beschreibe dein Vorhaben und
              erhalte passende Rückmeldungen.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/auftrag-erstellen"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(255,106,24,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,106,24,0.3)]"
              >
                Kostenlosen Auftrag erstellen
                <ArrowRight size={17} />
              </a>

              <a
                href="/auftrag-erstellen"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-bold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                Anderen Service gesucht?
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Location card */}

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_15px_45px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-primary">
              <MapPin size={20} />
            </div>

            <h2 className="text-xl font-black text-secondary">
              {cityDisplay}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Handwerker in Ihrer Nähe finden
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <CheckCircle2
                  size={15}
                  className="text-primary"
                />
                Kostenlos und unverbindlich
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <CheckCircle2
                  size={15}
                  className="text-primary"
                />
                Sie entscheiden selbst
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <CheckCircle2
                  size={15}
                  className="text-primary"
                />
                Passende Handwerker
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         NEW SERVICE / ORDER UI                             */
/* -------------------------------------------------------------------------- */

function OrderAndHandwerkerSection({
  serviceTitle,
  cityDisplay,
}: {
  serviceTitle: string;
  cityDisplay: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">
          Handwerker in Ihrer Nähe
        </p>

        <h2 className="text-3xl font-black tracking-tight text-secondary md:text-4xl">
          {serviceTitle} in {cityDisplay}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
          Finden Sie passende Handwerker für Ihr
          Vorhaben und erhalten Sie
          unverbindliche Rückmeldungen aus
          Ihrer Region.
        </p>
      </div>

      {/* Main white container */}

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)]">
        {/* Order card */}

        <div className="p-5 md:p-7">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* Decoration */}

            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-orange-50" />

            <div className="relative flex flex-col items-center px-6 py-10 text-center md:py-12">
              {/* Service icon */}

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-primary">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 20V8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M5 8H15.5L18 11L15.5 14H5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M19 5V20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-black text-secondary md:text-2xl">
                {serviceTitle} beauftragen
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Klicken Sie hier, um in wenigen
                Schritten Ihren Auftrag zu
                erstellen und passende
                Handwerker aus {cityDisplay} zu
                erreichen.
              </p>

              <a
                href="/auftrag-erstellen"
                className="mt-6 inline-flex min-w-55 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(255,106,24,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(255,106,24,0.3)]"
              >
                Jetzt Auftrag erstellen
                <ArrowRight size={17} />
              </a>

              <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-primary"
                  />
                  100% kostenlos
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-primary"
                  />
                  Unverbindlich
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-primary"
                  />
                  Geprüfte Profis
                </span>
              </div>

              <a
                href="/auftrag-erstellen"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                Anderen Service gesucht?
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Purple banner */}

        <div className="px-5 pb-5 md:px-7 md:pb-7">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7928ff] to-[#623cff] px-6 py-6 text-white shadow-[0_12px_30px_rgba(98,60,255,0.2)] md:px-7">
            <div className="pointer-events-none absolute -right-10 -top-20 h-44 w-44 rounded-full bg-white/10" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold">
                  <BadgeCheck size={12} />
                  Geprüfte Handwerker
                </div>

                <h3 className="text-xl font-black md:text-2xl">
                  Qualifizierte Handwerker in{" "}
                  {cityDisplay}
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/80">
                  Finden Sie passende Experten für
                  Ihr Vorhaben in Ihrer Umgebung.
                </p>
              </div>

              <a
                href="/auftrag-erstellen"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#623cff] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Handwerker finden
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          HANDYMAN PROFILE                                  */
/* -------------------------------------------------------------------------- */

function HandwerkerProfile({
  serviceTitle,
  cityDisplay,
}: {
  serviceTitle: string;
  cityDisplay: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">
          Handwerker in Ihrer Nähe
        </p>

        <h2 className="text-3xl font-black tracking-tight text-secondary md:text-4xl">
          {serviceTitle} in {cityDisplay}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500">
          Dieses Profil zeigt, wie ein
          registrierter Handwerker auf dieser
          Seite erscheinen kann.
        </p>
      </div>

      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] md:p-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Avatar */}

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-lg font-black text-primary">
            BM
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  Nicht verifiziert
                </div>

                <h3 className="text-xl font-black text-secondary">
                  {serviceTitle} Müller
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={15} />
                  {cityDisplay}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <a
                  href="/auftrag-erstellen"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Angebot anfordern
                  <ArrowRight size={15} />
                </a>

                <div className="flex items-center gap-2 text-xs">
                  <strong className="flex items-center gap-1 text-secondary">
                    <Star
                      size={14}
                      fill="currentColor"
                    />
                    0,0
                  </strong>

                  <span className="text-gray-500">
                    0 Bewertungen
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Wir bieten professionelle und
              qualitativ hochwertige
              Handwerksdienste an. Kontaktieren
              Sie uns für ein Angebot und um Ihr
              Projekt zu starten.
            </p>

            <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="/handwerker-profil-vorschau"
                className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary"
              >
                Profil besuchen
                <ExternalLink size={13} />
              </a>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-primary">
                  {serviceTitle}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  Handwerksservice
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              HOW IT WORKS                                  */
/* -------------------------------------------------------------------------- */

function HowItWorks({
  serviceTitle,
}: {
  serviceTitle: string;
}) {
  const steps = [
    {
      number: "01",
      title: "Vorhaben beschreiben",
      text: "Teilen Sie uns kurz mit, welche Arbeiten Sie benötigen.",
    },
    {
      number: "02",
      title: "Rückmeldungen erhalten",
      text: "Passende Handwerker aus Ihrer Region können sich bei Ihnen melden.",
    },
    {
      number: "03",
      title: "Handwerker auswählen",
      text: "Vergleichen Sie die Rückmeldungen und entscheiden Sie selbst.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">
            So funktioniert es
          </p>

          <h2 className="text-3xl font-black tracking-tight text-secondary md:text-4xl">
            {serviceTitle} einfach anfragen
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="mb-4 text-xs font-black text-primary">
                {step.number}
              </div>

              <h3 className="text-base font-black text-secondary">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  FAQ                                       */
/* -------------------------------------------------------------------------- */

function ServiceFaq({
  serviceTitle,
  cityDisplay,
}: {
  serviceTitle: string;
  cityDisplay: string;
}) {
  const faqs = [
    {
      q: `Was kostet ein ${serviceTitle} in ${cityDisplay}?`,
      a: `Die Kosten hängen vom Umfang deines Projekts ab. Erstelle einen kostenlosen Auftrag und erhalte unverbindliche Angebote von geprüften Betrieben aus ${cityDisplay} und der Umgebung.`,
    },
    {
      q: `Wie schnell kann ein ${serviceTitle} in ${cityDisplay} verfügbar sein?`,
      a: `Viele Betriebe auf Fixius melden sich innerhalb weniger Stunden nach Auftragserstellung. Die tatsächliche Verfügbarkeit hängt vom jeweiligen Betrieb und der Dringlichkeit deines Anliegens ab.`,
    },
    {
      q: `Sind die Handwerker in ${cityDisplay} geprüft?`,
      a: `Ja, Betriebe mit dem Prüfsiegel wurden von unserem Team verifiziert. Bewertungen anderer Kunden helfen dir zusätzlich bei der Auswahl.`,
    },
    {
      q: `Wie finde ich passende Handwerker?`,
      a: `Beschreibe dein Vorhaben und erhalte passende Rückmeldungen von Handwerkern in deiner Region.`,
    },
    {
      q: `Was kostet die Anfrage?`,
      a: `Das Erstellen eines Auftrags ist kostenlos und unverbindlich.`,
    },
    {
      q: `Wie schnell erhalte ich Rückmeldungen?`,
      a: `Das hängt von deinem Vorhaben und der Verfügbarkeit der Handwerker in deiner Region ab.`,
    },
  ];

  return (
    <section className="bg-[#f6f9fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-6">
        <div className="mb-9">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">
            Häufige Fragen
          </p>

          <h2 className="text-3xl font-black tracking-tight text-secondary md:text-4xl">
            Gut informiert starten
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold text-secondary">
                <span>{item.q}</span>

                <ChevronDown
                  size={17}
                  className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                />
              </summary>

              <p className="mt-3 max-w-3xl pr-8 text-sm leading-7 text-gray-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN PAGE                                     */
/* -------------------------------------------------------------------------- */

export function ServicePageBody({
  handyman,
  data,
  search,
}: {
  handyman: string;
  data: SearchPageData;
  search: string;
}) {
  const serviceTitle =
    components[handyman]?.title?.replace(
      " in der Nähe",
      ""
    ) ||
    changeServiceFormat(handyman);

  const cityDisplay = data.city
    ? changeServiceFormat(data.city)
    : "deiner Nähe";

  /* ---------------------------------------------------------------------- */
  /*                              SEO                                         */
  /* ---------------------------------------------------------------------- */

  const orgSchema =
    generateOrganizationSchema(
      handyman,
      data.city,
      data.locationData,
      data.latitude ?? undefined,
      data.longitude ?? undefined,
      data.region ?? undefined
    );

  const collectionSchema =
    generateCollectionPageSchema(
      handyman,
      serviceTitle
    );

  return (
    <main className="min-h-screen bg-mainBackground pt-24 text-secondary">
      {/* ------------------------------------------------------------------ */}
      {/* SEO SCHEMAS                                                         */}
      {/* ------------------------------------------------------------------ */}

      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              orgSchema
            ),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionSchema
          ),
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <ServiceHero
        serviceTitle={serviceTitle}
        cityDisplay={cityDisplay}
        locationData={data.locationData}
      />

      {/* ------------------------------------------------------------------ */}
      {/* POSTAL COVERAGE                                                    */}
      {/* ------------------------------------------------------------------ */}

      {data.city && (
        <CoverageList
          serviceTitle={serviceTitle}
          locationData={data.locationData}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* NEW ORDER UI                                                        */}
      {/* ------------------------------------------------------------------ */}

      <OrderAndHandwerkerSection
        serviceTitle={serviceTitle}
        cityDisplay={cityDisplay}
      />

      {/* ------------------------------------------------------------------ */}
      {/* PROFILE                                                             */}
      {/* ------------------------------------------------------------------ */}

      {data.city && (
        <HandwerkerProfile
          serviceTitle={serviceTitle}
          cityDisplay={cityDisplay}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HOW IT WORKS                                                        */}
      {/* ------------------------------------------------------------------ */}

      {data.city && (
        <HowItWorks
          serviceTitle={serviceTitle}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                 */}
      {/* ------------------------------------------------------------------ */}

      {data.city && (
        <ServiceFaq
          serviceTitle={serviceTitle}
          cityDisplay={cityDisplay}
        />
      )}
    </main>
  );
}