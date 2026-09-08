import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import UniverseTable, { type UniverseDatum } from "@/components/UniverseTable";
import { canonical, SITE_URL } from "@/lib/site";
import { providerGroups, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Every tracked route — the full access universe",
  description: `The complete ${UNIVERSE.rows.length}-route table of AI access we track — subscriptions, API per-token pricing, credits, coding tools, and free tiers — including rows we could not verify, labeled UNCERTAIN rather than estimated. Snapshot ${UNIVERSE.snapshot}.`,
  alternates: { canonical: canonical("/universe/") },
  openGraph: {
    title: "Token Perks — every tracked route",
    description: `The full ${UNIVERSE.rows.length}-route universe table with list prices, caveats, and evidence labels.`,
    url: canonical("/universe/"),
    type: "website",
  },
};

export default function UniversePage() {
  const url = canonical("/universe/");
  const rows: UniverseDatum[] = UNIVERSE.rows.map((r) => ({
    id: r.id,
    provider: r.provider,
    category: r.category,
    plan: r.plan,
    listPrice: r.listPrice,
    notes: r.notes,
    caveats: r.caveats,
    sourceUrl: r.sourceUrl,
    label: r.label,
    offer: r.offer,
    accessed: r.accessed,
  }));
  const groups = providerGroups();

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Universe" }]} />
      </div>

      <section aria-label="About the universe table" className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6">
        <h1 className="display-xl max-w-4xl">Every tracked route</h1>
        <p className="lede mt-4 max-w-3xl">
          All {rows.length} access routes across {groups.length} providers in one table —
          subscriptions, API pricing, credits, coding tools, and free tiers — filterable by
          category. Ranked, priced views live on the{" "}
          <Link href="/#leaderboard" className="u-draw text-teal-deep">
            cost leaderboard
          </Link>
          ; per-company views on the{" "}
          <Link href="/providers/" className="u-draw text-teal-deep">
            provider pages
          </Link>
          .
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
          This is the raw ledger the ranking is built from. Rows whose price could not be verified
          this pass are kept visible and labeled UNCERTAIN — priced &ldquo;not fetched&rdquo;
          rather than guessed. Snapshot <strong className="data">{UNIVERSE.snapshot}</strong>;
          every row carries its own read date and source link.
        </p>
      </section>

      <section aria-label="Universe table" id="table" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <UniverseTable rows={rows} />
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `Token Perks access-route universe — ${UNIVERSE.rows.length} routes, snapshot ${UNIVERSE.snapshot}`,
            description:
              "Every tracked AI access route — subscriptions, API per-token pricing, credits, coding tools, and free tiers — with list price, caveats, evidence label (DIRECT / EXCERPT / UNCERTAIN), source URL, and per-row access date. Unverified routes are shown as unverified, never estimated.",
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation: `Token Perks. Access-route universe, snapshot ${UNIVERSE.snapshot}. Re-verify at official terms before paying.`,
            temporalCoverage: UNIVERSE.snapshot,
            datePublished: UNIVERSE.snapshot,
            dateModified: UNIVERSE.snapshot,
            url,
            variableMeasured: ["listPrice", "apiInPerM", "apiOutPerM", "evidence label", "accessed"],
            distribution: [
              {
                "@type": "DataDownload",
                contentUrl: `${SITE_URL}/api/leaderboard.json`,
                encodingFormat: "application/json",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
              { "@type": "ListItem", position: 2, name: "Universe", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
