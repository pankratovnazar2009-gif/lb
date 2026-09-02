import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { news } from "@/content/news";
import { club } from "@/content/club";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export function LatestNews({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [lead, ...rest] = news;
  const t = (uk: string, en: string) => (locale === "uk" ? uk : en);

  return (
    <section id="news" className="section shell gutter">
      <SectionHeader
        index="01"
        label={dict.news.label}
        title={dict.news.title}
        link={{ href: club.mainSiteUrl, label: dict.news.all, external: true }}
      />

      <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-12">
        {/* lead */}
        <Reveal className="lg:col-span-7">
          <Link href={club.mainSiteUrl} target="_blank" rel="noreferrer" className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2">
              {lead.image ? (
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
              ) : (
                <span className="font-display absolute -bottom-4 left-2 text-[9rem] leading-none text-paper-3">
                  LB
                </span>
              )}
              <span className="label absolute left-4 top-4 bg-yellow px-2 py-1 text-green-ink">
                {lead.category}
              </span>
            </div>
            <p className="label mt-5 text-ink-soft">{formatDate(lead.date, locale)}</p>
            <h3 className="mt-3 max-w-2xl font-display text-2xl text-ink transition-colors group-hover:text-green md:text-4xl">
              {t(lead.title, lead.titleEn)}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-ink-soft">{t(lead.excerpt, lead.excerptEn)}</p>
          </Link>
        </Reveal>

        {/* rows */}
        <ul className="lg:col-span-5">
          {rest.slice(0, 6).map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 45}>
              <Link
                href={club.mainSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 border-t border-ink-faint py-5 first:border-transparent"
              >
                <span className="label w-10 shrink-0 pt-1 text-ink-soft">{item.category}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-grotesk text-base font-medium leading-snug text-ink transition-colors group-hover:text-green md:text-lg">
                    {t(item.title, item.titleEn)}
                  </span>
                  <span className="label mt-2 block text-ink-soft">{formatDate(item.date, locale)}</span>
                </span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="mt-1.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
