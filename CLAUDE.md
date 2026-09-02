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
  app/[locale]/           layout (шрифти, хедер/футер, прелоадер) + page (головна) + komanda, novyny
  components/
    layout/               SiteHeader, SiteFooter, Crest, MobileMenu, SmoothScroll, Cursor, Preloader, LocaleSwitch, ReviewMode
    home/                 Hero, NextMatchCard, LatestNews, MatchesRibbon, SquadShowcase, LeagueTableBlock, ClubHistory, MediaStrip, AcademyCta, SocialMarquee
    team/                 SquadGrid, StaffRow
    ui/                   SectionHeader, MaskText, Reveal, ArrowLink, PageIntro
  content/                players, staff, news, matches, table, history, club, types  ← весь контент тут
  i18n/                   config, get-dictionary, dictionaries/
  hooks/                  useInViewOnce, useScrolled
public/players|coaches|media|brand   стиснуті фото (студійні портрети на білому — виносяться на фон через mix-blend-darken)
```

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

Контент у `src/content/*.ts` — знімок із fclb.com.ua станом на вересень 2026 (склад, останні новини, таблиця УПЛ 2026/27, найближчі тури). Оновлюється редагуванням цих файлів; CMS поки немає.
