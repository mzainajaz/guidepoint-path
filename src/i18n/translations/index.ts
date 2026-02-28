// i18n translation registry
import en, { type TranslationSet } from "./en";
import fr from "./fr";
import de from "./de";
import es from "./es";
import ar from "./ar";
import it from "./it";
import ru from "./ru";
import uk from "./uk";

export type { TranslationSet };

export const locales = ["en", "fr", "de", "es", "ar", "it", "ru", "uk"] as const;
export type Locale = (typeof locales)[number];

export const localeConfig: Record<Locale, { label: string; flag: string; name: string; dir?: "rtl" }> = {
  en: { label: "EN", flag: "🇬🇧", name: "English" },
  fr: { label: "FR", flag: "🇫🇷", name: "Français" },
  de: { label: "DE", flag: "🇩🇪", name: "Deutsch" },
  es: { label: "ES", flag: "🇪🇸", name: "Español" },
  ar: { label: "AR", flag: "🇦🇪", name: "العربية", dir: "rtl" },
  it: { label: "IT", flag: "🇮🇹", name: "Italiano" },
  ru: { label: "RU", flag: "🇷🇺", name: "Русский" },
  uk: { label: "UK", flag: "🇺🇦", name: "Українська" },
};

export const translations: Record<Locale, TranslationSet> = {
  en, fr, de, es, ar, it, ru, uk,
};
