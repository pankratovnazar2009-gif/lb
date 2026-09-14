/**
 * Starting XIs for our own results, season 2026/27 — "склади на матч".
 * Only our own selection is modelled (opponents' lineups aren't published
 * anywhere we source from). `startXI` is ordered GK → DF → MF → FW to match
 * the pitch diagram in MatchLineup. Goal totals below tie out exactly with
 * playerStats.ts (bondarenko 1, banada 2, florencio 2, voloshynN 2,
 * souzaDaSilva 1 = 8, matching the 8 goals LB scored across r1–r6).
 */
export interface Goal {
  id: string;
  minute: number;
}

export interface Lineup {
  formation: string;
  startXI: string[];
  subs: string[];
  goals?: Goal[];
}

export const lineups: Record<string, Lineup> = {
  r1: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "sokolov", "samar", "silva-santos", "kotukha",
      "vorobchak", "kryvoruchko", "banada",
      "florencio", "voloshyn-n", "fall",
    ],
    subs: ["domoleha", "astakhov", "syzoniuk", "tishchenko", "souza-da-silva", "kvasnytsia", "heresh"],
    goals: [{ id: "bondarenko", minute: 61 }],
  },
  r2: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "sokolov", "samar", "osei-bonsu", "yakymiv",
      "souza-da-silva", "banada", "shastal",
      "florencio", "voloshyn-n", "heresh",
    ],
    subs: ["domoleha", "kotukha", "silva-santos", "kryvoruchko", "vorobchak", "kvasnytsia", "fall"],
  },
  r3: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "samar", "silva-santos", "kovalenko", "syzoniuk",
      "kryvoruchko", "banada", "voloshyn-v",
      "florencio", "fall", "voloshyn-n",
    ],
    subs: ["domoleha", "sokolov", "yakymiv", "souza-da-silva", "vorobchak", "tishchenko", "cheliadin"],
    goals: [
      { id: "florencio", minute: 23 },
      { id: "voloshyn-n", minute: 77 },
    ],
  },
  r4: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "sokolov", "samar", "silva-santos", "osei-bonsu",
      "souza-da-silva", "kryvoruchko", "banada",
      "florencio", "voloshyn-n", "fall",
    ],
    subs: ["domoleha", "kotukha", "yakymiv", "vorobchak", "shastal", "kvasnytsia", "heresh"],
    goals: [{ id: "banada", minute: 45 }],
  },
  r5: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "sokolov", "samar", "silva-santos", "kotukha",
      "souza-da-silva", "kryvoruchko", "banada",
      "florencio", "voloshyn-n", "fall",
    ],
    subs: ["domoleha", "osei-bonsu", "yakymiv", "vorobchak", "shastal", "kvasnytsia", "heresh"],
    goals: [
      { id: "souza-da-silva", minute: 55 },
      { id: "florencio", minute: 82 },
    ],
  },
  r6: {
    formation: "4-3-3",
    startXI: [
      "ihnatenko",
      "sokolov", "samar", "osei-bonsu", "yakymiv",
      "kryvoruchko", "banada", "vorobchak",
      "florencio", "voloshyn-n", "fall",
    ],
    subs: ["domoleha", "kotukha", "silva-santos", "souza-da-silva", "shastal", "tishchenko", "heresh"],
    goals: [
      { id: "banada", minute: 30 },
      { id: "voloshyn-n", minute: 68 },
    ],
  },
};

export function lineupFor(matchId: string): Lineup | undefined {
  return lineups[matchId];
}
