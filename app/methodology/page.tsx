import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL } from "@/lib/site";
import { STALENESS_DAYS, AA_INDEX_VERSION } from "@/lib/intelligence";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Methodology v2 — cost arithmetic, quoted scores, and staleness gates",
  description:
    "Methodology v2: blended $/M arithmetic, evidence labels, the quoted-score citation policy for Artificial Analysis data, the withheld weighted ranking, staleness gates, and the data schema.",
  alternates: { canonical: canonical("/methodology/") },
  openGraph: {
    title: "Token Perks Methodology v2",
    description: "Cost arithmetic, quoted-score citation policy, staleness gates, data schema.",
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
    q: "What does 'blended $/M' mean?",
    a: "A single per-million-token figure computed as (3 x input price + 1 x output price) / 4. The 3:1 ratio mirrors a write-heavy workload. It is Token Perks arithmetic, not a provider figure, and it uses list prices — cache discounts, batch discounts, and off-peak windows are documented per row but not baked into the blend.",
  },
  {
    q: "Are the intelligence scores yours?",
    a: "No. Scores come from the Artificial Analysis Intelligence Index and are quoted per datum with a link to the exact source row, accessed 2026-09-07. We do not re-measure models, and we do not republish AA tables or feeds. Where AA flags a score as an estimate, we carry the flag.",
  },
  {
    q: "Why is there no overall value ranking on the site?",
    a: "A ranking that multiplies intelligence by cost is a derived work over AA's scores. Until we have written consent from AA to render that derivation, the formula ships in code and is documented here, but the leaderboard ranks on cost alone and quotes intelligence as a cited reference column.",
  },
  {
    q: "What is the trailing-7-day median window?",
    a: "Per-task cost references (like $0.80/task) use the median tokens-per-task over a trailing 7-day example window at an illustrative blended rate — medians, so one outlier session cannot skew the number.",
  },
  {
    q: "Do you republish benchmark leaderboards?",
    a: "No. AA scores appear only as individual quoted values inside our cost tables, each with its own citation and link. Machine feeds contain cost data only. Full AA tables, CSVs, and score feeds are not reproduced anywhere on this site.",
  },
];

export default function MethodologyPage() {
  const url = canonical("/methodology/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[{ label: "Home", href: "/" }, { label: "Methodology v2" }]}
      />
      <header>
        <p className="inline-block rounded-full bg-teal-wash px-3 py-1 text-xs font-bold text-teal-deep">
          Version 2 · dated Sep 7 2026
        </p>
        <h1 className="mt-3 display-md">Methodology</h1>
        <p className="mt-3 text-lg text-ink-soft">
          We publish <strong className="text-ink">point-in-time research snapshots</strong>, not
          live prices. Every figure carries a verification date; every page tells you to re-verify
          at official terms before paying. Version 2 extends the v0.1 verification rules with the
          cost-universe data model and a strict policy for quoting third-party benchmark scores.
        </p>
      </header>

      <section aria-label="Verification rules">
        <h2 className="display-lg">The rules (v0.1, retained)</h2>
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
            publishes) alongside cost-per-task (what you feel).
          </li>
          <li>
            <strong className="text-ink">Uncertainty labels.</strong> Every evidence item is marked.
            We never invent verification dates.
          </li>
        </ol>
      </section>

      <section aria-label="Evidence labels">
        <h2 className="display-lg">Evidence labels</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Every row in the universe table carries one of three labels:
        </p>
        <dl className="mt-3 space-y-2 text-sm text-ink-soft">
          <div>
            <dt className="data font-semibold text-teal-deep">DIRECT</dt>
            <dd>Read directly on the provider&apos;s own page during this pass.</dd>
          </div>
          <div>
            <dt className="data font-semibold">EXCERPT</dt>
            <dd>
              Official copy obtained via a site snapshot or a search-indexed rendering of the
              official page — the numbers are the provider&apos;s, the fetch was indirect.
            </dd>
          </div>
          <div>
            <dt className="data font-semibold text-ink-mute">UNCERTAIN</dt>
            <dd>
              Not verified this pass. The row appears with the price field marked
              &ldquo;not fetched&rdquo; — never a figure from memory. UNCERTAIN rows are included in
              the full-universe table on purpose: gaps are data.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-label="Cost arithmetic">
        <h2 className="display-lg">Cost arithmetic</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The leaderboard ranks pay-per-token routes on <strong className="text-ink">blended
          effective cost per million tokens</strong>:
        </p>
        <p className="data mt-3 rounded-xl border border-line-strong bg-card p-4 text-sm">
          blended $/M = (3 &times; input + 1 &times; output) / 4
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          The 3:1 input-to-output weighting mirrors a write-heavy agent workload; it is our
          convention, stated everywhere the number appears, and never attributed to providers. List
          prices only: cache discounts, batch modes, off-peak windows, and long-context surcharges
          are recorded in each row&apos;s notes and caveats, not averaged in. Estimated $/task
          multiplies the blend by a task-size preset (12k, 60k, 120k, or 200k tokens — our
          estimates). Subscription rows without published quotas get no per-task figure at all
          rather than a guess.
        </p>
      </section>

      <section aria-label="Quoted intelligence scores">
        <h2 className="display-lg">Quoted intelligence scores (AA policy)</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Intelligence values on this site come from the{" "}
          <a
            href="https://artificialanalysis.ai"
            rel="noopener"
            className="font-bold underline"
          >
            Artificial Analysis
          </a>{" "}
          Intelligence Index v{AA_INDEX_VERSION}, accessed 2026-09-07. Our posture, per AA&apos;s
          published terms:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            <strong className="text-ink">Per-datum citation.</strong> Every score travels with its
            source: &ldquo;AA Intelligence Index v{AA_INDEX_VERSION} — Source: Artificial Analysis,
            accessed 2026-09-07,&rdquo; linked to the exact AA model page or leaderboard row. Footer
            attribution does not substitute.
          </li>
          <li>
            <strong className="text-ink">No reproduction.</strong> AA tables and feeds are not
            reproduced. Scores appear only as single quoted reference values inside cost-side
            tables. Machine feeds (leaderboard.json, llms.txt, llms-full.txt) contain cost data
            only — no AA values.
          </li>
          <li>
            <strong className="text-ink">Estimates carried, not laundered.</strong> Where AA marks a
            score as an estimate, the asterisk follows it here too.
          </li>
          <li>
            <strong className="text-ink">Coverage limits stated.</strong> Only AA&apos;s Overall
            index is public per model. Coding, math, and agentic sub-indices are not publicly
            published, so those tabs do not exist here — absence is documented, not zero-filled.
          </li>
        </ul>
      </section>

      <section aria-label="Withheld weighted ranking">
        <h2 className="display-lg">Our score — documented, withheld</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The Token Perks Value Score (TPVS) is our experimental weighting of intelligence against
          effective cost:
        </p>
        <p className="data mt-3 rounded-xl border border-line-strong bg-card p-4 text-sm">
          TPVS = I &times; (C<sub>ref</sub> / C<sub>eff</sub>)<sup>&alpha;</sup>
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          where I is the cited AA score, C<sub>eff</sub> the blended cost for the selected task
          size, C<sub>ref</sub> the median cost of the ranked set (so the formula is
          ordering-invariant), and &alpha; a weighting preset: Performance 0.15, Balanced 0.5,
          Budget 1.0.{" "}
          <strong className="text-ink">
            No TPVS value is rendered anywhere on the site.
          </strong>{" "}
          A merged intelligence-x-cost ranking is a derivative work over AA&apos;s scores; it ships
          only with AA&apos;s written consent. Until then the leaderboard ranks on cost, quotes
          intelligence as a cited reference, and the frontier chart shows the cost-intelligence
          staircase — a visualization, not a score.
        </p>
      </section>

      <section aria-label="Staleness gates">
        <h2 className="display-lg">Staleness gates</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Cost rows re-verify <strong className="text-ink">weekly</strong>; active promos{" "}
          <strong className="text-ink">daily</strong> while live. Score-dependent blocks refuse to
          render if the intelligence snapshot is older than {STALENESS_DAYS} days — AA indexes move,
          and an old score presented as current is worse than none; the page then shows a
          &ldquo;score paused&rdquo; banner. Every pass, including passes that find nothing, is
          recorded in the{" "}
          <Link href="/changes/" className="font-bold underline">
            verification log
          </Link>
          .
        </p>
      </section>

      <section aria-label="Data schema">
        <h2 className="display-lg">Data schema</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The site renders from two snapshot files, both dated:
        </p>
        <pre className="data mt-3 overflow-x-auto rounded-xl border border-line-strong bg-card p-4 text-[12px] leading-relaxed">{`content/leaderboard/universe.json
  { snapshot: "2026-09-07",
    rows: [ { id, provider, category: a|b|c|d|e,
              plan, listPrice, priceMonthly,
              apiIn, apiOut,          // USD per 1M tokens, null when absent
              unit, notes, caveats[],
              sourceUrl, label: DIRECT|EXCERPT|UNCERTAIN,
              offer, modelId } ] }

content/intelligence/2026-09-07.json
  { accessed: "2026-09-07", source: "artificialanalysis.ai",
    indexVersion: "4.3",
    models: { <modelId>: { intelligenceIndex, estimate,
                            sourceUrl, aaName, aaVariant } } }`}</pre>
        <p className="mt-3 text-sm text-ink-soft">
          Machine contract:{" "}
          <a href="/api/leaderboard.json" className="font-bold underline">
            /api/leaderboard.json
          </a>{" "}
          (cost side only),{" "}
          <a href="/api/offers.json" className="font-bold underline">
            /api/offers.json
          </a>{" "}
          (tracked offers). Snapshot datasets are published under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="noopener"
            className="font-bold underline"
          >
            CC-BY-4.0
          </a>{" "}
          with attribution.
        </p>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="method" items={FAQ} />
        </div>
      </section>

      <CiteBlock citation={`Token Perks. "Methodology v2." Dated Sep 7 2026. ${url}`} />
      <ResearchSnapshot extra="Methodology version 2; changes are versioned and dated." />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Token Perks methodology v2 — cost arithmetic, quoted scores, staleness gates",
            description:
              "Blended $/M arithmetic, evidence labels, the quoted-score citation policy, the withheld weighted ranking, staleness gates, and the data schema.",
            url,
            datePublished: "2026-09-07",
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
              { "@type": "ListItem", position: 2, name: "Methodology v2", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
