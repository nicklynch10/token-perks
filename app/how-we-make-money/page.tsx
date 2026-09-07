import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { AFFILIATE_V0_STATE, canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How We Make Money (No Affiliate Links Yet) | Token Perks",
  description:
    "Plain-English revenue disclosure: v0 has zero affiliate links. Future paid links get rel=sponsored labels. Updated Sep 6 2026.",
  alternates: { canonical: canonical("/how-we-make-money/") },
  openGraph: {
    title: "How We Make Money (No Affiliate Links Yet) | Token Perks",
    description: "V0 has zero affiliate links. Future paid links get rel=sponsored labels.",
    url: canonical("/how-we-make-money/"),
    type: "article",
  },
};

export default function MoneyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[{ label: "Home", href: "/" }, { label: "How we make money" }]}
      />
      <header>
        <h1 className="display-md">How we make money</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Short version: <strong className="text-ink">we may earn commissions in the future</strong>,
          but {AFFILIATE_V0_STATE.toLowerCase()} Every outbound link on this site today goes
          directly to an official provider page.
        </p>
      </header>
      <section aria-label="Rules for paid links" className="space-y-2 text-sm text-ink-soft">
        <h2 className="display-lg text-ink">
          Rules we will follow when paid links arrive
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Paid links carry <code>rel=&quot;sponsored&quot;</code>; reader comments and community
            content carry <code>rel=&quot;ugc&quot;</code>. Macros are ready; usage is currently
            zero.
          </li>
          <li>Paid placement never changes a verdict, a catch box, or verification dates.</li>
          <li>Any sponsored slot is labeled in plain language next to the link.</li>
          <li>This page is updated the day the first paid link ships.</li>
        </ul>
      </section>
      <ResearchSnapshot extra="Disclosure last reviewed Sep 6 2026." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "How we make money",
              item: canonical("/how-we-make-money/"),
            },
          ],
        }}
      />
    </div>
  );
}
