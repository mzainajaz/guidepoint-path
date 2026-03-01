import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SITE_NAME = "IncorporateUAE";
const ORIGIN = "https://incorporateuae.com";

const SEOHead = ({ title, description, canonical, type = "website", schema, noindex }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = canonical || `${ORIGIN}${location.pathname}`;
  const fullTitle = title.length > 55 ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:card", "summary_large_image");

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // JSON-LD Schema
    const existingSchemas = document.querySelectorAll('script[data-seo-schema]');
    existingSchemas.forEach((el) => el.remove());

    const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
    schemas.forEach((s) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-schema]').forEach((el) => el.remove());
    };
  }, [fullTitle, description, canonicalUrl, type, schema, noindex]);

  return null;
};

export default SEOHead;

// ── Schema helpers ──

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: ORIGIN,
  description: "Compare UAE free zones, mainland options, and business setup routes. Expert guidance with transparent methodology.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${ORIGIN}/free-zones?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: ORIGIN,
  logo: `${ORIGIN}/favicon.ico`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "AE",
    availableLanguage: ["English", "Arabic", "French", "German", "Spanish"],
  },
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${ORIGIN}${item.url}`,
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const articleSchema = (opts: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: opts.title,
  description: opts.description,
  url: `${ORIGIN}${opts.url}`,
  dateModified: opts.dateModified,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: ORIGIN,
  },
  author: {
    "@type": "Organization",
    name: SITE_NAME,
  },
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: `${ORIGIN}${opts.url}`,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: ORIGIN,
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
});
