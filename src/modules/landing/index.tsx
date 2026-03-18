import type { Locale } from "@/i18n";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Systems } from "./components/systems";
import { FeatureSections } from "./components/feature-sections";
import { Features } from "./components/features";
import { CtaBanner } from "./components/cta-banner";
import { Footer } from "./components/footer";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Systems locale={locale} />
        <FeatureSections locale={locale} />
        <Features locale={locale} />
        <CtaBanner locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
