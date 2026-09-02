import { cn } from "@/lib/utils";
import { MaskText } from "./MaskText";
import { ArrowLink } from "./ArrowLink";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  link?: { href: string; label: string; external?: boolean };
  className?: string;
  invert?: boolean;
}

export function SectionHeader({
  index,
  label,
  title,
  link,
  className,
  invert,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-t pt-6 md:flex-row md:items-end md:justify-between",
        invert ? "border-white/15" : "border-ink",
        className,
      )}
    >
      <div className="flex items-baseline gap-5">
        <span className={cn("label", invert ? "text-yellow" : "text-ink-soft")}>
          {index}
        </span>
        <div>
          <p className={cn("label mb-3", invert ? "text-on-green-soft" : "text-ink-soft")}>
            {label}
          </p>
          <MaskText
            as="h2"
            lines={[title]}
            className={cn(
              "font-display text-h2 md:text-display",
              invert ? "text-on-green" : "text-ink",
            )}
          />
        </div>
      </div>
      {link && (
        <div className={invert ? "text-on-green" : "text-ink"}>
          <ArrowLink href={link.href} external={link.external}>
            {link.label}
          </ArrowLink>
        </div>
      )}
    </div>
  );
}
