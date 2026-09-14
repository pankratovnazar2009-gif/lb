"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { MaskText } from "@/components/ui/MaskText";
import { MatchesTicker } from "./MatchesTicker";

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
      className="relative flex min-h-[62svh] flex-col overflow-hidden bg-paper pt-[clamp(84px,13vh,132px)] md:min-h-[90svh]"
    >
      {/* one player, right of the wordmark, filling the space above the ticker — phones only */}
      <Cutout
        src="/players/44-banada.jpg"
        y={yL}
        className="block h-[46vh] w-[64vw] max-w-[300px] right-[-9%] top-[15%] opacity-95 sm:hidden"
      />

      {/* players flanking the wordmark — tablet and up */}
      <Cutout
        src="/players/44-banada.jpg"
        y={yL}
        className="hidden h-[80vh] w-[36vw] max-w-[380px] left-[-7%] top-[6%] opacity-95 md:block md:h-[88vh] lg:left-[-3%]"
      />
      <Cutout
        src="/players/10-souza.jpg"
        y={yR}
        className="hidden h-[64vh] w-[58vw] max-w-[420px] right-[-14%] top-[16%] sm:block sm:right-[-6%] md:right-[0%] md:h-[92vh] md:w-[42vw] md:top-[3%] lg:right-[2%]"
      />

      {/* wordmark + intro — always on top */}
      <div className="shell gutter relative z-[2] w-full">
        <MaskText
          as="h1"
          lines={["Лівий Берег"]}
          className="font-display-xl -ml-[0.04em] block whitespace-nowrap text-[16vw] text-ink lg:text-[13.5vw]"
        />
      </div>

      <MatchesTicker locale={locale} dict={dict} />
    </section>
  );
}
