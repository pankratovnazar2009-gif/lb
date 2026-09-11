import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { staff } from "@/content/staff";
import { Reveal } from "@/components/ui/Reveal";

export function StaffRow({ locale }: { locale: Locale; dict: Dictionary }) {
  const [head, ...rest] = staff;
  return (
    <div className="shell gutter section !pt-0">
      <div className="border-t border-ink pt-6">
        <h2 className="font-display text-2xl text-ink md:text-3xl">
          {locale === "uk" ? "Тренерський штаб" : "Coaching staff"}
        </h2>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
              <Image src={head.photo} alt={head.name} fill sizes="40vw" className="tone-warm object-cover object-top" />
            </div>
            <p className="label mt-3 text-green">{locale === "uk" ? head.role : head.roleEn}</p>
            <p className="font-display mt-1 text-3xl text-ink">{locale === "uk" ? head.name : head.nameEn}</p>
          </Reveal>

          {rest.map((m, i) => (
            <Reveal key={m.id} delay={i * 40}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-2">
                <Image src={m.photo} alt={m.name} fill sizes="20vw" className="tone-warm object-cover object-top transition duration-500" />
              </div>
              <p className="mt-2 border-t border-ink pt-2 text-sm font-medium text-ink">
                {locale === "uk" ? m.name : m.nameEn}
              </p>
              <p className="label text-ink-soft">{locale === "uk" ? m.role : m.roleEn}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
