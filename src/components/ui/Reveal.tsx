"use client";

import type { ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
}

/** Fade + rise once on scroll. Honours reduced-motion via the hook. */
export function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
