import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n";
import { detectLocale } from "@/i18n/locale-detection";

/**
 * Returns the active locale for client-side use.
 * Reads the apex20-locale cookie; falls back to navigator.language detection.
 */
export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("apex20-locale="));

  const cookieLocale = match?.split("=")[1];

  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return detectLocale(navigator.language);
}
