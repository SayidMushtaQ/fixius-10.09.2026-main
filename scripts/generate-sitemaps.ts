import fs from "fs";
import path from "path";
import { connectDb } from "../backend/middleware/db";
import userDb from "../backend/models/userModel";
import Craftsman from "../backend/models/CrafstmanModel";
import { ServiceCards } from "../constants/landingPage";
import { encodeSitemapUrl, transliterateUrl } from "../helper/urlEncode";
// import dotenv from "dotenv";
import PostalCode from "../backend/models/PostalCode";

// dotenv.config();

const rawBaseUrl = process.env.BASE_URL && !process.env.BASE_URL.includes("localhost")
  ? process.env.BASE_URL
  : "https://www.fixius.de";
const BASE_URL = rawBaseUrl.replace(/\/$/, "");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

// Helper to escape XML
function escapeXml(url: string) {
  return url
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Helper to write sitemap file
function writeSitemap(filename: string, content: string) {
  const filePath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated ${filename}`);
}

// 1. Generate sitemap-craftsman-profiles.xml
async function generateCraftsmanProfilesSitemap() {
  try {
    await connectDb();
    const agrr = [
      {
        $match: {
          status: "verified",
        },
      },
      {
        $lookup: {
          from: "userdbs",
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            {
              $project: {
                _id: 0,
                active_status: 1,
              },
            },
          ],
          as: "userArray",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userArray", 0] },
        },
      },
      {
        $match: {
          "user.active_status": "active",
        },
      },
      {
        $project: {
          company_name: 1,
          updatedAt: 1,
        },
      },
    ];

    const craftsman = await Craftsman.aggregate(agrr);

    if (!craftsman || !Array.isArray(craftsman)) {
      console.warn("⚠️ No craftsman data found for sitemap");
      return;
    }

    const urls = craftsman
      .map(
        ({ company_name, updatedAt }: any) => `
    <url>
        <loc>${escapeXml(
          `${BASE_URL}/handwerker/${transliterateUrl(company_name)}`,
        )}</loc>
        <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    `,
      )
      .join("");

    const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    writeSitemap("sitemap-craftsman-profiles.xml", content);
  } catch (error) {
    console.error("❌ Error generating craftsman profiles sitemap:", error);
  }
}

// 4. Generate Service Sitemaps (sitemap-service/[slug]-[regionSlug].xml)
async function generateServiceSitemaps() {
  await connectDb();
  const postalData = await PostalCode.find(
    {},
    { Postal_Code: 1, Place_Name: 1, Admin_Name: 1, _id: 0 },
  ).lean();

  // Recreate the directory from scratch so stale files from a previous run
  // (e.g. the old monolithic per-service sitemaps) don't linger.
  const serviceDir = path.join(PUBLIC_DIR, "sitemap-service");

  fs.rmSync(serviceDir, { recursive: true, force: true });
  fs.mkdirSync(serviceDir, { recursive: true });

  // Group by Admin_Name (state)
  const groupedData: { [key: string]: any[] } = {};

  for (const doc of postalData) {
    const region = (doc as any).Admin_Name || "Sonstige";
    if (!groupedData[region]) {
      groupedData[region] = [];
    }
    groupedData[region].push(doc);
  }

  // Collect the URLs of every region sitemap we write, so the master index
  // can reference them directly (a sitemap index must list sitemaps, not pages).
  const generatedSitemaps: string[] = [];

  for (const { slug } of ServiceCards) {
    if (!slug) continue;

    for (const [region, docs] of Object.entries(groupedData)) {
      const regionSlug = transliterateUrl(region);

      const entries = docs
        .map(({ Postal_Code, Place_Name }: any) => {
          let cityName = Place_Name || "";
          // Clean trailing zip from Place_Name if exists
          const parts = cityName.split("-");
          if (parts.length > 1) {
            const lastPart = parts[parts.length - 1].trim();
            if (/^\d+$/.test(lastPart)) {
              parts.pop();
              cityName = parts.join("-").trim();
            }
          }

          const url = `${BASE_URL}/handwerker-finden/${transliterateUrl(
            slug,
          )}/${transliterateUrl(cityName)}`;
          return `
        <url>
            <loc>${escapeXml(url)}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>`;
        })
        .join("");

      const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

      writeSitemap(`sitemap-service/${slug}-${regionSlug}.xml`, content);
      generatedSitemaps.push(
        `${BASE_URL}/sitemap-service/${slug}-${regionSlug}.xml`,
      );
    }
  }

  return generatedSitemaps;
}

// 5b. Generate sitemap-service-hubs.xml (/[slug]-in-der-naehe)
function generateServiceHubsSitemap() {
  const urls = ServiceCards.map(
    ({ slug }) => `
    <url>
        <loc>${escapeXml(`${BASE_URL}/${slug}-in-der-naehe`)}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    `,
  ).join("");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  writeSitemap("sitemap-service-hubs.xml", content);
}

// 6. Generate Master sitemap.xml
function generateMasterSitemap(serviceSitemaps: string[]) {
  const sitemaps = [
    `${BASE_URL}/sitemap-handwerker.xml`, // Generated by next-sitemap
    `${BASE_URL}/sitemap-craftsman-profiles.xml`,
    `${BASE_URL}/sitemap-service-hubs.xml`,
    // Every per-region service sitemap, referenced directly so Google crawls
    // each one as a sitemap (not as an indexable page).
    ...serviceSitemaps,
  ];

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `
    <sitemap>
        <loc>${escapeXml(url)}</loc>
    </sitemap>
`,
  )
  .join("")}
</sitemapindex>`;

  writeSitemap("sitemap.xml", content);
}

async function main() {
  console.log("🚀 Starting Sitemap Generation...");

  try {
    await generateCraftsmanProfilesSitemap();
    const serviceSitemaps = await generateServiceSitemaps();
    generateServiceHubsSitemap();
    generateMasterSitemap(serviceSitemaps);
    console.log("✨ Sitemap Generation Completed!");
  } catch (error) {
    // Runs as a postbuild step — a DB/network hiccup must not fail the deploy.
    // Log loudly and exit cleanly so the existing sitemaps stay in place.
    console.error("❌ Sitemap generation failed (build not aborted):", error);
  }

  process.exit(0);
}

main();
