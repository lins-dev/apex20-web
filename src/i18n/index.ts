import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";
import ptBrCommon from "./locales/pt-br/common.json";
import ptBrLanding from "./locales/pt-br/landing.json";
import esCommon from "./locales/es/common.json";
import esLanding from "./locales/es/landing.json";
import frCommon from "./locales/fr/common.json";
import frLanding from "./locales/fr/landing.json";

const locales = {
  en: { common: enCommon, landing: enLanding },
  "pt-br": { common: ptBrCommon, landing: ptBrLanding },
  es: { common: esCommon, landing: esLanding },
  fr: { common: frCommon, landing: frLanding },
} as const;

export type Locale = keyof typeof locales;
export type Namespace = keyof (typeof locales)["en"];

export const LOCALES: Locale[] = ["pt-br", "en", "es", "fr"];
export const DEFAULT_LOCALE: Locale = "pt-br";

/**
 * Traduz uma chave com suporte a dot-notation: t("landing.nav.features", "pt-br")
 */
export function t(key: string, locale: Locale): string {
  const [ns, ...path] = key.split(".");
  let current: unknown = locales[locale]?.[ns as Namespace];

  for (const segment of path) {
    if (typeof current !== "object" || current === null) return key;
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : key;
}
