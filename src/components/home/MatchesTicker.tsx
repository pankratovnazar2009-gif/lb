"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { results, fixtures } from "@/content/matches";
import type { Match } from "@/content/types";
import { crestFor } from "@/lib/crest";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { formatDate, formatTime, cn, localeHref } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";

const US = ["Лівий Берег", "Livyi Bereh"];

/** Auto-scrolling results + fixtures strip that lives at the foot of the hero.
 *  Runs on its own, pauses on hover/focus, stays grab-scrollable. */
export function MatchesTicker({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const list: Match[] = [...results.slice().reverse(), ...fixtures];
  const track = useAutoScroll<HTMLDivElement>();

  return (
    <div id="matches" className="relative z-[2] mt-auto w-full border-t border-ink bg-paper">
      <div className="gutter flex items-center justify-between pt-4">
        <span className="label text-ink-soft">{dict.matches.label}</span>
        <span className="text-ink">
          <ArrowLink href={localeHref("/matchi", locale)}>{dict.matches.full}</ArrowLink>
        </span>
      </div>
      <div
        ref={track}
        className="mt-3 flex gap-3 overflow-x-auto pb-5 pl-[var(--gutter)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...list, ...list].map((m, i) => (
          <MatchCard key={`${m.id}-${i}`} m={m} locale={locale} dict={dict} />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ m, locale, dict }: { m: Match; locale: Locale; dict: Dictionary }) {
  const home = locale === "uk" ? m.home : m.homeEn;
  const away = locale === "uk" ? m.away : m.awayEn;
  const round = locale === "uk" ? m.round : m.roundEn;
  const isResult = m.status === "result";

  return (
    <article className="flex w-[236px] shrink-0 flex-col gap-3 border border-ink-faint p-4">
      <div className="flex items-center justify-between label text-ink-soft">
        <span>{round}</span>
        <span className={isResult ? "text-ink-soft" : "text-green"}>
          {isResult
            ? formatDate(m.kickoff, locale)
            : `${formatDate(m.kickoff, locale)} · ${formatTime(m.kickoff, locale)}`}
        </span>
      </div>
      <div className="space-y-2">
        <Row name={home} score={m.score?.[0]} isUs={US.includes(m.home)} showScore={isResult} />
        <Row name={away} score={m.score?.[1]} isUs={US.includes(m.away)} showScore={isResult} />
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
    <div className="flex items-center gap-2.5">
      <Image
        src={crestFor(name)}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
      />
      <span
        className={cn(
          "font-display flex-1 truncate text-base leading-none",
          isUs ? "text-green" : "text-ink",
        )}
      >
        {name}
      </span>
      {showScore && (
        <span className="font-display text-xl leading-none tabular-nums text-ink">{score ?? "–"}</span>
      )}
    </div>
  );
}
