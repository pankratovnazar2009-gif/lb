import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { leagueTable, OUR_TEAM } from "@/content/table";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const UPL_URL = "https://upl.ua/ua/tournaments/championship";

export function LeagueTableBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.table.cols;

  return (
    <section id="table" className="section shell gutter">
      <SectionHeader
        index="04"
        label={dict.table.label}
        title={dict.table.title}
        link={{ href: UPL_URL, label: dict.table.full, external: true }}
      />

      <Reveal className="mt-12 max-w-3xl overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="label text-ink-soft">
              <th className="w-10 border-b border-ink py-3 text-left font-medium">{c.pos}</th>
              <th className="border-b border-ink py-3 text-left font-medium">{c.team}</th>
              {[c.played, c.win, c.draw, c.loss].map((h, i) => (
                <th key={i} className="w-12 border-b border-ink py-3 text-center font-medium">{h}</th>
              ))}
              <th className="w-14 border-b border-ink py-3 text-center font-medium">{c.points}</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {leagueTable.map((row) => {
              const us = row.team === OUR_TEAM;
              return (
                <tr
                  key={row.pos}
                  className={cn(
                    "border-b border-ink-faint transition-colors",
                    us ? "bg-yellow/15" : "hover:bg-paper-2",
                  )}
                >
                  <td className={cn("py-3 tabular-nums", us && "border-l-2 border-green pl-2 font-semibold")}>
                    {row.pos}
                  </td>
                  <td className="py-3">
                    <span className={cn("font-grotesk", us ? "font-semibold text-green" : "text-ink")}>
                      {locale === "uk" ? row.team : row.teamEn}
                    </span>
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
      </Reveal>
      <p className="label mt-4 text-ink-soft">{dict.table.season}</p>
    </section>
  );
}
