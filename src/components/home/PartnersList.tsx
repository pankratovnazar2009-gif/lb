import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { club } from "@/content/club";

/**
 * Compact partner wordmarks — colourless by design. Sits under the club
 * crest inside the "Клуб" section. Renders /public/partners/<file> if a
 * `logo` is set on an entry, otherwise falls back to the wordmark.
 */
export function PartnersList({ dict }: { dict: Dictionary }) {
  return (
    <div className="mt-10">
      <p className="label text-on-green-soft">{dict.footer.partners}</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        {club.partners.map((p) => {
          const inner = p.logo ? (
            <Image
              src={p.logo}
              alt={p.name}
              width={110}
              height={36}
              className="h-6 w-auto opacity-55 grayscale transition-opacity duration-300 hover:opacity-100"
            />
          ) : (
            <span className="font-display text-lg leading-none text-on-green/55 transition-colors duration-300 hover:text-on-green">
              {p.name}
            </span>
          );
          return (
            <li key={p.name} title={p.note}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
