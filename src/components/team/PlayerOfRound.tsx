"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { players } from "@/content/players";
import { VOTE_CANDIDATES } from "@/content/vote";
import { cn } from "@/lib/utils";

interface Tally {
  id: string;
  votes: number;
}
interface VoteResponse {
  configured: boolean;
  voted: boolean;
  candidates: Tally[];
}

export function PlayerOfRound({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, setState] = useState<VoteResponse | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vote")
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ configured: false, voted: false, candidates: [] }));
  }, []);

  async function vote(id: string) {
    if (!state || state.voted || pending) return;
    setPending(id);
    try {
      const r = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: id }),
      });
      const data: VoteResponse = await r.json();
      setState(data);
    } finally {
      setPending(null);
    }
  }

  const total = state?.candidates.reduce((sum, c) => sum + c.votes, 0) ?? 0;
  const showResults = !!state?.voted;

  return (
    <div className="shell gutter border-t border-ink pt-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="label text-ink-soft">{dict.vote.label}</p>
          <h2 className="font-display mt-1 text-2xl text-ink md:text-3xl">{dict.vote.title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{dict.vote.subtitle}</p>
        </div>
        {showResults && (
          <span className="label text-ink-soft">{total} {dict.vote.total}</span>
        )}
      </div>

      {state && !state.configured && (
        <p className="label mt-6 text-ink-soft">{dict.vote.unavailable}</p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
        {VOTE_CANDIDATES.map((id) => {
          const p = players.find((pl) => pl.id === id);
          if (!p) return null;
          const name = locale === "uk" ? p.last : p.lastEn;
          const tally = state?.candidates.find((c) => c.id === id);
          const pct = total > 0 && tally ? Math.round((tally.votes / total) * 100) : 0;

          return (
            <div key={id} data-cursor>
              <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                <Image
                  src={p.photo}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 45vw, 20vw"
                  className="tone-warm object-cover object-top mix-blend-darken"
                />
              </div>
              <div className="mt-3 border-t border-ink pt-2">
                <span className="font-display block text-lg leading-none text-ink">{name}</span>

                {state?.configured && showResults ? (
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-paper-3">
                      <div className="h-full bg-green transition-[width] duration-700" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="label mt-2 block text-ink-soft">
                      {pct}% · {tally?.votes ?? 0}
                    </span>
                  </div>
                ) : state?.configured ? (
                  <button
                    type="button"
                    onClick={() => vote(id)}
                    disabled={pending === id}
                    className="label mt-3 w-full border border-ink py-2 text-ink transition-colors duration-200 hover:bg-green hover:border-green hover:text-on-green disabled:opacity-50"
                  >
                    {dict.vote.cta}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {showResults && (
        <p className="label mt-6 text-green">{dict.vote.voted}</p>
      )}
    </div>
  );
}
