import { leagueTable } from "@/content/table";

/** UPL club crest for a team name (uk or en), falling back to our own. */
export function crestFor(team: string): string {
  const row = leagueTable.find((r) => r.team === team || r.teamEn === team);
  return `/upl/${row?.slug ?? "livyi-bereh"}.png`;
}
