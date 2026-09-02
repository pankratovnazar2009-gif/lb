"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { nextMatch } from "@/content/matches";
import { club } from "@/content/club";
import { formatDate, formatTime, cn } from "@/lib/utils";

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number>(() => +new Date(iso) - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(+new Date(iso) - Date.now()), 60_000);
    return () => clearInterval(id);
  }, [iso]);
  const clamp = Math.max(0, left);
  return {
    d: Math.floor(clamp / 86_400_000),
    h: Math.floor((clamp % 86_400_000) / 3_600_000),
    m: Math.floor((clamp % 3_600_000) / 60_000),
  };
}

export function NextMatchCard({
  locale,
  dict,
  invert,
}: {
  locale: Locale;
  dict: Dictionary;
  invert?: boolean;
}) {
  const { d, h, m } = useCountdown(nextMatch.kickoff);
  const home = locale === "uk" ? nextMatch.home : nextMatch.homeEn;
  const away = locale === "uk" ? nextMatch.away : nextMatch.awayEn;
  const venue = locale === "uk" ? nextMatch.venue : nextMatch.venueEn;
  const round = locale === "uk" ? nextMatch.round : nextMatch.roundEn;

  return (
    <div
      data-cursor
      className={cn(
        "w-full max-w-[22rem] border p-4 backdrop-blur-sm",
        invert ? "border-white/20 bg-green-deep/40 text-on-green" : "border-ink bg-paper/70 text-ink",
      )}
    >
      <div className="flex items-center justify-between label">
        <span className={invert ? "text-yellow" : "text-green"}>{dict.nextMatch.label}</span>
        <span className={invert ? "text-on-green-soft" : "text-ink-soft"}>
          {dict.nextMatch.tournament.replace("5", round.replace(/\D/g, ""))}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <TeamSide name={home} />
        <span className="font-display text-xl opacity-40">×</span>
        <TeamSide name={away} align="right" />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="font-display flex gap-3 text-[1.65rem] leading-none sm:text-3xl">
          <Unit v={d} label={dict.nextMatch.countdownDays} />
          <Unit v={h} label={dict.nextMatch.countdownHours} />
          <Unit v={m} label={dict.nextMatch.countdownMin} />
        </div>
        <div className={cn("text-right label", invert ? "text-on-green-soft" : "text-ink-soft")}>
          {formatDate(nextMatch.kickoff, locale)}
          <br />
          {formatTime(nextMatch.kickoff, locale)}
        </div>
      </div>

      <p className={cn("mt-3 text-xs", invert ? "text-on-green-soft" : "text-ink-soft")}>{venue}</p>

      <a
        href={club.mainSiteUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "mt-4 inline-flex w-full items-center justify-center py-2.5 label transition-colors duration-200",
          invert
            ? "bg-yellow text-green-ink hover:bg-on-green"
            : "bg-green text-on-green hover:bg-green-ink",
        )}
      >
        {dict.nextMatch.tickets}
      </a>
    </div>
  );
}

function TeamSide({ name, align }: { name: string; align?: "right" }) {
  return (
    <div className={cn("flex min-w-0 flex-1 items-center gap-2", align === "right" && "flex-row-reverse text-right")}>
      <Image src="/brand/logo.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0 opacity-90" />
      <span className="font-display truncate text-lg leading-none">{name}</span>
    </div>
  );
}

function Unit({ v, label }: { v: number; label: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="tabular-nums">{String(v).padStart(2, "0")}</span>
      <span className="label mt-1 opacity-50">{label}</span>
    </span>
  );
}
