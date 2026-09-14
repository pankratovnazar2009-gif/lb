import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/utils";
import { MaskText } from "./MaskText";

export function PageIntro({
  locale,
  backHome,
  label,
  title,
  lead,
}: {
  locale: Locale;
  backHome: string;
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="shell gutter pb-12 pt-24 md:pt-32">
      <Link
        href={localeHref("/", locale)}
        className="group label inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-green"
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
          <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="ul">{backHome}</span>
      </Link>
      <p className="label mt-6 text-ink-soft">{label}</p>
      <MaskText
        as="h1"
        lines={[title]}
        className="font-display-xl mt-4 text-[16vw] leading-[0.86] text-ink md:text-[10rem]"
      />
      {lead && <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">{lead}</p>}
    </header>
  );
}
