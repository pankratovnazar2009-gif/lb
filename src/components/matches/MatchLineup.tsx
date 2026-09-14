import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { players } from "@/content/players";
import type { Lineup } from "@/content/lineups";

const SLOTS: Array<[number, number]> = [
  [110, 288], // GK
  [30, 224], [77, 224], [143, 224], [190, 224], // DF
  [55, 150], [110, 150], [165, 150], // MF
  [55, 62], [110, 62], [165, 62], // FW
];

function nameFor(id: string, locale: Locale) {
  const p = players.find((pl) => pl.id === id);
  if (!p) return { last: id, number: "" };
  return { last: locale === "uk" ? p.last : p.lastEn, number: p.number };
}

export function MatchLineup({
  lineup,
  locale,
  dict,
}: {
  lineup: Lineup;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="mt-5 border-t border-ink-faint pt-5">
      <div className="flex items-baseline justify-between">
        <span className="label text-ink-soft">{dict.matches.startXI}</span>
        <span className="label text-ink-soft">{dict.matches.formation} · {lineup.formation}</span>
      </div>

      <svg viewBox="0 0 220 320" className="mx-auto mt-4 block w-full max-w-[220px]">
        <rect x="1" y="1" width="218" height="318" fill="var(--green)" fillOpacity="0.06" stroke="var(--ink-faint)" strokeWidth="1" />
        <line x1="1" y1="160" x2="219" y2="160" stroke="var(--ink-faint)" strokeWidth="1" />
        <circle cx="110" cy="160" r="28" fill="none" stroke="var(--ink-faint)" strokeWidth="1" />
        <rect x="55" y="1" width="110" height="46" fill="none" stroke="var(--ink-faint)" strokeWidth="1" />
        <rect x="55" y="273" width="110" height="46" fill="none" stroke="var(--ink-faint)" strokeWidth="1" />

        {lineup.startXI.map((id, i) => {
          const [x, y] = SLOTS[i] ?? [110, 160];
          const { last, number } = nameFor(id, locale);
          return (
            <g key={id}>
              <title>{last}</title>
              <circle cx={x} cy={y} r="15" fill="var(--green)" stroke="var(--paper)" strokeWidth="2" />
              <text x={x} y={y + 4.5} textAnchor="middle" className="font-mono" style={{ fill: "var(--on-green)", fontSize: "11px" }}>
                {number}
              </text>
              <text x={x} y={y + 27} textAnchor="middle" className="font-mono uppercase" style={{ fill: "var(--ink-soft)", fontSize: "7px" }}>
                {last.length > 10 ? `${last.slice(0, 9)}…` : last}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6">
        <span className="label text-ink-soft">{dict.matches.subs}</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {lineup.subs.map((id) => {
            const { last, number } = nameFor(id, locale);
            return (
              <span key={id} className="label flex items-center gap-1.5 border border-ink-faint px-2 py-1 text-ink-soft">
                <span className="tabular-nums text-ink">{number}</span>
                {last}
              </span>
            );
          })}
        </div>
      </div>

      {lineup.goals && lineup.goals.length > 0 && (
        <div className="mt-5">
          <span className="label text-ink-soft">{dict.matches.goals}</span>
          <ul className="mt-2 space-y-1">
            {lineup.goals.map((g, i) => {
              const { last } = nameFor(g.id, locale);
              return (
                <li key={i} className="flex items-center gap-2 text-sm text-ink">
                  <span aria-hidden>⚽</span>
                  <span className="font-medium">{last}</span>
                  <span className="label text-ink-soft">{g.minute}&apos;</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
