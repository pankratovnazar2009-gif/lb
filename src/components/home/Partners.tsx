import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { club } from "@/content/club";

/**
 * Partner strip on the green ground. Colourless by design.
 * Renders /public/partners/<file> if a `logo` is set, otherwise a wordmark.
 */
export function Partners({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label={dict.footer.partners} className="on-green bg-green-deep text-on-green">
      <div className="shell gutter border-t border-white/12 py-12">
        <p className="label text-on-green-soft">{dict.footer.partners}</p>
        <ul className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-8">
          {club.partners.map((p) => {
            const inner = p.logo ? (
              <Image
                src={p.logo}
                alt={p.name}
                width={132}
                height={44}
                className="h-8 w-auto opacity-55 grayscale transition-opacity duration-300 hover:opacity-100"
              />
            ) : (
              <span className="font-display text-2xl leading-none text-on-green/55 transition-colors duration-300 hover:text-on-green sm:text-3xl">
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
    </section>
  );
}
