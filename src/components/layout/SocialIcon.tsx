type Id = "instagram" | "youtube" | "telegram" | "facebook" | "tiktok";

const paths: Record<Id, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: <path d="M21 4L3 11l6 2 2 6 3-4 4 3 3-14z" />,
  facebook: <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z" fill="currentColor" stroke="none" />,
  tiktok: (
    <path
      d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46V13a1.5 1.5 0 1 0 1.5 1.5V4H14c.2 1.9 1.7 3.4 3.6 3.6V10c-1.3-.05-2.5-.5-3.6-1.2"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function SocialIcon({ id, className }: { id: string; className?: string }) {
  const node = paths[id as Id];
  if (!node) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {node}
    </svg>
  );
}
