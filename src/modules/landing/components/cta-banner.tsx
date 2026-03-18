import { Button } from "@/ui/web";
import { t, type Locale } from "@/i18n";

export function CtaBanner({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(10,5,20,0) 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-border/60 bg-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("landing.cta.title", locale)}
            </h2>
            <p className="max-w-lg text-base text-muted">
              {t("landing.cta.subtitle", locale)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button size="lg" className="bg-primary px-8 text-white hover:opacity-90">
              {t("landing.cta.cta_primary", locale)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border px-8 text-muted hover:border-primary/40 hover:text-foreground"
            >
              {t("landing.cta.cta_secondary", locale)}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
