import type { Match } from "./types";

const UPL = { competition: "Українська Прем’єр-ліга", competitionEn: "Ukrainian Premier League" };
const HOME_VENUE = {
  venue: "Урочище «Млиново» · Арена «Лівий Берег»",
  venueEn: "Mlynovo · Livyi Bereh Arena",
};

/** Season 2026/27. Results tie out with the league table in ./table.ts. */
export const results: Match[] = [
  {
    id: "r1", ...UPL, round: "1 тур", roundEn: "Round 1",
    home: "Кудрівка", away: "Лівий Берег", homeEn: "Kudrivka", awayEn: "Livyi Bereh",
    kickoff: "2026-07-26T18:00:00+03:00", venue: "Кудрівка · Стадіон «Колос»", venueEn: "Kudrivka · Kolos Stadium",
    status: "result", score: [1, 1],
  },
  {
    id: "r2", ...UPL, round: "2 тур", roundEn: "Round 2",
    home: "Лівий Берег", away: "Кривбас", homeEn: "Livyi Bereh", awayEn: "Kryvbas",
    kickoff: "2026-08-03T17:00:00+03:00", ...HOME_VENUE,
    status: "result", score: [0, 0],
  },
  {
    id: "r3", ...UPL, round: "3 тур", roundEn: "Round 3",
    home: "Полісся", away: "Лівий Берег", homeEn: "Polissia", awayEn: "Livyi Bereh",
    kickoff: "2026-08-16T15:30:00+03:00", venue: "Житомир · Стадіон «Полісся»", venueEn: "Zhytomyr · Polissia Stadium",
    status: "result", score: [2, 2],
  },
  {
    id: "r4", ...UPL, round: "4 тур", roundEn: "Round 4",
    home: "Лівий Берег", away: "Карпати", homeEn: "Livyi Bereh", awayEn: "Karpaty",
    kickoff: "2026-08-29T18:00:00+03:00", ...HOME_VENUE,
    status: "result", score: [1, 1],
  },
  {
    id: "r5", ...UPL, round: "5 тур", roundEn: "Round 5",
    home: "Чорноморець", away: "Лівий Берег", homeEn: "Chornomorets", awayEn: "Livyi Bereh",
    kickoff: "2026-09-04T13:00:00+03:00", venue: "Одеса · Стадіон «Чорноморець»", venueEn: "Odesa · Chornomorets Stadium",
    status: "result", score: [1, 2],
  },
  {
    id: "r6", ...UPL, round: "6 тур", roundEn: "Round 6",
    home: "Лівий Берег", away: "Полісся", homeEn: "Livyi Bereh", awayEn: "Polissia",
    kickoff: "2026-09-13T15:30:00+03:00", ...HOME_VENUE,
    status: "result", score: [2, 1],
  },
];

export const fixtures: Match[] = [
  {
    id: "f7", ...UPL, round: "7 тур", roundEn: "Round 7",
    home: "Епіцентр", away: "Лівий Берег", homeEn: "Epitsentr", awayEn: "Livyi Bereh",
    kickoff: "2026-09-20T15:00:00+03:00", venue: "Кам’янець-Подільський · ім. Уткіна", venueEn: "Kamianets-Podilskyi · Utkin Stadium",
    status: "fixture",
  },
  {
    id: "f8", ...UPL, round: "8 тур", roundEn: "Round 8",
    home: "Лівий Берег", away: "Зоря", homeEn: "Livyi Bereh", awayEn: "Zorya",
    kickoff: "2026-09-27T13:00:00+03:00", ...HOME_VENUE, status: "fixture",
  },
  {
    id: "f9", ...UPL, round: "9 тур", roundEn: "Round 9",
    home: "Харків", away: "Лівий Берег", homeEn: "Kharkiv", awayEn: "Livyi Bereh",
    kickoff: "2026-10-04T13:00:00+03:00", ...HOME_VENUE, status: "fixture",
  },
  {
    id: "f10", ...UPL, round: "10 тур", roundEn: "Round 10",
    home: "Лівий Берег", away: "ЛНЗ", homeEn: "Livyi Bereh", awayEn: "LNZ",
    kickoff: "2026-10-18T15:00:00+03:00", ...HOME_VENUE, status: "fixture",
  },
];
