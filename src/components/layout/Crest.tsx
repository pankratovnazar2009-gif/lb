import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CrestProps {
  locale: string;
  className?: string;
  withWordmark?: boolean;
  invert?: boolean;
}

export function Crest({ locale, className, withWordmark = true, invert }: CrestProps) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="FC Livyi Bereh"
      className={cn("group flex items-center gap-3", className)}
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={44}
        height={44}
        priority
        className="h-9 w-auto md:h-11"
      />
      {withWordmark && (
        <span
          className={cn(
            "font-display text-lg leading-[0.85] tracking-tight md:text-xl",
            invert ? "text-on-green" : "text-ink",
          )}
        >
          Лівий
          <br />
          Берег
        </span>
      )}
    </Link>
  );
}
