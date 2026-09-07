import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Pareto framing mapped to success-per-dollar, from first-party snapshot
 * numbers only (no external benchmark data republished).
 * Volume: 120 tasks/mo at the 100k tokens/task illustrative reference.
 */
const ROWS = [
  { name: "Zen Muse Spark 1.3 Free (promo)", cost: 0, perTask: 0, perDollar: null as number | null, note: "$0 while promo lasts — not durable" },
  { name: "NVIDIA K3 Free (dev)", cost: 0, perTask: 0, perDollar: null, note: "$0 dev/prototyping — not production" },
  { name: "Kimi Allegretto monthly", cost: 39, perTask: 0.33, perDollar: 3.08, note: "Durable paid pick at this volume" },
  { name: "PAYG reference", cost: 96, perTask: 0.8, perDollar: 1.25, note: "No commitment, highest unit cost" },
];

const MAX_COST = 96;
const MAX_PER_DOLLAR = 3.08;

export default function ParetoStrip() {
  return (
    <div>
      <p className="eyebrow">The frontier</p>
      <h2 className="display-lg mt-2">Success per dollar</h2>
      <p className="mt-2 text-sm text-ink-soft">
        At 120 tasks/mo on the illustrative 100k-tokens/task reference.{" "}
        <span className="font-semibold">Lower cost-per-task is better · higher tasks-per-dollar is better.</span>{" "}
        Free routes win on price but not durability — that is the trade-off frontier.
      </p>
      <div className="mt-5 space-y-4">
        {ROWS.map((r) => (
          <div key={r.name}>
            <p className="flex flex-wrap justify-between gap-x-3 text-sm font-bold">
              <span>{r.name}</span>
              <span className="data text-ink-soft">
                {r.cost === 39 || r.cost === 96 ? (
                  <span
                    className="count-up"
                    data-final={`$${r.cost}/mo`}
                    style={{ "--target": r.cost } as CSSProperties}
                  >
                    ${r.cost}/mo
                  </span>
                ) : (
                  `$${r.cost}/mo`
                )}{" "}
                · ${r.perTask.toFixed(2)}/task ·{" "}
                {r.perDollar === null ? "tasks/$: n/a at $0" : `${r.perDollar.toFixed(2)} tasks/$`}
              </span>
            </p>
            <div
              className="mt-1 h-3 overflow-hidden rounded-[3px] bg-paper-deep"
              role="img"
              aria-label={`${r.name}: $${r.cost} per month`}
            >
              <div
                className="scroll-grow grow h-full rounded-[3px] bg-teal"
                style={{ width: `${Math.max(2, (r.cost / MAX_COST) * 100)}%` }}
              />
            </div>
            {r.perDollar !== null && (
              <div
                className="mt-1 h-3 overflow-hidden rounded-[3px] bg-paper-deep"
                role="img"
                aria-label={`${r.name}: ${r.perDollar} tasks per dollar`}
              >
                <div
                  className="scroll-grow grow h-full rounded-[3px] bg-ink"
                  style={{ width: `${Math.max(2, (r.perDollar / MAX_PER_DOLLAR) * 100)}%` }}
                />
              </div>
            )}
            <p className="mt-0.5 text-xs text-ink-mute">{r.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 inline-block rounded-lg bg-amber-wash px-3 py-2 text-sm font-semibold text-ink">
        No durable paid option beats Allegretto on both price and commitment at this volume.{" "}
        <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
          How the math works
        </Link>
        .
      </p>
    </div>
  );
}
