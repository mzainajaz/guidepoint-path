import { createContext, useContext, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, type TranslationSet } from "./translations";

export type Locale = "en" | "fr";

interface LanguageContextType {
  locale: Locale;
  t: TranslationSet;
  lp: (path: string) => string;
  switchLocale: () => void;
  alternateUrl: string;
  basePath: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const locale: Locale = location.pathname.startsWith("/fr") ? "fr" : "en";
  const t = translations[locale];

  const basePath = useMemo(() => {
    if (locale === "fr") {
      const stripped = location.pathname.replace(/^\/fr/, "") || "/";
      return stripped;
    }
    return location.pathname;
  }, [locale, location.pathname]);

  const lp = useMemo(() => {
    return (path: string) => {
      if (locale === "fr") return `/fr${path === "/" ? "" : path}`;
      return path;
    };
  }, [locale]);

  const alternateUrl = useMemo(() => {
    if (locale === "en") return `/fr${basePath === "/" ? "" : basePath}`;
    return basePath || "/";
  }, [locale, basePath]);

  const switchLocale = () => navigate(alternateUrl);

  // Set hreflang tags
  useEffect(() => {
    const origin = window.location.origin;
    const enUrl = `${origin}${basePath}`;
    const frUrl = `${origin}/fr${basePath === "/" ? "" : basePath}`;

    let enLink = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    let frLink = document.querySelector('link[hreflang="fr"]') as HTMLLinkElement;
    let defaultLink = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement;

    if (!enLink) {
      enLink = document.createElement("link");
      enLink.rel = "alternate";
      enLink.hreflang = "en";
      document.head.appendChild(enLink);
    }
    if (!frLink) {
      frLink = document.createElement("link");
      frLink.rel = "alternate";
      frLink.hreflang = "fr";
      document.head.appendChild(frLink);
    }
    if (!defaultLink) {
      defaultLink = document.createElement("link");
      defaultLink.rel = "alternate";
      defaultLink.hreflang = "x-default";
      document.head.appendChild(defaultLink);
    }

    enLink.href = enUrl;
    frLink.href = frUrl;
    defaultLink.href = enUrl;

    // Set html lang attribute
    document.documentElement.lang = locale;
  }, [locale, basePath]);

  const value = useMemo(
    () => ({ locale, t, lp, switchLocale, alternateUrl, basePath }),
    [locale, t, lp, alternateUrl, basePath]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLocale must be used within LanguageProvider");
  return ctx;
};

export const useT = () => useLocale().t;
export const useLocalePath = () => useLocale().lp;
