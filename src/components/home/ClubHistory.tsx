import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { club } from "@/content/club";
import { timeline } from "@/content/history";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";

export function ClubHistory({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = (uk: string, en: string) => (locale === "uk" ? uk : en);
  const stats = [
    [club.stats.founded, dict.club.founded],
    [club.stats.stadiums, dict.club.stadiums],
    ["1000+", dict.club.academyKids],
  ] as const;

  return (
    <section id="club" className="on-green relative overflow-hidden bg-green-deep text-on-green">
      <div className="section shell gutter relative">
        <SectionHeader invert index="04" label={dict.club.label} title={dict.club.title} link={{ href: club.mainSiteUrl, label: dict.club.history, external: true }} />

        <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-on-green/90">{dict.club.body}</p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map(([value, label]) => (
                <div key={label} className="border-t border-white/20 pt-3">
                  <span className="font-display block text-4xl leading-none text-yellow">{value}</span>
                  <span className="label mt-2 block text-on-green-soft">{label}</span>
                </div>
              ))}
            </div>
            <Image
              src="/brand/logo.png"
              alt=""
              width={520}
              height={520}
              aria-hidden
              className="pointer-events-none mt-12 h-[40vh] max-h-[440px] min-h-[240px] w-auto opacity-30 [filter:brightness(0)_invert(1)] lg:-ml-[6%] lg:mt-16 lg:h-[50vh]"
            />
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {timeline.map((entry, i) => (
              <Reveal as="li" key={`${entry.year}-${i}`} delay={i * 40}>
                <div className="flex gap-6 border-t border-white/15 py-5">
                  <span className="font-display w-16 shrink-0 text-xl text-on-green-soft">{entry.year}</span>
                  <div>
                    <MaskText
                      as="h3"
                      lines={[t(entry.title, entry.titleEn)]}
                      className="font-grotesk text-lg font-semibold text-on-green"
                    />
                    <p className="mt-1.5 max-w-md text-sm text-on-green/75">{t(entry.body, entry.bodyEn)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
