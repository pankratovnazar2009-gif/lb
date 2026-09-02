"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { navItems, club } from "@/content/club";
import { nextMatch } from "@/content/matches";
import { cn, localeHref, formatDate } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { Crest } from "./Crest";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const scrolled = useScrolled(48);
  const [menuOpen, setMenuOpen] = useState(false);
  const home = locale === "uk" ? nextMatch.home : nextMatch.homeEn;
  const away = locale === "uk" ? nextMatch.away : nextMatch.awayEn;

  return (
    <>
      {/* ticker */}
      <div className="on-green hidden bg-green-deep text-on-green md:block">
        <div className="shell gutter flex items-center justify-between py-3 label">
          <span className="flex items-center gap-3 text-on-green-soft">
            <span className="text-yellow">{dict.nextMatch.label}</span>
            <span className="text-on-green">
              {home} — {away}
            </span>
            <span>{formatDate(nextMatch.kickoff, locale)}</span>
          </span>
          <div className="flex items-center gap-4 text-on-green-soft">
            {club.socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="hover:text-on-green">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* main bar */}
      <header
        className={cn(
          "sticky top-0 z-[80] transition-colors duration-300",
          scrolled
            ? "bg-paper/92 backdrop-blur-md border-b border-ink-faint"
            : "bg-transparent",
        )}
      >
        <div className="shell gutter flex items-center justify-between py-3.5">
          <Crest locale={locale} />

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.external ? item.href : localeHref(item.href, locale)}
                className="label text-ink hover:text-green"
              >
                <span className="ul">{dict.nav[item.key]}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <LocaleSwitch active={locale} />
            <a
              href={club.shopUrl}
              target="_blank"
              rel="noreferrer"
              className="label hidden border border-ink px-4 py-2 text-ink transition-colors duration-200 hover:bg-green hover:border-green hover:text-on-green sm:inline-block"
            >
              {dict.nav.shop}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={menuOpen}
              className="label flex items-center gap-2 lg:hidden"
            >
              <span className="relative flex h-3 w-6 flex-col justify-between">
                <span className={cn("h-px w-full bg-ink transition-transform", menuOpen && "translate-y-[5.5px] rotate-45")} />
                <span className={cn("h-px w-full bg-ink transition-opacity", menuOpen && "opacity-0")} />
                <span className={cn("h-px w-full bg-ink transition-transform", menuOpen && "-translate-y-[5.5px] -rotate-45")} />
              </span>
              {menuOpen ? dict.nav.close : dict.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} dict={dict} />
    </>
  );
}
