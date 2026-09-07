import Link from "next/link";
import VerifyBadge from "@/components/VerifyBadge";
import type { Offer } from "@/lib/offers";

const RENEWAL_LINE: Record<string, string> = {
  "kimi-k3-core": "Renews at $19–$199/mo (same tier; annual prepaid lowers effective cost)",
  "muse-spark-zen-free": "No renewal — promo, ends anytime",
  "nvidia-k3-free": "No renewal — account limits govern",
};

/** Offers flagged "Changed" in the publication log get an accent tick (C6). */
const CHANGED: Record<string, boolean> = { "kimi-k3-core": true };

/** Inline ledger mini-chart: three evidence rows per route (design judge, item 1). */
const MINI_LEDGER: Record<string, { label: string; value: string }[]> = {
  "kimi-k3-core": [
    { label: "Tiers (mo)", value: "$19–$199" },
    { label: "Annual effective (mo)", value: "≈$15–$159" },
    { label: "Break-even (Allegretto)", value: "≈49 tasks/mo" },
  ],
  "muse-spark-zen-free": [
    { label: "Promo price", value: "$0 in/cache/out" },
    { label: "Renewal", value: "None — promo" },
    { label: "200 tasks ≈", value: "~$160 avoided" },
  ],
  "nvidia-k3-free": [
    { label: "Price", value: "$0 dev/proto" },
    { label: "Reasoning + tools", value: "Preserved" },
    { label: "Quota", value: "Varies by account" },
  ],
};

export default function OfferCard({
  offer,
  taskNote,
  fig,
}: {
  offer: Offer;
  taskNote: string;
  fig?: string;
}) {
  const rows = MINI_LEDGER[offer.id] ?? [];
  return (
    <article className="card flex flex-col overflow-hidden">
      {/* Inline ledger mini-chart (replaces raster art): paper ground, double rule, mono numerals */}
      <figure className="m-0 border-b border-line bg-paper-deep">
        <div className="rule-double" aria-hidden="true" />
        <dl className="px-4 py-3">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`flex items-baseline justify-between gap-3 py-1.5 ${
                i < rows.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <dt className="text-xs font-semibold text-ink-soft">{r.label}</dt>
              <dd className="data shrink-0 text-xs text-teal-deep">{r.value}</dd>
            </div>
          ))}
        </dl>
        {fig && (
          <figcaption className="data border-t border-line bg-paper px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
            {fig}
          </figcaption>
        )}
      </figure>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="data rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {offer.badge}
          </span>
          <VerifyBadge date={offer.verified_at} />
          {CHANGED[offer.id] && (
            <span
              className="data text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-deep"
              title="This offer has a Changed entry in the publication log"
            >
              ▲ Changed
            </span>
          )}
        </div>
        <h3 className="display-sm mt-3">
          <Link href={offer.canonical_url} className="hover:underline">
            {offer.title}
          </Link>
        </h3>
        <p className="data mt-1 text-lg text-teal-deep">{offer.price.now}</p>
        <p className="data text-xs text-ink-soft">{taskNote}</p>
        <p className="mt-1 text-xs font-medium text-ink-mute">
          {RENEWAL_LINE[offer.id] ?? offer.price.renewal}
        </p>
        <div role="note" aria-label="The catch, upfront" className="catch-panel mt-3 p-3 text-sm">
          <p className="eyebrow eyebrow-amber">The catch</p>
          <p className="mt-1 text-ink">{offer.catchSummary}</p>
        </div>
        <Link
          href={offer.canonical_url}
          className="btn mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-ink px-4 font-bold text-white hover:bg-teal-deep"
        >
          See full verdict
        </Link>
      </div>
    </article>
  );
}
