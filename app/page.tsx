import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import ComparisonTable from "@/components/ComparisonTable";
import JsonLd from "@/components/JsonLd";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI offer prices, limits, and effective cost per task",
  description:
    "Three tracked AI offers — Kimi K3 membership and two $0 routes — compared on price, annual effective cost, estimated cost per task, key limits, and renewal behavior. Snapshot Sep 6 2026.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Token Perks — AI offer prices, limits, and effective cost per task",
    description:
      "Offer comparison table, break-even calculator, and caveats per offer. Snapshot Sep 6 2026.",
    url: canonical("/"),
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
    href: "/methodology/",
    title: "Methodology v0.1",
    text: "How figures are verified: official sources only, stated windows and cadence, uncertainty labels, dated verification log.",
  },
];

export default function Home() {
  const url = canonical("/");
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home" }]} />
      </div>

      {/* 1 · One-sentence explainer: what this site is and who it is for */}
      <section aria-label="About this site" className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6">
        <h1 className="display-xl max-w-4xl">
          AI subscription offers, compared on effective cost per task
        </h1>
        <p className="lede mt-4 max-w-3xl">
          Token Perks tracks a small set of AI membership and free-tier offers and publishes, for
          each: list price, annual prepay math, estimated cost per task, the usage limits that
          matter, and renewal terms — verified against official provider pages on{" "}
          <strong className="data">Sep 6 2026</strong>. It is built for developers and teams
          deciding between flat-rate plans and pay-as-you-go billing. Every offer&apos;s caveats are
          stated before any signup link.
        </p>
      </section>

      {/* 2 · The comparison table (centerpiece; renders fully in static HTML) */}
      <section id="compare" aria-label="Offer comparison" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display-lg">Offer comparison</h2>
          <p className="data text-xs text-ink-mute">
            {ACTIVE_OFFERS.length} offers tracked · sorted by estimated effective cost
          </p>
        </div>
        <ComparisonTable />
      </section>

      {/* 3 · Break-even calculator: compact card below the table */}
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

      {/* 4 · Guides and methodology link cards */}
      <section aria-label="Guides and methodology" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="display-lg">Guides and methodology</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
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

      {/* 5 · Quiet verification line (publication log demoted) */}
      <div className="mx-auto max-w-6xl border-t border-line px-4 py-5 sm:px-6">
        <p className="data text-xs text-ink-mute">
          Prices last verified 2026-09-06 —{" "}
          <Link href="/changes/" className="font-semibold text-teal-deep hover:underline">
            see the verification log
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Token Perks",
            url: SITE_URL,
            description: "AI subscription offers, compared on effective cost per task.",
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
