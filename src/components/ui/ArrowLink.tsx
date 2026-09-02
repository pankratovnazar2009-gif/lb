import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function ArrowLink({ href, children, className, external }: ArrowLinkProps) {
  const inner = (
    <span
      className={cn(
        "group inline-flex items-center gap-2 label text-current",
        className,
      )}
    >
      <span className="ul">{children}</span>
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        aria-hidden
        className="translate-y-px transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}
