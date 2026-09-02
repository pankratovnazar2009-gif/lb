import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/home/Hero";
import { LatestNews } from "@/components/home/LatestNews";
import { MatchesRibbon } from "@/components/home/MatchesRibbon";
import { SquadShowcase } from "@/components/home/SquadShowcase";
import { LeagueTableBlock } from "@/components/home/LeagueTableBlock";
import { ClubHistory } from "@/components/home/ClubHistory";
import { MediaStrip } from "@/components/home/MediaStrip";
import { AcademyCta } from "@/components/home/AcademyCta";
import { SocialMarquee } from "@/components/home/SocialMarquee";

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
      <SocialMarquee dict={dict} />
      <LatestNews locale={l} dict={dict} />
      <MatchesRibbon locale={l} dict={dict} />
      <SquadShowcase locale={l} dict={dict} />
      <LeagueTableBlock locale={l} dict={dict} />
      <ClubHistory locale={l} dict={dict} />
      <MediaStrip locale={l} dict={dict} />
      <AcademyCta locale={l} dict={dict} />
    </>
  );
}
