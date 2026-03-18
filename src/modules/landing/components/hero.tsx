import { Button } from "@/ui/web";
import { t, type Locale } from "@/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const metrics = [
    { value: "<100ms", label: t("landing.hero.metric_latency_label", locale) },
    { value: "30%", label: t("landing.hero.metric_speed_label", locale) },
    { value: ">90%", label: t("landing.hero.metric_import_label", locale) },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[700px] w-[700px] opacity-15"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:py-32">
        {/* Left — copy */}
        <div className="flex flex-col gap-6 lg:w-[52%] lg:shrink-0">
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface w-fit px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-muted">{t("landing.hero.badge", locale)}</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              {t("landing.hero.title_pre", locale)}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 60%, #c4b5fd 100%)" }}
              >
                {t("landing.hero.title_highlight", locale)}
              </span>{" "}
              {t("landing.hero.title_post", locale)}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted">
              {t("landing.hero.subtitle", locale)}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="bg-primary px-8 text-white hover:opacity-90">
              {t("landing.hero.cta_primary", locale)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border px-8 text-muted hover:border-primary/40 hover:text-foreground"
            >
              {t("landing.hero.cta_secondary", locale)}
            </Button>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border/50 pt-6">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-tertiary">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — app mockup */}
        <div className="w-full lg:w-[48%]">
          <AppMockup locale={locale} />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </section>
  );
}

function AppMockup({ locale }: { locale: Locale }) {
  const tabs =
    locale === "en"
      ? ["Chat", "Sheets", "Journal"]
      : locale === "es"
        ? ["Chat", "Fichas", "Diario"]
        : locale === "fr"
          ? ["Chat", "Fiches", "Journal"]
          : ["Chat", "Fichas", "Diário"];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.1)" }}
    >
      {/* Header bar */}
      <div className="flex h-10 items-center justify-between border-b border-border bg-elevated px-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
            <span className="font-mono text-xs text-muted">Campanha: A Maldição de Strahd</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {["bg-primary/60", "bg-info/60", "bg-success/60", "bg-warning/60"].map((c, i) => (
              <div key={i} className={`h-6 w-6 rounded-full border border-border ${c}`} />
            ))}
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="h-5 w-5 rounded bg-border/50" />
          <div className="h-5 w-5 rounded bg-border/50" />
        </div>
      </div>

      {/* App body */}
      <div className="flex" style={{ height: "340px" }}>
        {/* Toolbar */}
        <div className="flex w-10 shrink-0 flex-col items-center gap-2.5 border-r border-border bg-elevated py-3">
          {[true, false, false, false, false, false, false].map((active, i) => (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                active ? "bg-primary/25 border border-primary/50" : "border border-transparent hover:bg-border/30"
              }`}
            >
              <div className={`h-3 w-3 rounded-sm ${active ? "bg-primary" : "bg-border"}`} />
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        >
          {/* Fog of war */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 55% 55% at 42% 48%, transparent 40%, rgba(10,5,20,0.75) 75%)",
            }}
          />
          {/* Tokens */}
          <Token x="22%" y="28%" color="primary" label="PC" />
          <Token x="36%" y="40%" color="info" label="PC" />
          <Token x="18%" y="52%" color="success" label="PC" />
          <Token x="42%" y="22%" color="warning" label="PC" />
          <Token x="30%" y="58%" color="danger" label="NPC" size="lg" />

          {/* Round tracker */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-elevated/90 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted">Round 3</span>
            <div className="h-3 w-px bg-border" />
            <span className="font-mono text-xs text-primary">Drácula</span>
          </div>

          {/* Zoom controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-border bg-elevated/90 text-xs text-muted">+</div>
            <div className="flex h-6 w-6 items-center justify-center rounded border border-border bg-elevated/90 text-xs text-muted">−</div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex w-52 shrink-0 flex-col border-l border-border bg-elevated">
          {/* Tabs */}
          <div className="flex shrink-0 border-b border-border">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  i === 0
                    ? "border-b-2 border-primary text-primary"
                    : "text-tertiary hover:text-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat messages */}
          <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5">
            <ChatMsg align="left" name="Mestre" text="Strahd avança." />
            <ChatMsg align="right" name="Aria" text="Ataco com a espada sagrada!" dice="1d20+5 = 18" />
            <ChatMsg align="left" name="Mestre" text="Acerto! 14 de dano." />
            <ChatMsg align="right" name="Thorin" text="Curo 2d6+3..." dice="2d6+3 = 12" />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border p-2">
            <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2">
              <div className="h-3 w-24 rounded bg-border/40" />
              <div className="ml-auto h-5 w-5 rounded bg-primary/20 border border-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Token({
  x, y, color, size = "md",
}: {
  x: string; y: string; color: string; label: string; size?: "md" | "lg";
}) {
  const sz = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const colorMap: Record<string, string> = {
    primary: "border-primary bg-primary/30",
    info: "border-info bg-info/30",
    success: "border-success bg-success/30",
    warning: "border-warning bg-warning/30",
    danger: "border-danger bg-danger/20",
  };
  return (
    <div
      className={`absolute ${sz} rounded-full border-2 ${colorMap[color]} backdrop-blur-sm`}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    />
  );
}

function ChatMsg({
  align, name, text, dice,
}: {
  align: "left" | "right"; name: string; text: string; dice?: string;
}) {
  return (
    <div className={`flex gap-1.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-border/60" />
      <div className="max-w-[80%]">
        <div className={`mb-0.5 text-[10px] text-tertiary ${align === "right" ? "text-right" : ""}`}>{name}</div>
        <div className="rounded-lg border border-border bg-background/60 px-2 py-1.5">
          <p className="text-[10px] leading-snug text-muted">{text}</p>
          {dice && (
            <div className="mt-1 flex items-center gap-1">
              <div className="h-3.5 w-3.5 rounded border border-primary/50 bg-primary/20" />
              <span className="font-mono text-[10px] text-primary">{dice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
