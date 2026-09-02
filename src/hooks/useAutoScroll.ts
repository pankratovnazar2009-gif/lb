"use client";

import { useEffect, useRef } from "react";

/**
 * Gently auto-scrolls a horizontal container and loops seamlessly.
 * The children must be rendered twice (A + A) so the midpoint wrap is invisible.
 * Pauses while the pointer is over it, while focused, and while the user drags.
 * Under reduced-motion it does nothing — the container stays plainly scrollable.
 */
export function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
  pxPerSecond = 26,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.search.includes("flat")) return;

    let paused = false;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += (pxPerSecond * dt) / 1000;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => (paused = true);
    const resume = () => {
      last = performance.now();
      paused = false;
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    window.addEventListener("pointerup", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      window.removeEventListener("pointerup", resume);
    };
  }, [pxPerSecond]);

  return ref;
}
