import React from "react";
import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import { searchHandymen, SearchHandymenResult } from "@/backend/controllers/user/searchHandymen";
import { components } from "@/components/handwerker-in-der-naehe/componentsMap";
import { serviceSchemas, generateOrganizationSchema, generateCollectionPageSchema } from "@/lib/serviceSchemas";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import Search from "@/components/FindHandyman/search";

// Transliterate function for comparison (matching the legacy logic)
export const transliterateFn = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export type SearchPageData = {
  handyman: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  locationData: any[];
  region: string | null;
  initialResults: SearchHandymenResult | null;
};

export async function getSearchData(
  handyman: string,
  query: { city?: string; postleitzahl?: string },
): Promise<SearchPageData> {
  let cityValue = "";
  let latitude = null;
  let longitude = null;
  let locationData: any[] = [];
  let region = null;

  await connectDb();

  if (query.postleitzahl) {
    const postalData = await PostalCode.findOne({ Postal_Code: Number(query.postleitzahl) }).lean();
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
      }).select("Postal_Code Place_Name Latitude Longitude").lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pName = doc.Place_Name;
          const pParts = pName.split("-");
          if (pParts.length > 1 && /^\d+$/.test(pParts[pParts.length - 1])) pParts.pop();
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
      }).select("Postal_Code Place_Name Latitude Longitude").lean();

      locationData = allCityDocs
        .filter((doc: any) => {
          const pName = doc.Place_Name;
          const pParts = pName.split("-");
          if (pParts.length > 1 && /^\d+$/.test(pParts[pParts.length - 1])) pParts.pop();
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

  if (!cityValue && lookupSlug && lookupSlug.trim() !== "") {
    cityValue = lookupSlug;
  }

  // Fetch the first page of real results server-side so Googlebot (and users
  // on first paint) see actual listings instead of a client-side loading spinner.
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

  return { handyman, city: cityValue, latitude, longitude, locationData, region, initialResults };
}

export function buildServiceMetadata(handyman: string, city: string | undefined, canonicalPath: string) {
  const config = serviceSchemas[handyman];
  const cityText = city ? ` ${changeServiceFormat(city)}` : "";

  if (config) {
    const suffix = config.titleSuffix ? ` – ${config.titleSuffix}` : ` – ${config.name}`;
    return {
      title: `${config.name}${cityText}${suffix}`,
      description: config.description.replace(" –", `${city ? ` in ${changeServiceFormat(city)}` : ""} –`),
      alternates: {
        canonical: canonicalPath,
      },
    };
  }

  return {
    title: `${changeServiceFormat(handyman)} in ${city ? changeServiceFormat(city) : "deiner Nähe"}`,
    description: `Suchst du einen ${changeServiceFormat(handyman)} in ${city ? changeServiceFormat(city) : "deiner Nähe"}?`,
    alternates: {
      canonical: canonicalPath,
    },
  };
}

// A handful of nearby postal codes covered by this city cluster — real,
// per-page data that also happens to add legitimate unique content.
function CoverageList({ serviceTitle, locationData }: { serviceTitle: string; locationData: any[] }) {
  if (!locationData || locationData.length === 0) return null;
  const zips = locationData.slice(0, 12).map((d: any) => d.zip).filter(Boolean);
  if (zips.length === 0) return null;

  return (
    <section className="Container max-w-3xl mx-auto mb-12 text-center">
      <p className="text-gray-600">
        {serviceTitle} in den Postleitzahlgebieten {zips.join(", ")}
        {locationData.length > zips.length ? " und Umgebung" : ""}.
      </p>
    </section>
  );
}

function ServiceFaq({ serviceTitle, cityDisplay }: { serviceTitle: string; cityDisplay: string }) {
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
  ];

  return (
    <section className="Container max-w-3xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Häufige Fragen</h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.q} className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-secondary mb-2">{item.q}</h3>
            <p className="text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicePageBody({
  handyman,
  data,
  search,
}: {
  handyman: string;
  data: SearchPageData;
  search: string;
}) {
  const serviceTitle = components[handyman]?.title?.replace(" in der Nähe", "") || changeServiceFormat(handyman);
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
    <main className="min-h-screen bg-mainBackground pt-24 pb-20">
      {/* SEO Schemas */}
      {orgSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="Container text-center space-y-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-secondary">{serviceTitle} in <span className="text-primary italic">{cityDisplay}</span></h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 font-medium leading-relaxed">
          Suchst du einen {serviceTitle} in {cityDisplay}? Unsere Plattform verbindet dich direkt mit geprüften und zuverlässigen Profis aus deiner Nähe. Vergleiche Kundenbewertungen und wähle den idealen Experten für deine Bedürfnisse.
        </p>
      </section>

      {data.city && <CoverageList serviceTitle={serviceTitle} locationData={data.locationData} />}

      <div className="Container">
        <Search params={{ ...data, search }} />
      </div>

      {data.city && <ServiceFaq serviceTitle={serviceTitle} cityDisplay={cityDisplay} />}
    </main>
  );
}
