"use client";

import { useState } from "react";
import { Button } from "@/ui/web";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { t, type Locale } from "@/i18n";

export function Navbar({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: t("landing.nav.features", locale) },
    { href: "#systems", label: t("landing.nav.systems", locale) },
    { href: "#roadmap", label: t("landing.nav.roadmap", locale) },
    { href: "#", label: t("landing.nav.docs", locale) },
    { href: "#", label: t("landing.nav.pricing", locale) },
    { href: "#about", label: t("landing.nav.about", locale) },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <DiceIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold tracking-tight text-foreground">Apex20</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-muted hover:text-foreground sm:inline-flex"
          >
            {t("landing.nav.login", locale)}
          </Button>
          <Button size="sm" className="hidden bg-primary text-white hover:opacity-90 sm:inline-flex">
            {t("landing.nav.cta", locale)}
          </Button>

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-primary/40 hover:text-foreground md:hidden"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        data-testid="mobile-menu"
        data-open={isOpen ? "true" : "false"}
        className={`border-t border-border bg-background/95 backdrop-blur-md md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button variant="ghost" size="sm" className="justify-start text-muted hover:text-foreground">
              {t("landing.nav.login", locale)}
            </Button>
            <Button size="sm" className="bg-primary text-white hover:opacity-90">
              {t("landing.nav.cta", locale)}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
