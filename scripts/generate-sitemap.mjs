const ORIGIN = "https://incorporateuae.com";
const LOCALES = ["fr", "de", "es", "ar", "it", "ru", "uk", "zh", "pt"];

const STATIC_ROUTES = [
  "/", "/free-zones", "/relocation", "/mainland", "/mainland/licensing",
  "/mainland/office-ejari", "/mainland/compliance", "/compare", "/activities",
  "/taxes", "/tools", "/tools/cost-estimator", "/tools/zone-picker",
  "/tools/vat-helper", "/blog", "/guides", "/how-to/uae-business-setup", "/contact",
];

const FREE_ZONE_IDS = [
  "dubai-south","meydan","ifza","dmcc","rakez","shams","spc","difc","adgm",
  "masdar","dso","dafza","jafza","dwtc","dubai-commercity","kezad","srtip",
  "saif-zone","hamriyah","ajman","ajman-media-city","uaq","fujairah",
  "creative-city-fujairah","rak-icc","rak-dao","dda-clusters","dhcc",
  "sharjah-publishing-city","adafz","twofour54",
];

const COMPARISON_IDS = [
  "ifza-vs-dmcc","mainland-vs-free-zone","dmcc-vs-meydan",
  "meydan-vs-dubai-south","ifza-vs-rakez","uk-entrepreneur-relocation",
  "us-founder-llc-vs-uae","india-ecommerce-uae",
];

const ACTIVITY_IDS = ["consulting","marketing-agency","e-commerce","it-services"];
const TAX_SLUGS = ["vat","corporate-tax"];
const GUIDE_SLUGS = [
  "uae-setup-system","mainland-vs-freezone-vs-offshore","legal-forms-uae",
  "business-activities-codes","real-cost-of-setup","owner-employee-visas",
  "family-sponsorship","medical-fitness-emirates-id","corporate-bank-accounts",
  "vat-registration-filing","corporate-tax-scope","ct-penalties-deadlines",
  "e-invoicing","ubo-aml-substance","adgm-profile","masdar-profile","kezad-profile",
];
const COUNTRY_CODES = ["uk","us","india","egypt","europe"];

function hreflangBlock(path) {
  const enUrl = `${ORIGIN}${path}`;
  const links = [`      <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`];
  for (const loc of LOCALES) {
    const locPath = path === "/" ? `/${loc}` : `/${loc}${path}`;
    links.push(`      <xhtml:link rel="alternate" hreflang="${loc}" href="${ORIGIN}${locPath}"/>`);
  }
  links.push(`      <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`);
  return links.join("\n");
}

function urlEntries(path, priority, changefreq, lastmod) {
  const entries = [];
  // English
  entries.push(`  <url>\n    <loc>${ORIGIN}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${hreflangBlock(path)}\n  </url>`);
  // Locales
  for (const loc of LOCALES) {
    const locPath = path === "/" ? `/${loc}` : `/${loc}${path}`;
    entries.push(`  <url>\n    <loc>${ORIGIN}${locPath}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${hreflangBlock(path)}\n  </url>`);
  }
  return entries;
}

const today = new Date().toISOString().split("T")[0];
const urls = [];

for (const r of STATIC_ROUTES) {
  const pri = r === "/" ? "1.0" : r.split("/").length <= 2 ? "0.8" : "0.7";
  urls.push(...urlEntries(r, pri, "weekly", today));
}
for (const id of FREE_ZONE_IDS) urls.push(...urlEntries(`/free-zones/${id}`, "0.7", "monthly", today));
for (const id of COMPARISON_IDS) urls.push(...urlEntries(`/compare/${id}`, "0.7", "monthly", today));
for (const id of ACTIVITY_IDS) urls.push(...urlEntries(`/activities/${id}`, "0.7", "monthly", today));
for (const s of TAX_SLUGS) urls.push(...urlEntries(`/taxes/${s}`, "0.7", "monthly", today));
for (const s of GUIDE_SLUGS) urls.push(...urlEntries(`/guides/${s}`, "0.6", "monthly", today));
for (const c of COUNTRY_CODES) urls.push(...urlEntries(`/relocation/${c}`, "0.7", "monthly", today));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

const fs = await import("fs");
fs.writeFileSync("public/sitemap.xml", xml, "utf-8");
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
