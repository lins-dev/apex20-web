"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/ui/shared/utils";
import type { Locale } from "@/i18n";

/* ── Flag SVGs ───────────────────────────────────────────── */

function BrazilFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#009c3b" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
      <rect x="6.8" y="6.4" width="6.4" height="1.2" rx="0.6" fill="white" transform="rotate(-10 10 7)" />
    </svg>
  );
}

function FranceFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#ED2939" />
      <rect width="14" height="14" rx="0" fill="#FFFFFF" />
      <rect width="7" height="14" rx="0" fill="#002395" />
      <rect x="0" width="20" height="14" rx="1.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

function SpainFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#c60b1e" />
      <rect y="3.5" width="20" height="7" fill="#ffc400" />
      <rect x="0" width="20" height="14" rx="1.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

function USAFlag() {
  const stripes = Array.from({ length: 7 });
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#B22234" />
      {stripes.map((_, i) =>
        i % 2 === 0 ? null : (
          <rect key={i} x="0" y={i * 2} width="20" height="2" fill="#FFFFFF" />
        ),
      )}
      <rect width="9" height="7" fill="#3C3B6E" />
      {[1.5, 4.5, 7.5].map((cx) =>
        [1.5, 3.5, 5.5].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.6" fill="white" />
        )),
      )}
      <rect x="0" width="20" height="14" rx="1.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

/* ── Locale config ───────────────────────────────────────── */

const LOCALES: { code: Locale; label: string; Flag: React.FC }[] = [
  { code: "pt-br", label: "PT", Flag: BrazilFlag },
  { code: "en", label: "EN", Flag: USAFlag },
  { code: "es", label: "ES", Flag: SpainFlag },
  { code: "fr", label: "FR", Flag: FranceFlag },
];

/* ── Component ───────────────────────────────────────────── */

export function LanguageSwitcher({
  current,
  className,
}: {
  current: Locale;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function setLocale(locale: Locale) {
    document.cookie = `apex20-locale=${locale};path=/;max-age=31536000`;
    setIsOpen(false);
    router.refresh();
  }

  const active = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-md border border-border bg-transparent px-2 py-1 text-muted transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <active.Flag />
        <span className="font-mono text-xs">{active.label}</span>
        <ChevronIcon
          className={cn("h-3 w-3 transition-transform duration-150", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Idiomas disponíveis"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[88px] overflow-hidden rounded-lg border border-border bg-elevated shadow-xl"
        >
          {LOCALES.map(({ code, label, Flag }) => (
            <button
              key={code}
              role="option"
              aria-selected={code === current}
              onClick={() => setLocale(code)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-surface",
                code === current ? "text-primary" : "text-muted",
              )}
            >
              <Flag />
              <span className="font-mono">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
