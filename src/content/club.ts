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
} as const;

export type NavKey = "news" | "team" | "matches" | "academy" | "club" | "media";

export const navItems: Array<{ key: NavKey; href: string; external?: boolean }> = [
  { key: "news", href: "/novyny" },
  { key: "team", href: "/komanda" },
  { key: "matches", href: "/#matches" },
  { key: "academy", href: "/#academy" },
  { key: "club", href: "/#club" },
  { key: "media", href: "/#media" },
];
