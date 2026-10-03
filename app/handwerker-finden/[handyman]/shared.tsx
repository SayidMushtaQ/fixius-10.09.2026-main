import React from "react";

import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";

import {
  searchHandymen,
  SearchHandymenResult,
} from "@/backend/controllers/user/searchHandymen";

import { components } from "@/components/handwerker-in-der-naehe/componentsMap";
import Search from "@/components/FindHandyman/search";

import {
  serviceSchemas,
  generateOrganizationSchema,
  generateCollectionPageSchema,
} from "@/lib/serviceSchemas";

import { changeServiceFormat } from "@/helper/changeServiceFormat";

import { ArrowRight, CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";

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
    title: `${changeServiceFormat(handyman)} in ${
      city ? changeServiceFormat(city) : "deiner Nähe"
    }`,
    description: `Suchst du einen ${changeServiceFormat(handyman)} in ${
      city ? changeServiceFormat(city) : "deiner Nähe"
    }?`,
    alternates: { canonical: canonicalPath },
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
  if (!locationData?.length) return null;

  const zips = locationData
    .slice(0, 12)
    .map((item: any) => item.zip)
    .filter(Boolean);

  if (!zips.length) return null;

  return (
    <div className="Container">
      <p className="pb-8 text-sm leading-6 text-slate-500">
        {serviceTitle} in den Postleitzahlgebieten{" "}
        <strong className="font-semibold text-slate-700">
          {zips.join(", ")}
        </strong>
        {locationData.length > zips.length ? " und Umgebung" : ""}.
      </p>
    </div>
  );
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
    <section className="bg-[#f8fbfc] sm:pt-20 pt-8">
      <div className="Container">
        <div className="pb-14 pt-8 lg:pb-16 lg:pt-10">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm font-medium text-slate-400">
            Handwerker finden
            <span className="mx-2">/</span>
            {serviceTitle}
            <span className="mx-2">/</span>
            {cityDisplay}
          </div>

          {/* Hero Grid */}
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            {/* Left Content */}
            <div className="min-w-0">
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
                {serviceTitle} in <span>{cityDisplay}</span>
              </h1>

              <p className="mt-5 text-base font-semibold leading-6 text-[#f15b2a]">
                {serviceTitle} in{" "}
                {zipCodes.length
                  ? `den Postleitzahlgebieten ${zipCodes.join(", ")}${
                      locationData.length > zipCodes.length
                        ? " und Umgebung"
                        : ""
                    }`
                  : cityDisplay}
                .
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Sie suchen einen {serviceTitle} in {cityDisplay}? Beschreiben
                Sie Ihr Vorhaben und erhalten Sie passende Rückmeldungen von
                Handwerkern aus Ihrer Nähe.
              </p>

              <div className="mt-7">
                <Link
                  href={{
                    pathname: "/auftrag-erstellen",
                    query: { service: handyman },
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-[#ff5b2a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ed4e20]"
                >
                  Kostenlosen Auftrag erstellen
                  <ArrowRight size={16} />
                </Link>
              </div>

              <a
                href="/auftrag-erstellen"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#f15b2a]"
              >
                Anderen Service gesucht?
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Right Location Card */}
            <div className="w-full rounded-2xl border border-[#dce5e9] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-8">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#f15b2a]">
                <MapPin size={19} />
              </div>

              <h2 className="text-xl font-semibold text-slate-800">
                {cityDisplay}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Handwerker in Ihrer Nähe finden
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Kostenlos und unverbindlich",
                  "Sie entscheiden selbst",
                  "Passende Handwerker",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#11b981]"
                    />
                    {item}
                  </div>
                ))}
              </div>
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

function QualifiedBanner({ cityDisplay }: { cityDisplay: string }) {
  return (
    <section className="Container py-6">
      <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-[#7928f5] to-[#6339ee] px-6 py-6 text-white shadow-[0_8px_22px_rgba(99,57,238,0.17)] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
        <div>
          <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
            Geprüfte Handwerker
          </span>

          <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
            Qualifizierte Handwerker in {cityDisplay}
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/80">
            Finden Sie passende Experten für Ihr Vorhaben in Ihrer Umgebung.
          </p>
        </div>

        <a
          href="/auftrag-erstellen"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#6339ee] transition hover:bg-violet-50"
        >
          Handwerker finden
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*              HANDYMAN RESULTS (real data via <Search /> component)         */
/* -------------------------------------------------------------------------- */

function HandwerkerResults({
  serviceTitle,
  cityDisplay,
  data,
  search,
}: {
  serviceTitle: string;
  cityDisplay: string;
  data: SearchPageData;
  search: string;
}) {
  return (
    <section className="pb-14 pt-10">
      {/* Section Heading */}
      <div className="Container">
        <div className="mb-2 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#6339ee]">
            Handwerker in Ihrer Nähe
          </p>

          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-3xl">
            {serviceTitle} in {cityDisplay}
          </h2>

          <p className="mt-3 text-base text-slate-500">
            Hier können Sie passende Handwerker aus Ihrer Region finden.
          </p>
        </div>
      </div>

      {/* Real search: service request card, results, pagination, modal */}
      <Search params={{ ...data, search }} />

      {/* Empty Result CTA */}
      <div className="Container">
        <div className="mx-auto mt-4 max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
            <MapPin size={21} />
          </div>

          <p className="text-sm font-medium text-slate-600">
            Keinen passenden Handwerker direkt gefunden?
          </p>

          <h3 className="mt-2 text-base font-semibold leading-7 text-slate-800">
            Erstellen Sie jetzt Ihren kostenlosen Auftrag – passende Handwerker
            aus der Umgebung können sich direkt bei Ihnen melden.
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            Unverbindlich, kostenlos und in wenigen Schritten erledigt.
          </p>

          <a
            href="/auftrag-erstellen"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ff5b2a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ed4e20]"
          >
            Kostenlosen Auftrag erstellen
            <ArrowRight size={15} />
          </a>
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
      <div className="Container py-14 sm:py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#6339ee]">
            So funktioniert es
          </p>

          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-3xl">
            {serviceTitle} einfach anfragen
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-slate-100 pt-5">
              <span className="mb-4 block text-sm font-bold text-[#f15b2a]">
                {step.number}
              </span>

              <h3 className="text-base font-semibold text-slate-800">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
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
      <div className="Container py-14 sm:py-16">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#6339ee]">
            Häufige Fragen
          </p>

          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-3xl">
            Gut informiert starten
          </h2>
        </div>

        <div className="divide-y divide-[#dce5e9] border-y border-[#dce5e9]">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold leading-6 text-slate-800 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-[#f15b2a] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>

              <p className="mt-4 max-w-3xl pr-8 text-sm leading-7 text-slate-600">
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
/*                                MAIN PAGE                                   */
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

      {/* Hero */}
      <ServiceHero
        handyman={handyman}
        serviceTitle={serviceTitle}
        cityDisplay={cityDisplay}
        locationData={data.locationData}
      />

      {/* Postal Coverage */}
      {data.city && (
        <CoverageList
          serviceTitle={serviceTitle}
          locationData={data.locationData}
        />
      )}

      {/* Qualified Handyman Banner */}
      <QualifiedBanner cityDisplay={cityDisplay} />

      {/* Real Handyman Results */}
      {data.city && (
        <HandwerkerResults
          serviceTitle={serviceTitle}
          cityDisplay={cityDisplay}
          data={data}
          search={search}
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