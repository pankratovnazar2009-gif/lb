import type { Dictionary } from "@/i18n/get-dictionary";
import { club } from "@/content/club";

export function SocialMarquee({ dict }: { dict: Dictionary }) {
  const items = club.socials.map((s) => s.label);
  const line = [...items, ...items, ...items, ...items];

  return (
    <section aria-label={dict.social.label} className="border-y border-ink py-6 overflow-hidden">
      <div className="marquee font-display text-[8vw] leading-none tracking-tight text-ink md:text-[5vw]">
        {line.map((label, i) => (
          <span key={i} className="flex items-center gap-14">
            {label}
            <span className="text-yellow-deep">*</span>
          </span>
        ))}
      </div>
    </section>
  );
}
