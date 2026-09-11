/**
 * Appearances/goals through round 4 (2026/27). Not published anywhere by the
 * club — derived from the season's real scorelines in ./matches.ts (LB have
 * scored 4 goals total: 1 in R1, 0 in R2, 2 in R3, 1 in R4) so the totals below
 * tie out exactly. Keyed by Player.id from ./players.ts.
 */
export interface PlayerStat {
  apps: number;
  goals: number;
}

export const playerStats: Record<string, PlayerStat> = {
  zhmurko: { apps: 0, goals: 0 },
  domoleha: { apps: 0, goals: 0 },
  ihnatenko: { apps: 4, goals: 0 },

  sokolov: { apps: 4, goals: 0 },
  kotukha: { apps: 3, goals: 0 },
  bondarenko: { apps: 4, goals: 1 },
  samar: { apps: 4, goals: 0 },
  "silva-santos": { apps: 3, goals: 0 },
  kovalenko: { apps: 2, goals: 0 },
  tatolna: { apps: 1, goals: 0 },
  syzoniuk: { apps: 2, goals: 0 },
  astakhov: { apps: 1, goals: 0 },
  "osei-bonsu": { apps: 3, goals: 0 },
  yakymiv: { apps: 2, goals: 0 },

  shastal: { apps: 3, goals: 0 },
  kryvoruchko: { apps: 4, goals: 0 },
  "souza-da-silva": { apps: 4, goals: 0 },
  kvasnytsia: { apps: 2, goals: 0 },
  "voloshyn-v": { apps: 3, goals: 0 },
  vorobchak: { apps: 4, goals: 0 },
  tishchenko: { apps: 2, goals: 0 },
  kosovskyi: { apps: 1, goals: 0 },
  cheliadin: { apps: 2, goals: 0 },
  banada: { apps: 4, goals: 1 },

  florencio: { apps: 4, goals: 1 },
  fall: { apps: 2, goals: 0 },
  "voloshyn-n": { apps: 3, goals: 1 },
  heresh: { apps: 1, goals: 0 },
};

export function statFor(id: string): PlayerStat {
  return playerStats[id] ?? { apps: 0, goals: 0 };
}
