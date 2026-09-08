import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import ComparisonTable from "@/components/ComparisonTable";
import JsonLd from "@/components/JsonLd";
import LeaderboardTable, { type LeaderboardDatum } from "@/components/LeaderboardTable";
import ParetoChart, { type ParetoDatum } from "@/components/ParetoChart";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { aaCitation, getIntel, INTEL } from "@/lib/intelligence";
import { canonical, SITE_URL } from "@/lib/site";
import {
  batchPerM,
  blendedPerM,
  CATEGORY_LABELS,
  pricedApiRows,
  providerIdOf,
  providerGroups,
  UNIVERSE,
  type CategoryKey,
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
      "Cost-side ranking of AI access routes, a cost-vs-intelligence frontier chart, and the full route ledger. Snapshot Sep 7 2026.",
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
    href: "/guides/buying-ai-access-as-a-gift/",
    title: "Buying AI access as a gift",
    text: "Whether a subscription can be gifted, what refund windows mean for a prepay gift, and what to buy instead when it can't — for each tracked offer.",
  },
  {
    href: "/guides/effective-cost-per-task-explained/",
    title: "Effective cost per task, explained",
    text: "The definition, the $40 / 120-task / $0.80 worked example, and the 50-task break-even, with the calculator.",
  },
  {
    href: "/guides/monthly-vs-annual-ai/",
    title: "Monthly vs annual AI plans",
    text: "Allegretto — the $39/month middle Kimi tier — at ≈$31/mo effective annual ($372 upfront): the prepay conditions and a checklist.",
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
        category: r.category,
        listPrice: r.listPrice,
        apiIn: r.apiIn as number,
        apiOut: r.apiOut as number,
        blended: blendedPerM(r) as number,
        batch: batchPerM(r),
        batchApprox: r.batchApprox ?? false,
        cacheNote: r.cacheTerms && r.cacheTerms.readDiscount !== "not published"
          ? r.cacheTerms.readDiscount.split(/[;.—]/)[0].trim()
          : null,
        offer: r.offer,
        caveats: r.caveats,
        label: r.label,
        sourceUrl: r.sourceUrl,
        accessed: r.accessed,
        intel: intel
          ? {
              index: intel.intelligenceIndex,
              estimate: intel.estimate,
              citation: aaCitation(r.modelId) ?? "",
              sourceUrl: intel.sourceUrl,
              accessed: INTEL.accessed,
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
        accessed: INTEL.accessed,
        offer: r.offer,
        free: b === 0,
      };
    });
  const { frontier, dominatedBy } = paretoFrontier(
    paretoPoints.map((p) => ({ id: p.id, label: p.label, cost: p.cost, intelligence: p.intelligence, free: p.free })),
  );

  const cheapest = lbRows.slice(0, 12);
  const catCounts = (Object.keys(CATEGORY_LABELS) as CategoryKey[]).map((k) => ({
    k,
    n: UNIVERSE.rows.filter((r) => r.category === k).length,
  }));
  const providerCount = providerGroups().length;

  return (
    <div>
      {/* 1 · First screen: value line, two ways in, and a compact entry into the tables */}
      <section aria-label="About this site" className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
        <h1 className="display-xl max-w-4xl">The cost side of AI access, ranked</h1>
        <p className="lede mt-2 max-w-3xl">
          Flat subscriptions can undercut pay-per-token pricing once you clear break-even — this
          ranks how, with the math shown.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Token Perks tracks <strong className="data">{UNIVERSE.rows.length}</strong> ways to buy
          frontier-model tokens — the small units AI providers bill by — across subscriptions,
          pay-as-you-go API, credit systems, coding-tool plans, and free tiers, and ranks what can
          be ranked on effective cost. Intelligence scores are quoted from Artificial Analysis with
          a citation on every number; our own weighted ranking is documented but deliberately
          withheld. The full ledger lives on the{" "}
          <Link href="/universe/" className="u-draw text-teal-deep">
            universe page
          </Link>
          . Verified{" "}
          <strong className="data">Sep 6–7 2026</strong>.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Every per-task figure below uses one illustrative reference rate: <strong className="data">$0.80 per
          finished task</strong> — about 100,000 tokens at the $8-per-million reference blend; your
          real tasks will cost more or less.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/best/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-teal px-5 text-sm font-semibold text-white hover:bg-teal-deep"
          >
            Compare tracked offers
          </Link>
          <Link
            href="/cost-calculator/"
            className="inline-flex min-h-[44px] items-center rounded-full border border-teal bg-card px-5 text-sm font-semibold text-teal-deep hover:bg-teal-wash"
          >
            Open the calculators
          </Link>
        </div>
        <nav aria-label="Jump to a section" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="eyebrow mr-1">On this page</span>
          <Link href="#compare" className="u-draw min-h-[40px] inline-flex items-center text-teal-deep touch:min-h-[44px]">Tracked offers</Link>
          <Link href="#break-even" className="u-draw min-h-[40px] inline-flex items-center text-teal-deep touch:min-h-[44px]">Break-even calculator</Link>
          <Link href="#frontier" className="u-draw min-h-[40px] inline-flex items-center text-teal-deep touch:min-h-[44px]">Frontier chart</Link>
          <Link href="#leaderboard" className="u-draw min-h-[40px] inline-flex items-center text-teal-deep touch:min-h-[44px]">Cost leaderboard</Link>
          <Link href="/universe/" className="u-draw min-h-[40px] inline-flex items-center text-teal-deep touch:min-h-[44px]">Full route list →</Link>
        </nav>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-ink-mute">
          Not sure which is you: buying for someone else or not deep in APIs — start with the{" "}
          {ACTIVE_OFFERS.length} tracked consumer offers and the{" "}
          <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">gift guide</Link>;
          building on AI APIs — the <a href="#leaderboard" className="u-draw">leaderboard</a> ranks every
          pay-per-token route, and <Link href="/providers/" className="u-draw text-teal-deep">providers</Link> list the same
          data per company;
          optimizing batch jobs — the Batch $/M column shows discounted arithmetic only where the
          provider publishes a modifier (a dash means none was published, not zero).
        </p>
      </section>

      {/* 2 · Tracked offers (v1 comparison) — the money decision, first table */}
      <section id="compare" aria-label="Offer comparison" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">Tracked offers</h2>
          <p className="data text-xs text-ink-mute">
            {ACTIVE_OFFERS.length} offers tracked · sorted by estimated effective cost
          </p>
        </div>
        <ComparisonTable />
      </section>

      {/* 3 · Break-even calculator: one hop from the first screen */}
      <section id="break-even" aria-label="Break-even calculator" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 className="display-lg">Break-even calculator</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Set your monthly task count and tokens per task to see whether pay-as-you-go or a
              flat subscription costs less at your volume. The flat-plan price is an input too — it
              defaults to the $39/mo Kimi Allegretto tier, so the crossover here matches the
              ≈49-task figure in the{" "}
              <Link href="/crossover/" className="u-draw text-teal-deep">
                crossover story
              </Link>
              . The full method is documented in{" "}
              <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
                effective cost per task, explained
              </Link>
              .
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              For writing work, count your drafts per month and enter the number here: about 24
              drafts clears the $19 Moderato month, about 49 clears the $39 Allegretto month —
              pick the cheapest tier your count clears. Tier details:{" "}
              <Link href="/best/kimi-k3-core/" className="u-draw text-teal-deep">
                Kimi K3 membership
              </Link>
              . More ways to run the numbers:{" "}
              <Link href="/cost-calculator/" className="u-draw text-teal-deep">
                the calculators page
              </Link>
              .
            </p>
          </div>
          <BreakEvenCalc />
        </div>
      </section>

      {/* 4 · Crossover teaser — the full scroll story moved to its own page */}
      <section
        aria-label="Crossover story"
        className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="card p-5 sm:p-6">
          <p className="eyebrow">Break-even, in one chart</p>
          <h2 className="display-lg mt-1">Where flat beats metered</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Metered billing climbs with every task (about $0.80 each at the reference rate); the
            $39 Allegretto month holds its price. The lines cross at ≈49 tasks/mo — annual billing
            moves the crossing to ≈39. The full four-step chart, ledger, and your-own-volume
            slider are on the{" "}
            <Link href="/crossover/" className="u-draw text-teal-deep">
              crossover page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5 · Cost–intelligence frontier chart */}
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

      {/* 6 · Leaderboard: API-priced routes ranked by blended effective cost */}
      <section id="leaderboard" aria-label="API cost leaderboard" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">API cost leaderboard</h2>
          <p className="data text-xs text-ink-mute">{lbRows.length} paid per-token routes · sorted by blended $/M</p>
        </div>
        <p className="mb-3 max-w-3xl text-sm text-ink-soft">
          A &ldquo;task&rdquo; here means one finished piece of work — a draft, a summary, a fix —
          estimated at 100k tokens unless you pick another size. Full definition:{" "}
          <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
            effective cost per task, explained
          </Link>
          .
        </p>
        <LeaderboardTable rows={lbRows} />
      </section>

      {/* 7 · Pointer to the full route ledger (the table itself lives on /universe/) */}
      <section
        id="universe"
        aria-label="Full universe of access routes"
        className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="display-lg">Every tracked route</h2>
            <p className="data text-xs text-ink-mute">
              {UNIVERSE.rows.length} routes · {providerCount} providers — {catCounts.map((c) => `${c.n} ${CATEGORY_LABELS[c.k].toLowerCase()}`).join(" · ")}
            </p>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            The raw ledger behind every ranking on this site — including rows we could not verify,
            labeled UNCERTAIN rather than priced from memory. Browse it filterable on the{" "}
            <Link href="/universe/" className="u-draw text-teal-deep font-semibold">
              full route list
            </Link>
            , or go company by company via the{" "}
            <Link href="/providers/" className="u-draw text-teal-deep">
              provider pages
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 8 · Guides, providers, methodology */}
      <section aria-label="Guides and methodology" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="display-lg">Guides and methodology</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {GUIDES.map((g) => (
            <article key={g.href} className="card p-5">
              <h3 className="display-sm">
                <Link href={g.href} className="u-draw inline-flex min-h-[40px] items-center hover:underline touch:min-h-[44px]">
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

      {/* 9 · Quiet verification line */}
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
              "Pay-per-token AI access routes ranked by blended effective cost per million tokens, (3 x input + 1 x output) / 4 at each route's current published price (list, or promo while a launch promo runs — promo-priced rows say so). Intelligence scores are quoted from Artificial Analysis under brief-citation terms and are not part of this feed.",
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
            description: `Cost–intelligence scatter of ${paretoPoints.length} AI access routes: blended effective cost per million tokens (first-party arithmetic from each route's published price) against the Artificial Analysis Intelligence Index v4.3, quoted per datum with source links under AA brief-citation terms.`,
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
