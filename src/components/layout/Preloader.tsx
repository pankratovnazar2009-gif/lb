"use client";

import { useEffect, useState } from "react";

/**
 * Mono percentage counter over a green panel that wipes up.
 * Hard cap ~1.6s; skipped entirely under reduced-motion.
 */
export function Preloader({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.location.search.includes("flat")
    ) {
      setDone(true);
      return;
    }
    document.documentElement.style.setProperty("overflow", "clip");
    const start = performance.now();
    const DURATION = 1150;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 120);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.removeProperty("overflow");
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-end justify-between gutter pb-[6vh] pt-6 bg-green-deep text-on-green"
      style={{
        animation: "pl-wipe 0.9s var(--ease-inout) 1.25s forwards",
      }}
    >
      <span className="font-display text-[13vw] leading-none tracking-tight">
        {label}
      </span>
      <span className="label text-on-green-soft tabular-nums">
        {String(count).padStart(3, "0")}
      </span>
      <style>{`
        @keyframes pl-wipe {
          to { transform: translateY(-101%); }
        }
      `}</style>
    </div>
  );
}
