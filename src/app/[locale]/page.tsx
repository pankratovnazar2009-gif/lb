import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/home/Hero";
import { LatestNews } from "@/components/home/LatestNews";
import { SquadShowcase } from "@/components/home/SquadShowcase";
import { LeagueTableBlock } from "@/components/home/LeagueTableBlock";
import { ClubHistory } from "@/components/home/ClubHistory";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <>
      <Hero locale={l} dict={dict} />
      <LatestNews locale={l} dict={dict} />
      <SquadShowcase locale={l} dict={dict} />
      <LeagueTableBlock locale={l} dict={dict} />
      <ClubHistory locale={l} dict={dict} />
    </>
  );
}
