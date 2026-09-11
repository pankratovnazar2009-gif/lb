"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { players } from "@/content/players";
import type { Player } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURED = [10, 9, 7, 8, 44, 20, 6, 11, 21, 5, 17, 74];

/** Cutout portraits over paper, huge numerals, grayscale → colour.
 *  "Весь склад" expands the row inline instead of navigating away. */
export function SquadShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [expanded, setExpanded] = useState(false);
  const list = expanded
    ? players
    : players.filter((p) => FEATURED.includes(p.number));

  return (
    <section id="squad" className="section overflow-hidden bg-paper">
      <div className="shell gutter">
        <SectionHeader index="02" label={dict.squad.label} title={dict.squad.title} />
      </div>

      <div className="mt-12 flex gap-0 overflow-x-auto pb-3 pl-[var(--gutter)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {list.map((p) => (
          <PlayerColumn key={p.id} p={p} locale={locale} dict={dict} />
        ))}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          data-cursor
          className="flex w-[46vw] shrink-0 items-center justify-center border-l border-ink-faint px-8 label text-ink-soft transition-colors hover:text-green sm:w-[220px]"
        >
          {expanded ? "Згорнути ↑" : `${dict.squad.all} →`}
        </button>
      </div>
      <p className="label mt-2 pl-[var(--gutter)] text-ink-soft">{dict.squad.hint}</p>
    </section>
  );
}

function PlayerColumn({ p, locale, dict }: { p: Player; locale: Locale; dict: Dictionary }) {
  const last = locale === "uk" ? p.last : p.lastEn;
  const first = locale === "uk" ? p.first : p.firstEn;
  const pos = dict.squad.positions[p.position];

  return (
    <div
      data-cursor
      className="group relative flex w-[62vw] shrink-0 flex-col border-l border-ink-faint sm:w-[280px]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-2">
        <Image
          src={p.photo}
          alt={`${first} ${last}`}
          fill
          sizes="(max-width: 640px) 62vw, 280px"
          className="tone-warm z-[1] object-cover object-top transition-[filter,transform] duration-500 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="font-display absolute -right-2 -top-1 z-[2] select-none text-[7.5rem] leading-none text-paper/85 transition-colors duration-500 group-hover:text-yellow/85"
        >
          {p.number}
        </span>
      </div>
      <div className="flex items-baseline justify-between border-t border-ink px-3 py-3">
        <span className="label text-ink-soft">
          {p.number} · {pos}
        </span>
      </div>
      <div className="px-3 pb-6">
        <span className="font-display block text-2xl leading-none text-ink">{last}</span>
        <span className="mt-1 block text-sm text-ink-soft">{first}</span>
      </div>
    </div>
  );
}
