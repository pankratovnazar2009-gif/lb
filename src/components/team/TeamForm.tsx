import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { results } from "@/content/matches";
import type { Match } from "@/content/types";
import { formatDate, cn } from "@/lib/utils";

type Outcome = "W" | "D" | "L";

function outcomeFor(m: Match): Outcome {
  if (!m.score) return "D";
  const isHome = m.home === "Лівий Берег";
  const us = isHome ? m.score[0] : m.score[1];
  const them = isHome ? m.score[1] : m.score[0];
  if (us > them) return "W";
  if (us < them) return "L";
  return "D";
}

const STYLE: Record<Outcome, string> = {
  W: "bg-green text-on-green",
  D: "border border-ink text-ink",
  L: "bg-ink-faint text-ink",
};

export function TeamForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const last = results.slice(-4);
  const label: Record<Outcome, string> = {
    W: dict.squad.formWin,
    D: dict.squad.formDraw,
    L: dict.squad.formLoss,
  };

  return (
    <div className="shell gutter border-t border-ink pt-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink md:text-3xl">{dict.squad.form}</h2>
          <p className="label mt-2 text-ink-soft">{dict.squad.formCaption}</p>
        </div>
        <div className="flex gap-2">
          {last.map((m) => {
            const o = outcomeFor(m);
            const opponent = locale === "uk" ? (m.home === "Лівий Берег" ? m.away : m.home) : (m.homeEn === "Livyi Bereh" ? m.awayEn : m.homeEn);
            return (
              <span
                key={m.id}
                title={`${opponent} · ${formatDate(m.kickoff, locale)} · ${label[o]}`}
                className={cn(
                  "font-display flex h-11 w-11 shrink-0 items-center justify-center text-lg",
                  STYLE[o],
                )}
              >
                {o}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
