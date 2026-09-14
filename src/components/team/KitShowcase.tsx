import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { kits, type Kit } from "@/content/kits";
import { club } from "@/content/club";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";

/** Kit sets ("комплекти, в яких грають") — home/away/third jerseys, at the
 *  foot of /komanda. Illustrated in flat brand colour, since no product
 *  photography from fclb-shop.com is wired into the content yet. */
export function KitShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="shell gutter section !pt-0">
      <div className="border-t border-ink pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">{dict.kits.title}</h2>
            <p className="label mt-2 text-ink-soft">{dict.kits.caption}</p>
          </div>
          <ArrowLink href={club.shopUrl} external>
            {dict.kits.shopCta}
          </ArrowLink>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-3">
        {kits.map((kit, i) => (
          <Reveal key={kit.id} delay={i * 60}>
            <KitCard kit={kit} locale={locale} />
          </Reveal>
        ))}
        </div>
      </div>
    </div>
  );
}

function KitCard({ kit, locale }: { kit: Kit; locale: Locale }) {
  const name = locale === "uk" ? kit.name : kit.nameEn;
  const body = locale === "uk" ? kit.body : kit.bodyEn;
  const needsOutline = kit.colors.shirt === "var(--paper)";

  return (
    <div data-cursor className="group">
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-paper-2">
        <JerseySvg
          shirt={kit.colors.shirt}
          trim={kit.colors.trim}
          sleeve={kit.colors.sleeve}
          number={kit.number}
          outline={needsOutline}
        />
      </div>
      <div className="mt-3 border-t border-ink pt-2">
        <span className="font-display block text-xl leading-none text-ink">{name}</span>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
      </div>
    </div>
  );
}

function JerseySvg({
  shirt,
  trim,
  sleeve,
  number,
  outline,
}: {
  shirt: string;
  trim: string;
  sleeve: string;
  number: number;
  outline?: boolean;
}) {
  const stroke = outline ? "var(--ink-faint)" : "none";
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[62%] w-[62%] transition-transform duration-500 group-hover:scale-[1.04]"
      aria-hidden
    >
      {/* sleeves */}
      <path
        d="M62 22 12 46 26 92 62 74 Z"
        fill={sleeve}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M138 22 188 46 174 92 138 74 Z"
        fill={sleeve}
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* body */}
      <path
        d="M62 22 C 74 32 126 32 138 22 L 150 40 L 150 178 L 50 178 L 50 40 Z"
        fill={shirt}
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* collar */}
      <path d="M80 20 Q 100 36 120 20 L 112 14 Q 100 22 88 14 Z" fill={trim} />
      {/* trim: cuffs + hem */}
      <rect x="46" y="70" width="18" height="8" fill={trim} transform="rotate(-18 55 74)" />
      <rect x="136" y="70" width="18" height="8" fill={trim} transform="rotate(18 145 74)" />
      <rect x="50" y="170" width="100" height="8" fill={trim} />
      <text
        x="100"
        y="128"
        textAnchor="middle"
        className="font-display"
        style={{ fill: trim, fontSize: "46px" }}
      >
        {number}
      </text>
    </svg>
  );
}
