import { t, type Locale } from "@/i18n";

const systems = [
  "D&D 5e",
  "Pathfinder 2e",
  "Call of Cthulhu",
  "Shadowrun",
  "Vampire: The Masquerade",
  "Starfinder",
  "GURPS",
  "OSR / Old School",
];

export function Systems({ locale }: { locale: Locale }) {
  return (
    <section id="systems" className="border-y border-border/50 bg-surface py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-tertiary">
          {t("landing.systems.label", locale)}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {systems.map((system) => (
            <div
              key={system}
              className="rounded-full border border-border bg-elevated px-4 py-1.5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {system}
            </div>
          ))}
          <div className="rounded-full border border-dashed border-border px-4 py-1.5 text-sm text-tertiary">
            {t("landing.systems.more", locale)}
          </div>
        </div>
      </div>
    </section>
  );
}
