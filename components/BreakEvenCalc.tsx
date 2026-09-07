"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BASELINE_PAYG_PER_TASK,
  COMPARE_SUB_PRICE,
  MAX_SEATS,
  REFERENCE_BASKET_NOTE,
  cheapestRoute,
  clampSeats,
  compareTeamOptions,
  fmtTasks,
  fmtUSD,
} from "@/lib/effectiveCost";
import { SNAPSHOT_DATE } from "@/lib/site";

/**
 * Break-even calculator. Prerenders with default inputs (no useSearchParams
 * → no Suspense shell), then adopts ?tasks= & ?tokens= & ?seats= after mount;
 * the URL updates as you drag so results stay shareable.
 *
 * Tasks and tokens are team totals; the seats slider (1–50) multiplies
 * per-seat plan math and recommends the cheapest multi-seat-compliant setup.
 */
function Inner({
  defaultTasks = 120,
  defaultTokens = 100_000,
}: {
  defaultTasks?: number;
  defaultTokens?: number;
}) {
  const pathname = usePathname();
  const [tasks, setTasks] = useState(defaultTasks);
  const [tokens, setTokens] = useState(defaultTokens);
  const [seats, setSeats] = useState(1);

  // Adopt shared URLs (?tasks=500&tokens=200000&seats=10) after hydration.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = Number(sp.get("tasks"));
    const k = Number(sp.get("tokens"));
    const s = Number(sp.get("seats"));
    // Intentional post-hydration adoption of URL params: initializing state
    // from window.location would mismatch the static prerender.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t) setTasks(Math.min(500, Math.max(0, Math.round(t))));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (k) setTokens(Math.min(500_000, Math.max(1000, Math.round(k))));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s) setSeats(clampSeats(s));
  }, []);

  function set(key: "tasks" | "tokens" | "seats", value: number) {
    const next = new URLSearchParams(window.location.search);
    next.set(key, String(value));
    window.history.replaceState(null, "", `${pathname}?${next.toString()}`);
    if (key === "tasks") setTasks(value);
    else if (key === "tokens") setTokens(value);
    else setSeats(value);
  }

  const r = useMemo(() => cheapestRoute(tasks, tokens), [tasks, tokens]);
  const team = useMemo(
    () => compareTeamOptions(tasks, tokens, seats),
    [tasks, tokens, seats],
  );
  const maxCost = Math.max(r.paygMonthly, r.subMonthly, 1);
  const paygW = Math.max(0.5, (r.paygMonthly / maxCost) * 100);
  const subW = Math.max(0.5, (r.subMonthly / maxCost) * 100);
  const teamMax = Math.max(team.paygMonthly, team.cheapest.monthly, 1);

  return (
    <div className="rounded-xl border border-line-strong bg-card p-5">
      <p className="eyebrow">Inputs</p>
      <div className="mt-4 space-y-5">
        <div>
          <label htmlFor="be-tasks" className="flex justify-between text-sm font-semibold">
            <span>Tasks per month{seats > 1 ? " (team total)" : ""}</span>
            <span className="data">{tasks.toLocaleString("en-US")}</span>
          </label>
          <input
            id="be-tasks"
            type="range"
            min={5}
            max={500}
            step={5}
            value={Math.min(500, tasks)}
            onChange={(e) => set("tasks", Number(e.target.value))}
            className="mt-2 min-h-[44px] w-full accent-teal"
          />
        </div>
        <div>
          <label htmlFor="be-tokens" className="flex justify-between text-sm font-semibold">
            <span>Tokens per task</span>
            <span className="data">{tokens.toLocaleString("en-US")}</span>
          </label>
          <input
            id="be-tokens"
            type="range"
            min={10_000}
            max={500_000}
            step={10_000}
            value={Math.min(500_000, tokens)}
            onChange={(e) => set("tokens", Number(e.target.value))}
            className="mt-2 min-h-[44px] w-full accent-teal"
          />
        </div>
        <div>
          <label htmlFor="be-seats" className="flex justify-between text-sm font-semibold">
            <span>Team size (seats)</span>
            <span className="data">{seats === 1 ? "1 (solo)" : seats}</span>
          </label>
          <input
            id="be-seats"
            type="range"
            min={1}
            max={MAX_SEATS}
            step={1}
            value={seats}
            onChange={(e) => set("seats", clampSeats(Number(e.target.value)))}
            className="mt-2 min-h-[44px] w-full accent-teal"
          />
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-paper-deep p-4" aria-live="polite">
        {seats === 1 ? (
          <>
            <p className="eyebrow">Lowest-cost option at these inputs</p>
            <p className="data mt-1.5 text-xl font-semibold">
              {r.cheapest === "payg"
                ? `Pay-as-you-go — about ${fmtUSD(r.paygMonthly)}/mo`
                : `Flat subscription — $${COMPARE_SUB_PRICE}/mo`}
            </p>
            <p className="data mt-1 text-sm text-ink-soft">
              {fmtUSD(r.paygMonthly)}/mo pay-as-you-go vs {fmtUSD(r.subMonthly)}/mo flat · crossover{" "}
              {fmtTasks(r.crossover)}
              {r.savings > 0 && <> · {fmtUSD(r.savings)}/mo difference</>}
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Cheapest team setup for {seats} seats</p>
            <p className="data mt-1.5 text-xl font-semibold">
              {team.cheapest.kind === "payg"
                ? `Pay-as-you-go — about ${fmtUSD(team.paygMonthly)}/mo`
                : `${team.cheapest.name} — about ${fmtUSD(team.cheapest.monthly)}/mo`}
            </p>
            <p className="data mt-1 text-sm text-ink-soft">
              {fmtUSD(team.paygMonthly)}/mo pay-as-you-go vs{" "}
              {fmtUSD(team.cheapest.monthly)}/mo ({team.cheapest.name}
              {team.cheapest.perSeat != null ? `, ${fmtUSD(team.cheapest.perSeat, 0)}/seat` : ""}) ·{" "}
              {fmtUSD(Math.abs(team.paygMonthly - team.cheapest.monthly))}/mo difference
            </p>
          </>
        )}
        <p className="data mt-2 text-[11px] leading-snug text-ink-mute">
          Verified {SNAPSHOT_DATE} · the URL updates as you drag, so results are shareable.
        </p>
        <Link
          href={`/best/kimi-k3-core/?tasks=${tasks}&tokens=${tokens}#${
            r.cheapest === "sub" ? "verdict" : "economics"
          }`}
          className="u-draw mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-teal-deep"
        >
          Open the matching offer details with these inputs
        </Link>
      </div>

      {seats > 1 && (
        <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-paper-deep">
          <table className="ledger text-left text-[12.5px]">
            <caption className="px-4 pb-1 pt-3 text-left text-[11px] text-ink-mute">
              Per-seat plans × {seats} seats, cheapest first. Single-user consumer tiers are
              excluded; seat totals are list-price multiplication only.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-2">Setup</th>
                <th scope="col" className="px-4 py-2 text-right">Per seat</th>
                <th scope="col" className="px-4 py-2 text-right">Team/mo</th>
              </tr>
            </thead>
            <tbody>
              {team.options.map((o, i) => (
                <tr key={o.id ?? "payg"} className={i === 0 ? "font-semibold" : undefined}>
                  <th scope="row" className="px-4 py-2 font-normal">
                    {i === 0 && (
                      <span className="mr-1.5 rounded-full bg-teal-wash px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-deep">
                        cheapest
                      </span>
                    )}
                    {o.name}
                    <span className="block text-[11px] font-normal text-ink-mute">{o.note}</span>
                  </th>
                  <td className="data px-4 py-2 text-right">
                    {o.perSeat != null ? fmtUSD(o.perSeat, 0) : "—"}
                  </td>
                  <td className="data px-4 py-2 text-right">{fmtUSD(o.monthly)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Monthly cost bars at the current inputs */}
      <div className="mt-5 space-y-3">
        <div>
          <p className="flex justify-between text-xs font-semibold">
            <span>
              Pay-as-you-go at {fmtUSD(team.perTask)}/task
              {seats > 1 ? ` × ${tasks} team tasks` : ""}
            </span>
            <span className="data">{fmtUSD(seats > 1 ? team.paygMonthly : r.paygMonthly)}/mo</span>
          </p>
          <div className="mt-1 h-2 overflow-hidden rounded-[2px] bg-paper-deep">
            <div
              className="h-full bg-ink-soft"
              style={{
                width: `${seats > 1 ? Math.max(0.5, (team.paygMonthly / teamMax) * 100) : paygW}%`,
              }}
            />
          </div>
        </div>
        <div>
          <p className="flex justify-between text-xs font-semibold">
            <span>
              {seats > 1
                ? `${team.cheapest.name} × ${seats} seats`
                : `$${COMPARE_SUB_PRICE} flat subscription`}
            </span>
            <span className="data">
              {fmtUSD(seats > 1 ? team.cheapest.monthly : r.subMonthly)}/mo
            </span>
          </p>
          <div className="mt-1 h-2 overflow-hidden rounded-[2px] bg-paper-deep">
            <div
              className="h-full bg-teal"
              style={{
                width: `${seats > 1 ? Math.max(0.5, (team.cheapest.monthly / teamMax) * 100) : subW}%`,
              }}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-snug text-ink-mute">
        Reference: ${COMPARE_SUB_PRICE} sub vs {fmtUSD(BASELINE_PAYG_PER_TASK)}/task pay-as-you-go
        breaks even at 50 tasks. The per-task rate scales with the tokens slider at an illustrative
        $8 per 1M blended tokens — your mix will differ. {REFERENCE_BASKET_NOTE}
        {seats > 1 &&
          " Team seat totals multiply verified list prices; credit overages, quota caps, and annual-prepay discounts differ per plan."}
      </p>
    </div>
  );
}

export default function BreakEvenCalc(props: { defaultTasks?: number; defaultTokens?: number }) {
  return <Inner {...props} />;
}
