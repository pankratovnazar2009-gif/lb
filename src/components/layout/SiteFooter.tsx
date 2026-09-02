import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { club, navItems } from "@/content/club";
import { localeHref } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const address = locale === "uk" ? club.address : club.addressEn;

  return (
    <footer className="on-green bg-green-deep text-on-green">
      <div className="shell gutter section !pb-12">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-yellow">{dict.social.follow}</p>
            <div className="mt-5 flex flex-col gap-1">
              {club.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 text-on-green transition-colors hover:text-yellow"
                >
                  <SocialIcon
                    id={s.id}
                    className="h-6 w-6 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <span className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="label text-on-green-soft">{dict.footer.nav}</p>
            <ul className="mt-5 space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.external ? item.href : localeHref(item.href, locale)}
                    className="text-on-green/90 hover:text-yellow"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:col-span-4">
            <div>
              <p className="label text-on-green-soft">{dict.footer.address}</p>
              <p className="mt-3 max-w-xs text-sm text-on-green/85">{address}</p>
            </div>
            <div>
              <p className="label text-on-green-soft">{dict.footer.contacts}</p>
              <p className="mt-3 text-sm text-on-green/85">
                <a href={`tel:${club.phone.replace(/[^+\d]/g, "")}`} className="hover:text-yellow">
                  {club.phone}
                </a>
                <br />
                <a href={`mailto:${club.email}`} className="hover:text-yellow">
                  {club.email}
                </a>
              </p>
            </div>
            <p className="label text-on-green-soft">
              {dict.footer.mediaId}: <span className="text-on-green">{club.mediaId}</span>
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/12 pt-6">
          <span
            aria-hidden
            className="font-display block w-full text-[13.5vw] leading-[0.8] tracking-tighter text-white/10"
          >
            Лелеки
          </span>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 label text-on-green-soft sm:flex-row">
          <span>
            © {new Date().getFullYear()} {club.fullName}. {dict.footer.rights}.
          </span>
          <a href={club.mainSiteUrl} target="_blank" rel="noreferrer" className="hover:text-on-green">
            {dict.footer.built}
          </a>
        </div>
      </div>
    </footer>
  );
}
