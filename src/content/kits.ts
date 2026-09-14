export interface Kit {
  id: "home" | "away" | "third";
  name: string;
  nameEn: string;
  body: string;
  bodyEn: string;
  /** shirt / trim / sleeve-cuff colours, used by the SVG illustration */
  colors: { shirt: string; trim: string; sleeve: string };
  number: number;
}

/** Matchday kits, season 2026/27. No product photography from fclb-shop.com
 *  is available yet, so each set renders as a flat brand-colour illustration
 *  instead of a stock photo standing in for the real jersey. */
export const kits: Kit[] = [
  {
    id: "home",
    name: "Домашня",
    nameEn: "Home",
    body: "Глибокий зелений із жовтим кантом — базовий комплект на «Млиново».",
    bodyEn: "Deep green with a yellow trim — the base kit at Mlynovo.",
    colors: { shirt: "var(--green)", trim: "var(--yellow)", sleeve: "var(--green-deep)" },
    number: 10,
  },
  {
    id: "away",
    name: "Виїзна",
    nameEn: "Away",
    body: "Тепле полотняно-біле з тонкою зеленою лінією — виїзний комплект.",
    bodyEn: "Warm off-white with a thin green line — the away kit.",
    colors: { shirt: "var(--paper)", trim: "var(--green)", sleeve: "var(--ink)" },
    number: 44,
  },
  {
    id: "third",
    name: "Третя (резервна)",
    nameEn: "Third",
    body: "Чорна з жовтим акцентом — для єврокубкових виїздів і вечірніх матчів.",
    bodyEn: "Black with a yellow accent — for European away trips and night matches.",
    colors: { shirt: "var(--ink)", trim: "var(--yellow)", sleeve: "var(--green)" },
    number: 9,
  },
];
