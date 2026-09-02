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
import { NextMatchCard } from "./NextMatchCard";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const wordX = useTransform(scrollYProgress, [0, 1], [0, -44]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[min(860px,86svh)] flex-col justify-start overflow-hidden bg-paper gutter pb-12 pt-[clamp(84px,13vh,124px)]"
    >
      {/* watermark */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-[-2%] top-[16%] z-0 hidden select-none text-[15vw] leading-none tracking-tighter text-paper-3 sm:block"
      >
        EST.17
      </span>

      {/* player cutout */}
      <motion.div
        style={{ y: imgY }}
        className="pointer-events-none absolute bottom-0 right-[-2%] z-[1] hidden h-[72vh] w-[54vw] max-w-[560px] select-none mix-blend-darken sm:block md:right-[1%] md:h-[92vh] md:w-[46vw] lg:right-[4%]"
      >
        <Image
          src="/players/10-souza.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 96vw, 46vw"
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* headline block */}
      <motion.div style={{ x: wordX }} className="relative z-[2] shell w-full">
        <p className="label text-ink-soft">{dict.hero.kicker}</p>
        <MaskText
          as="h1"
          lines={["Лівий", "Берег"]}
          stagger={90}
          className="font-display-xl mt-4 -ml-[0.03em] block text-[21vw] text-ink sm:text-[16vw] lg:text-[8rem] xl:text-[9.5rem]"
          lineClassName="block"
        />
        <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-ink-soft md:text-base">
          {dict.hero.tagline}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink">
          <ArrowLink href={localeHref("/komanda", locale)}>{dict.hero.squad}</ArrowLink>
          <Link href="https://www.youtube.com/@fclbkyiv" target="_blank" rel="noreferrer">
            <span className="ul label">{dict.hero.watch}</span>
          </Link>
        </div>

        <div className="mt-8">
          <NextMatchCard locale={locale} dict={dict} />
        </div>
      </motion.div>

      <span className="label absolute bottom-8 right-[var(--gutter)] hidden items-center gap-2 text-ink-soft lg:flex">
        <span className="inline-block h-8 w-px bg-ink" />
        {dict.common.scroll}
      </span>
    </section>
  );
}
