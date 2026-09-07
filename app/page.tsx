import type { Metadata } from "next";
import Link from "next/link";
import AnchorBar from "@/components/AnchorBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import CiteBlock from "@/components/CiteBlock";
import ComparisonTable from "@/components/ComparisonTable";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import MethodologyNote from "@/components/MethodologyNote";
import NewChangedStrip from "@/components/NewChangedStrip";
import OfferCard from "@/components/OfferCard";
import ParetoStrip from "@/components/ParetoStrip";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import VerifyBadge from "@/components/VerifyBadge";
import {
  BASELINE_PAYG_PER_TASK,
  COMPARE_SUB_PRICE,
  HERO_ROUTE_BARS,
  REFERENCE_BASKET_NOTE,
  breakEvenTasks,
} from "@/lib/effectiveCost";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Token Perks: Best AI Deals & Catches, Verified Sep 2026",
  description:
    "Kimi K3 from $19/mo, two $0 free routes, every catch upfront. Prices and renewals verified Sep 6 2026 — compare true cost per task.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Token Perks: Best AI Deals & Catches, Verified Sep 2026",
    description:
      "Kimi K3 from $19/mo, two $0 free routes, every catch upfront. Verified Sep 6 2026.",
    url: canonical("/"),
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

const DECISION_CROSSOVER = Math.round(
  breakEvenTasks(COMPARE_SUB_PRICE, BASELINE_PAYG_PER_TASK),
);

/** Bar widths, to scale against the $0.80/task PAYG reference (full width). */
function barPct(perTask: number): number {
  return Math.max(1.5, (perTask / BASELINE_PAYG_PER_TASK) * 100);
}

const ANCHORS = [
  { href: "#compare", label: "Compare" },
  { href: "#routes", label: "The routes" },
  { href: "#log", label: "Log" },
  { href: "#frontier", label: "Frontier" },
  { href: "#guides", label: "Guides" },
  { href: "#faq", label: "FAQ" },
];

export default function Home() {
  const url = canonical("/");
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home" }]} />
      </div>

      {/* ── 1 · HERO: the living ledger (paper, grid texture, the page's one decorated moment) ── */}
      <section aria-label="Intro" className="hero relative">
        <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
          <div className="flex flex-wrap items-center gap-2">
            <VerifyBadge date="Sep 6 2026" />
            <span className="data rounded-full bg-card px-3 py-1 text-xs text-ink-soft shadow-[3px_3px_0_rgb(26_26_24/0.06)]">
              3 offers tracked · 2 free routes live
            </span>
          </div>
          <p className="data mt-2 max-w-2xl text-[11px] leading-snug text-ink-mute">
            Boundary: the free routes are a limited-time promo and an account-limited dev tier —
            windows, not plans.
          </p>
          <h1 className="display-xl mt-5 max-w-3xl">
            The best AI offers.{" "}
            <span className="mark-underline">The catches, upfront.</span>
          </h1>
          <p className="lede mt-4 max-w-2xl">
            Kimi K3 membership from <strong className="data">$19/mo</strong> (renews same price;
            annual ≈ <strong className="data">$15/mo</strong> effective). Two{" "}
            <strong>$0 routes</strong> — Zen Muse Spark promo and NVIDIA dev access. Every price
            verified <strong>Sep 6 2026</strong>; every catch stated before the signup link.
          </p>
          <p className="data mt-4 max-w-2xl text-sm font-semibold text-teal-deep">
            Under ~{DECISION_CROSSOVER} tasks/mo → $0 route or PAYG; over it → Allegretto $39.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/best/kimi-k3-core/"
              className="btn inline-flex min-h-[44px] items-center rounded-xl bg-teal px-5 font-bold text-white hover:bg-teal-deep"
            >
              Start with the Kimi K3 verdict
            </Link>
            <Link
              href="/guides/effective-cost-per-task-explained/"
              className="btn inline-flex min-h-[44px] items-center rounded-xl border border-line-strong bg-card px-5 font-bold hover:border-teal"
            >
              Learn cost-per-task
            </Link>
          </div>

          {/* THE LIVING HERO: your sliders compute the answer; the ledger shows the field */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <BreakEvenCalc />
            <figure className="relative rounded-2xl border border-line-strong bg-card p-4 pt-5 shadow-[4px_4px_0_rgb(26_26_24/0.07)]">
              <span className="stamp stamp-teal absolute -top-3 right-4">Verified · Sep 6 2026</span>
              <figcaption className="sr-only">
                Fig. 0 — effective cost per task by route, to scale against the pay-as-you-go
                reference
              </figcaption>
              <p className="eyebrow eyebrow-ink">Fig. 0 · Cost per task — to scale</p>
              <div className="relative mt-7 space-y-3.5">
                {HERO_ROUTE_BARS.map((b, i) => (
                  <div key={b.id}>
                    <p className="flex items-baseline justify-between gap-2 text-xs font-bold">
                      <span>{b.label}</span>
                      <span className="data text-teal-deep">{b.display}</span>
                    </p>
                    <div className="relative mt-1 h-3 rounded-[3px] bg-paper">
                      <div
                        className={`grow grow-${i + 1} h-full rounded-[3px] ${b.paid ? "bg-teal" : "bg-amber"}`}
                        style={{ width: `${barPct(b.perTask)}%` }}
                        aria-hidden="true"
                      />
                      {i === 0 && (
                        <span
                          className="delta-flag"
                          style={{ right: `${100 - barPct(b.perTask)}%`, top: "50%", transform: "translate(-100%, -50%)" }}
                          aria-hidden="true"
                        >
                          −59% vs PAYG
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <span className="ref-line" aria-hidden="true" />
              </div>
              <div className="chart-axis mt-2 flex justify-between">
                <span>$0.00</span>
                <span>$0.40</span>
                <span>$0.80</span>
              </div>
              <p className="mt-2.5 text-[11px] leading-snug text-ink-mute">
                To scale vs the {`$${BASELINE_PAYG_PER_TASK.toFixed(2)}`}/task PAYG reference (dashed
                line, full width). Free routes show a sliver: $0.00. Median-window reference, 100k
                tokens/task.{" "}
                <Link href="/guides/effective-cost-per-task-explained/" className="u-draw font-semibold text-teal-deep">
                  How the math works
                </Link>
              </p>
            </figure>
          </div>
        </div>
      </section>

      {/* Sticky on-page index with active-section highlighting */}
      <AnchorBar items={ANCHORS} wide />

      {/* ── 2 · COMPARISON: full-bleed paper-deep band, wide inner (ledger breathes) ── */}
      <section id="compare" aria-label="Top offers compared" className="band-paper-deep">
        <div className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6">
          <p className="eyebrow">The short version</p>
          <h2 className="display-lg mt-2">Top 3, compared in 30 seconds</h2>
          <div className="mt-4">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ── 3 · OFFERS: paper, card anatomy with fig captions ── */}
      <section id="routes" aria-label="Top 3 offer cards" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="eyebrow">The routes</p>
        <h2 className="display-lg mt-2">The three routes worth your money</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {ACTIVE_OFFERS.map((o) => (
            <OfferCard
              key={o.id}
              offer={o}
              taskNote={TASK_NOTES[o.id] ?? ""}
              fig={FIG_CAPTIONS[o.id]}
            />
          ))}
        </div>
      </section>

      {/* ── 4 · PUBLICATION LOG: boxless ticker, hairline rules ── */}
      <section id="log" aria-label="Publication log" className="mx-auto max-w-5xl px-4 sm:px-6">
        <NewChangedStrip />
      </section>

      {/* ── 6 · PARETO FRONTIER: paper, amber annotation chip ── */}
      <section id="frontier" aria-label="Success per dollar frontier" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <ParetoStrip />
      </section>

      {/* ── 7 · GUIDES: oversized numerals, double rule, amber route coding ── */}
      <section id="guides" aria-label="Guides teaser" className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <p className="eyebrow eyebrow-amber">The math, explained</p>
        <h2 className="display-lg mt-2">Two guides, zero vibes</h2>
        <div className="mt-6 grid gap-x-8 gap-y-8 md:grid-cols-2">
          {[
            {
              n: "01",
              href: "/guides/effective-cost-per-task-explained/",
              title: "Effective cost per task, explained",
              text: "The $40 / 120-task / $0.80 worked example: break-even at 50 tasks. Median-window math, stated plainly.",
            },
            {
              n: "02",
              href: "/guides/monthly-vs-annual-ai/",
              title: "Monthly vs annual AI plans",
              text: "Allegretto $39/mo vs ~$31/mo effective annual: who should prepay $372, and who should stay monthly.",
            },
          ].map((g) => (
            <article key={g.href}>
              <div className="rule-double" />
              <p className="display-xl mt-4 text-ink-mute opacity-40">{g.n}</p>
              <h3 className="display-sm mt-2">
                <Link href={g.href} className="hover:underline">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{g.text}</p>
              <Link
                href={g.href}
                className="mt-2 inline-flex min-h-[44px] items-center font-bold text-amber-deep hover:underline"
              >
                Read the guide →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── 8 · READER REPORTS: amber band, dashed not-yet-open frame ── */}
      <section aria-label="Reader reports status" className="band-amber">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="dashed-frame bg-card/40 p-5 sm:p-7">
            <p className="eyebrow eyebrow-amber">Reader reports</p>
            <h2 className="display-lg mt-2">Open soon — nothing mocked</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink">
              This frame stays empty of numbers until real reader reports exist. When it opens it
              will publish: per-task spend logs with device-verified screenshots, the submission
              date of every report, and a minimum sample size before any aggregate is shown — under
              the same{" "}
              <Link href="/methodology/" className="u-draw font-semibold text-teal-deep">
                Methodology v0.1
              </Link>{" "}
              rules as everything else on this site.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9 · FAQ: paper, hairline rules, no boxes ── */}
      <section id="faq" aria-label="Frequently asked questions" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="eyebrow">Quick answers</p>
        <h2 className="display-lg mt-2">Questions readers actually ask</h2>
        <div className="mt-4">
          <Faq
            id="home"
            items={[
              {
                q: "What is the cheapest durable AI coding route right now?",
                a: "Kimi K3 Moderato at $19/mo (about $15/mo effective annually) for light steady use, Allegretto at $39/mo once you clear ~49 tasks a month against the $0.80/task reference. Both verified Sep 6 2026.",
              },
              {
                q: "Is anything actually free?",
                a: "Yes, two routes: the Zen Muse Spark 1.3 Contributor Free promo ($0 in/cache/out, limited time) and NVIDIA Build Kimi K3 free for dev/prototyping (limits vary by account). Neither is a forever plan.",
              },
              {
                q: "What does “verified Sep 6 2026” mean?",
                a: "A researcher checked the official price, renewal, and limit statements on that date. It is a snapshot, not a live feed — re-verify at official terms before paying.",
              },
              {
                q: "Do you take affiliate commissions?",
                a: "We disclose that we may earn commissions, but this v0 contains no affiliate links — every outbound link goes to an official provider page. The how-we-make-money page has details.",
              },
            ]}
          />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <MethodologyNote />
      </div>

      {/* ── 10 · COLOPHON: paper-deep imprint zone ── */}
      <div className="band-colophon">
        <div className="mx-auto max-w-5xl space-y-6 px-4 pb-12 pt-8 sm:px-6">
          <CiteBlock
            citation={`Token Perks. “Best AI offers with catches upfront.” Research snapshot Sep 6 2026. ${url} Re-verify at official terms before paying.`}
          />
          <ResearchSnapshot />
        </div>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Token Perks",
            url: SITE_URL,
            description: "The best AI offers. The catches, upfront.",
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
