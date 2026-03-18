import { Plugin } from "vite";
import { writeFileSync } from "fs";
import { resolve } from "path";

const ORIGIN = "https://incorporateuae.com";
const LOCALES = ["fr", "de", "es", "ar", "it", "ru", "uk"];

const STATIC_ROUTES = [
  "/", "/start-here", "/free-zones", "/relocation", "/mainland", "/mainland/licensing",
  "/mainland/office-ejari", "/mainland/compliance", "/compare", "/activities",
  "/taxes", "/tools", "/tools/cost-estimator", "/tools/zone-picker",
  "/tools/vat-helper", "/tools/bank-readiness", "/tools/founder-readiness",
  "/tools/relocation-calculator", "/visas",
  "/blog", "/guides", "/how-to/uae-business-setup", "/contact",
];

const SLUGGED_ROUTES: [string, string[]][] = [
  ["/free-zones", ["dubai-south","meydan","ifza","dmcc","rakez","shams","spc","difc","adgm","masdar","dso","dafza","jafza","dwtc","dubai-commercity","kezad","srtip","saif-zone","hamriyah","ajman","ajman-media-city","uaq","fujairah","creative-city-fujairah","rak-icc","rak-dao","dda-clusters","dhcc","sharjah-publishing-city","adafz","twofour54"]],
  ["/compare", ["ifza-vs-dmcc","mainland-vs-free-zone","dmcc-vs-meydan","meydan-vs-dubai-south","ifza-vs-rakez","uk-entrepreneur-relocation","us-founder-llc-vs-uae","india-ecommerce-uae"]],
  ["/activities", ["consulting","marketing-agency","e-commerce","it-services"]],
  ["/taxes", ["vat","corporate-tax"]],
  ["/guides", ["uae-setup-system","mainland-vs-freezone-vs-offshore","legal-forms-uae","business-activities-codes","real-cost-of-setup","owner-employee-visas","family-sponsorship","medical-fitness-emirates-id","corporate-bank-accounts","vat-registration-filing","corporate-tax-scope","ct-penalties-deadlines","e-invoicing","ubo-aml-substance","adgm-profile","masdar-profile","kezad-profile"]],
  ["/relocation", ["uk","us","india","egypt","europe"]],
  ["/visas", ["investor-visa","employee-visa","partner-visa","family-visa"]],
];

function hreflang(path: string): string {
  const en = `${ORIGIN}${path}`;
  const links = [`      <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`];
  for (const l of LOCALES) {
    const lp = path === "/" ? `/${l}` : `/${l}${path}`;
    links.push(`      <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${lp}"/>`);
  }
  links.push(`      <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`);
  return links.join("\n");
}

function entry(path: string, pri: string, freq: string, mod: string): string[] {
  const out: string[] = [];
  const make = (loc: string) => {
    const locPath = loc === "" ? path : path === "/" ? `/${loc}` : `/${loc}${path}`;
    return `  <url>\n    <loc>${ORIGIN}${locPath}</loc>\n    <lastmod>${mod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n${hreflang(path)}\n  </url>`;
  };
  out.push(make(""));
  for (const l of LOCALES) out.push(make(l));
  return out;
}

export function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    closeBundle() {
      const today = new Date().toISOString().split("T")[0];
      const urls: string[] = [];

      for (const r of STATIC_ROUTES) {
        const pri = r === "/" ? "1.0" : r.split("/").length <= 2 ? "0.8" : "0.7";
        urls.push(...entry(r, pri, "weekly", today));
      }

      for (const [prefix, slugs] of SLUGGED_ROUTES) {
        const pri = prefix === "/guides" ? "0.6" : "0.7";
        for (const s of slugs) urls.push(...entry(`${prefix}/${s}`, pri, "monthly", today));
      }

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>`;

      writeFileSync(resolve("dist", "sitemap.xml"), xml, "utf-8");
      console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
    },
  };
}
