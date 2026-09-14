import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { leagueTable, OUR_TEAM } from "@/content/table";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Zone colour for a table position, matching the UPL reference site:
 *  1 → Champions League, 2–3 → Europa/Conference League qualification,
 *  13–14 → promotion/relegation play-off, 15–16 → relegation. */
function zoneColor(pos: number): string | null {
  if (pos === 1) return "#3b6fd8";
  if (pos <= 3) return "#8a3552";
  if (pos <= 12) return null;
  if (pos <= 14) return "#c9820f";
  return "#c0392b";
}

export function LeagueTableBlock({
  locale,
  dict,
  index = "03",
}: {
  locale: Locale;
  dict: Dictionary;
  index?: string;
}) {
  const c = dict.table.cols;
  const legend = [
    { color: "#3b6fd8", label: dict.table.zoneUcl },
    { color: "#8a3552", label: dict.table.zoneUel },
    { color: "#c9820f", label: dict.table.zonePlayoff },
    { color: "#c0392b", label: dict.table.zoneRelegation },
  ];

  return (
    <section id="table" className="section shell gutter">
      <SectionHeader index={index} label={dict.table.label} title={dict.table.title} />

      <Reveal className="mx-auto mt-12 max-w-3xl overflow-x-auto">
        <table className="w-full min-w-[540px] border-collapse">
          <thead>
            <tr className="label text-ink-soft">
              <th className="w-8 border-b border-ink py-3 text-left font-medium">{c.pos}</th>
              <th className="border-b border-ink py-3 pl-2 text-left font-medium">{c.team}</th>
              {[c.played, c.win, c.draw, c.loss].map((h, i) => (
                <th key={i} className="w-11 border-b border-ink py-3 text-center font-medium">{h}</th>
              ))}
              <th className="w-14 border-b border-ink py-3 text-center font-medium">{c.points}</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {leagueTable.map((row) => {
              const us = row.team === OUR_TEAM;
              const zone = zoneColor(row.pos);
              return (
                <tr
                  key={row.pos}
                  className={cn(
                    "border-b border-ink-faint transition-colors",
                    us ? "bg-yellow/15" : "hover:bg-paper-2",
                  )}
                >
                  <td className={cn("py-3 pl-2 tabular-nums", us && "font-semibold")}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-3 w-[3px] shrink-0"
                        style={{ backgroundColor: zone ?? "transparent" }}
                      />
                      {row.pos}
                    </span>
                  </td>
                  <td className="py-2.5 pl-2">
                    <a
                      href={row.site}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2.5"
                    >
                      <Image
                        src={`/upl/${row.slug}.png`}
                        alt=""
                        width={22}
                        height={22}
                        className="h-[22px] w-[22px] shrink-0 object-contain"
                      />
                      <span
                        className={cn(
                          "font-grotesk group-hover:underline",
                          us ? "font-semibold text-green" : "text-ink",
                        )}
                      >
                        {locale === "uk" ? row.team : row.teamEn}
                      </span>
                    </a>
                  </td>
                  <td className="py-3 text-center tabular-nums text-ink-soft">{row.played}</td>
                  <td className="py-3 text-center tabular-nums text-ink-soft">{row.win}</td>
                  <td className="py-3 text-center tabular-nums text-ink-soft">{row.draw}</td>
                  <td className="py-3 text-center tabular-nums text-ink-soft">{row.loss}</td>
                  <td className={cn("py-3 text-center tabular-nums font-semibold", us ? "text-green" : "text-ink")}>
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ul className="label mt-5 space-y-2 text-ink-soft">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2.5">
              <span aria-hidden className="h-3 w-[3px] shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </li>
          ))}
        </ul>
        <p className="label mt-4 text-ink-soft">{dict.table.season}</p>
      </Reveal>
    </section>
  );
}
