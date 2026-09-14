# CLAUDE.md

## Клієнт

**ФК «Лівий Берег»** (FC Livyi Bereh), Київ. Прізвисько — «Лелеки».

- Основний (чинний) сайт: https://fclb.com.ua/ — джерело контенту (новини, склад, розклад, історія).
- Фаншоп: https://fclb-shop.com
- Нове завдання: сучасний редизайн сайту. Орієнтир — https://fckharkiv.com/ + топ-клуби з `reference/`.

## Стек і деплой

- **Next.js 16** (App Router) + **React 19** + **TypeScript**.
- **Tailwind CSS v4** — токени в `src/app/globals.css` (`:root` + `@theme`), без дефолтної палітри, без тіней, радіус 0.
- **Lenis** — інерційний скрол; **Motion** (Framer Motion) — reveal-анімації, паралакс, переходи.
- Самохостовані шрифти через `next/font/google`.
- **Vercel** через **GitHub** (репозиторій і підключення Vercel — за клієнтом; проєкт готовий до деплою, `next build` проходить).

### Команди

```bash
npm run dev        # локальна розробка (http://localhost:3000)
npm run build      # прод-збірка (перевіряє типи)
npm start          # прод-сервер
```

Додайте `?flat` до URL (напр. `/uk?flat`) — вимикає прелоадер, інерційний скрол, курсор і заморожує reveal-анімації. Для QA і скріншотів.

## Мова

Двомовність **uk / en**. Дефолт — `uk`. Маршрути під сегментом `[locale]`; `src/proxy.ts` робить редірект з `/`. Словники — `src/i18n/dictionaries/{uk,en}.ts` (типізовані від `uk`).

## Структура

```
src/
  app/[locale]/           layout (шрифти, хедер/футер, прелоадер) + page (головна),
                          komanda (склад + статистика + голосування + комплекти), matchi (розклад+результати),
                          tablytsya (турнірна таблиця), novyny
  app/api/vote/           route.ts — голосування «гравець туру» (KV, див. нижче)
  components/
    layout/               SiteHeader, SiteFooter, SocialIcon, Crest, MobileMenu, SmoothScroll, Cursor, Preloader, LocaleSwitch, ReviewMode
    home/                 Hero (гравці-вирізки по боках + MatchesTicker знизу), LatestNews, SquadShowcase,
                          LeagueTableBlock (зони ЛЧ/ЛЄ/пониження, реюзається і на /tablytsya), ClubHistory (+ PartnersList під гербом), PartnersList
    matches/              MatchesFull — сітка результатів+розкладу на /matchi (фільтр дім/виїзд, розгортання «Склад на матч»), MatchLineup — пітч-діаграма стартового складу
    team/                 SquadGrid, PlayerOfRound, StaffRow, KitShowcase (комплекти форми, SVG-ілюстрації)
    ui/                   SectionHeader, MaskText, Reveal, ArrowLink, PageIntro (з посиланням «На головну»)
  content/                players, staff, playerStats, news, matches, table, lineups, kits, history, club, vote, types  ← весь контент тут
  i18n/                   config, get-dictionary, dictionaries/
  hooks/                  useInViewOnce, useScrolled, useAutoScroll
  lib/                    utils (cn, formatDate/Time, localeHref, pluralUk), crest (crestFor: назва команди → /upl/<slug>.png)
public/players|coaches|upl|brand   стиснуті фото/герби (студійні портрети на білому — виносяться на фон через mix-blend-darken)
```

Хедер: окремі пункти «Розклад матчів» (`/matchi`) і «Таблиця» (`/tablytsya`), не якорі.
Партнери — не окрема секція, а блок під гербом клубу всередині «Клуб» (`ClubHistory` → `PartnersList`).
Кожна внутрішня сторінка (`PageIntro`) має посилання «На головну» (`dict.nav.backHome`).

### Розклад матчів і таблиця

- `/matchi` → `MatchesFull` (клієнтський компонент): фільтр «Усі / Вдома / У гостях», картки результатів з бейджем В/Н/П, голами (⚽ ім'я хвилина) і розгортанням «Склад на матч» (пітч-діаграма 4-3-3 через `MatchLineup` + список запасних). Стартові склади — `src/content/lineups.ts`, узгоджені з голами гравців у `playerStats.ts`.
- `/tablytsya` → `LeagueTableBlock`: кольорові маркери зон за зразком довідкового сайту УПЛ — 1 місце (Ліга чемпіонів), 2–3 (Ліга Європи/Конференцій, кваліфікація), 13–14 (перехідні матчі), 15–16 (пониження), плюс легенда під таблицею.

### Комплекти форми

`/uk/komanda` (внизу сторінки) → `KitShowcase`: домашній/виїзний/третій комплект, кожен — флет-ілюстрація SVG у брендових кольорах (`src/content/kits.ts`), бо фотографій продукції з fclb-shop.com у контенті поки немає. Посилання «У фан-шопі» веде на fclb-shop.com.

## Дизайн-константи

Бренд-ассети клубу — у папці `brand/` (логотип, свотчі кольорів).

| Роль | Значення | Токен |
|------|----------|-------|
| Полотно | `#f6f4ee` (тепле майже-біле) | `--paper` |
| Основний зелений | `#205532` | `--green` (структурні заливки) |
| Темний зелений | `#15361f` | `--green-deep` (футер, інверсні блоки) |
| Текст (ink) | `#16261c` | `--ink` |
| Акцент (жовтий, ~2% площі) | `#fdca26` | `--yellow` |

- Дисплейний шрифт: **Oswald** (condensed, кирилиця) — заголовки, номери.
- Основний: **Manrope** — body/UI.
- Моно: **JetBrains Mono** — лейбли, статистика, таблиці.
- Правила: без тіней, радіус 0, один акцент, скролові ефекти помірно (2–3 «вау»-моменти), `prefers-reduced-motion` обов'язково.

## Дані

Контент у `src/content/*.ts` — знімок із fclb.com.ua станом на вересень 2026 (склад, останні новини, таблиця УПЛ 2026/27, найближчі тури, статистика гравців у `playerStats.ts` — підібрані реалістичні числа, узгоджені з рахунками матчів). Оновлюється редагуванням цих файлів; CMS поки немає.

## Голосування «Гравець туру»

`/uk/komanda` → `PlayerOfRound` (клієнтський компонент) звертається до `/api/vote` (Route Handler, `src/app/api/vote/route.ts`). Це єдина частина сайту з реальним бекендом:

- Лічильники голосів зберігаються в **Vercel KV** (`@vercel/kv`, хеш `votes:round:<N>`).
- Один голос на браузер — httpOnly-кука `lb-voted-round-<N>`, не бездоганний захист від фроду, але достатній для фанатського опитування.
- Кандидати й номер туру — `src/content/vote.ts` (`VOTE_CANDIDATES`, `CURRENT_ROUND`), оновлюється вручну щотижня.
- **Без підключеної KV** API не падає — тихо повертає `configured: false`, і віджет показує «Голосування тимчасово недоступне» замість кнопок. Щоб увімкнути насправді: у Vercel → Project → Storage → підключити **KV** (або маркетплейс-інтеграцію «Upstash for Redis» — той самий формат env-змінних). Локально — `vercel env pull .env.local` або вручну за прикладом `.env.local.example`.
