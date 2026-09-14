"use client";

import { useEffect, useRef } from "react";

/** Lerped dot + ring. Desktop / fine-pointer only; native cursor kept for a11y. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    // Both dot and ring start invisible (opacity: 0 in CSS) — until a real
    // pointer position lands, they'd otherwise sit at their default CSS
    // top:0/left:0 and paint as a stray circle in the page's corner.
    let moved = false;
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!moved) {
        moved = true;
        cur.x = e.clientX;
        cur.y = e.clientY;
        dot.current?.classList.add("is-visible");
        ring.current?.classList.add("is-visible");
      }
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
      const hot = !!(e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor], input, summary",
      );
      ring.current?.classList.toggle("hot", hot);
    };
    const loop = () => {
      if (moved) {
        cur.x += (target.x - cur.x) * 0.14;
        cur.y += (target.y - cur.y) * 0.14;
        if (ring.current) {
          ring.current.style.left = `${cur.x}px`;
          ring.current.style.top = `${cur.y}px`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
