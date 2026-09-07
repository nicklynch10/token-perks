import Link from "next/link";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { SNAPSHOT_LINE } from "@/lib/site";

const TASK_NOTES: Record<string, string> = {
  "kimi-k3-core": "≈ $0.33/task at 120 tasks/mo",
  "muse-spark-zen-free": "$0.00/task while promo lasts",
  "nvidia-k3-free": "$0.00/task for dev use",
};

/** Sticky first column on desktop, stacked cards under 640px. Ledger anatomy (§7.2). */
export default function ComparisonTable() {
  return (
    <div>
      <p className="data mb-2 text-xs text-ink-mute">
        Direction hint: lower cost-per-task is better. Per-task figures are illustrative (100k
        tokens/task reference).
      </p>
      {/* Desktop / tablet ledger */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line-strong bg-card shadow-[3px_3px_0_rgb(26_26_24/0.06)] sm:block">
        <table className="ledger sticky-col min-w-[640px] text-left text-sm">
          <caption className="sr-only">
            Top 3 AI offers compared by price, renewal, and catch
          </caption>
          <thead>
            <tr>
              <th scope="col">Offer</th>
              <th scope="col">Price now</th>
              <th scope="col">Renewal</th>
              <th scope="col">Catch, upfront</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVE_OFFERS.map((o) => (
              <tr key={o.id}>
                <th scope="row" className="px-4 py-3 font-bold">
                  <Link href={o.canonical_url} className="u-draw text-teal-deep">
                    {o.shortTitle}
                  </Link>
                  <span className="data block text-xs text-teal-deep">{TASK_NOTES[o.id]}</span>
                </th>
                <td className="data px-4 py-3 font-medium">{o.price.now}</td>
                <td className="px-4 py-3 text-ink-soft">{o.renewal}</td>
                <td className="px-4 py-3 text-ink-soft">{o.catchSummary}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-2.5">
                Median-window math · verified Sep 6 2026 · re-verify at official terms —{" "}
                <Link href="/methodology/" className="u-draw not-italic text-teal-deep">
                  methodology
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Stacked cards under 640px */}
      <div className="space-y-3 sm:hidden">
        {ACTIVE_OFFERS.map((o) => (
          <article key={o.id} className="rounded-2xl border border-line-strong bg-card p-4 text-sm">
            <p className="font-bold">
              <Link href={o.canonical_url} className="u-draw text-teal-deep">
                {o.shortTitle}
              </Link>
            </p>
            <dl className="mt-2 space-y-1.5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Price now</dt>
                <dd className="data">
                  {o.price.now} ({TASK_NOTES[o.id]})
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Renewal</dt>
                <dd className="text-ink-soft">{o.renewal}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-amber-deep">Catch, upfront</dt>
                <dd>{o.catchSummary}</dd>
              </div>
            </dl>
          </article>
        ))}
        <p className="data px-1 text-xs text-ink-mute">{SNAPSHOT_LINE}</p>
      </div>
    </div>
  );
}
