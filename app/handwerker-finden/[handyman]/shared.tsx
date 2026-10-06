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
  CheckCircle2,
  ChevronDown,
  Drill,
  ExternalLink,
  MapPin,
  Search as SearchIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import OtherServiceButton from "@/components/FindHandyman/OtherServiceButton";

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
  query: { city?: string; postleitzahl?: string },
): Promise<SearchPageData> {
  let cityValue = "";
  let latitude: number | null = null;
  let longitude: number | null = null;
  let locationData: any[] = [];
  let region: string | null = null;

  await connectDb();

  /* ----------------------------- POSTAL LOOKUP ---------------------------- */

  if (query.postleitzahl) {
    const postalData = await PostalCode.findOne({
      Postal_Code: Number(query.postleitzahl),
    }).lean();

    if (postalData) {
      const rawPlaceName = (postalData as any).Place_Name || "";
      const parts = rawPlaceName.split("-");

      if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
        parts.pop();
        cityValue = parts.join("-").trim();
      } else {
        cityValue = rawPlaceName;
      }

      latitude = (postalData as any).Latitude || null;
      longitude = (postalData as any).Longitude || null;
      region = (postalData as any).Admin_Name || null;

      const allCityDocs = await PostalCode.find({
        Place_Name: { $regex: new RegExp(`^${cityValue}`, "i") },
      })
        .select("Postal_Code Place_Name Latitude Longitude")
        .lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pParts = doc.Place_Name.split("-");
          if (pParts.length > 1 && /^\d+$/.test(pParts[pParts.length - 1])) {
            pParts.pop();
          }
          const pCity = pParts.join("-").trim();
          return pCity.toLowerCase() === cityValue.toLowerCase();
        })
        .map((doc: any) => ({
          zip: doc.Postal_Code,
          lat: doc.Latitude,
          lon: doc.Longitude,
          placeName: doc.Place_Name,
        }));
    }
  }

  /* ------------------------------- CITY LOOKUP ---------------------------- */

  const lookupSlug = (query.city || query.postleitzahl || "").toString();

  if (cityValue === "" && lookupSlug) {
    const distinctPlaces = await PostalCode.distinct("Place_Name");
    const targetSlug = lookupSlug.toLowerCase();

    const match = distinctPlaces.find((place) => {
      let cleanName = place;
      const parts = place.split("-");
      if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1].trim())) {
        parts.pop();
        cleanName = parts.join("-").trim();
      }
      return transliterateFn(cleanName) === targetSlug;
    });

    if (match) {
      let cleanName = match;
      const parts = match.split("-");
      if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1].trim())) {
        parts.pop();
        cleanName = parts.join("-").trim();
      }
      cityValue = cleanName;

      const placeData = await PostalCode.findOne({ Place_Name: match }).lean();
      if (placeData) {
        latitude = (placeData as any).Latitude || null;
        longitude = (placeData as any).Longitude || null;
        region = (placeData as any).Admin_Name || null;
      }

      const allCityDocs = await PostalCode.find({
        Place_Name: { $regex: new RegExp(`^${cityValue}`, "i") },
      })
        .select("Postal_Code Place_Name Latitude Longitude")
        .lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pParts = doc.Place_Name.split("-");
          if (pParts.length > 1 && /^\d+$/.test(pParts[pParts.length - 1])) {
            pParts.pop();
          }
          const pCity = pParts.join("-").trim();
          return pCity.toLowerCase() === cityValue.toLowerCase();
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

  /* -------------------------------- FALLBACK ------------------------------ */

  if (!cityValue && lookupSlug && lookupSlug.trim() !== "") {
    cityValue = lookupSlug;
  }

  /* --------------------------- HANDYMAN RESULTS --------------------------- */

  // First page of real results is fetched server-side so Googlebot (and users
  // on first paint) see actual listings instead of a client-side spinner.
  let initialResults: SearchHandymenResult | null = null;

  if (cityValue) {
    initialResults = await searchHandymen({
      service: changeServiceFormat(handyman),
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
/*                                SEO METADATA                                */
/* -------------------------------------------------------------------------- */

export function buildServiceMetadata(
  handyman: string,
  city: string | undefined,
  canonicalPath: string,
) {
  const config = serviceSchemas[handyman];
  const cityText = city ? ` ${changeServiceFormat(city)}` : "";

  if (config) {
    const suffix = config.titleSuffix
      ? ` – ${config.titleSuffix}`
      : ` – ${config.name}`;

    return {
      title: `${config.name}${cityText}${suffix}`,
      description: config.description.replace(
        " –",
        `${city ? ` in ${changeServiceFormat(city)}` : ""} –`,
      ),
      alternates: { canonical: canonicalPath },
    };
  }

  return {
    title: `${changeServiceFormat(handyman)} in ${city ? changeServiceFormat(city) : "deiner Nähe"
      }`,
    description: `Suchst du einen ${changeServiceFormat(handyman)} in ${city ? changeServiceFormat(city) : "deiner Nähe"
      }?`,
    alternates: { canonical: canonicalPath },
  };
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function ServiceHero({
  handyman,
  serviceTitle,
  cityDisplay,
  locationData,
}: {
  handyman: string;
  serviceTitle: string;
  cityDisplay: string;
  locationData: any[];
}) {
  const zipCodes = locationData
    .slice(0, 5)
    .map((item: any) => item.zip)
    .filter(Boolean);

  return (
    <section className="bg-[#f8fbfb] sm:pt-20 pt-8">
      <div className="Container">
        <div className="pb-14 pt-2 lg:pb-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-[11px] font-medium text-slate-500">
            Handwerker finden
            <span className="mx-1">/</span>
            {serviceTitle}
            <span className="mx-1">/</span>
            {cityDisplay}
          </nav>

          {/* Hero Grid */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            {/* Left Content */}
            <div className="min-w-0">
              <h1 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[56px]">
                {serviceTitle} in {cityDisplay}
              </h1>

              <p className="mt-6 text-[13px] font-bold leading-5 text-[#f15b2a]">
                {serviceTitle} in{" "}
                {zipCodes.length
                  ? `den Postleitzahlgebieten ${zipCodes.join(", ")}${locationData.length > zipCodes.length
                    ? " und Umgebung"
                    : ""
                  }`
                  : cityDisplay}
                .
              </p>

              <p className="mt-3 max-w-115 text-[15px] leading-7 text-slate-500">
                Sie suchen einen {serviceTitle} in {cityDisplay}? Beschreiben
                Sie Ihr Vorhaben und erhalten Sie passende Rückmeldungen von
                Handwerkern aus Ihrer Nähe.
              </p>
            </div>

            {/* Right: request card */}
            <div className="w-full rounded-2xl border border-slate-100 bg-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#f15b2a]">
                <Drill size={20} />
              </div>

              <h2 className="text-lg font-semibold leading-snug text-slate-900">
                {serviceTitle} beauftragen
              </h2>

              <p className="mx-auto mt-3 max-w-60 text-[11px] leading-4 text-slate-500">
                Klicken Sie hier, um in wenigen Schritten Ihren Auftrag zu
                erstellen
              </p>

              <Link
                href={{
                  pathname: "/auftrag-erstellen",
                  query: { service: handyman },
                }}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-[#ff5b1f] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ed4e20]"
              >
                Jetzt Auftrag erstellen
                <ArrowRight size={14} />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-medium text-slate-500">
                {["100 % kostenlos", "Unverbindlich", "Geprüfte Profis"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-slate-400" />
                      {item}
                    </span>
                  ),
                )}
              </div>

              <OtherServiceButton />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         QUALIFIED HANDYMAN BANNER                          */
/* -------------------------------------------------------------------------- */

function QualifiedBanner({
  cityDisplay,
  serviceTitle,
}: {
  cityDisplay: string;
  serviceTitle: string;
}) {
  return (
    <section className="Container">
      <div className="lg:px-4">
        <div className="rounded-2xl bg-linear-to-r from-[#8a2be2] via-[#7a2ff0] to-[#5b3cf0] px-6 py-6 text-white shadow-[0_18px_40px_rgba(99,57,238,0.22)]">
          <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-semibold">
            Geprüfte Handwerker
          </span>

          <h2 className="text-xl font-medium leading-tight tracking-tight sm:text-[22px]">
            Qualifizierte Handwerker in {cityDisplay}
          </h2>

          <p className="mt-2 text-[11px] leading-5 text-white/90">
            Finden Sie passende Handwerker für{" "}
            <u className="font-semibold">{serviceTitle}</u> im Umkreis von 50
            km.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              HANDWERKER CARD                               */
/* -------------------------------------------------------------------------- */

type CardData = {
  id?: string;
  name: string;
  initials: string;
  verified: boolean;
  place: string;
  zip: string;
  description: string;
  rating: number;
  reviewCount: number;
  services: string[];
  profileHref: string;
};

const SAMPLE_DESCRIPTION =
  "Wir bieten professionelle und qualitativ hochwertige Handwerksdienste an. Kontaktieren Sie uns für ein Angebot und um Ihr Projekt zu starten.";

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "HW"
  );
}

function mapUserToCard(user: any): CardData {
  const craftsman = user?.craftsman || {};
  const rawServices = craftsman.services;
  const services: string[] = Array.isArray(rawServices)
    ? rawServices
    : String(rawServices || "")
      .split(/[,|]/)
      .map((s) => s.trim())
      .filter(Boolean);

  const name = user?.name || "Handwerker";

  return {
    id: String(user?._id || ""),
    name,
    initials: getInitials(name),
    verified: craftsman.status === "verified",
    place: user?.address?.placeName || "",
    zip: String(user?.address?.postalCode ?? user?.address?.zip ?? ""),
    description: craftsman.description || craftsman.about || SAMPLE_DESCRIPTION,
    rating: Number(user?.avgRating) || 0,
    reviewCount: Array.isArray(craftsman.reviews) ? craftsman.reviews.length : 0,
    services: services.slice(0, 4),
    // Adjust this to your real profile route
    profileHref: `/handwerker/${user?._id}`,
  };
}

function HandwerkerCard({
  card,
  handyman,
}: {
  card: CardData;
  handyman: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#e3eaee] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-7">
      <div className="flex gap-5">
        {/* Avatar */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ffece4] text-xl font-extrabold text-[#ff5b1f]">
          {card.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Name block */}
            <div className="min-w-0">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${card.verified
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50/60 text-amber-700"
                  }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${card.verified ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                />
                {card.verified ? "Verifiziert" : "Nicht verifiziert"}
              </span>

              <h3 className="mt-3 truncate text-xl font-medium tracking-tight text-slate-900">
                {card.name}
              </h3>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} className="shrink-0 text-sky-500" />
                {card.place}
                {card.zip ? ` · ${card.zip}` : ""}
              </p>
            </div>

            {/* CTA + rating */}
            <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
              <Link
                href={{
                  pathname: "/auftrag-erstellen",
                  query: { service: handyman },
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#8a2be2] to-[#5b3cf0] px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_10px_24px_rgba(99,57,238,0.3)] transition hover:opacity-90"
              >
                Angebot anfordern
                <ArrowRight size={13} />
              </Link>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-sm font-bold text-amber-500">
                  <Star size={14} className="fill-amber-500" />
                  {card.rating.toFixed(1).replace(".", ",")}
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  {card.reviewCount} Bewertungen
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-[13px] leading-6 text-slate-600">
            {card.description}
          </p>

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={card.profileHref}
              className="inline-flex w-fit items-center gap-3 rounded-lg bg-[#ff5b1f] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ed4e20]"
            >
              Profil besuchen
              <ExternalLink size={13} />
            </Link>

            <div className="flex flex-wrap gap-2">
              {card.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              HANDYMAN RESULTS                              */
/* -------------------------------------------------------------------------- */

function HandwerkerResults({
  serviceTitle,
  cityDisplay,
  data,
  handyman,
}: {
  serviceTitle: string;
  handyman: string;
  cityDisplay: string;
  data: SearchPageData;
}) {
  const users = data.initialResults?.users ?? [];
  const hasResults = users.length > 0;

  const cards: CardData[] = hasResults
    ? users.map((u) => mapUserToCard(u))
    : [
      {
        name: `${serviceTitle} Müller`,
        initials: getInitials(serviceTitle),
        verified: false,
        place: cityDisplay,
        zip: String(data.locationData?.[0]?.zip ?? ""),
        description: SAMPLE_DESCRIPTION,
        rating: 0,
        reviewCount: 0,
        services: serviceTitle
          .split("&")
          .map((s) => s.trim())
          .filter(Boolean),
        profileHref: "/auftrag-erstellen",
      },
    ];

  return (
    <section className="pb-16 pt-14">
      {/* Section Heading */}
      <div className="Container">
        <div className="mb-8 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#53307f]">
            Handwerker in Ihrer Nähe
          </p>

          <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {serviceTitle} in {cityDisplay}
          </h2>

          <p className="mt-4 text-xs text-slate-500">
            {hasResults
              ? "Hier können Sie passende Handwerker aus Ihrer Region finden."
              : "Hier sehen Sie, wie ein registrierter Handwerker auf dieser Seite erscheinen kann."}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="Container">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {cards.map((card, i) => (
            <HandwerkerCard
              key={card.id || i}
              card={card}
              handyman={data.handyman}
            />
          ))}
        </div>
      </div>

      {/* Empty Result CTA */}
      <div className="Container">
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchIcon size={20} />
          </div>

          <p className="text-[15px] font-medium text-slate-800">
            Keinen passenden Handwerker direkt gefunden?
          </p>

          <h3 className="mt-3 text-sm font-bold leading-6 text-slate-900">
            Erstellen Sie jetzt Ihren kostenlosen Auftrag – passende Handwerker
            aus der Umgebung können sich direkt bei Ihnen melden.
          </h3>

          <p className="mt-2 text-[11px] text-slate-300">
            Unverbindlich, kostenlos und in wenigen Schritten erledigt.
          </p>

          <Link
            href={{
              pathname: "/auftrag-erstellen",
              query: { service: handyman },
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ff5b1f] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ed4e20]"
          >
            Kostenlosen Auftrag erstellen
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HOW IT WORKS                                */
/* -------------------------------------------------------------------------- */

function HowItWorks({ serviceTitle }: { serviceTitle: string }) {
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
      <div className="Container py-20 sm:py-24">
        <div className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#53307f]">
            So funktioniert es
          </p>

          <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {serviceTitle} einfach anfragen
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="mb-4 block text-[11px] font-bold text-[#f15b2a]">
                {step.number}
              </span>

              <h3 className="text-base font-medium text-slate-800">
                {step.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
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
/*                                    FAQ                                     */
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
      a: `Die Kosten hängen vom Umfang Ihres Projekts ab. Erstellen Sie einen kostenlosen Auftrag und erhalten Sie unverbindliche Rückmeldungen von Betrieben aus ${cityDisplay} und der Umgebung.`,
    },
    {
      q: `Wie schnell kann ein ${serviceTitle} in ${cityDisplay} verfügbar sein?`,
      a: `Die tatsächliche Verfügbarkeit hängt vom jeweiligen Betrieb und der Dringlichkeit Ihres Anliegens ab. Beschreiben Sie Ihren Bedarf, damit passende Handwerker darauf reagieren können.`,
    },
    {
      q: `Sind die Handwerker in ${cityDisplay} geprüft?`,
      a: `Prüfstatus und Kundenbewertungen können Ihnen bei der Einschätzung eines Betriebs helfen. Achten Sie vor einer Beauftragung auf die Angaben im jeweiligen Profil.`,
    },
    {
      q: "Wie finde ich passende Handwerker?",
      a: "Beschreiben Sie Ihr Vorhaben und erhalten Sie passende Rückmeldungen von Handwerkern in Ihrer Region.",
    },
    {
      q: "Was kostet die Anfrage?",
      a: "Das Erstellen eines Auftrags ist kostenlos und unverbindlich.",
    },
    {
      q: "Was sollte ich bei der Anfrage angeben?",
      a: "Beschreiben Sie möglichst genau, welche Arbeiten anstehen, wo sie ausgeführt werden sollen und wann Sie Unterstützung benötigen.",
    },
  ];

  return (
    <section className="bg-[#f6f9fa]">
      <div className="Container py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#53307f]">
              Häufige Fragen
            </p>

            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl">
              Gut informiert starten
            </h2>
          </div>

          <div className="divide-y divide-[#dde6ea] border-y border-[#dde6ea]">
            {faqs.map((item) => (
              <details key={item.q} open className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold leading-6 text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>

                  <ChevronDown
                    size={16}
                    className="shrink-0 rotate-0 text-[#f15b2a] transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>

                <p className="mt-2 max-w-2xl pr-8 text-xs leading-5 text-slate-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MAIN PAGE                                   */
/* -------------------------------------------------------------------------- */

export function ServicePageBody({
  handyman,
  data,
}: {
  handyman: string;
  data: SearchPageData;
  search?: string;
}) {
  const serviceTitle =
    components[handyman]?.title?.replace(" in der Nähe", "") ||
    changeServiceFormat(handyman);

  const cityDisplay = data.city ? changeServiceFormat(data.city) : "deiner Nähe";

  const orgSchema = generateOrganizationSchema(
    handyman,
    data.city,
    data.locationData,
    data.latitude ?? undefined,
    data.longitude ?? undefined,
    data.region ?? undefined,
  );

  const collectionSchema = generateCollectionPageSchema(handyman, serviceTitle);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* SEO Structured Data */}
      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero (postal codes + request card) */}
      <ServiceHero
        handyman={handyman}
        serviceTitle={serviceTitle}
        cityDisplay={cityDisplay}
        locationData={data.locationData}
      />

      {/* Qualified Handyman Banner */}
      <QualifiedBanner cityDisplay={cityDisplay} serviceTitle={serviceTitle} />

      {/* Handyman cards */}
      {data.city && (
        <HandwerkerResults
          serviceTitle={serviceTitle}
          cityDisplay={cityDisplay}
          data={data}
          handyman={handyman}
        />
      )}

      {/* How It Works */}
      {data.city && <HowItWorks serviceTitle={serviceTitle} />}

      {/* FAQ */}
      {data.city && (
        <ServiceFaq serviceTitle={serviceTitle} cityDisplay={cityDisplay} />
      )}
    </main>
  );
}