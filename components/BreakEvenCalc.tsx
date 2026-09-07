"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BASELINE_PAYG_PER_TASK,
  COMPARE_SUB_PRICE,
  REFERENCE_BASKET_NOTE,
  cheapestRoute,
  fmtTasks,
  fmtUSD,
} from "@/lib/effectiveCost";
import { SNAPSHOT_DATE } from "@/lib/site";

/**
 * The living hero: usage sliders compute "here's what YOU should pay".
 * Prerenders with default inputs (no useSearchParams → no Suspense shell),
 * then adopts ?tasks= & ?tokens= after mount; the URL updates as you drag.
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

  // Adopt shared URLs (?tasks=500&tokens=200000) after hydration.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = Number(sp.get("tasks"));
    const k = Number(sp.get("tokens"));
    if (t) setTasks(Math.min(500, Math.max(0, Math.round(t))));
    if (k) setTokens(Math.min(500_000, Math.max(1000, Math.round(k))));
  }, []);

  function set(key: "tasks" | "tokens", value: number) {
    const next = new URLSearchParams(window.location.search);
    next.set(key, String(value));
    window.history.replaceState(null, "", `${pathname}?${next.toString()}`);
    if (key === "tasks") setTasks(value);
    else setTokens(value);
  }

  const r = useMemo(() => cheapestRoute(tasks, tokens), [tasks, tokens]);
  const maxCost = Math.max(r.paygMonthly, r.subMonthly, 1);
  const paygW = Math.max(2, (r.paygMonthly / maxCost) * 100);
  const subW = Math.max(2, (r.subMonthly / maxCost) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-teal-deep p-5 text-white sm:p-6">
      <div aria-hidden="true" className="paper-grid-light pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="eyebrow eyebrow-light">Your usage — drag to compute</p>
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="be-tasks" className="flex justify-between text-sm font-bold">
              <span>Tasks per month</span>
              <span className="data text-teal-wash">{tasks.toLocaleString("en-US")}</span>
            </label>
            <input
              id="be-tasks"
              type="range"
              min={5}
              max={500}
              step={5}
              value={Math.min(500, tasks)}
              onChange={(e) => set("tasks", Number(e.target.value))}
              className="mt-2 min-h-[44px] w-full accent-white"
            />
          </div>
          <div>
            <label htmlFor="be-tokens" className="flex justify-between text-sm font-bold">
              <span>Tokens per task</span>
              <span className="data text-teal-wash">{tokens.toLocaleString("en-US")}</span>
            </label>
            <input
              id="be-tokens"
              type="range"
              min={10_000}
              max={500_000}
              step={10_000}
              value={Math.min(500_000, tokens)}
              onChange={(e) => set("tokens", Number(e.target.value))}
              className="mt-2 min-h-[44px] w-full accent-white"
            />
          </div>
        </div>

        {/* The answer: verified date stamped beside it, shareable URL above */}
        <div className="mt-5 rounded-xl bg-card p-4 text-ink" aria-live="polite">
          <p className="eyebrow eyebrow-ink">Here&apos;s what you should pay</p>
          <p className="data mt-1.5 text-2xl font-semibold">
            {r.cheapest === "payg"
              ? `Pay-as-you-go — about ${fmtUSD(r.paygMonthly)}/mo`
              : `The $${COMPARE_SUB_PRICE} flat subscription`}
          </p>
          <p className="data mt-1 text-sm text-ink-soft">
            {fmtUSD(r.paygMonthly)}/mo pay-as-you-go vs {fmtUSD(r.subMonthly)}/mo flat · crossover{" "}
            {fmtTasks(r.crossover)}
            {r.savings > 0 && (
              <>
                {" · "}
                <span className="font-semibold text-amber-deep">saves {fmtUSD(r.savings)}/mo</span>
              </>
            )}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="stamp stamp-teal">Verified · {SNAPSHOT_DATE}</span>
            <p className="data text-[11px] leading-snug text-ink-mute">
              Shareable — the URL updates as you drag.
            </p>
          </div>
          {/* Deep link: carries your inputs to the matching verdict section */}
          <Link
            href={`/best/kimi-k3-core/?tasks=${tasks}&tokens=${tokens}#${
              r.cheapest === "sub" ? "verdict" : "economics"
            }`}
            className="u-draw mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-teal-deep"
          >
            {r.cheapest === "sub"
              ? "See the subscription verdict, with your numbers →"
              : "See the pay-as-you-go verdict, with your numbers →"}
          </Link>
        </div>

        {/* The work: monthly cost bars at your inputs */}
        <div className="relative mt-5 space-y-3" aria-hidden="true">
          <div>
            <p className="flex justify-between text-xs font-bold">
              <span>PAYG at {fmtUSD(r.perTask)}/task</span>
              <span className="data">{fmtUSD(r.paygMonthly)}/mo</span>
            </p>
            <div className="mt-1 h-3 overflow-hidden rounded-[3px] bg-white/15">
              <div
                className="scroll-grow grow h-full rounded-[3px] bg-white"
                style={{ width: `${paygW}%` }}
              />
            </div>
          </div>
          <div>
            <p className="flex justify-between text-xs font-bold">
              <span>${COMPARE_SUB_PRICE} flat subscription</span>
              <span className="data">{fmtUSD(r.subMonthly)}/mo</span>
            </p>
            <div className="mt-1 h-3 overflow-hidden rounded-[3px] bg-white/15">
              <div
                className="scroll-grow grow h-full rounded-[3px] bg-teal"
                style={{ width: `${subW}%` }}
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-snug text-teal-wash">
          Reference: ${COMPARE_SUB_PRICE} sub vs {fmtUSD(BASELINE_PAYG_PER_TASK)}/task PAYG breaks
          even at 50 tasks. PAYG/task scales with your tokens-per-task slider at an illustrative $8
          per 1M blended tokens — your mix will differ. {REFERENCE_BASKET_NOTE}
        </p>
      </div>
    </div>
  );
}

export default function BreakEvenCalc(props: { defaultTasks?: number; defaultTokens?: number }) {
  return <Inner {...props} />;
}
