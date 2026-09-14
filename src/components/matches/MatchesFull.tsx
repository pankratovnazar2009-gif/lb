"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Match } from "@/content/types";
import { liveMatches } from "@/lib/matchStatus";
import { lineupFor } from "@/content/lineups";
import { players } from "@/content/players";
import { crestFor } from "@/lib/crest";
import { Reveal } from "@/components/ui/Reveal";
import { MatchLineup } from "./MatchLineup";
import { formatDate, formatTime, cn } from "@/lib/utils";

const US = ["Лівий Берег", "Livyi Bereh"];
type Side = "all" | "home" | "away";

/** Full results + fixtures grid for the dedicated schedule page, with a
 *  home/away filter and an expandable "склад на матч" for results. */
export function MatchesFull({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [side, setSide] = useState<Side>("all");
  const { results, fixtures } = liveMatches();

  const bySide = (m: Match) => {
    if (side === "all") return true;
    return side === "home" ? US.includes(m.home) : US.includes(m.away);
  };

  const filteredFixtures = fixtures.filter(bySide);
  const filteredResults = results.filter(bySide);

  return (
    <div className="shell gutter">
      <div className="flex flex-wrap items-center gap-2 border-t border-ink pt-6">
        <span className="label mr-2 text-ink-soft">{dict.matches.label}:</span>
        {(["all", "home", "away"] as Side[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={cn(
              "label border px-3.5 py-1.5 transition-colors duration-200",
              side === s
                ? "border-green bg-green text-on-green"
                : "border-ink-faint text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {s === "all" ? dict.matches.filterAll : s === "home" ? dict.matches.filterHome : dict.matches.filterAway}
          </button>
        ))}
      </div>

      <Group title={dict.matches.fixtures} matches={filteredFixtures} locale={locale} dict={dict} />
      <Group title={dict.matches.results} matches={filteredResults} locale={locale} dict={dict} />
    </div>
  );
}

function Group({
  title,
  matches,
  locale,
  dict,
}: {
  title: string;
  matches: Match[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (!matches.length) return null;
  return (
    <section className="border-t border-ink pt-6 pb-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-ink md:text-3xl">{title}</h2>
        <span className="label text-ink-soft">{String(matches.length).padStart(2, "0")}</span>
      </div>
      <div className="mt-8 mb-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m, i) => (
          <Reveal key={m.id} delay={(i % 6) * 40}>
            <MatchCard m={m} locale={locale} dict={dict} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MatchCard({ m, locale, dict }: { m: Match; locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const home = locale === "uk" ? m.home : m.homeEn;
  const away = locale === "uk" ? m.away : m.awayEn;
  const venue = locale === "uk" ? m.venue : m.venueEn;
  const round = locale === "uk" ? m.round : m.roundEn;
  const isResult = m.status === "result";
  const lineup = isResult ? lineupFor(m.id) : undefined;

  const usIsHome = US.includes(m.home);
  const usScore = m.score ? (usIsHome ? m.score[0] : m.score[1]) : undefined;
  const themScore = m.score ? (usIsHome ? m.score[1] : m.score[0]) : undefined;
  const outcome = usScore != null && themScore != null ? (usScore > themScore ? "W" : usScore < themScore ? "L" : "D") : undefined;
  const outcomeStyle =
    outcome === "W" ? "bg-green text-on-green" : outcome === "L" ? "bg-ink-faint text-ink" : "border border-ink text-ink";

  return (
    <article className="border border-ink-faint p-5">
      <div className="flex items-center justify-between label text-ink-soft">
        <span>{round}</span>
        <span className="flex items-center gap-2">
          {isResult && outcome && (
            <span className={cn("flex h-5 w-5 items-center justify-center text-[10px]", outcomeStyle)}>
              {outcome}
            </span>
          )}
          <span className={isResult ? "text-ink-soft" : "text-green"}>
            {isResult ? dict.matches.ft : dict.matches.upcoming}
          </span>
        </span>
      </div>
      <div className="my-5 space-y-3">
        <Row name={home} score={m.score?.[0]} isUs={US.includes(m.home)} showScore={isResult} />
        <Row name={away} score={m.score?.[1]} isUs={US.includes(m.away)} showScore={isResult} />
      </div>
      {isResult && lineup?.goals && lineup.goals.length > 0 && (
        <p className="label mb-4 flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
          {lineup.goals.map((g, i) => {
            const p = players.find((pl) => pl.id === g.id);
            const name = p ? (locale === "uk" ? p.last : p.lastEn) : g.id;
            return (
              <span key={i}>
                ⚽ {name} {g.minute}&apos;
              </span>
            );
          })}
        </p>
      )}
      <div className="label text-ink-soft">
        {isResult ? (
          formatDate(m.kickoff, locale)
        ) : (
          <span className="text-ink">
            {formatDate(m.kickoff, locale)} · {formatTime(m.kickoff, locale)}
          </span>
        )}
        <span className="mt-1 block truncate">{venue}</span>
      </div>

      {lineup && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label mt-5 flex w-full items-center justify-between border-t border-ink pt-3 text-ink transition-colors hover:text-green"
          >
            <span>{open ? dict.matches.lineupHide : dict.matches.lineup}</span>
            <span aria-hidden className={cn("transition-transform duration-300", open && "rotate-180")}>▾</span>
          </button>
          {open && <MatchLineup lineup={lineup} locale={locale} dict={dict} />}
        </>
      )}
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
      <Image src={crestFor(name)} alt="" width={24} height={24} className="h-6 w-6 shrink-0 object-contain" />
      <span
        className={cn(
          "font-display flex-1 truncate text-lg leading-none",
          isUs ? "text-green" : "text-ink",
        )}
      >
        {name}
      </span>
      {showScore && (
        <span className="font-display text-2xl leading-none tabular-nums text-ink">{score ?? "–"}</span>
      )}
    </div>
  );
}
