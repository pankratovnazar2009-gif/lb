import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { club } from "@/content/club";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const YT = "https://www.youtube.com/@fclbkyiv";

type Tile = {
  kind: "video" | "photo";
  title: string;
  titleEn: string;
  href: string;
  image: string;
  /** true = fill the frame (photo already has a scene); false = studio cutout on paper */
  cover?: boolean;
};

const tiles: Tile[] = [
  { kind: "video", title: "«Зоря» — «Лівий Берег». Огляд матчу", titleEn: "Zorya vs Livyi Bereh. Highlights", href: YT, image: "/media/matchday-upl.jpg", cover: true },
  { kind: "photo", title: "Портретна зйомка першої команди", titleEn: "First-team portrait shoot", href: club.mainSiteUrl, image: "/players/9-florentcio.jpg" },
  { kind: "video", title: "Рябоконь — про підготовку до туру", titleEn: "Ryabokon on preparing for the round", href: YT, image: "/coaches/ryabokon.jpg", cover: true },
  { kind: "photo", title: "Захисна лінія «лелек»", titleEn: "The Storks' back line", href: club.mainSiteUrl, image: "/players/6-santos.jpg" },
];

export function MediaStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = (uk: string, en: string) => (locale === "uk" ? uk : en);

  return (
    <section id="media" className="section shell gutter">
      <SectionHeader index="06" label={dict.media.label} title={dict.media.title} link={{ href: YT, label: dict.media.all, external: true }} />

      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Reveal key={i} delay={i * 50}>
            <a href={tile.href} target="_blank" rel="noreferrer" className="group block">
              <div className={cn("relative aspect-[4/5] w-full overflow-hidden", tile.cover ? "bg-green" : "bg-paper-2")}>
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className={cn(
                    "grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]",
                    tile.cover ? "object-cover" : "object-contain object-bottom mix-blend-darken",
                  )}
                />
                {tile.kind === "video" && (
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/70 bg-green-ink/30 text-paper backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
                        <path d="M0 0l12 7-12 7z" />
                      </svg>
                    </span>
                  </span>
                )}
                <span className="label absolute left-3 top-3 bg-paper px-2 py-1 text-green-ink">
                  {tile.kind === "video" ? dict.media.video : dict.media.photo}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-green">
                {t(tile.title, tile.titleEn)}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
