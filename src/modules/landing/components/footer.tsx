import { t, type Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const links = {
    [t("landing.footer.product", locale)]: [
      t("landing.footer.product_features", locale),
      t("landing.footer.product_roadmap", locale),
      t("landing.footer.product_pricing", locale),
      t("landing.footer.product_changelog", locale),
    ],
    [t("landing.footer.resources", locale)]: [
      t("landing.footer.res_docs", locale),
      t("landing.footer.res_api", locale),
      t("landing.footer.res_foundry", locale),
      t("landing.footer.res_status", locale),
    ],
    [t("landing.footer.community", locale)]: [
      t("landing.footer.com_discord", locale),
      t("landing.footer.com_github", locale),
      t("landing.footer.com_contribute", locale),
      t("landing.footer.com_bug", locale),
    ],
    [t("landing.footer.company", locale)]: [
      t("landing.footer.comp_about", locale),
      t("landing.footer.comp_blog", locale),
      t("landing.footer.comp_privacy", locale),
      t("landing.footer.comp_terms", locale),
    ],
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {/* Top */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand col */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <DiceIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Apex20</span>
            </div>
            <p className="text-sm leading-relaxed text-tertiary">
              {t("landing.footer.tagline", locale)}
            </p>
            <div className="flex gap-3">
              <SocialIcon label="Discord" />
              <SocialIcon label="GitHub" />
              <SocialIcon label="Twitter" />
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {group}
              </h4>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-tertiary transition-colors hover:text-muted">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <span className="font-mono text-xs text-tertiary">
            © {new Date().getFullYear()} Apex20. {t("landing.footer.rights", locale)}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-tertiary">v0.2.0-alpha</span>
            <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="font-mono text-xs text-success">{t("landing.footer.status", locale)}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-tertiary transition-colors hover:border-primary/40 hover:text-muted"
    >
      <div className="h-3 w-3 rounded-sm bg-current opacity-60" />
    </a>
  );
}
