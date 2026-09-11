const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio"); // We might need to install cheerio if not present, or use regex if simple enough. checking package.json... cheerio is not there.
// Wait, I should check if I can use regex or if I need to install a parser.
// The user has `html-pdf-node` which might have dependencies, but let's stick to simple regex for now to avoid installing new packages if possible,
// OR just install cheerio as a dev dependency which is cleaner.
// Actually, `cheerio` is not in package.json.
// Let's check if `jsdom` or similar is there. `puppeteer` is there!
// I can use puppeteer, but it might be slow for 30 pages.
// `node-fetch` is there.
// Let's try regex first for speed and simplicity, as we just need <title> and <h1>.
// If regex proves too brittle, I'll use puppeteer since it's already installed.

// Actually, let's use Puppeteer since it's robust and installed.
// It ensures we get the rendered content if there's any client-side rendering (though titles should be SSR).
// But wait, `puppeteer` is in dependencies.

const puppeteer = require("puppeteer");
const { XMLParser } = require("fast-xml-parser"); // Not installed.

// Let's just use simple string manipulation for XML parsing since it's a simple sitemap.

async function run() {
  const sitemapPath = path.join(
    __dirname,
    "../public/sitemap-handwerker-in-meiner-naehe.xml"
  );
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

  // Simple regex to find <loc> tags
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  const urls = [];
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  console.log("Starting verification...");
  console.log("---------------------------------------------------");

  let discrepancies = 0;

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      const metaTitle = await page.title();
      // Get H1. There might be multiple or none, let's get the first one.
      const h1 = await page
        .$eval("h1", (el) => el.textContent)
        .catch(() => null);

      const cleanMetaTitle = metaTitle ? metaTitle.trim() : "MISSING";
      const cleanH1 = h1 ? h1.trim() : "MISSING";

      // Simple comparison (maybe too strict?)
      // The user said "match the meta tittle with that page tittle".
      // Usually they should be similar or identical.
      // Let's log everything and flag mismatches.

      const isMatch = cleanMetaTitle === cleanH1;

      if (!isMatch) {
        console.log(`[MISMATCH] ${url}`);
        console.log(`  Meta Title: "${cleanMetaTitle}"`);
        console.log(`  Page H1:    "${cleanH1}"`);
        discrepancies++;
      } else {
        // console.log(`[OK] ${url}`); // Optional: reduce noise
      }
    } catch (error) {
      console.error(`[ERROR] Failed to process ${url}: ${error.message}`);
    }
  }

  console.log("---------------------------------------------------");
  console.log(`Verification complete. ${discrepancies} discrepancies found.`);

  await browser.close();
}

run();
