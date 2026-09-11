import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import { CURRENT_ROUND, VOTE_CANDIDATES } from "@/content/vote";

const KEY = `votes:round:${CURRENT_ROUND}`;
const COOKIE = `lb-voted-round-${CURRENT_ROUND}`;
const zeroed = () => VOTE_CANDIDATES.map((id) => ({ id, votes: 0 }));

async function readTallies() {
  const raw = (await kv.hgetall<Record<string, number>>(KEY)) ?? {};
  return VOTE_CANDIDATES.map((id) => ({ id, votes: Number(raw[id] ?? 0) }));
}

/** GET current tallies. Falls back to a quiet "not configured" response
 *  instead of a 500 when no KV store is attached to the project. */
export async function GET() {
  const store = await cookies();
  const voted = store.has(COOKIE);
  try {
    return NextResponse.json({ configured: true, voted, candidates: await readTallies() });
  } catch {
    return NextResponse.json({ configured: false, voted, candidates: zeroed() });
  }
}

/** POST { candidateId } to cast one vote. One vote per browser via an
 *  httpOnly cookie — a soft guard, not fraud-proof, which is the right
 *  amount of ceremony for a fan poll. */
export async function POST(request: Request) {
  const store = await cookies();
  if (store.has(COOKIE)) {
    const candidates = await readTallies().catch(zeroed);
    return NextResponse.json({ configured: true, voted: true, candidates }, { status: 409 });
  }

  let candidateId: unknown;
  try {
    candidateId = (await request.json())?.candidateId;
  } catch {
    // malformed body — handled by the validation below
  }
  if (typeof candidateId !== "string" || !VOTE_CANDIDATES.includes(candidateId)) {
    return NextResponse.json({ error: "invalid candidate" }, { status: 400 });
  }

  try {
    await kv.hincrby(KEY, candidateId, 1);
    const res = NextResponse.json({ configured: true, voted: true, candidates: await readTallies() });
    res.cookies.set(COOKIE, "1", {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ configured: false, voted: false, candidates: zeroed() });
  }
}
