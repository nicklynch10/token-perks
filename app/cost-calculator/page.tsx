import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import SeatCalc from "@/app/cost-calculator/SeatCalc";
import CiteBlock from "@/components/CiteBlock";
import JsonLd from "@/components/JsonLd";
import OneTaskCost, { type TaskRouteDatum } from "@/components/OneTaskCost";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { ACTIVE_OFFERS } from "@/lib/offers";
import {
  ALLEGRETTO_ANNUAL_EFF,
  ALLEGRETTO_ANNUAL_UPFRONT,
  ALLEGRETTO_MONTHLY,
  ALLEGRETTO_YEARLY_AT_MONTHLY,
  ANNUAL_SAVING,
  CROSS_ANNUAL,
  CROSS_MONTHLY,
  PAYG_PER_TASK,
} from "@/lib/crossover";
import { BASELINE_PAYG_PER_TASK } from "@/lib/effectiveCost";
import { INTEL } from "@/lib/intelligence";
import { canonical, SITE_URL, social } from "@/lib/site";
import {
  batchPerM,
  blendedPerM,
  pricedApiRows,
  UNIVERSE,
  type UniverseRow,
} from "@/lib/universe";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI cost calculators — break-even, team seats, cost per task, monthly vs annual",
  description:
    "Every interactive calculator in one place: flat-vs-metered break-even (shareable via URL), team-seat totals from verified per-seat rows, cost of one finished task per API route, monthly-vs-annual prepay math, and a 12-month view of the tracked offers.",
  alternates: { canonical: canonical("/cost-calculator/") },
  ...social({
    title: "AI cost calculators — break-even, team seats, cost per task, monthly vs annual",
    description:
      "Break-even, team-seat totals, one-task cost per route, prepay math, and 12-month comparisons — all on dated snapshot data.",
    path: "/cost-calculator/",
  }),
};

/** First dollar amount in a price string (e.g. "$19–$199/mo…" -> 19). Data-derived only. */
function firstUsd(s: string): number | null {
  const m = s.match(/\$\s?([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, "")) : null;
}

/** Last dollar amount in a price string, for tier ladders ("$19–$199" -> 199). */
function lastUsd(s: string): number | null {
  const matches = s.match(/\$\s?([\d,]+(?:\.\d+)?)/g);
  if (!matches?.length) return null;
  const last = matches[matches.length - 1].match(/([\d,]+(?:\.\d+)?)/);
  return last ? parseFloat(last[1].replace(/,/g, "")) : null;
}

function twelveMonthView(o: (typeof ACTIVE_OFFERS)[number]): string {
  const lo = firstUsd(o.price.now);
  if (lo === null) return "See offer page";
  if (lo === 0) return "$0 — no bill to project";
  const hi = lastUsd(o.price.now);
  const fmt = (v: number) => `$${Math.round(v * 12).toLocaleString("en-US")}`;
  return hi && hi !== lo ? `${fmt(lo)}–${fmt(hi)}` : fmt(lo);
}

export default function CostCalculatorPage() {
  const url = canonical("/cost-calculator/");

  // One-task cost routes: every priced API row, server-side arithmetic on
  // verified data — the same blended $/M the leaderboard ranks on.
  const routes: TaskRouteDatum[] = pricedApiRows()
    .map((r: UniverseRow) => ({
      id: r.id,
      name: `${r.provider} — ${r.plan}`,
      blended: blendedPerM(r) as number,
      batch: batchPerM(r),
      batchApprox: r.batchApprox ?? false,
      sourceUrl: r.sourceUrl,
      accessed: r.accessed,
      cacheNote:
        r.cacheTerms && r.cacheTerms.readDiscount !== "not published"
          ? r.cacheTerms.readDiscount.split(/[;.—]/)[0].trim()
          : null,
    }))
    .sort((a, b) => a.blended - b.blended);

  return (
    <div className="mx-auto max-w-5xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Calculators" },
        ]}
      />
      <header>
        <h1 className="display-md">Cost calculators</h1>
        <p className="lede mt-2 max-w-3xl">
          Every interactive calculator in one place, all on the same dated snapshot. Flat subscriptions
          can undercut pay-per-token pricing once you clear break-even — these tools show how, with the
          arithmetic visible.
        </p>
      </header>

      {/* 1 · Break-even: flat vs metered, URL-shareable inputs */}
      <section id="break-even" aria-label="Break-even calculator" className="scroll-mt-16">
        <h2 className="display-lg">Break-even: flat plan vs metered</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Set your monthly task count, tokens per task, flat-plan price, and team seats. The
          crossover figure and every input are encoded in the URL (
          <code className="data text-xs">?tasks=120&amp;tokens=100000&amp;sub=39&amp;seats=1</code>
          ), so results stay shareable. The flat-plan price defaults to the{" "}
          <code className="data text-xs">${ALLEGRETTO_MONTHLY}/mo</code> Kimi Allegretto tier, so
          the crossover here matches the <span className="data">≈{Math.round(CROSS_MONTHLY)}</span>
          -task figure on the homepage.
        </p>
        <div className="mt-4">
          <BreakEvenCalc />
        </div>
      </section>

      {/* 2 · Team seats: pick a seat SKU, set headcount */}
      <section id="seat-mode" aria-label="Team seat calculator" className="scroll-mt-16">
        <h2 className="display-lg">Team seats: what a headcount costs</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          The break-even panel above answers &ldquo;seats vs metered&rdquo; for an estimated task
          volume; this one answers &ldquo;I picked a Team plan — what do N seats cost, and what
          happens as they fill.&rdquo; Every option mirrors a dated row in the{" "}
          <Link href="/providers/" className="u-draw text-teal-deep">
            provider universe
          </Link>{" "}
          (seat-priced rows only; single-user consumer tiers stay on the offers side). Inputs live
          in the URL (<code className="data text-xs">?tsku=claude-team-standard&amp;theads=5</code>
          ), so a headcount result is shareable like the rest. Decision rules for seats vs pooled
          API spend: <Link href="/guides/ai-seats-for-teams/" className="u-draw text-teal-deep">
            AI seats for teams
          </Link>.
        </p>
        <div className="mt-4">
          <SeatCalc />
        </div>
      </section>

      {/* 3 · One finished task on each API route */}
      <section id="one-task" aria-label="Cost of one task" className="scroll-mt-16">
        <h2 className="display-lg">Cost of one task, per route</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          The leaderboard blends each route&apos;s published input and output prices as
          (3 × input + 1 × output) / 4 — write-heavy-workload arithmetic, ours, not a provider
          figure — then multiplies by your task size. {routes.length} priced API routes listed;
          subscription and credit routes are on the{" "}
          <Link href="/best/" className="u-draw text-teal-deep">
            offers
          </Link>{" "}
          side of the ledger.
        </p>
        <div className="mt-4">
          <OneTaskCost routes={routes} />
        </div>
      </section>

      {/* 4 · Monthly vs annual prepay math (verified Kimi Allegretto figures) */}
      <section id="prepay" aria-label="Monthly versus annual prepay" className="scroll-mt-16">
        <h2 className="display-lg">Monthly vs annual: the prepay decision</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Annual billing trades cash-now for rate-later. Worked on the tracked Kimi Allegretto tier
          (verified 2026-09-06); the refund window, not the discount, decides how risky a prepay is
          — full checklist in{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
            monthly vs annual AI plans
          </Link>
          .
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[560px]">
            <caption className="sr-only">
              Kimi Allegretto: monthly billing versus annual prepay, and where each crosses the
              metered reference.
            </caption>
            <thead>
              <tr>
                <th scope="col">Billing</th>
                <th scope="col" className="num">Per month</th>
                <th scope="col" className="num">12-month cash</th>
                <th scope="col" className="num">Break-even vs metered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="font-semibold">Monthly</th>
                <td className="num">${ALLEGRETTO_MONTHLY}/mo</td>
                <td className="num">${ALLEGRETTO_YEARLY_AT_MONTHLY}</td>
                <td className="num">≈{Math.round(CROSS_MONTHLY)} tasks/mo</td>
              </tr>
              <tr>
                <th scope="row" className="font-semibold">Annual prepaid</th>
                <td className="num">≈${ALLEGRETTO_ANNUAL_EFF}/mo eff.</td>
                <td className="num">${ALLEGRETTO_ANNUAL_UPFRONT} upfront</td>
                <td className="num">≈{Math.round(CROSS_ANNUAL)} tasks/mo</td>
              </tr>
              <tr>
                <th scope="row" className="font-semibold">Metered reference</th>
                <td className="num">${PAYG_PER_TASK.toFixed(2)}/task</td>
                <td className="num">120 tasks/mo → ${Math.round(PAYG_PER_TASK * 120 * 12)}</td>
                <td className="num">—</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  Annual saves ${ANNUAL_SAVING}/yr vs monthly at list (≈$
                  {ALLEGRETTO_MONTHLY}/mo ÷ ${PAYG_PER_TASK.toFixed(2)}/task ={" "}
                  {CROSS_MONTHLY.toFixed(0)} tasks; the $40 illustrative basket lands at 50).
                  Break-even = tasks per month where metered spend passes the flat fee.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* 5 · Twelve-month view of every tracked offer */}
      <section id="twelve-month" aria-label="Twelve-month view of tracked offers" className="scroll-mt-16">
        <h2 className="display-lg">12 months on each tracked offer</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Each offer&apos;s verified monthly price × 12 — projection of the published rate only,
          not a quote: renewals, promos, and tier choice can change it. Where a route is $0, there
          is no bill to project. Limits and refund terms per offer stay on its page.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[640px]">
            <caption className="sr-only">
              Tracked offers with verified monthly price and its twelve-month projection.
            </caption>
            <thead>
              <tr>
                <th scope="col">Offer</th>
                <th scope="col" className="num">Price (verified)</th>
                <th scope="col" className="num">12 months at that rate</th>
                <th scope="col">Renewal behavior</th>
                <th scope="col">Verified</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVE_OFFERS.map((o) => (
                <tr key={o.id}>
                  <th scope="row" className="font-semibold">
                    <Link href={o.canonical_url} className="u-draw text-teal-deep">
                      {o.provider} {o.shortTitle}
                    </Link>
                  </th>
                  <td className="num text-[12.5px]">{o.price.now}</td>
                  <td className="num">{twelveMonthView(o)}</td>
                  <td className="text-ink-soft text-[12.5px]">
                    {o.price.renewal.split(/[;.]/)[0].trim()}
                  </td>
                  <td className="tabular whitespace-nowrap text-ink-mute">{o.verified_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 · Cross-links */}
      <section aria-label="More tools" className="rounded-xl border border-line bg-card p-5 text-sm">
        <p className="font-semibold">Not sure what a “task” costs in tokens?</p>
        <p className="mt-1 text-ink-soft">
          The reference is {BASELINE_PAYG_PER_TASK.toFixed(2)}/task at 100k tokens; your real in/out
          mix will differ — the definition and worked example are in{" "}
          <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
            effective cost per task, explained
          </Link>
          . For gifting and refund-window questions, see{" "}
          <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">
            buying AI access as a gift
          </Link>
          . These calculators use cost figures only — intelligence scores quoted elsewhere on the
          site (Artificial Analysis, accessed {INTEL.accessed}) never enter them.
        </p>
      </section>

      <CiteBlock
        citation={`Token Perks. "Cost calculators." Universe snapshot ${UNIVERSE.snapshot}; prices verified per row. ${url}`}
      />
      <ResearchSnapshot extra="Calculator arithmetic is first-party; every input defaults to a verified figure, and changing an input makes the result yours, not the site's." />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AI cost calculators",
            description:
              "Break-even, one-task cost per API route, monthly-vs-annual prepay math, and a 12-month view of tracked offers.",
            url,
            datePublished: "2026-09-07",
            dateModified: "2026-09-07",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Calculators", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
