import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CrossoverSection from "@/components/CrossoverSection";
import JsonLd from "@/components/JsonLd";
import { canonical } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Where flat beats metered — the break-even crossover, step by step",
  description:
    "The $0.80/task pay-as-you-go reference against the $39/mo Kimi Allegretto flat tier: the crossover chart, the four-step story, and the ledger at three volumes. Snapshot Sep 6–7 2026.",
  alternates: { canonical: canonical("/crossover/") },
  openGraph: {
    title: "Token Perks — flat vs metered crossover",
    description: "Watch metered billing cross a flat subscription price, with the arithmetic shown.",
    url: canonical("/crossover/"),
    type: "website",
  },
};

export default function CrossoverPage() {
  const url = canonical("/crossover/");
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Crossover" }]} />
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
        <h1 className="sr-only">Where flat beats metered — the break-even crossover</h1>
      </div>
      <CrossoverSection />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
              { "@type": "ListItem", position: 2, name: "Crossover", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
