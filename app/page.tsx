import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import ComparisonTable from "@/components/ComparisonTable";
import JsonLd from "@/components/JsonLd";
import LeaderboardTable, { type LeaderboardDatum } from "@/components/LeaderboardTable";
import ParetoChart, { type ParetoDatum } from "@/components/ParetoChart";
import UniverseTable, { type UniverseDatum } from "@/components/UniverseTable";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { aaCitation, getIntel, INTEL } from "@/lib/intelligence";
import { canonical, SITE_URL } from "@/lib/site";
import {
  blendedPerM,
  pricedApiRows,
  providerIdOf,
  UNIVERSE,
  type UniverseRow,
} from "@/lib/universe";
import { paretoFrontier } from "@/lib/valueScore";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI cost leaderboard — every access route, priced and ranked",
  description:
    "129 tracked AI access routes — subscriptions, API per-token pricing, credits, coding tools, and free tiers — ranked on effective cost with cited Artificial Analysis intelligence scores and an interactive cost-intelligence frontier chart.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Token Perks — AI cost leaderboard",
    description:
      "Cost-side ranking of AI access routes, a cost-vs-intelligence frontier chart, and the full universe table. Snapshot Sep 7 2026.",
    url: canonical("/"),
    type: "website",
    images: [
      {
        url: "/img/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — AI access routes ranked on effective cost, with cited intelligence scores.",
      },
    ],
  },
};

const GUIDES = [
  {
    href: "/guides/effective-cost-per-task-explained/",
    title: "Effective cost per task, explained",
    text: "The definition, the $40 / 120-task / $0.80 worked example, and the 50-task break-even, with the calculator.",
  },
  {
    href: "/guides/monthly-vs-annual-ai/",
    title: "Monthly vs annual AI plans",
    text: "Allegretto $39/mo vs ≈$31/mo effective annual ($372 upfront): the prepay conditions and a checklist.",
  },
  {
    href: "/providers/",
    title: "Provider pages",
    text: "One page per provider: every route we track, its price, and its evidence label — with cross-links to the leaderboard.",
  },
  {
    href: "/methodology/",
    title: "Methodology v2",
    text: "Effective-cost arithmetic, the quoted-score citation policy, staleness gates, and the data schema behind the tables.",
  },
];

function shortLabel(r: UniverseRow): string {
  const intel = getIntel(r.modelId);
  if (intel) return intel.aaName;
  return r.plan.replace(/\s*\(.*\)\s*$/, "");
}

export default function Home() {
  const url = canonical("/");

  // Leaderboard: API-priced routes, ranked on blended effective $/M (cost side only).
  const lbRows: LeaderboardDatum[] = pricedApiRows()
    .map((r) => {
      const intel = getIntel(r.modelId);
      return {
        id: r.id,
        provider: r.provider,
        plan: r.plan,
        listPrice: r.listPrice,
        apiIn: r.apiIn as number,
        apiOut: r.apiOut as number,
        blended: blendedPerM(r) as number,
        offer: r.offer,
        caveats: r.caveats,
        label: r.label,
        sourceUrl: r.sourceUrl,
        intel: intel
          ? {
              index: intel.intelligenceIndex,
              estimate: intel.estimate,
              citation: aaCitation(r.modelId) ?? "",
              sourceUrl: intel.sourceUrl,
            }
          : null,
      };
    })
    .sort((a, b) => a.blended - b.blended);

  // Pareto points: routes with both a token price and a cited score.
  const paretoPoints: ParetoDatum[] = UNIVERSE.rows
    .filter((r) => {
      const b = blendedPerM(r);
      return b != null && getIntel(r.modelId) != null && r.apiIn != null;
    })
    .map((r) => {
      const intel = getIntel(r.modelId)!;
      const b = blendedPerM(r) as number;
      return {
        id: r.id,
        label: shortLabel(r),
        provider: r.provider,
        cost: b,
        intelligence: intel.intelligenceIndex,
        estimate: intel.estimate,
        citation: aaCitation(r.modelId) ?? "",
        sourceUrl: intel.sourceUrl,
        offer: r.offer,
        free: b === 0,
      };
    });
  const { frontier, dominatedBy } = paretoFrontier(
    paretoPoints.map((p) => ({ id: p.id, label: p.label, cost: p.cost, intelligence: p.intelligence, free: p.free })),
  );

  const universeRows: UniverseDatum[] = UNIVERSE.rows.map((r) => ({
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
  }));

  const cheapest = lbRows.slice(0, 12);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home" }]} />
      </div>

      {/* 1 · One-sentence explainer */}
      <section aria-label="About this site" className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6">
        <h1 className="display-xl max-w-4xl">The cost side of AI access, ranked</h1>
        <p className="lede mt-4 max-w-3xl">
          Token Perks tracks <strong className="data">{UNIVERSE.rows.length}</strong> ways to buy
          frontier-model tokens — subscriptions, pay-as-you-go API, credit systems, coding-tool
          plans, and free tiers — and ranks what can be ranked on effective cost. Intelligence
          scores are quoted from Artificial Analysis with a citation on every number; our own
          weighted ranking is documented but deliberately withheld. Verified{" "}
          <strong className="data">Sep 6–7 2026</strong>.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Deep dives on the three tracked offers live in{" "}
          <Link href="/best/" className="u-draw text-teal-deep">
            offers
          </Link>
          . Provider-by-provider views are under{" "}
          <Link href="/providers/" className="u-draw text-teal-deep">
            providers
          </Link>
          .
        </p>
      </section>

      {/* 2 · Cost–intelligence frontier chart */}
      <section id="frontier" aria-label="Cost versus intelligence frontier" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">Cost vs intelligence frontier</h2>
          <p className="data text-xs text-ink-mute">
            {paretoPoints.length} routes with both a token price and a cited score · {frontier.length} on the frontier
          </p>
        </div>
        <ParetoChart
          points={paretoPoints}
          frontierIds={frontier.map((f) => f.id)}
          dominatedBy={dominatedBy}
        />
      </section>

      {/* 3 · Leaderboard: paid API routes ranked by blended effective cost */}
      <section id="leaderboard" aria-label="API cost leaderboard" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">API cost leaderboard</h2>
          <p className="data text-xs text-ink-mute">{lbRows.length} paid per-token routes · sorted by blended $/M</p>
        </div>
        <LeaderboardTable rows={lbRows} />
      </section>

      {/* 4 · Full universe table (every route, including unverified) */}
      <section id="universe" aria-label="Full universe of access routes" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">Every tracked route</h2>
          <p className="data text-xs text-ink-mute">
            subscriptions · api · credits · coding tools · free tiers — unverified rows included and labeled
          </p>
        </div>
        <UniverseTable rows={universeRows} />
      </section>

      {/* 5 · Tracked offers (v1 comparison, kept for depth) */}
      <section id="compare" aria-label="Offer comparison" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">Tracked offers</h2>
          <p className="data text-xs text-ink-mute">
            {ACTIVE_OFFERS.length} offers tracked · sorted by estimated effective cost
          </p>
        </div>
        <ComparisonTable />
      </section>

      {/* 6 · Break-even calculator: compact card */}
      <section aria-label="Break-even calculator" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 className="display-lg">Break-even calculator</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Set your monthly task count and tokens per task to see whether pay-as-you-go or a
              flat subscription costs less at your volume, against the $0.80/task reference rate.
              The full method is documented in{" "}
              <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
                effective cost per task, explained
              </Link>
              .
            </p>
          </div>
          <BreakEvenCalc />
        </div>
      </section>

      {/* 7 · Guides, providers, methodology */}
      <section aria-label="Guides and methodology" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="display-lg">Guides and methodology</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {GUIDES.map((g) => (
            <article key={g.href} className="card p-5">
              <h3 className="display-sm">
                <Link href={g.href} className="hover:underline">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{g.text}</p>
              <Link
                href={g.href}
                className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-teal-deep hover:underline"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 8 · Quiet verification line */}
      <div className="mx-auto max-w-6xl border-t border-line px-4 py-5 sm:px-6">
        <p className="data text-xs text-ink-mute">
          Cost data verified 2026-09-06/07 · intelligence scores quoted from Artificial Analysis,
          accessed 2026-09-07 —{" "}
          <Link href="/changes/" className="font-semibold text-teal-deep hover:underline">
            verification log
          </Link>
        </p>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Token Perks",
            url: SITE_URL,
            description: "AI access routes ranked on effective cost, with cited intelligence scores.",
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI API cost leaderboard — Sep 7 2026",
            description:
              "Pay-per-token AI access routes ranked by blended effective cost per million tokens, (3 x input + 1 x output) / 4 at list price. Intelligence scores are quoted from Artificial Analysis under brief-citation terms and are not part of this feed.",
            numberOfItems: cheapest.length,
            itemListElement: cheapest.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${r.provider} ${r.plan}`,
              url: r.offer ? canonical(r.offer) : canonical(`/providers/${providerIdOf({ id: r.id, provider: r.provider })}/`),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "Token Perks cost–intelligence frontier — Sep 7 2026",
            description: `Cost–intelligence scatter of ${paretoPoints.length} AI access routes: blended effective cost per million tokens (first-party arithmetic from provider list prices) against the Artificial Analysis Intelligence Index v4.3, quoted per datum with source links under AA brief-citation terms.`,
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation: `Intelligence values: Artificial Analysis (artificialanalysis.ai), accessed ${INTEL.accessed}. Cost values: Token Perks first-party verification.`,
            temporalCoverage: INTEL.accessed,
            datePublished: INTEL.accessed,
            dateModified: INTEL.accessed,
            url,
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
            "@type": "Dataset",
            name: "Token Perks effective-cost snapshot — Sep 6 2026",
            description:
              "First-party research snapshot of AI offer prices, renewals, limits, and illustrative cost-per-task figures. Official provider pages only; no third-party benchmark data republished.",
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation:
              "Token Perks. Research snapshot Sep 6 2026. Re-verify at official terms before paying.",
            temporalCoverage: "2026-09-06",
            datePublished: "2026-09-06",
            dateModified: "2026-09-06",
            url,
            distribution: [
              {
                "@type": "DataDownload",
                contentUrl: `${SITE_URL}/api/offers.json`,
                encodingFormat: "application/json",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: url }],
          },
        ]}
      />
    </div>
  );
}
