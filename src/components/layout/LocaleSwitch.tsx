"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitch({ active }: { active: Locale }) {
  const pathname = usePathname();

  const swap = (loc: Locale) => {
    const rest = pathname.replace(/^\/(uk|en)(?=\/|$)/, "");
    return `/${loc}${rest || ""}`;
  };

  return (
    <div className="label flex items-center gap-1.5">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          <Link
            href={swap(loc)}
            aria-current={loc === active ? "true" : undefined}
            className={cn(
              "transition-colors duration-150",
              loc === active ? "text-current" : "opacity-40 hover:opacity-100",
            )}
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
