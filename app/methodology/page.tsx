import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How Token Perks Verifies AI Offers v0.1 (Sep 2026)",
  description:
    "Methodology v0.1: weekly snapshots, trailing-7-day median windows, official sources only, dual unit+task prices. Dated Sep 6 2026.",
  alternates: { canonical: canonical("/methodology/") },
  openGraph: {
    title: "How Token Perks Verifies AI Offers v0.1 (Sep 2026)",
    description: "Weekly snapshots, median windows, official sources only, dual prices.",
    url: canonical("/methodology/"),
    type: "article",
  },
};

const FAQ = [
  {
    q: "How often do you re-verify prices?",
    a: "Full re-verification weekly; active promos are checked daily while live. Every figure carries its verification date, and every page states it is a snapshot, not a live feed.",
  },
  {
    q: "What is the trailing-7-day median window?",
    a: "Per-task cost references (like $0.80/task) use the median tokens-per-task over a trailing 7-day example window at an illustrative blended rate — medians, so one outlier session cannot skew the number.",
  },
  {
    q: "Why show both unit and per-task prices?",
    a: "Unit prices ($/month, $/1M tokens) are what providers publish; per-task cost is what you feel. Dual display keeps both honest: the provider's number and your number, side by side.",
  },
  {
    q: "Do you republish benchmark leaderboards?",
    a: "No. Independent benchmarks are linked with attribution, never republished — our cost-per-task figures come only from first-party and supplied snapshots of official terms.",
  },
];

export default function MethodologyPage() {
  const url = canonical("/methodology/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[{ label: "Home", href: "/" }, { label: "Methodology v0.1" }]}
      />
      <header>
        <p className="inline-block rounded-full bg-teal-wash px-3 py-1 text-xs font-bold text-teal-deep">
          Version 0.1 · dated Sep 6 2026
        </p>
        <h1 className="mt-3 display-md">
          How Token Perks verifies AI offers
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          We publish <strong className="text-ink">point-in-time research snapshots</strong>, not
          live prices. Every figure carries a verification date; every page tells you to re-verify
          at official terms before paying.
        </p>
      </header>

      <section aria-label="Rules">
        <h2 className="display-lg">The v0.1 rules</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            <strong className="text-ink">Official sources only.</strong> Provider pages and
            in-product listings. No forum screenshots, no second-hand price tweets.
          </li>
          <li>
            <strong className="text-ink">Median-window aggregation.</strong> Per-task references use
            the median over a trailing 7-day example window — stated cadence, stated window, no
            silent averaging.
          </li>
          <li>
            <strong className="text-ink">Dual display.</strong> Unit price (what the provider
            publishes) alongside cost-per-task (what you feel). Direction hints on every chart:
            lower cost-per-task is better, higher tasks-per-dollar is better.
          </li>
          <li>
            <strong className="text-ink">Pareto framing.</strong> We rank by success-per-dollar at
            stated volumes, and say which options dominate vs which trade durability for price.
          </li>
          <li>
            <strong className="text-ink">Link-first attribution.</strong> Independent benchmarks are
            linked, never republished — our numbers come from first-party snapshots only.
          </li>
          <li>
            <strong className="text-ink">Uncertainty labels.</strong> Every evidence item is marked
            high, medium, or low confidence. We never invent verification dates.
          </li>
        </ol>
      </section>

      <section aria-label="Cadence">
        <h2 className="display-lg">Cadence</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Full re-verification <strong className="text-ink">weekly</strong>; active promos checked{" "}
          <strong className="text-ink">daily</strong> while live. Time-boxed items always show
          verified-X plus ends-Y (e.g. “verified Sep 6, ends Sep 20”) — never a bare “verified”
          badge on a decaying promo. Every pass is recorded in the{" "}
          <Link href="/changes/" className="font-bold underline">
            verification log
          </Link>{" "}
          with its date and scope.
        </p>
      </section>

      <section aria-label="Data licensing">
        <h2 className="display-lg">Data &amp; licensing</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Snapshot datasets are published under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="noopener"
            className="font-bold underline"
          >
            CC-BY-4.0
          </a>{" "}
          with attribution, machine-readable at{" "}
          <a href="/api/offers.json" className="font-bold underline">
            /api/offers.json
          </a>
          . Independent benchmarks we respect (external, not affiliated):{" "}
          <a href="https://artificialanalysis.ai" rel="noopener" className="font-bold underline">
            Artificial Analysis
          </a>
          .
        </p>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="method" items={FAQ} />
        </div>
      </section>

      <CiteBlock
        citation={`Token Perks. “Methodology v0.1.” Dated Sep 6 2026. ${url}`}
      />
      <ResearchSnapshot extra="Methodology version 0.1; changes are versioned and dated." />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How Token Perks verifies AI offers (Methodology v0.1)",
            description:
              "Weekly snapshots, trailing-7-day median windows, official sources only, dual unit+task prices.",
            url,
            datePublished: "2026-09-06",
            author: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Methodology v0.1", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
