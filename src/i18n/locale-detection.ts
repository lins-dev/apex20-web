import { LOCALES, type Locale } from "./index";

/**
 * Detecta o locale a partir do header Accept-Language do browser.
 * Estratégia: match exato → prefix match → fallback para "en".
 */
export function detectLocale(acceptLanguage: string): Locale {
  if (!acceptLanguage) return "en";

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of candidates) {
    // 1. Exact match: "en" → "en", "pt-br" → "pt-br"
    if (LOCALES.includes(lang as Locale)) return lang as Locale;

    // 2. Browser sends "pt-BR" → normalise to "pt-br" and check again
    const normalised = lang.replace("_", "-").toLowerCase();
    if (LOCALES.includes(normalised as Locale)) return normalised as Locale;

    // 3. Prefix match: "pt-PT" → "pt-br", "es-MX" → "es", "fr-CA" → "fr"
    const prefix = normalised.split("-")[0];
    const prefixMatch = LOCALES.find((l) => l === prefix || l.startsWith(prefix + "-"));
    if (prefixMatch) return prefixMatch;
  }

  // Per spec: if no match, always fall back to English
  return "en";
}
