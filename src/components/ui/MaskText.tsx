"use client";

import type { ElementType } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

interface MaskTextProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  stagger?: number;
}

/** Each line rises from behind an invisible edge, staggered. */
export function MaskText({
  lines,
  as: Tag = "span",
  className,
  lineClassName,
  stagger = 70,
}: MaskTextProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn("mask", inView && "in", lineClassName)}>
          <span style={{ transitionDelay: `${i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
