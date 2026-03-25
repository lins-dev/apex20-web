import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import { Navbar } from "@/modules/landing/components/navbar";
import { Footer } from "@/modules/landing/components/footer";

interface AuthLayoutProps {
  locale: Locale;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({ locale, title, subtitle, children }: AuthLayoutProps) {
  const metrics = [
    { value: "<100ms", label: t("landing.hero.metric_latency_label", locale) },
    { value: "30%", label: t("landing.hero.metric_speed_label", locale) },
    { value: ">90%", label: t("landing.hero.metric_import_label", locale) },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar locale={locale} />

      {/* Page-level background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/3 h-[600px] w-[600px] opacity-10"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 65%)" }}
      />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12 pt-20">
        <div className="w-full max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_8px_48px_rgba(0,0,0,0.5)] lg:grid lg:grid-cols-[1fr_1.15fr]">

            {/* Left — brand panel */}
            <div
              className="relative hidden flex-col justify-between p-10 lg:flex"
              style={{
                background: "linear-gradient(145deg, #110a20 0%, #1a1030 60%, #0f0820 100%)",
              }}
            >
              {/* Panel grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(139,92,246,0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(139,92,246,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Panel glow */}
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-[400px] w-[400px] opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(139,92,246,0.7) 0%, transparent 65%)",
                }}
              />

              {/* Logo */}
              <div className="relative z-10 flex items-center gap-2">
                <DiceIcon className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold tracking-tight text-foreground">Apex20</span>
              </div>

              {/* Copy */}
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-xs text-primary">
                      {t("landing.hero.badge", locale)}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
                    The tabletop that never{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 60%, #c4b5fd 100%)",
                      }}
                    >
                      lags the story.
                    </span>
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {t("landing.hero.subtitle", locale)}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {metrics.map(({ value, label }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-border/60 bg-elevated/40 p-3"
                    >
                      <div className="text-base font-bold text-primary">{value}</div>
                      <div className="text-xs leading-snug text-muted">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom */}
              <div className="relative z-10">
                <p className="font-mono text-xs text-tertiary">
                  Apex20 · Alpha · {new Date().getFullYear()}
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex flex-col items-center justify-center bg-surface/60 p-8 sm:p-12 backdrop-blur-sm">
              <div className="w-full max-w-sm">
                {/* Mobile logo */}
                <div className="mb-6 flex items-center gap-2 lg:hidden">
                  <DiceIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Apex20</span>
                </div>

                <div className="mb-8">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                  <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
