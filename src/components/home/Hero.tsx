"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { MaskText } from "@/components/ui/MaskText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { localeHref } from "@/lib/utils";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative flex flex-col overflow-hidden bg-paper pt-[clamp(76px,11vh,116px)]">
      {/* wordmark + intro */}
      <div className="shell gutter w-full">
        <MaskText
          as="h1"
          lines={["Лівий Берег"]}
          className="font-display-xl -ml-[0.04em] block whitespace-nowrap text-[15.5vw] text-ink lg:text-[13vw]"
        />
        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
            {dict.hero.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-ink">
            <ArrowLink href={localeHref("/komanda", locale)}>
              {dict.hero.squad}
            </ArrowLink>
            <Link
              href="https://www.youtube.com/@fclbkyiv"
              target="_blank"
              rel="noreferrer"
            >
              <span className="ul label">{dict.hero.watch}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* full-bleed team photo */}
      <div
        ref={ref}
        className="relative mt-10 h-[46vh] max-h-[560px] min-h-[300px] w-full overflow-hidden border-t border-ink md:mt-14"
      >
        <motion.div style={{ y: imgY }} className="absolute inset-0 h-[118%] -top-[9%]">
          <Image
            src="/team/celebration.jpg"
            alt="Команда ФК «Лівий Берег»"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_64%]"
          />
        </motion.div>
        <span className="label absolute bottom-4 left-[var(--gutter)] z-[2] bg-paper px-2 py-1 text-green-ink">
          {dict.hero.nickname}
        </span>
      </div>
    </section>
  );
}
