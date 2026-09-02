import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageIntro } from "@/components/ui/PageIntro";
import { SquadGrid } from "@/components/team/SquadGrid";
import { StaffRow } from "@/components/team/StaffRow";

export default async function TeamPage({
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
      <PageIntro
        label={`${dict.nav.team} · ${dict.squad.label}`}
        title={dict.squad.title}
        lead={dict.hero.tagline}
      />
      <SquadGrid locale={l} dict={dict} />
      <StaffRow locale={l} dict={dict} />
    </>
  );
}
