import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ORIGIN = "https://incorporateuae.com";
const LOCALES = ["fr", "de", "es", "ar", "it", "ru", "uk"];
const ALL_LANGS = ["en", ...LOCALES];

// Static routes (no dynamic slug)
const STATIC_ROUTES = [
  "/",
  "/free-zones",
  "/relocation",
  "/mainland",
  "/mainland/licensing",
  "/mainland/office-ejari",
  "/mainland/compliance",
  "/compare",
  "/activities",
  "/taxes",
  "/tools",
  "/tools/cost-estimator",
  "/tools/zone-picker",
  "/tools/vat-helper",
  "/blog",
  "/guides",
  "/how-to/uae-business-setup",
  "/contact",
];

// Data-driven slugs (from static data files)
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

const ACTIVITY_IDS = [
  "consulting","marketing-agency","e-commerce","it-services",
];

const TAX_SLUGS = ["vat", "corporate-tax"];

const GUIDE_SLUGS = [
  "uae-setup-system","mainland-vs-freezone-vs-offshore","legal-forms-uae",
  "business-activities-codes","real-cost-of-setup","owner-employee-visas",
  "family-sponsorship","medical-fitness-emirates-id","corporate-bank-accounts",
  "vat-registration-filing","corporate-tax-scope","ct-penalties-deadlines",
  "e-invoicing","ubo-aml-substance","adgm-profile","masdar-profile","kezad-profile",
];

const COUNTRY_CODES = ["uk", "us", "india", "egypt", "europe"];

function hreflangBlock(path: string): string {
  const enUrl = `${ORIGIN}${path}`;
  const links = [`<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`];
  for (const loc of LOCALES) {
    const locPath = path === "/" ? `/${loc}` : `/${loc}${path}`;
    links.push(`<xhtml:link rel="alternate" hreflang="${loc}" href="${ORIGIN}${locPath}"/>`);
  }
  links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`);
  return links.join("\n      ");
}

function urlEntry(path: string, priority: string, changefreq: string, lastmod: string): string {
  const entries: string[] = [];
  // English (default, no prefix)
  entries.push(`  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${hreflangBlock(path)}
  </url>`);
  // Locale prefixed
  for (const loc of LOCALES) {
    const locPath = path === "/" ? `/${loc}` : `/${loc}${path}`;
    entries.push(`  <url>
    <loc>${ORIGIN}${locPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${hreflangBlock(path)}
  </url>`);
  }
  return entries.join("\n");
}

Deno.serve(async () => {
  const today = new Date().toISOString().split("T")[0];

  const urls: string[] = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    const pri = route === "/" ? "1.0" : route.split("/").length <= 2 ? "0.8" : "0.7";
    urls.push(urlEntry(route, pri, "weekly", today));
  }

  // Free zones
  for (const id of FREE_ZONE_IDS) {
    urls.push(urlEntry(`/free-zones/${id}`, "0.7", "monthly", today));
  }

  // Comparisons
  for (const id of COMPARISON_IDS) {
    urls.push(urlEntry(`/compare/${id}`, "0.7", "monthly", today));
  }

  // Activities
  for (const id of ACTIVITY_IDS) {
    urls.push(urlEntry(`/activities/${id}`, "0.7", "monthly", today));
  }

  // Tax guides
  for (const slug of TAX_SLUGS) {
    urls.push(urlEntry(`/taxes/${slug}`, "0.7", "monthly", today));
  }

  // Setup guides
  for (const slug of GUIDE_SLUGS) {
    urls.push(urlEntry(`/guides/${slug}`, "0.6", "monthly", today));
  }

  // Relocation countries
  for (const code of COUNTRY_CODES) {
    urls.push(urlEntry(`/relocation/${code}`, "0.7", "monthly", today));
  }

  // Dynamic DB content: blog posts
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    const { data: posts } = await sb
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true);

    if (posts) {
      for (const p of posts) {
        const lastmod = p.updated_at?.split("T")[0] || today;
        urls.push(urlEntry(`/blog/${p.slug}`, "0.7", "weekly", lastmod));
      }
    }

    // How-to articles (multilingual — each has its own language_code)
    const { data: howtos } = await sb
      .from("howto_articles")
      .select("slug, updated_at, language_code")
      .eq("published", true);

    if (howtos) {
      // Group by slug to avoid duplicates; use the language_code for hreflang
      const slugMap = new Map<string, { updated_at: string; langs: string[] }>();
      for (const h of howtos) {
        const existing = slugMap.get(h.slug);
        if (existing) {
          existing.langs.push(h.language_code);
          if (h.updated_at > existing.updated_at) existing.updated_at = h.updated_at;
        } else {
          slugMap.set(h.slug, { updated_at: h.updated_at, langs: [h.language_code] });
        }
      }
      for (const [slug, info] of slugMap) {
        const lastmod = info.updated_at?.split("T")[0] || today;
        // Only output the base path; hreflang handled by urlEntry
        urls.push(urlEntry(`/how-to/uae-business-setup/${slug}`, "0.6", "monthly", lastmod));
      }
    }
  } catch (e) {
    console.error("DB fetch error for sitemap:", e);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
