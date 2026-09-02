import { MaskText } from "./MaskText";

export function PageIntro({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="shell gutter pb-12 pt-28 md:pt-36">
      <p className="label text-ink-soft">{label}</p>
      <MaskText
        as="h1"
        lines={[title]}
        className="font-display-xl mt-4 text-[16vw] leading-[0.86] text-ink md:text-[10rem]"
      />
      {lead && <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">{lead}</p>}
    </header>
  );
}
