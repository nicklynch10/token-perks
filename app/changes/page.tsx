import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Verification Log: What Was Checked, When",
  description:
    "Dated log of every verification pass on Token Perks: what was checked, what changed, and what did not. Starting with the Sep 6 2026 snapshot.",
  alternates: { canonical: canonical("/changes/") },
  openGraph: {
    title: "Verification Log: What Was Checked, When",
    description:
      "Dated log of every verification pass — what was checked, what changed, what did not.",
    url: canonical("/changes/"),
    type: "article",
  },
};

interface LogEntry {
  date: string;
  title: string;
  items: string[];
}

/**
 * Seed log: one entry per verification pass, newest first. Each future pass
 * (weekly per Methodology v0.1) appends an entry above these — so the
 * "re-verified weekly" claim is provable, not aspirational.
 */
const LOG: LogEntry[] = [
  {
    date: "2026-09-07",
    title: "Pass 7 — coverage-gap merge, citation drill-down, team-size math",
    items: [
      "Scope: same-day evidence merge from the provider-universe gap pass. No offer data, prices, renewals, limits, or verified_at values changed — every verified_at remains 2026-09-06. Universe snapshot stays 2026-09-07.",
      "Universe: 121 → 129 access routes (39 subscriptions, 48 API price rows, 10 credit/prepaid systems, 18 coding-tool plans, 14 free tiers/promos; 88 DIRECT, 35 EXCERPT, 6 UNCERTAIN). Closed this pass: ChatGPT consumer tiers (Plus $19.99, Go $8.00, Pro 5x $100 / 20x $200, credit packs), Claude Max $100/$200 split, SuperGrok Lite $10 / Heavy $300, Cursor Pro+ $60 / Ultra $200 / Teams Premium $120, Copilot Business $19 / Enterprise $39 per seat, DeepSeek peak/off-peak hours, Kimi K2.7 Code / K2.6 API prices, Qwen Model Studio list prices, Groq console list prices, Devin post-merge ladder (via official-page snapshot), Jules task tiers, and GPT-6 Astra plan availability.",
      "Still open — shown as “not fetched”, never estimated: GLM Coding Pro/Max prices, Llama 4 pricing, Fireworks Fire Pass price/duration, ChatGPT Business per-seat dollar, and third-party-resale sightings. ChatGPT Free carries no standalone row (unverified this pass).",
      "Citation drill-down: every benchmark citation now links its exact AA source row (the gpt-5-mini stale-leaderboard link now points at its verified AA model page); each provider page gains a cited-scores section plus a Sources & methods table listing every datum's source and access date; the methodology page gains a benchmark-provenance section (v4.3 suite, effort variants, cite-vs-link, consent gate). No AA table is reproduced.",
      "Break-even calculator: new team-size input (1–50 seats, shareable via ?seats=) multiplies verified per-seat plan math and recommends the cheapest multi-seat-compliant setup; solo behavior is unchanged.",
    ],
  },
  {
    date: "2026-09-07",
    title: "Pass 6 — cost-intelligence expansion (universe, leaderboard, frontier chart, providers)",
    items: [
      "Scope: new data layer added on top of the three tracked offers. No offer data, prices, renewals, limits, or verified_at values changed — every verified_at remains 2026-09-06.",
      "Universe snapshot published: 121 access routes across 35 subscriptions, 46 API price rows, 10 credit/prepaid systems, 16 coding-tool plans, and 14 free tiers/promos — every row carrying its source URL, access date, and evidence label (70 DIRECT, 35 EXCERPT, 16 UNCERTAIN). Unverified routes are shown as unverified, never priced from memory.",
      "Homepage rebuilt as a cost leaderboard: an interactive cost-vs-intelligence frontier chart, an API cost table ranked on blended $/M = (3 x input + 1 x output) / 4 at list price, and a full-universe filter table including UNCERTAIN rows.",
      "Artificial Analysis Intelligence Index v4.3 scores added as quoted reference values: one citation per datum, each linking its exact source row, accessed 2026-09-07. No AA table is reproduced; machine feeds deliberately exclude AA scores entirely. Our own weighted ranking (TPVS) is implemented and documented but not rendered pending written consent from AA.",
      "New sections: /providers/ index and 24 provider pages cross-linked with the leaderboard; /api/leaderboard.json machine feed (cost side only); llms.txt and llms-full.txt extended with the leaderboard and universe; sitemap extended with per-provider URLs.",
      "Known gaps recorded on the methodology page: ChatGPT subscription prices, Claude Max 20x split, GLM Coding Pro/Max prices, Qwen first-party API prices, Llama 4 pricing, Groq per-model prices, Devin/Windsurf post-merge pricing, and Kimi K2.7/K2.6 API prices were not verifiable this pass.",
    ],
  },
  {
    date: "2026-09-07",
    title: "Pass 5 — data-platform reorientation (tone and layout only)",
    items: [
      "Scope: presentation-only. No offer data, prices, renewals, limits, or verified_at values were changed in this pass — every verified_at remains 2026-09-06.",
      "Homepage rebuilt around the comparison table (offer / price / annual effective / est. $ per 100 tasks / key limit / renewal behavior / verified date); the break-even calculator moved below it as a compact card; the publication log demoted to a single verification line linking here.",
      "Copy pass: headlines, verdict labels, badge text, and call-to-action labels rewritten in neutral documentation style; decorative full-bleed bands, tinted route color-coding, and on-page anchor bars removed.",
      "Motion: scroll-linked bar and tally animations, hover-lift cards, and stamp animation removed; verification stamps are static.",
      "Offer pages restructured to lead with a spec table (tiers, price, annual effective, estimated cost per task, limits, renewal, verified date), followed by the caveats block, summary, and details; page titles made descriptive.",
    ],
  },
  {
    date: "2026-09-07",
    title: "Pass 4 — presentation polish",
    items: [
      "Scope: presentation-only. No offer data, prices, renewals, limits, or verdicts were changed in this pass — every verified_at remains 2026-09-06.",
      "Offer cards: raster thumbnails replaced with inline ledger mini-charts (same evidence-table language); offers with a Changed entry in the publication log carried a visible accent tick from that pass on.",
      "Reader-trust copy: footer disclosure reordered (no affiliate links at that pass, commissions only possibly future); a no-gifting line added on the offers hub; the free-route boundary hedge moved above the fold on the homepage.",
      "Navigation and motion: sticky anchor bars gained active-section highlighting; verification stamps given a short reduced-motion-guarded fade; the hero calculator deep-links its computed answer (with your URL inputs) to the matching verdict section.",
      "Copy repairs: two unexplained references removed or given context (a promo-window aside on the monthly-vs-annual guide; a fleet-allowance aside on the cost-per-task guide). Plain non-link styling applied to in-product access routes on the free-route pages.",
    ],
  },
  {
    date: "2026-09-06",
    title: "Pass 3 — link integrity, canonical scheme, and identity rebuild",
    items: [
      "Kimi tier ladder ($19 / $39 / $99 / $199 monthly; ~$15 / $31 / $79 / $159 annual effective) re-checked against the staged Sep 6 snapshot data — values unchanged. The live pricing page responds but renders figures client-side, so no new external confirmation of the numbers is claimed beyond the original snapshot.",
      "Terms link corrected: api.kimi.com/coding/ was verified serving a bare JSON greeting (stale as a terms page) and the offer points at the official membership pricing page, reached from the kimi.ai help center — both URLs fetched and status-checked this pass.",
      "Canonical scheme recorded: this site uses trailing-slash URLs everywhere — next.config.ts sets trailingSlash, canonical() appends the slash, and the sitemap, feeds, and breadcrumbs all emit slashed URLs. Non-slash requests redirect; treat the slashed form as canonical when citing.",
      "Visual identity rebuilt to the round-3 ledger spec (self-hosted type system, token ramp); no offer data, prices, or verdicts changed in this pass.",
    ],
  },
  {
    date: "2026-09-06",
    title: "Pass 2 — fix-round re-verification and hardening",
    items: [
      "All three offer data files re-read and re-validated against the schema checks; verified_at values retained at 2026-09-06 — no external re-check claimed beyond the same-day snapshot.",
      "Offer pages rebuilt verdict-first; verification dates removed from title tags and moved to badges, lastmod, and snapshot lines (evergreen titles).",
      "Feed switched to active offers; robots.txt, sitemap, and ItemList structured data regenerated and spot-checked by serving the build.",
      "FAQ expanded from reader questions on three pages; mock community-data band and mock signup removed — nothing mocked remains.",
      "Verification log created (this page) so every future pass is dated and auditable.",
    ],
  },
  {
    date: "2026-09-06",
    title: "Pass 1 — initial full snapshot",
    items: [
      "Kimi K3 membership: tier prices $19–$199/mo, annual effective ≈$15/$31/$79/$159, shared credit pool with 5-hour and weekly controls — captured from the official coding-endpoint page.",
      "Zen Muse Spark 1.3 Contributor Free: $0 input/cache/output and the exact-string access path (/connect → Zen → /models) — captured from the in-product listing; promo end date not published, stated as such.",
      "NVIDIA Build Kimi K3: free development/prototyping terms with reasoning and tool calls preserved, limits account-variable — captured from the official catalog listing.",
      "Methodology v0.1 published; machine feeds (llms.txt, llms-full.txt, offers.json, feed.xml) brought live; cost-per-task reference model ($40 basket, $0.80/task, 50-task break-even) documented.",
    ],
  },
];

export default function ChangesPage() {
  const url = canonical("/changes/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Verification log" },
        ]}
      />
      <header>
        <p className="inline-block rounded-full bg-teal-wash px-3 py-1 text-xs font-bold text-teal-deep">
          One entry per verification pass · newest first
        </p>
        <h1 className="mt-3 display-md">
          Verification log
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Methodology v0.1 promises weekly re-verification. This log is the proof: every pass gets
          a dated entry saying what was checked, what changed, and — just as important — what did
          not. If a pass ever finds nothing new, it still gets an entry.
        </p>
      </header>

      <ol className="space-y-6">
        {LOG.map((e) => (
          <li key={`${e.date}-${e.title}`} className="rounded-xl border border-line bg-card p-5 sm:p-6">
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="tabular rounded-full bg-teal-wash px-3 py-0.5 text-xs font-bold text-teal-deep">
                {e.date}
              </span>
              <span className="text-lg font-bold tracking-tight">{e.title}</span>
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
              {e.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <CiteBlock
        citation={`Token Perks. “Verification log.” Entries dated by pass, starting Sep 6 2026. ${url}`}
      />
      <ResearchSnapshot extra="This log records verification work, not price changes — offer pages carry their own verified dates." />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Token Perks verification log",
            description:
              "Dated log of every verification pass: what was checked, what changed, what did not.",
            url,
            datePublished: "2026-09-06",
            author: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Verification log", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
