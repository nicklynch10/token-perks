import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best AI Offers Compared: Prices, Renewals & Catches",
  description:
    "All 3 tracked AI offers compared: Kimi K3 $19–$199/mo plus two $0 routes. Catches upfront, verified Sep 6 2026. Re-verify before paying.",
  alternates: { canonical: canonical("/best/") },
  openGraph: {
    title: "Best AI Offers Compared: Prices, Renewals & Catches",
    description: "Kimi K3 $19–$199/mo plus two $0 routes. Catches upfront, verified Sep 6 2026.",
    url: canonical("/best/"),
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — The best AI offers. The catches, upfront.",
      },
    ],
  },
};

const TASK_NOTES: Record<string, string> = {
  "kimi-k3-core": "≈ $0.33/task at 120 tasks/mo",
  "muse-spark-zen-free": "$0.00/task while promo lasts",
  "nvidia-k3-free": "$0.00/task for dev use",
};

const FIG_CAPTIONS: Record<string, string> = {
  "kimi-k3-core": "Fig. 1 — Kimi K3 core route · ledger",
  "muse-spark-zen-free": "Fig. 2 — Muse Spark Zen (free) · ledger",
  "nvidia-k3-free": "Fig. 3 — NVIDIA dev route · ledger",
};

export default function BestIndex() {
  const url = canonical("/best/");
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Best offers" }]} />
      <header>
        <h1 className="display-md">
          Best AI offers, verified Sep 6 2026
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Three routes tracked: Kimi K3 membership ($19–$199/mo, renews same price, annual
          effective $15–$159) and two $0 routes with stated limits. Sorted by documented value;
          every card leads with its catch.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-ink-mute">
          We don&apos;t do gifting — gift the subscription from the provider directly.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {ACTIVE_OFFERS.map((o) => (
          <OfferCard
            key={o.id}
            offer={o}
            taskNote={TASK_NOTES[o.id] ?? ""}
            fig={FIG_CAPTIONS[o.id]}
          />
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
              { "@type": "ListItem", position: 2, name: "Best offers", item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best AI offers compared",
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
