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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] flex-col overflow-hidden bg-paper pt-[clamp(80px,12vh,124px)]"
    >
      {/* team cutout, right side */}
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-6%] z-[1] hidden h-[62vh] w-[62vw] max-w-[920px] select-none sm:block md:right-[-2%] md:h-[70vh] lg:right-[2%]"
      >
        <Image
          src="/team/squad.png"
          alt=""
          fill
          priority
          sizes="62vw"
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* wordmark + intro */}
      <div className="shell gutter relative z-[2] w-full">
        <MaskText
          as="h1"
          lines={["Лівий Берег"]}
          className="font-display-xl -ml-[0.04em] block whitespace-nowrap text-[15.5vw] text-ink lg:text-[13vw]"
        />
        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:max-w-md">
          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
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

      <span className="label relative z-[2] mt-auto shell gutter block w-full pb-8 text-ink-soft">
        {dict.hero.nickname}
      </span>
    </section>
  );
}
