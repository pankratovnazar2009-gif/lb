"use client";

import { useEffect } from "react";

/** `?flat` in the URL freezes reveal/mask animations at their final state and
 *  disables smooth scroll + cursor — used for visual QA and screenshots. */
export function ReviewMode() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("flat")) {
      document.documentElement.classList.add("flat");
    }
  }, []);
  return null;
}
