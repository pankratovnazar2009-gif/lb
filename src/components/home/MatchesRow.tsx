"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { results, fixtures } from "@/content/matches";
import type { Match } from "@/content/types";
import { club } from "@/content/club";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { formatDate, formatTime, cn } from "@/lib/utils";

const US = ["Лівий Берег", "Livyi Bereh"];

export function MatchesRow({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const list: Match[] = [...results.slice().reverse(), ...fixtures];
  const track = useAutoScroll<HTMLDivElement>();

  return (
    <section id="matches" className="on-green bg-green text-on-green">
      <div className="section shell gutter !pb-10">
        <SectionHeader
          invert
          index="01"
          label={dict.matches.label}
          title={dict.matches.title}
          link={{ href: club.mainSiteUrl, label: dict.matches.full, external: true }}
        />
      </div>

      <div
        ref={track}
        className="flex gap-4 overflow-x-auto pb-12 pl-[var(--gutter)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...list, ...list].map((m, i) => (
          <MatchCard key={`${m.id}-${i}`} m={m} locale={locale} dict={dict} />
        ))}
      </div>
    </section>
  );
}

function MatchCard({ m, locale, dict }: { m: Match; locale: Locale; dict: Dictionary }) {
  const home = locale === "uk" ? m.home : m.homeEn;
  const away = locale === "uk" ? m.away : m.awayEn;
  const venue = locale === "uk" ? m.venue : m.venueEn;
  const round = locale === "uk" ? m.round : m.roundEn;
  const isResult = m.status === "result";

  return (
    <article className="flex w-[266px] shrink-0 flex-col justify-between border border-white/20 p-5 sm:w-[300px]">
      <div className="flex items-center justify-between label text-on-green-soft">
        <span>{round}</span>
        <span className={isResult ? "text-on-green-soft" : "text-yellow"}>
          {isResult ? dict.matches.ft : dict.matches.upcoming}
        </span>
      </div>

      <div className="my-6 space-y-3">
        <Row name={home} score={m.score?.[0]} isUs={US.includes(m.home)} showScore={isResult} />
        <Row name={away} score={m.score?.[1]} isUs={US.includes(m.away)} showScore={isResult} />
      </div>

      <div className="label text-on-green-soft">
        {isResult ? (
          formatDate(m.kickoff, locale)
        ) : (
          <span className="text-on-green">
            {formatDate(m.kickoff, locale)} · {formatTime(m.kickoff, locale)}
          </span>
        )}
        <span className="mt-1 block truncate">{venue}</span>
      </div>
    </article>
  );
}

function Row({
  name,
  score,
  isUs,
  showScore,
}: {
  name: string;
  score?: number;
  isUs: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Image src="/brand/logo.png" alt="" width={22} height={22} className="h-5 w-5 shrink-0 opacity-90" />
      <span
        className={cn(
          "font-display flex-1 truncate text-lg leading-none",
          isUs ? "text-yellow" : "text-on-green",
        )}
      >
        {name}
      </span>
      {showScore && (
        <span className="font-display text-2xl leading-none tabular-nums">{score ?? "–"}</span>
      )}
    </div>
  );
}
