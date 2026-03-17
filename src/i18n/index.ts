import enCommon from "./locales/en/common.json";
import ptBRCommon from "./locales/pt-br/common.json";

const locales = {
  en: { common: enCommon },
  "pt-BR": { common: ptBRCommon },
} as const;

export type Locale = keyof typeof locales;
export type Namespace = keyof (typeof locales)["en"];

/**
 * Função simplificada para tradução (t).
 * Futuramente poderá ser substituída por i18next se necessário.
 */
export function t(key: string, locale: Locale): string {
  const [ns, k] = key.split(".");
  const dict = locales[locale]?.[ns as Namespace];

  if (!dict) return key;

  // @ts-expect-error - indexação dinâmica para simplificar o scaffold
  return dict[k] || key;
}
