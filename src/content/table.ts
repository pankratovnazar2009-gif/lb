import type { TableRow } from "./types";

/** Ukrainian Premier League standings, season 2026/27 (snapshot from fclb.com.ua). */
const raw: Array<[number, string, string, number, number, number]> = [
  // pos, team, teamEn, win, draw, loss
  [1, "Карпати", "Karpaty", 3, 1, 0],
  [2, "Полісся", "Polissia", 3, 0, 1],
  [3, "Шахтар", "Shakhtar", 3, 0, 1],
  [4, "Епіцентр", "Epitsentr", 2, 1, 1],
  [5, "Харків", "Kharkiv", 2, 0, 2],
  [6, "Динамо", "Dynamo", 2, 0, 1],
  [7, "Зоря", "Zorya", 2, 0, 2],
  [8, "Буковина", "Bukovyna", 1, 2, 1],
  [9, "Верес", "Veres", 1, 1, 2],
  [10, "Кривбас", "Kryvbas", 1, 1, 2],
  [11, "ЛНЗ", "LNZ", 1, 1, 2],
  [12, "Лівий Берег", "Livyi Bereh", 0, 4, 0],
  [13, "Чорноморець", "Chornomorets", 1, 0, 2],
  [14, "Оболонь", "Obolon", 0, 3, 1],
  [15, "Кудрівка", "Kudrivka", 0, 2, 2],
  [16, "Колос", "Kolos", 0, 1, 2],
];

export const leagueTable: TableRow[] = raw.map(([pos, team, teamEn, win, draw, loss]) => ({
  pos,
  team,
  teamEn,
  win,
  draw,
  loss,
  played: win + draw + loss,
  points: win * 3 + draw,
}));

export const OUR_TEAM = "Лівий Берег";
