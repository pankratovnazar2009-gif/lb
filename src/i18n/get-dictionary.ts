import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/uk";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  uk: () => import("./dictionaries/uk"),
  en: () => import("./dictionaries/en"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default;
}

export type { Dictionary };
