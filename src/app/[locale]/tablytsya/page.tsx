import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageIntro } from "@/components/ui/PageIntro";
import { LeagueTableBlock } from "@/components/home/LeagueTableBlock";

export default async function TablePage({
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
      <PageIntro locale={l} backHome={dict.nav.backHome} label={dict.table.label} title={dict.table.title} />
      <LeagueTableBlock locale={l} dict={dict} index="01" />
    </>
  );
}
