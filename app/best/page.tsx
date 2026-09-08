import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI offers compared — price, annual effective, cost per task",
  description: `All ${ACTIVE_OFFERS.length} tracked AI offers — subscriptions and $0 routes, each with verified prices, caveats, limits, and renewal terms. Snapshots Sep 6–7 2026.`,
  alternates: { canonical: canonical("/best/") },
  openGraph: {
    title: "AI offers compared — price, annual effective, cost per task",
    description: `${ACTIVE_OFFERS.length} tracked AI offers with caveats, limits, and dated verification.`,
    url: canonical("/best/"),
    type: "website",
    images: [
      {
        url: "/img/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — AI subscription offers, compared on effective cost per task.",
      },
    ],
  },
};

const TASK_NOTES: Record<string, string> = {
  "kimi-k3-core": "≈ $0.33/task at 120 tasks/mo",
  "muse-spark-zen-free": "$0.00/task while promo lasts",
  "nvidia-k3-free": "$0.00/task for dev use",
  "copilot-pro": "$10/mo ≈ 13 PAYG tasks · $15 credit pool ≈ 19 (reference)",
  "chatgpt-plus": "break-even ≈ 25 tasks/mo vs $0.80 PAYG reference",
  "google-ai-pro": "≈ 25 tasks/mo AI-side (reference) + bundle value",
  "claude-pro": "≈ 25 tasks/mo; annual ≈ 21 (vs $0.80 reference)",
  "cursor-pro": "≈ 25 tasks/mo (reference); included pool unpublished",
  "perplexity-pro": "≈ 25 tasks/mo (reference); caps not numeric",
};

/** First dollar amount in a price string (e.g. "$19–$199/mo…" -> 19). Data-derived only. */
function firstUsd(s: string): number | null {
  const m = s.match(/\$\s?([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, "")) : null;
}

export default function BestIndex() {
  const url = canonical("/best/");
  const paid = ACTIVE_OFFERS.map((o) => firstUsd(o.price.now)).filter(
    (v): v is number => v != null && v > 0,
  );
  const freeCount = ACTIVE_OFFERS.filter((o) => (firstUsd(o.price.now) ?? 0) === 0).length;
  const fmt = (v: number) => `$${v.toFixed(2).replace(/\.00$/, "")}`;
  const priceSpan = paid.length
    ? `${fmt(Math.min(...paid))}/mo to ${fmt(Math.max(...paid))}/mo tiers`
    : "no paid offers yet";
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <header>
        <h1 className="display-md">All tracked offers</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {ACTIVE_OFFERS.length} offers tracked — consumer subscriptions from {priceSpan}
          {freeCount > 0 ? `, plus ${freeCount} $0 routes with stated limits` : ""}. Cards list
          price, estimated cost per task, and the caveats for each offer. Every figure is a dated
          snapshot: re-verify at official terms before paying.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-mute">
          Buying as a gift? None of the tracked offers sells a gift card or a transferable
          subscription in its verified terms — gifting, where offered at all, is handled by the
          provider directly, and this site sells nothing. What to weigh instead: who activates the
          route, which refund windows make a prepay safe,{" "}
          <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">
            the gift guide
          </Link>
          ,{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
            monthly vs annual
          </Link>
          , and the{" "}
          <Link href="/cost-calculator/" className="u-draw text-teal-deep">
            calculators
          </Link>
          .
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {ACTIVE_OFFERS.map((o) => (
          <OfferCard key={o.id} offer={o} taskNote={TASK_NOTES[o.id] ?? ""} />
        ))}
      </div>
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              { "@type": "ListItem", position: 2, name: "Offers", item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI offers compared",
            itemListElement: ACTIVE_OFFERS.map((o, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: o.title,
              url: canonical(o.canonical_url),
            })),
          },
        ]}
      />
    </div>
  );
}
