"use client";

import { useMemo, useState } from "react";

export interface TaskRouteDatum {
  id: string;
  name: string; // "Provider — plan"
  blended: number; // $/M tokens at the route's current published price
  batch: number | null; // computed batch $/M, null when no published modifier
  batchApprox: boolean;
  sourceUrl: string;
  accessed: string;
  cacheNote: string | null;
}

function fmt(v: number): string {
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}

/**
 * "What does ONE finished task cost?" — the same blended $/M arithmetic the
 * leaderboard uses, applied to a chosen route at a chosen task size.
 * Pure client math on figures computed server-side from verified data.
 */
export default function OneTaskCost({ routes }: { routes: TaskRouteDatum[] }) {
  const [tokens, setTokens] = useState(100_000);
  const [routeId, setRouteId] = useState(routes[0]?.id ?? "");
  const route = routes.find((r) => r.id === routeId) ?? routes[0];

  const perTask = useMemo(() => {
    if (!route) return null;
    return (route.blended * tokens) / 1_000_000;
  }, [route, tokens]);
  const batchTask = useMemo(() => {
    if (!route || route.batch == null) return null;
    return (route.batch * tokens) / 1_000_000;
  }, [route, tokens]);

  if (!route) return null;

  return (
    <div className="rounded-xl border border-line-strong bg-card p-5">
      <p className="eyebrow">Cost of one task</p>
      <div className="mt-4 space-y-5">
        <div>
          <label htmlFor="ot-route" className="flex justify-between text-sm font-semibold">
            <span>Route</span>
            <span className="text-xs font-normal text-ink-mute">{tokens.toLocaleString("en-US")} tokens/task</span>
          </label>
          <select
            id="ot-route"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="mt-2 min-h-[44px] w-full rounded-lg border border-line-strong bg-card px-3 text-sm"
          >
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {fmt(r.blended)}/M
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ot-tokens" className="flex justify-between text-sm font-semibold">
            <span>Tokens in this task</span>
            <span className="data">{tokens.toLocaleString("en-US")}</span>
          </label>
          <input
            id="ot-tokens"
            type="range"
            min={10_000}
            max={500_000}
            step={10_000}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            className="mt-2 min-h-[44px] w-full accent-teal"
          />
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-paper-deep p-4" aria-live="polite">
        <p className="eyebrow">Estimated cost, this task</p>
        <p className="data mt-1.5 text-2xl font-semibold">{perTask != null ? fmt(perTask) : "—"}</p>
        <p className="data mt-1 text-sm text-ink-soft">
          {fmt(route.blended)}/M blended × {tokens.toLocaleString("en-US")} tokens
          {batchTask != null && (
            <> · batch {route.batchApprox ? "≈" : ""}{fmt(batchTask)} if queued at the published batch rate</>
          )}
        </p>
        <p className="mt-2 text-[11px] leading-snug text-ink-mute">
          Price read {route.accessed} from the provider&apos;s own page (
          <a className="u-draw" href={route.sourceUrl} target="_blank" rel="noopener nofollow">
            source
          </a>
          ){route.cacheNote ? ` · Cache: ${route.cacheNote}` : ""} — blends (3 × input + 1 × output) / 4;
          your task&apos;s real in/out mix will differ.
        </p>
      </div>
    </div>
  );
}
