import { createFileRoute } from "@tanstack/react-router";
import { getLocaleFromCookie } from "@/lib/locale";
import { LandingPage } from "@/modules/landing";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const locale = getLocaleFromCookie();
  return <LandingPage locale={locale} />;
}
