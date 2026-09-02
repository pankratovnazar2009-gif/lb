import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  metadataBase: new URL("https://fclb.com.ua"),
};

// The real <html>/<body> live in app/[locale]/layout.tsx so that `lang`
// tracks the active locale. This root layout only ships global CSS.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
