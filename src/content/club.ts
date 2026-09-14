export const club = {
  name: "Лівий Берег",
  nameEn: "Livyi Bereh",
  fullName: "Футбольний клуб «Лівий Берег»",
  fullNameEn: "Football Club Livyi Bereh",
  city: "Київ",
  cityEn: "Kyiv",
  founded: 2017,
  nickname: "Лелеки",
  nicknameEn: "The Storks",

  address:
    "08340, Київська обл., Бориспільський р-н, Золочівська громада, урочище «Млиново», вул. Олександрівська, 24-А",
  addressEn:
    "24-A Oleksandrivska St., Mlynovo, Zolochivska hromada, Boryspil district, Kyiv oblast, 08340",
  phone: "+38 (044) 364 77 32",
  email: "office@fclb.com.ua",
  mediaId: "R40-07310",

  mainSiteUrl: "https://fclb.com.ua/",
  shopUrl: "https://fclb-shop.com",

  socials: [
    { id: "instagram", label: "Instagram", handle: "@fc_livyibereh", url: "https://www.instagram.com/fc_livyibereh/", followers: "—" },
    { id: "youtube", label: "YouTube", handle: "@fclbkyiv", url: "https://www.youtube.com/@fclbkyiv", followers: "—" },
    { id: "telegram", label: "Telegram", handle: "@fclb_kyiv", url: "https://t.me/fclb_kyiv", followers: "—" },
    { id: "facebook", label: "Facebook", handle: "fclbkyiv", url: "https://www.facebook.com/fclbkyiv", followers: "—" },
    { id: "tiktok", label: "TikTok", handle: "@fc_liviybereh", url: "https://www.tiktok.com/@fc_liviybereh", followers: "—" },
  ],

  stats: {
    founded: "2017",
    stadiums: "3",
    academyGroups: "9",
  },

  /**
   * The club does not publish a partner list; these are the marks that appear
   * on the shirt / in the club's competitive context. Drop real partner files
   * into /public/partners and add `logo: "/partners/<file>"` to show an image
   * instead of the wordmark.
   */
  partners: [
    { name: "Nike", note: "Технічний партнер", url: "https://www.nike.com/retail/directory/ukraine" },
    { name: "УАФ", note: "Українська асоціація футболу", url: "https://uaf.ua" },
    { name: "УПЛ", note: "Українська Прем’єр-ліга", url: "https://upl.ua" },
    { name: "ПФЛ", note: "Професіональна футбольна ліга", url: "https://pfl.ua" },
    { name: "FCLB Shop", note: "Офіційний магазин", url: "https://fclb-shop.com" },
  ] as Array<{ name: string; note: string; url?: string; logo?: string }>,
} as const;

export type NavKey = "news" | "team" | "matches" | "table" | "academy" | "club" | "media";

export const navItems: Array<{ key: NavKey; href: string; external?: boolean }> = [
  { key: "news", href: "/novyny" },
  { key: "team", href: "/komanda" },
  { key: "matches", href: "/matchi" },
  { key: "table", href: "/tablytsya" },
  { key: "club", href: "/#club" },
];
