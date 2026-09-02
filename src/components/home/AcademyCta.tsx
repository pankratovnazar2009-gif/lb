import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { club } from "@/content/club";
import { MaskText } from "@/components/ui/MaskText";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function AcademyCta({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="academy" className="section shell gutter">
      <div className="border-t border-ink pt-10">
        <p className="label text-ink-soft">{dict.academy.label} / 07</p>
        <MaskText
          as="h2"
          lines={[dict.academy.title]}
          className="font-display mt-6 max-w-[14ch] text-display leading-[0.92] text-ink md:text-hero"
        />
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{dict.academy.body}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-ink">
            <a
              href={`${club.mainSiteUrl}akademiya/zapys-na-pereglyad/`}
              target="_blank"
              rel="noreferrer"
              className="bg-green px-6 py-3.5 label text-on-green transition-colors duration-200 hover:bg-green-ink"
            >
              {dict.academy.cta}
            </a>
            <ArrowLink href={`${club.mainSiteUrl}akademiya/`} external>
              {dict.academy.more}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
