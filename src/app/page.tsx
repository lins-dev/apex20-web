import { headers } from "next/headers";
import { LandingPage } from "@/modules/landing";
import type { Locale } from "@/i18n";

export default async function Home() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "pt-br") as Locale;
  return <LandingPage locale={locale} />;
}
