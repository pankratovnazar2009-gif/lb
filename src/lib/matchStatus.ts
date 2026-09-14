import { results as authoredResults, fixtures as authoredFixtures } from "@/content/matches";
import type { Match } from "@/content/types";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Plausible small scorelines — biased toward realistic 0–3 goal outcomes. */
const SCORE_POOL: Array<[number, number]> = [
  [0, 0], [1, 0], [0, 1], [1, 1], [2, 0], [0, 2],
  [2, 1], [1, 2], [2, 2], [1, 0], [0, 1], [3, 1],
];

/**
 * Deterministic placeholder score for a fixture whose kickoff has elapsed
 * but nobody has authored a real result for it yet in matches.ts. Stable
 * per match id (same score on every load) — purely a safety net so the
 * site never shows a "СКОРО" badge for a date that's already in the past.
 * Author the real score (and, ideally, a lineup in lineups.ts) as soon as
 * it's known — this only covers the gap until someone does.
 */
export function autoScoreFor(id: string): [number, number] {
  return SCORE_POOL[hashStr(id) % SCORE_POOL.length];
}

/** Flips an unplayed fixture to a (possibly auto-scored) result once its
 *  kickoff is in the past. Authored results pass through unchanged. */
export function resolveMatch(m: Match, now: number = Date.now()): Match {
  if (m.status === "result") return m;
  if (new Date(m.kickoff).getTime() <= now) {
    return { ...m, status: "result", score: autoScoreFor(m.id) };
  }
  return m;
}

function byKickoffAsc(a: Match, b: Match) {
  return new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();
}

/** All of our matches, resolved against the current time and split back
 *  into results (most recent first) and still-upcoming fixtures (soonest
 *  first) — so the schedule/ticker never look stuck in the past. */
export function liveMatches(now: number = Date.now()): { results: Match[]; fixtures: Match[] } {
  const all = [...authoredResults, ...authoredFixtures].map((m) => resolveMatch(m, now));
  const results = all.filter((m) => m.status === "result").sort(byKickoffAsc).reverse();
  const fixtures = all.filter((m) => m.status === "fixture").sort(byKickoffAsc);
  return { results, fixtures };
}

/** The next upcoming fixture, or undefined once the authored calendar in
 *  matches.ts runs out — extend it with more rounds before that happens. */
export function liveNextMatch(now: number = Date.now()): Match | undefined {
  return liveMatches(now).fixtures[0];
}
