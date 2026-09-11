import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { results, fixtures } from "@/content/matches";
import type { Match } from "@/content/types";
import { crestFor } from "@/lib/crest";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, formatTime, cn } from "@/lib/utils";

const US = ["Лівий Берег", "Livyi Bereh"];

/** Full results + fixtures grid for the dedicated /matchi page. */
export function MatchesFull({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="shell gutter">
      <Group title={dict.matches.fixtures} matches={fixtures} locale={locale} dict={dict} />
      <Group title={dict.matches.results} matches={[...results].reverse()} locale={locale} dict={dict} />
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
  const home = locale === "uk" ? m.home : m.homeEn;
  const away = locale === "uk" ? m.away : m.awayEn;
  const venue = locale === "uk" ? m.venue : m.venueEn;
  const round = locale === "uk" ? m.round : m.roundEn;
  const isResult = m.status === "result";

  return (
    <article className="border border-ink-faint p-5">
      <div className="flex items-center justify-between label text-ink-soft">
        <span>{round}</span>
        <span className={isResult ? "text-ink-soft" : "text-green"}>
          {isResult ? dict.matches.ft : dict.matches.upcoming}
        </span>
      </div>
      <div className="my-5 space-y-3">
        <Row name={home} score={m.score?.[0]} isUs={US.includes(m.home)} showScore={isResult} />
        <Row name={away} score={m.score?.[1]} isUs={US.includes(m.away)} showScore={isResult} />
      </div>
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
