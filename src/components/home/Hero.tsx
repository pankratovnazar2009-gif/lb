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

/** Studio cutout — white bg knocked out on the paper via mix-blend. */
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
      className={`pointer-events-none absolute z-[1] select-none mix-blend-darken ${className}`}
    >
      <Image src={src} alt="" fill sizes="42vw" className="object-contain object-top" />
    </motion.div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yL = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const yR = useTransform(scrollYProgress, [0, 1], [0, 110]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] flex-col overflow-hidden bg-paper pt-[clamp(78px,11vh,120px)]"
    >
      {/* players flanking the wordmark */}
      <Cutout
        src="/players/44-banada.jpg"
        y={yL}
        className="hidden h-[82vh] w-[36vw] max-w-[360px] left-[-8%] top-[3%] opacity-90 md:block lg:left-[-4%]"
      />
      <Cutout
        src="/players/10-souza.jpg"
        y={yR}
        className="hidden h-[68vh] w-[58vw] max-w-[440px] right-[-18%] top-[12%] sm:block sm:right-[-8%] md:right-[0%] md:h-[86vh] md:w-[40vw] md:top-[2%] lg:right-[4%]"
      />

      {/* wordmark + intro — always on top */}
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
