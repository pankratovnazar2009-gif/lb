import type { TableRow } from "./types";

/**
 * Ukrainian Premier League standings, season 2026/27 (snapshot from fclb.com.ua,
 * through round 6 — kept in step with LB's own results in ./matches.ts;
 * other clubs' rows are a hand-updated snapshot, not a full round-robin sim).
 * `slug` maps to /public/upl/<slug>.png; `site` is the club's official website.
 */
const raw: Array<[number, string, string, string, string, number, number, number]> = [
  // pos, team, teamEn, slug, site, win, draw, loss
  [1, "Карпати", "Karpaty", "karpaty", "https://fckarpaty.com", 3, 1, 0],
  [2, "Лівий Берег", "Livyi Bereh", "livyi-bereh", "https://fclb.com.ua", 2, 4, 0],
  [3, "Полісся", "Polissia", "polissya", "https://fcpolissya.com", 3, 0, 2],
  [4, "Шахтар", "Shakhtar", "shakhtar", "https://shakhtar.com", 3, 0, 1],
  [5, "Епіцентр", "Epitsentr", "epitsentr", "https://fcepicentr.com.ua", 2, 1, 1],
  [6, "Харків", "Kharkiv", "kharkiv", "https://fckharkiv.com", 2, 0, 2],
  [7, "Динамо", "Dynamo", "dynamo", "https://fcdynamo.com", 2, 0, 1],
  [8, "Зоря", "Zorya", "zorya", "https://fczorya.com", 2, 0, 2],
  [9, "Буковина", "Bukovyna", "bukovyna", "https://bukfc.com", 1, 2, 1],
  [10, "Верес", "Veres", "veres", "https://fcveres.com", 1, 1, 2],
  [11, "Кривбас", "Kryvbas", "kryvbas", "https://fckryvbas.com", 1, 1, 2],
  [12, "ЛНЗ", "LNZ", "lnz", "https://fc-lnz.com", 1, 1, 2],
  [13, "Чорноморець", "Chornomorets", "chornomorets", "https://chornomorets.com", 1, 0, 3],
  [14, "Оболонь", "Obolon", "obolon", "https://fc.obolon.ua", 0, 3, 1],
  [15, "Кудрівка", "Kudrivka", "kudrivka", "https://fckudrivka.com", 0, 2, 2],
  [16, "Колос", "Kolos", "kolos", "https://fckolos.com.ua", 0, 1, 2],
];

export const leagueTable: TableRow[] = raw.map(
  ([pos, team, teamEn, slug, site, win, draw, loss]) => ({
    pos,
    team,
    teamEn,
    slug,
    site,
    win,
    draw,
    loss,
    played: win + draw + loss,
    points: win * 3 + draw,
  }),
);

export const OUR_TEAM = "Лівий Берег";
