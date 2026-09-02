export type PositionGroup = "Воротар" | "Захисник" | "Півзахисник" | "Нападник";

export interface Player {
  id: string;
  number: number;
  last: string;
  first: string;
  lastEn: string;
  firstEn: string;
  position: PositionGroup;
  photo: string;
  country: string; // emoji-free ISO-ish label
}

export interface StaffMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  photo: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  date: string; // ISO
  category: "УПЛ" | "УПЛ-2" | "U19" | "Кубок" | "Клуб" | "Академія" | "Інфраструктура";
  image?: string;
}

export interface Match {
  id: string;
  competition: string;
  competitionEn: string;
  round: string;
  roundEn: string;
  home: string;
  away: string;
  homeEn: string;
  awayEn: string;
  kickoff: string; // ISO
  venue: string;
  venueEn: string;
  status: "result" | "fixture";
  score?: [number, number];
}

export interface TableRow {
  pos: number;
  team: string;
  teamEn: string;
  slug: string;
  site: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
}
