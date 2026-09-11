import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageIntro } from "@/components/ui/PageIntro";
import { MatchesFull } from "@/components/matches/MatchesFull";
import { LeagueTableBlock } from "@/components/home/LeagueTableBlock";

export default async function MatchesPage({
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
      <PageIntro label={dict.matches.label} title={dict.matches.title} />
      <MatchesFull locale={l} dict={dict} />
      <LeagueTableBlock locale={l} dict={dict} index="01" />
    </>
  );
}
