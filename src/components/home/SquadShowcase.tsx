import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { players } from "@/content/players";
import type { Player } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { localeHref, cn } from "@/lib/utils";

/** Signature block: cutout portraits over paper, huge numerals, grayscale → colour. */
export function SquadShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = players.filter((p) => [10, 9, 7, 8, 44, 20, 6, 11, 21, 5, 17, 74].includes(p.number));

  return (
    <section id="squad" className="section overflow-hidden">
      <div className="shell gutter">
        <SectionHeader
          index="03"
          label={dict.squad.label}
          title={dict.squad.title}
          link={{ href: localeHref("/komanda", locale), label: dict.squad.all }}
        />
      </div>

      <div className="mt-12 flex gap-0 overflow-x-auto pb-3 pl-[var(--gutter)] [scrollbar-width:thin]">
        {featured.map((p) => (
          <PlayerColumn key={p.id} p={p} locale={locale} dict={dict} />
        ))}
        <Link
          href={localeHref("/komanda", locale)}
          className="flex w-[42vw] shrink-0 items-center justify-center border-l border-ink-faint px-8 sm:w-[220px]"
        >
          <span className="label text-ink-soft">{dict.squad.all} →</span>
        </Link>
      </div>
      <p className="label mt-2 pl-[var(--gutter)] text-ink-soft">{dict.squad.hint}</p>
    </section>
  );
}

function PlayerColumn({ p, locale, dict }: { p: Player; locale: Locale; dict: Dictionary }) {
  const last = locale === "uk" ? p.last : p.lastEn;
  const first = locale === "uk" ? p.first : p.firstEn;
  const pos = dict.squad.positions[p.position];

  return (
    <Link
      href={localeHref("/komanda", locale)}
      data-cursor
      className="group relative flex w-[64vw] shrink-0 flex-col border-l border-ink-faint sm:w-[300px]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <span
          aria-hidden
          className={cn(
            "font-display absolute -right-2 top-1 z-0 select-none text-[11rem] leading-none text-paper-3",
            "transition-colors duration-500 group-hover:text-yellow/70",
          )}
        >
          {p.number}
        </span>
        <Image
          src={p.photo}
          alt={`${first} ${last}`}
          fill
          sizes="(max-width: 640px) 64vw, 300px"
          className="z-[1] object-contain object-bottom mix-blend-darken grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
      </div>
      <div className="relative z-[2] flex items-baseline justify-between border-t border-ink px-3 py-3">
        <span className="label text-ink-soft">
          {p.number} · {pos}
        </span>
      </div>
      <div className="px-3 pb-6">
        <span className="font-display block text-2xl leading-none text-ink">{last}</span>
        <span className="mt-1 block text-sm text-ink-soft">{first}</span>
      </div>
    </Link>
  );
}
