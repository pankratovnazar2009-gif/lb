"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { navItems, club } from "@/content/club";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/utils";
import { LocaleSwitch } from "./LocaleSwitch";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({
  open,
  onClose,
  locale,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}) {
  useEffect(() => {
    document.documentElement.style.overflow = open ? "clip" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="on-green fixed inset-0 z-[95] flex flex-col bg-green-deep text-on-green gutter pb-10 pt-24"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <nav className="mt-auto flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
              >
                <Link
                  href={
                    item.external ? item.href : localeHref(item.href, locale)
                  }
                  onClick={onClose}
                  className="font-display block border-b border-white/10 py-3 text-[13vw] leading-none tracking-tight"
                >
                  {dict.nav[item.key]}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-8 flex items-center justify-between">
            <LocaleSwitch active={locale} />
            <div className="label flex gap-4">
              {club.socials.slice(0, 4).map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
