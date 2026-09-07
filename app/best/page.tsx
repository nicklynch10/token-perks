import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI offers compared — price, annual effective, cost per task",
  description:
    "All 3 tracked AI offers: Kimi K3 membership $19–$199/mo plus two $0 routes, with caveats, limits, and renewal terms. Verified Sep 6 2026.",
  alternates: { canonical: canonical("/best/") },
  openGraph: {
    title: "AI offers compared — price, annual effective, cost per task",
    description:
      "Kimi K3 membership $19–$199/mo plus two $0 routes, with caveats and limits. Verified Sep 6 2026.",
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
};

export default function BestIndex() {
  const url = canonical("/best/");
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <header>
        <h1 className="display-md">All tracked offers</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Three routes tracked: Kimi K3 membership ($19–$199/mo, renews at list price, annual
          effective ≈$15–$159/mo) and two $0 routes with stated limits. Cards list price, estimated
          cost per task, and the caveats for each offer.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-ink-mute">
          Gifting, where offered, is handled by the provider directly — this site sells nothing.
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
