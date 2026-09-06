"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { MaskText } from "@/components/ui/MaskText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { localeHref } from "@/lib/utils";

/** Studio cutout, white bg knocked out on the paper via mix-blend. */
function Cutout({
  src,
  className,
  y,
}: {
  src: string;
  className: string;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ y }}
      aria-hidden
      className={`pointer-events-none absolute bottom-0 z-[1] select-none mix-blend-darken ${className}`}
    >
      <Image src={src} alt="" fill sizes="45vw" className="object-contain object-bottom" />
    </motion.div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] flex-col overflow-hidden bg-paper pt-[clamp(80px,12vh,124px)]"
    >
      {/* scattered players */}
      <Cutout
        src="/players/44-banada.jpg"
        y={yC}
        className="hidden h-[44vh] w-[30vw] max-w-[300px] left-[-9%] opacity-90 md:block lg:left-[-5%]"
      />
      <Cutout
        src="/players/9-florentcio.jpg"
        y={yB}
        className="hidden h-[36vh] w-[20vw] max-w-[220px] left-[42%] opacity-80 lg:block"
      />
      <Cutout
        src="/players/10-souza.jpg"
        y={yA}
        className="h-[52vh] w-[86vw] max-w-[440px] right-[-16%] sm:right-[-4%] md:right-[2%] md:h-[80vh] md:w-[40vw]"
      />

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
