"use client";

import { useEffect, useRef } from "react";

/**
 * Gently auto-scrolls a horizontal container and loops seamlessly.
 * Render the children twice (A + A) so the midpoint wrap is invisible.
 * Pauses while hovered, focused or being dragged; does nothing under
 * reduced-motion, where the container stays plainly scrollable.
 */
export function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
  pxPerSecond = 28,
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
    let pos = el.scrollLeft; // keep our own fractional position

    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused) {
        const half = el.scrollWidth / 2;
        pos += (pxPerSecond * dt) / 1000;
        if (half > 0 && pos >= half) pos -= half;
        // if the user grabbed and scrolled, follow their position
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => (paused = true);
    const resume = () => {
      last = performance.now();
      paused = false;
    };
    const onVisible = () => {
      if (!document.hidden) last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisible);

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    window.addEventListener("pointerup", resume);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisible);
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
