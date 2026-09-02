import type { Player } from "./types";

/**
 * First-team squad, sourced from fclb.com.ua (season 2026/27).
 * Photos are the club's official studio portraits, stored in /public/players.
 */
export const players: Player[] = [
  // ── Воротарі ────────────────────────────────────────────────
  { id: "zhmurko", number: 12, last: "Жмурко", first: "Роман", lastEn: "Zhmurko", firstEn: "Roman", position: "Воротар", photo: "/players/12-zhmurko.png", country: "Україна" },
  { id: "domoleha", number: 23, last: "Домолега", first: "Олександр", lastEn: "Domoleha", firstEn: "Oleksandr", position: "Воротар", photo: "/players/23-domolega.png", country: "Україна" },
  { id: "ihnatenko", number: 74, last: "Ігнатенко", first: "Денис", lastEn: "Ihnatenko", firstEn: "Denys", position: "Воротар", photo: "/players/74-ignatenko.jpg", country: "Україна" },

  // ── Захисники ──────────────────────────────────────────────
  { id: "sokolov", number: 2, last: "Соколов", first: "Олег", lastEn: "Sokolov", firstEn: "Oleh", position: "Захисник", photo: "/players/2-sokolov.jpg", country: "Україна" },
  { id: "kotukha", number: 3, last: "Котуха", first: "Іван", lastEn: "Kotukha", firstEn: "Ivan", position: "Захисник", photo: "/players/3-kotuha.jpg", country: "Україна" },
  { id: "bondarenko", number: 4, last: "Бондаренко", first: "Валерій", lastEn: "Bondarenko", firstEn: "Valerii", position: "Захисник", photo: "/players/4-bondarenko.jpg", country: "Україна" },
  { id: "samar", number: 5, last: "Самар", first: "Валерій", lastEn: "Samar", firstEn: "Valerii", position: "Захисник", photo: "/players/5-samar.jpg", country: "Україна" },
  { id: "silva-santos", number: 6, last: "Сільва Сантос", first: "Сіднней", lastEn: "Silva Santos", firstEn: "Sidnei", position: "Захисник", photo: "/players/6-santos.jpg", country: "Бразилія" },
  { id: "kovalenko", number: 13, last: "Коваленко", first: "Ілля", lastEn: "Kovalenko", firstEn: "Illia", position: "Захисник", photo: "/players/13-kovalenko.jpg", country: "Україна" },
  { id: "tatolna", number: 14, last: "Татолна", first: "Северін", lastEn: "Tatolna", firstEn: "Severyn", position: "Захисник", photo: "/players/14-tatolna.jpg", country: "Україна" },
  { id: "syzoniuk", number: 19, last: "Сизонюк", first: "Єгор", lastEn: "Syzoniuk", firstEn: "Yehor", position: "Захисник", photo: "/players/19-sizonuk.jpg", country: "Україна" },
  { id: "astakhov", number: 27, last: "Астахов", first: "Ернест", lastEn: "Astakhov", firstEn: "Ernest", position: "Захисник", photo: "/players/27-astahov.jpg", country: "Україна" },
  { id: "osei-bonsu", number: 90, last: "Осей Бонсу", first: "Ніколас", lastEn: "Osei Bonsu", firstEn: "Nicholas", position: "Захисник", photo: "/players/90-osey.jpg", country: "Гана" },
  { id: "yakymiv", number: 97, last: "Якимів", first: "Андрій", lastEn: "Yakymiv", firstEn: "Andrii", position: "Захисник", photo: "/players/97-yakimiv.png", country: "Україна" },

  // ── Півзахисники ───────────────────────────────────────────
  { id: "shastal", number: 7, last: "Шастал", first: "Дмитро", lastEn: "Shastal", firstEn: "Dmytro", position: "Півзахисник", photo: "/players/7-shastal.png", country: "Україна" },
  { id: "kryvoruchko", number: 8, last: "Криворучко", first: "Олег", lastEn: "Kryvoruchko", firstEn: "Oleh", position: "Півзахисник", photo: "/players/8-krivoruchko.jpg", country: "Україна" },
  { id: "souza-da-silva", number: 10, last: "Соуза Да Сілва", first: "Дієго", lastEn: "Souza Da Silva", firstEn: "Diego", position: "Півзахисник", photo: "/players/10-souza.jpg", country: "Бразилія" },
  { id: "kvasnytsia", number: 11, last: "Квасниця", first: "Ілля", lastEn: "Kvasnytsia", firstEn: "Illia", position: "Півзахисник", photo: "/players/11-kvasnica.jpg", country: "Україна" },
  { id: "voloshyn-v", number: 15, last: "Волошин", first: "Вікентій", lastEn: "Voloshyn", firstEn: "Vikentii", position: "Півзахисник", photo: "/players/15-voloshin_v.jpg", country: "Україна" },
  { id: "vorobchak", number: 17, last: "Воробчак", first: "Назарій", lastEn: "Vorobchak", firstEn: "Nazarii", position: "Півзахисник", photo: "/players/17-vorobchak.jpg", country: "Україна" },
  { id: "tishchenko", number: 22, last: "Тіщенко", first: "Віталій", lastEn: "Tishchenko", firstEn: "Vitalii", position: "Півзахисник", photo: "/players/22-tishchenko.jpg", country: "Україна" },
  { id: "kosovskyi", number: 25, last: "Косовський", first: "Сергій", lastEn: "Kosovskyi", firstEn: "Serhii", position: "Півзахисник", photo: "/players/25-kosovski.jpg", country: "Україна" },
  { id: "cheliadin", number: 38, last: "Челядін", first: "Артем", lastEn: "Cheliadin", firstEn: "Artem", position: "Півзахисник", photo: "/players/38-cheliadin.jpg", country: "Україна" },
  { id: "banada", number: 44, last: "Банада", first: "Євген", lastEn: "Banada", firstEn: "Yevhen", position: "Півзахисник", photo: "/players/44-banada.jpg", country: "Україна" },

  // ── Нападники ──────────────────────────────────────────────
  { id: "florencio", number: 9, last: "Флоренціо Бріто", first: "Венделл", lastEn: "Florencio Brito", firstEn: "Wendell", position: "Нападник", photo: "/players/9-florentcio.jpg", country: "Бразилія" },
  { id: "fall", number: 20, last: "Фалл", first: "Папе Малік", lastEn: "Fall", firstEn: "Pape Malick", position: "Нападник", photo: "/players/20-fall.jpg", country: "Сенегал" },
  { id: "voloshyn-n", number: 21, last: "Волошин", first: "Назар", lastEn: "Voloshyn", firstEn: "Nazar", position: "Нападник", photo: "/players/21-voloshin_n.jpg", country: "Україна" },
  { id: "heresh", number: 37, last: "Гереш", first: "Роман", lastEn: "Heresh", firstEn: "Roman", position: "Нападник", photo: "/players/37-geresh.jpg", country: "Україна" },
];

export const positionOrder: Player["position"][] = [
  "Воротар",
  "Захисник",
  "Півзахисник",
  "Нападник",
];
