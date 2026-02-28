import { createContext, useContext, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, locales, localeConfig, type Locale, type TranslationSet } from "./translations/index";

interface LanguageContextType {
  locale: Locale;
  t: TranslationSet;
  lp: (path: string) => string;
  switchLocale: (target: Locale) => void;
  alternateUrl: string;
  basePath: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectLocale(pathname: string): Locale {
  for (const loc of locales) {
    if (loc === "en") continue;
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) return loc;
  }
  return "en";
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const locale = detectLocale(location.pathname);
  const t = translations[locale];

  const basePath = useMemo(() => {
    if (locale !== "en") {
      return location.pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    }
    return location.pathname;
  }, [locale, location.pathname]);

  const lp = useMemo(() => {
    return (path: string) => {
      if (locale === "en") return path;
      return `/${locale}${path === "/" ? "" : path}`;
    };
  }, [locale]);

  const alternateUrl = useMemo(() => {
    if (locale === "en") return `/fr${basePath === "/" ? "" : basePath}`;
    return basePath || "/";
  }, [locale, basePath]);

  const switchLocale = (target: Locale) => {
    if (target === locale) return;
    const newPath = target === "en" ? basePath : `/${target}${basePath === "/" ? "" : basePath}`;
    navigate(newPath);
  };

  // Set hreflang tags + dir
  useEffect(() => {
    const origin = window.location.origin;

    // Clean up old hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    for (const loc of locales) {
      const href = loc === "en"
        ? `${origin}${basePath}`
        : `${origin}/${loc}${basePath === "/" ? "" : basePath}`;
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = loc;
      link.href = href;
      document.head.appendChild(link);
    }

    // x-default
    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = `${origin}${basePath}`;
    document.head.appendChild(defaultLink);

    document.documentElement.lang = locale;
    document.documentElement.dir = localeConfig[locale].dir || "ltr";
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
