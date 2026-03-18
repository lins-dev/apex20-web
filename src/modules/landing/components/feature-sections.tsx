import { t, type Locale } from "@/i18n";

export function FeatureSections({ locale }: { locale: Locale }) {
  const sections = [
    {
      eyebrow: t("landing.sections.grid.eyebrow", locale),
      title: t("landing.sections.grid.title", locale),
      description: t("landing.sections.grid.description", locale),
      bullets: [
        t("landing.sections.grid.bullet1", locale),
        t("landing.sections.grid.bullet2", locale),
        t("landing.sections.grid.bullet3", locale),
      ],
      visual: <GridVisual locale={locale} />,
      flip: false,
    },
    {
      eyebrow: t("landing.sections.camera.eyebrow", locale),
      title: t("landing.sections.camera.title", locale),
      description: t("landing.sections.camera.description", locale),
      bullets: [
        t("landing.sections.camera.bullet1", locale),
        t("landing.sections.camera.bullet2", locale),
        t("landing.sections.camera.bullet3", locale),
      ],
      visual: <CameraVisual locale={locale} />,
      flip: true,
    },
    {
      eyebrow: t("landing.sections.ai.eyebrow", locale),
      title: t("landing.sections.ai.title", locale),
      description: t("landing.sections.ai.description", locale),
      bullets: [
        t("landing.sections.ai.bullet1", locale),
        t("landing.sections.ai.bullet2", locale),
        t("landing.sections.ai.bullet3", locale),
      ],
      visual: <AIVisual locale={locale} />,
      flip: false,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <div className="flex flex-col gap-28 lg:gap-36">
        {sections.map((s) => (
          <div
            key={s.eyebrow}
            className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-20 ${
              s.flip ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <div className="flex flex-col gap-5 lg:w-[45%] lg:shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                {s.eyebrow}
              </span>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                {s.title}
              </h2>
              <p className="text-base leading-relaxed text-muted">{s.description}</p>
              <ul className="flex flex-col gap-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="w-full lg:flex-1">{s.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Visuals ──────────────────────────────────────────────── */

function GridVisual({ locale }: { locale: Locale }) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-surface md:h-80"
      style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.08)" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      {/* Fog overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 48% 45%, transparent 35%, rgba(10,5,20,0.7) 70%)",
        }}
      />
      {/* Tokens with pulse */}
      {[
        { x: "30%", y: "38%", c: "bg-primary border-primary", pulse: true },
        { x: "44%", y: "28%", c: "bg-info/70 border-info", pulse: false },
        { x: "24%", y: "54%", c: "bg-success/70 border-success", pulse: false },
        { x: "52%", y: "46%", c: "bg-warning/70 border-warning", pulse: false },
      ].map((tk, i) => (
        <div
          key={i}
          className={`absolute h-9 w-9 rounded-full border-2 ${tk.c} bg-opacity-30`}
          style={{ left: tk.x, top: tk.y, transform: "translate(-50%,-50%)" }}
        >
          {tk.pulse && (
            <div className="absolute -inset-1 animate-ping rounded-full border border-primary/40 opacity-60" />
          )}
        </div>
      ))}
      {/* Sync indicator */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-elevated/90 px-3 py-1 backdrop-blur-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        <span className="font-mono text-xs text-muted">{t("landing.sections.grid.synced", locale)}</span>
      </div>
      {/* Round tracker */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-elevated/90 px-4 py-1.5 backdrop-blur-sm">
        <span className="font-mono text-xs text-muted">{t("landing.sections.grid.round_label", locale)}</span>
      </div>
    </div>
  );
}

function CameraVisual({ locale }: { locale: Locale }) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-surface md:h-80"
      style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.08)" }}
    >
      {/* Camera feed simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-elevated to-background opacity-80" />
      <div className="absolute inset-4 rounded-lg border border-dashed border-border/60" />

      {/* Dice on "table" */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
        {[
          { value: "18", label: "d20", color: "border-primary text-primary" },
          { value: "6", label: "d6", color: "border-info text-info" },
          { value: "4", label: "d8", color: "border-success text-success" },
        ].map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-1.5">
            <div className={`flex h-14 w-14 items-center justify-center rounded-lg border-2 ${d.color} bg-elevated`}>
              <span className="text-xl font-bold">{d.value}</span>
            </div>
            <span className="font-mono text-xs text-tertiary">{d.label}</span>
          </div>
        ))}
      </div>

      {/* Recognition overlay */}
      <div className="absolute left-1/2 top-[calc(50%-48px)] -translate-x-[calc(50%+44px)] h-14 w-14">
        <div className="absolute inset-0 rounded-lg border border-primary/60 animate-pulse" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-primary">
          ✓ d20 = 18
        </div>
      </div>

      {/* Chat result */}
      <div className="absolute bottom-4 right-4 rounded-lg border border-border bg-elevated/95 p-3 backdrop-blur-sm">
        <p className="text-xs text-tertiary">{t("landing.sections.camera.rolled", locale)}</p>
        <p className="font-mono text-sm font-semibold text-primary">d20 + 5 = <span className="text-foreground">23</span></p>
        <p className="text-xs text-success">{t("landing.sections.camera.critical", locale)}</p>
      </div>

      {/* Camera indicator */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-elevated/90 px-3 py-1">
        <div className="h-2 w-2 rounded-full bg-danger animate-pulse" />
        <span className="font-mono text-xs text-muted">{t("landing.sections.camera.camera_active", locale)}</span>
      </div>
    </div>
  );
}

function AIVisual({ locale }: { locale: Locale }) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-surface md:h-80"
      style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.08)" }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-elevated px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-primary/20 border border-primary/40" />
            <span className="text-xs font-medium text-foreground">{t("landing.sections.ai.session_title", locale)}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="font-mono text-xs text-success">{t("landing.sections.ai.ai_generated", locale)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/20" />
            <div className="h-1.5 w-full rounded-full bg-muted/20" />
            <div className="h-1.5 w-5/6 rounded-full bg-muted/20" />
            <div className="h-1.5 w-2/3 rounded-full bg-muted/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 w-4/5 rounded-full bg-muted/20" />
            <div className="h-1.5 w-full rounded-full bg-muted/20" />
            <div className="h-1.5 w-3/4 rounded-full bg-muted/20" />
          </div>

          {/* Highlights */}
          <div className="flex gap-2 pt-1">
            {[
              { label: t("landing.sections.ai.combats", locale), value: "3", color: "text-danger" },
              { label: t("landing.sections.ai.xp", locale), value: "450", color: "text-success" },
              { label: t("landing.sections.ai.items", locale), value: "5", color: "text-info" },
            ].map((s) => (
              <div key={s.label} className="flex-1 rounded-lg border border-border bg-elevated p-2 text-center">
                <div className={`text-base font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-tertiary">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Send bar */}
        <div className="flex items-center gap-2 border-t border-border bg-elevated px-4 py-2.5">
          <span className="text-xs text-tertiary">{t("landing.sections.ai.sending", locale)}</span>
          <div className="ml-auto flex gap-1.5">
            <div className="rounded-full border border-border px-2 py-0.5 text-[10px] text-tertiary">WhatsApp</div>
            <div className="rounded-full border border-border px-2 py-0.5 text-[10px] text-tertiary">E-mail</div>
          </div>
        </div>
      </div>
    </div>
  );
}
