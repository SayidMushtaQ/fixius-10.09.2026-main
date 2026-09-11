import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import { encodeSitemapUrl, transliterateUrl } from "@/helper/urlEncode";
import { NextRequest, NextResponse } from "next/server";
import { ServiceCards } from "@/constants/landingPage";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

function escapeXml(url: string) {
  return url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDb();
    const { slug } = await params;

    const cleanSlug = slug.replace(/\.xml$/, "");

    // Find which service this matches (e.g. "maurer")
    const serviceCard = ServiceCards.find((c) => cleanSlug.startsWith(c.slug));
    if (!serviceCard) {
      return new NextResponse("Service not found", { status: 404 });
    }

    // Extract the region part if it exists (e.g., "baden-wuerttemberg" from "maurer-baden-wuerttemberg")
    const regionPart = cleanSlug.substring(serviceCard.slug.length + 1); // everything after "[service]-"

    const postalData = await PostalCode.find(
      {},
      { Postal_Code: 1, Place_Name: 1, Admin_Name: 1, _id: 0 },
    ).lean();

    // Filter by region if specified in the sitemap slug
    let filteredData = postalData;
    if (regionPart) {
      filteredData = postalData.filter((doc: any) => {
        const region = doc.Admin_Name || "Sonstige";
        return transliterateUrl(region) === regionPart;
      });
    }

    const sitemapEntries = filteredData
      .map(({ Postal_Code, Place_Name }: any) => {
        let cityName = Place_Name;
        const parts = Place_Name.split("-");
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1].trim();
          if (/^\d+$/.test(lastPart)) {
            parts.pop();
            cityName = parts.join("-").trim();
          }
        }

        const url = `${BASE_URL}/handwerker-finden/${transliterateUrl(
          serviceCard.slug,
        )}/${transliterateUrl(cityName)}`;
        return `<url>
          <loc>${escapeXml(url)}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`;
      })
      .join("");

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries}
    </urlset>`.trim();

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
