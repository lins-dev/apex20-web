import { t, type Locale } from "@/i18n";

export function Features({ locale }: { locale: Locale }) {
  const features = [
    {
      icon: <GridIcon />,
      title: t("landing.features.grid_title", locale),
      description: t("landing.features.grid_desc", locale),
    },
    {
      icon: <CombatIcon />,
      title: t("landing.features.combat_title", locale),
      description: t("landing.features.combat_desc", locale),
    },
    {
      icon: <DiceIcon />,
      title: t("landing.features.dice_title", locale),
      description: t("landing.features.dice_desc", locale),
    },
    {
      icon: <ImportIcon />,
      title: t("landing.features.import_title", locale),
      description: t("landing.features.import_desc", locale),
    },
    {
      icon: <ARIcon />,
      title: t("landing.features.ar_title", locale),
      description: t("landing.features.ar_desc", locale),
      tag: "Sprint 3",
    },
    {
      icon: <ShieldIcon />,
      title: t("landing.features.offline_title", locale),
      description: t("landing.features.offline_desc", locale),
    },
  ];

  return (
    <section id="features" className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {t("landing.features.eyebrow", locale)}
          </span>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("landing.features.title", locale)}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon, title, description, tag,
}: {
  icon: React.ReactNode; title: string; description: string; tag?: string;
}) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/40">
      {tag && (
        <span className="absolute right-4 top-4 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
          {tag}
        </span>
      )}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-elevated text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function CombatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function DiceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function ImportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function ARIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" /><path d="M8 2v16" /><path d="M16 6v16" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
