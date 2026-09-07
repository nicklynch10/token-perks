import Link from "next/link";
import { ACTIVE_OFFERS, type Offer } from "@/lib/offers";
import { BASELINE_PAYG_PER_TASK } from "@/lib/effectiveCost";
import { SNAPSHOT_ISO } from "@/lib/site";

/**
 * Row model for the comparison table. All figures come from the verified
 * offer data; per-100-task estimates are illustrative arithmetic on the
 * $0.80/task reference (100k tokens/task), stated in the footnote.
 */
interface Row {
  id: string;
  name: string;
  provider: string;
  href: string;
  price: string;
  annual: string;
  per100: number | null; // estimated $ per 100 tasks; null = not computable
  per100Note: string;
  deltaPct: number | null; // vs the PAYG reference; green when negative
  limit: string;
  renewal: string;
  verified: string;
}

/** Est. $ per 100 tasks vs the $0.80/task PAYG reference ($80 per 100). */
const REF_PER_100 = BASELINE_PAYG_PER_TASK * 100;

function rowFor(o: Offer): Row {
  if (o.id === "kimi-k3-core") {
    // Allegretto $39/mo over 120 tasks/mo = $0.325/task = $32.50 per 100 tasks.
    const per100 = (39 / 120) * 100;
    return {
      id: o.id,
      name: o.shortTitle,
      provider: o.provider,
      href: o.canonical_url,
      price: "$19–$199/mo by tier",
      annual: "≈$15–$159/mo prepaid",
      per100,
      per100Note: "Allegretto $39 ÷ 120 tasks",
      deltaPct: Math.round(((per100 - REF_PER_100) / REF_PER_100) * 100),
      limit: "One shared credit pool; 5-hour and weekly usage controls",
      renewal: "Monthly at list price; annual prepaid lowers effective cost",
      verified: o.verified_at,
    };
  }
  if (o.id === "muse-spark-zen-free") {
    return {
      id: o.id,
      name: o.shortTitle,
      provider: o.provider,
      href: o.canonical_url,
      price: "$0 (promo window)",
      annual: "n/a — promo, not a plan",
      per100: 0,
      per100Note: "$0 in / cache / out",
      deltaPct: -100,
      limit: "Limited-time promo; exact-string access route; unpublished throughput caps",
      renewal: "None — promo ends on the provider's schedule",
      verified: o.verified_at,
    };
  }
  return {
    id: o.id,
    name: o.shortTitle,
    provider: o.provider,
    href: o.canonical_url,
    price: "$0 (dev / prototyping)",
    annual: "n/a — free tier",
    per100: 0,
    per100Note: "$0 for dev use",
    deltaPct: -100,
    limit: "Account-variable quota; dev/prototyping scope only",
    renewal: "None — account limits govern",
    verified: o.verified_at,
  };
}

/** Sorted by estimated effective cost per 100 tasks, cheapest first. */
const ROWS = ACTIVE_OFFERS
  .map(rowFor)
  .sort((a, b) => (a.per100 ?? Infinity) - (b.per100 ?? Infinity));

function barWidth(per100: number | null): string {
  if (per100 == null || per100 <= 0) return "0";
  return `${Math.min(100, (per100 / REF_PER_100) * 100).toFixed(1)}%`;
}

/** Sticky header, striped rows, right-aligned mono numerals, green/red deltas only. */
export default function ComparisonTable() {
  return (
    <div>
      <div className="hidden overflow-x-auto rounded-xl border border-line-strong bg-card sm:block sm:overflow-x-visible">
        <table className="spec-table min-w-[720px] sm:min-w-0">
          <caption className="sr-only">
            Tracked AI offers compared by price, annual effective cost, estimated cost per 100
            tasks, key limits, renewal behavior, and verification date
          </caption>
          <thead>
            <tr>
              <th scope="col">Offer</th>
              <th scope="col" className="num">Price</th>
              <th scope="col" className="num">Annual effective</th>
              <th scope="col" className="num" aria-sort="ascending">
                Est. $ per 100 tasks <span aria-hidden="true">▲</span>
              </th>
              <th scope="col">Key limit</th>
              <th scope="col">Renewal behavior</th>
              <th scope="col">Verified</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id}>
                <th scope="row" className="font-semibold">
                  <Link href={r.href} className="text-teal-deep hover:underline">
                    {r.name}
                  </Link>
                  <span className="block text-xs font-normal text-ink-mute">{r.provider}</span>
                </th>
                <td className="num">{r.price}</td>
                <td className="num text-ink-soft">{r.annual}</td>
                <td className="num">
                  {r.per100 == null ? (
                    "—"
                  ) : (
                    <>
                      ${r.per100.toFixed(2)}
                      {r.deltaPct != null && r.deltaPct !== -100 && (
                        <span className={`block text-xs ${r.deltaPct < 0 ? "delta-down" : "delta-up"}`}>
                          {r.deltaPct > 0 ? "+" : ""}
                          {r.deltaPct}% vs PAYG ref
                        </span>
                      )}
                      {r.deltaPct === -100 && (
                        <span className="block text-xs text-ink-mute">free</span>
                      )}
                      <span className="meter" aria-hidden="true">
                        <span style={{ width: barWidth(r.per100) }} />
                      </span>
                    </>
                  )}
                </td>
                <td className="text-ink-soft">{r.limit}</td>
                <td className="text-ink-soft">{r.renewal}</td>
                <td className="tabular whitespace-nowrap text-ink-mute">{r.verified}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                Per-100-task figures are illustrative (100k tokens/task reference; PAYG reference
                $0.80/task = $80 per 100 tasks, full-width bar). Basis per row shown under the
                figure. Snapshot {SNAPSHOT_ISO}; re-verify at official terms —{" "}
                <Link href="/methodology/" className="u-draw text-teal-deep">
                  methodology
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Stacked cards under 640px */}
      <div className="space-y-3 sm:hidden">
        {ROWS.map((r) => (
          <article key={r.id} className="rounded-xl border border-line-strong bg-card p-4 text-sm">
            <p className="font-semibold">
              <Link href={r.href} className="text-teal-deep hover:underline">
                {r.name}
              </Link>
              <span className="ml-2 text-xs font-normal text-ink-mute">{r.provider}</span>
            </p>
            <dl className="mt-2 space-y-1.5">
              <div className="flex justify-between gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">Price</dt>
                <dd className="data text-right">{r.price}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">Annual eff.</dt>
                <dd className="data text-right text-ink-soft">{r.annual}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">$/100 tasks</dt>
                <dd className="data text-right">
                  {r.per100 == null ? "—" : `$${r.per100.toFixed(2)}`}
                  <span className="block text-[11px] font-normal text-ink-mute">{r.per100Note}</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">Key limit</dt>
                <dd className="text-ink-soft">{r.limit}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">Renewal</dt>
                <dd className="text-ink-soft">{r.renewal}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-mute">Verified</dt>
                <dd className="tabular text-ink-mute">{r.verified}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
