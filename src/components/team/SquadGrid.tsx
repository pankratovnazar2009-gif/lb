import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { players, positionOrder } from "@/content/players";
import type { Player } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

export function SquadGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="shell gutter">
      {positionOrder.map((group) => {
        const list = players.filter((p) => p.position === group);
        if (!list.length) return null;
        return (
          <section key={group} className="border-t border-ink pt-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-ink md:text-3xl">
                {dict.squad.groups[group]}
              </h2>
              <span className="label text-ink-soft">{String(list.length).padStart(2, "0")}</span>
            </div>
            <div className="mt-8 mb-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {list.map((p, i) => (
                <Reveal key={p.id} delay={(i % 5) * 40}>
                  <PlayerCard p={p} locale={locale} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function PlayerCard({ p, locale }: { p: Player; locale: Locale }) {
  const last = locale === "uk" ? p.last : p.lastEn;
  const first = locale === "uk" ? p.first : p.firstEn;
  return (
    <div data-cursor className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
        <span
          aria-hidden
          className="font-display absolute right-1 top-0 z-0 text-[6rem] leading-none text-paper-3 transition-colors duration-500 group-hover:text-yellow/70"
        >
          {p.number}
        </span>
        <Image
          src={p.photo}
          alt={`${first} ${last}`}
          fill
          sizes="(max-width: 640px) 45vw, 20vw"
          className="z-[1] object-contain object-bottom mix-blend-darken grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 border-t border-ink pt-2">
        <span className="font-display block text-lg leading-none text-ink">{last}</span>
        <span className="mt-1 flex items-center justify-between text-xs text-ink-soft">
          <span>{first}</span>
          <span className="label">{p.country}</span>
        </span>
      </div>
    </div>
  );
}
