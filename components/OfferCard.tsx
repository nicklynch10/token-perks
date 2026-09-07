import Link from "next/link";
import VerifyBadge from "@/components/VerifyBadge";
import type { Offer } from "@/lib/offers";

const RENEWAL_LINE: Record<string, string> = {
  "kimi-k3-core": "Renews at $19–$199/mo (same tier; annual prepaid lowers effective cost)",
  "muse-spark-zen-free": "No renewal — promo, ends anytime",
  "nvidia-k3-free": "No renewal — account limits govern",
};

/** Inline spec summary per route (three facts, mono numerals, hairline rows). */
const MINI_LEDGER: Record<string, { label: string; value: string }[]> = {
  "kimi-k3-core": [
    { label: "Tiers (mo)", value: "$19–$199" },
    { label: "Annual effective (mo)", value: "≈$15–$159" },
    { label: "Est. $/task (120 tasks)", value: "≈$0.33" },
  ],
  "muse-spark-zen-free": [
    { label: "Promo price", value: "$0 in/cache/out" },
    { label: "Renewal", value: "None — promo" },
    { label: "End date", value: "In-product only" },
  ],
  "nvidia-k3-free": [
    { label: "Price", value: "$0 dev/proto" },
    { label: "Scope", value: "Dev / prototyping" },
    { label: "Quota", value: "Varies by account" },
  ],
};

export default function OfferCard({
  offer,
  taskNote,
}: {
  offer: Offer;
  taskNote: string;
}) {
  const rows = MINI_LEDGER[offer.id] ?? [];
  return (
    <article className="card flex flex-col overflow-hidden">
      <dl className="border-b border-line bg-paper-deep px-4 py-3">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex items-baseline justify-between gap-3 py-1.5 ${
              i < rows.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <dt className="text-xs font-medium text-ink-soft">{r.label}</dt>
            <dd className="data shrink-0 text-xs">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="data rounded-full border border-line-strong px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-soft">
            {offer.badge}
          </span>
          <VerifyBadge date={offer.verified_at} />
        </div>
        <h2 className="display-sm mt-3">
          <Link href={offer.canonical_url} className="hover:underline">
            {offer.title}
          </Link>
        </h2>
        <p className="data mt-1 text-base">{offer.price.now}</p>
        <p className="data text-xs text-ink-soft">{taskNote}</p>
        <p className="mt-1 text-xs font-medium text-ink-mute">
          {RENEWAL_LINE[offer.id] ?? offer.price.renewal}
        </p>
        <div role="note" aria-label="Caveats" className="caveat-panel mt-3 p-3 text-sm">
          <p className="eyebrow">Caveats</p>
          <p className="mt-1 text-ink">{offer.catchSummary}</p>
        </div>
        <Link
          href={offer.canonical_url}
          className="btn mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white"
        >
          View offer details
        </Link>
      </div>
    </article>
  );
}
