import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { news } from "@/content/news";
import { club } from "@/content/club";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const t = (uk: string, en: string) => (l === "uk" ? uk : en);

  return (
    <>
      <PageIntro locale={l} backHome={dict.nav.backHome} label={dict.news.label} title={dict.news.title} />

      <div className="shell gutter section !pt-0">
        <ul className="border-t border-ink">
          {news.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 6) * 40}>
              <Link
                href={club.mainSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-1 gap-4 border-b border-ink-faint py-7 md:grid-cols-[120px_1fr_auto] md:items-center md:gap-8"
              >
                <span className="label text-ink-soft">
                  {formatDate(item.date, l)}
                </span>
                <span className="min-w-0">
                  <span className="label mb-2 block text-green">{item.category}</span>
                  <span className="block max-w-2xl font-display text-xl leading-tight text-ink transition-colors group-hover:text-green md:text-2xl">
                    {t(item.title, item.titleEn)}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm text-ink-soft">
                    {t(item.excerpt, item.excerptEn)}
                  </span>
                </span>
                {item.image && (
                  <span className="relative hidden h-20 w-32 shrink-0 overflow-hidden bg-paper-2 md:block">
                    <Image src={item.image} alt="" fill sizes="128px" className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
