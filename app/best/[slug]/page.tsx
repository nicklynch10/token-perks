import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import VerifyBadge from "@/components/VerifyBadge";
import { ACTIVE_OFFERS, getOffer, offerSlugs, type Offer } from "@/lib/offers";
import { canonical, SITE_URL, SNAPSHOT_DATE, social } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return offerSlugs().map((slug) => ({ slug }));
}

/** Descriptive, spec-like titles (no verdict phrasing, no baked dates). */
const META: Record<string, { title: string; description: string }> = {
  "kimi-k3-core": {
    title: "Kimi K3 Membership — prices, limits, effective cost per task",
    description:
      "Kimi K3 membership $19–$199/mo by tier; annual effective ≈$15–$159/mo. One shared credit pool with 5-hour and weekly controls. Verified Sep 6 2026.",
  },
  "muse-spark-zen-free": {
    title: "Zen Muse Spark 1.3 Free promo — price, limits, access route",
    description:
      "$0 input/cache/output during the promo window; access via /connect → Zen → /models with the exact model string. Verified Sep 6 2026.",
  },
  "nvidia-k3-free": {
    title: "NVIDIA Build Kimi K3 Free — price, limits, access route",
    description:
      "Kimi K3 free for development and prototyping on NVIDIA Build, reasoning and tool calls preserved; limits vary by account. Verified Sep 6 2026.",
  },
  "copilot-pro": {
    title: "GitHub Copilot Pro — $10/mo price, AI-credit economics, model access",
    description:
      "Copilot Pro $10/user/mo; completions unlimited, chat/agents draw $15/mo AI credits ($10 base + $5 flex at $0.01/credit, no rollover); budget-based overage. Verified live Sep 7 2026.",
  },
  "chatgpt-plus": {
    title: "ChatGPT Plus — $19.99/mo price, usage windows, credits",
    description:
      "ChatGPT Plus $19.99/mo (US App Store list; help article states $20/mo, no annual plan). Caps run 5-hour windows plus weekly allowances and vary with system conditions. Verified Sep 7 2026.",
  },
  "google-ai-pro": {
    title: "Google AI Pro — $19.99/mo price, limits, bundle contents",
    description:
      "Google AI Pro $19.99/mo: 5 TB storage, ~4x Gemini usage with 5-hour/weekly limits, family sharing, buyable AI credits. Annual price not published. Verified Sep 7 2026.",
  },
  "claude-pro": {
    title: "Claude Pro — $20/mo ($17 annual) price, session caps, usage credits",
    description:
      "Claude Pro $20/mo or $200/yr upfront. At least 5x Free usage per 5-hour session plus a weekly cap; Claude Code shares the pool; Fable models run on pay-as-you-go credits. Verified Sep 7 2026.",
  },
  "cursor-pro": {
    title: "Cursor Pro — $20/mo price, included usage pools, on-demand billing",
    description:
      "Cursor Pro $20/mo: unlimited tab completions, Agent + bonus pools of unpublished size, on-demand usage at API rates billed in arrears. Verified live Sep 7 2026.",
  },
  "perplexity-pro": {
    title: "Perplexity Pro — $20/mo price, unstated caps, credit mechanics",
    description:
      "Perplexity Pro $20/mo (annual price not published). Search/Deep Research caps are 'average use' without numbers; credits at 100 = $1 with no standing Pro pool. Verified Sep 7 2026.",
  },
};

/** Spec-like H1: what this page documents. */
const PAGE_H1: Record<string, string> = {
  "kimi-k3-core": "Kimi K3 Membership — prices, limits, effective cost per task",
  "muse-spark-zen-free": "Zen Muse Spark 1.3 Free promo — price, limits, access route",
  "nvidia-k3-free": "NVIDIA Build Kimi K3 Free — price, limits, access route",
  "copilot-pro": "GitHub Copilot Pro — price, AI credits, model access",
  "chatgpt-plus": "ChatGPT Plus — price, usage windows, credits",
  "google-ai-pro": "Google AI Pro — price, limits, bundle contents",
  "claude-pro": "Claude Pro — price, session caps, usage credits",
  "cursor-pro": "Cursor Pro — price, included pools, on-demand billing",
  "perplexity-pro": "Perplexity Pro — price, limits, credit mechanics",
};

/** Lead spec table rows, per offer: figures first, then limits and renewal. */
const SPEC_ROWS: Record<string, { label: string; value: string }[]> = {
  "kimi-k3-core": [
    { label: "Monthly tiers", value: "Moderato $19 · Allegretto $39 (middle tier) · Allegro $99 · Vivace $199" },
    { label: "Annual effective", value: "≈$15 · $31 · $79 · $159 per mo (year prepaid upfront)" },
    { label: "Est. cost per task", value: "≈$0.33 at 120 tasks/mo (Allegretto, illustrative)" },
    { label: "Break-even vs PAYG", value: "≈49 tasks/mo (Allegretto) · ≈24 (Moderato) at the $0.80/task reference" },
    { label: "Key limits", value: "One shared credit pool; 5-hour and weekly usage controls" },
    { label: "Renewal", value: "Monthly at list price; annual prepaid lowers effective cost" },
    { label: "Verified", value: "2026-09-06" },
  ],
  "muse-spark-zen-free": [
    { label: "Price", value: "$0 for input, cache, and output tokens (promo window)" },
    { label: "Est. cost per task", value: "$0.00 while the promo lasts" },
    { label: "Key limits", value: "Limited-time promo; exact-string entry; unpublished throughput caps" },
    { label: "Renewal", value: "None — a promo, not a plan" },
    { label: "End date", value: "Not published — visible inside the official product only" },
    { label: "Verified", value: "2026-09-06" },
  ],
  "nvidia-k3-free": [
    { label: "Price", value: "$0 for development and prototyping within account limits" },
    { label: "Est. cost per task", value: "$0.00 for dev use" },
    { label: "Key limits", value: "Account-variable quota; dev/prototyping scope; no production SLA" },
    { label: "Renewal", value: "None — account limits govern" },
    { label: "Verified", value: "2026-09-06" },
  ],
  "copilot-pro": [
    { label: "Monthly price", value: "$10/user/mo (annual price not published)" },
    { label: "Included credits", value: "$15/mo total — $10 base (1,000) + $5 flex (500) at $0.01/credit" },
    { label: "Rollover", value: "None — reset 00:00 UTC, first day of each month" },
    { label: "Unlimited?", value: "Completions and next-edit: unlimited; chat/agents/review/CLI: credit-metered" },
    { label: "Overage", value: "Opt-in dollar budget, billed in arrears at per-token model rates; may be capped" },
    { label: "Pool per task", value: "≈19 tasks at the $0.80/task reference before on-demand starts (illustrative)" },
    { label: "Key limits", value: "Premium models (Opus/Fable/GPT-5.5+/Sol) are Pro+/Max per docs table" },
    { label: "Verified", value: "2026-09-07" },
  ],
  "chatgpt-plus": [
    { label: "Monthly price", value: "$19.99 (US App Store list); '$20/month' per help-article excerpt" },
    { label: "Annual price", value: "Not offered — Plus is monthly-only per help-article excerpt" },
    { label: "Limit mechanism", value: "5-hour rolling windows + weekly allowances; vary with system conditions" },
    { label: "Excerpted number", value: "3,000 GPT-5-Thinking msgs/week (May 2026 release-note excerpt)" },
    { label: "Overage", value: "Flexible-usage credits + instant weekly resets (prices in-product only)" },
    { label: "Above Plus", value: "Pro $100 = 5x usage; Pro $200 = 20x (help excerpt)" },
    { label: "Verification caveat", value: "openai.com 403s automated fetches — dual-sourced, browser re-check advised" },
    { label: "Verified", value: "2026-09-07" },
  ],
  "google-ai-pro": [
    { label: "Monthly price", value: "$19.99/mo (static text, official Gemini subscriptions page)" },
    { label: "Annual price", value: "Offered — figure not published on official pages this pass" },
    { label: "Storage", value: "5 TB (10 TB on some plan variants)" },
    { label: "Usage vs free", value: "≈4x Gemini access; 'limit refreshes every 5 hours until you reach your weekly limit'" },
    { label: "Bundle", value: "Gemini in Gmail/Docs, Flow, NotebookLM, Jules, Antigravity, YouTube Premium Lite, $10/mo Cloud credits" },
    { label: "Overage", value: "Buyable AI credits — pack prices not published; plan manager only" },
    { label: "Extras", value: "Family sharing (5 others); students 1 year free (SheerID); 150+ countries" },
    { label: "Verified", value: "2026-09-07" },
  ],
  "claude-pro": [
    { label: "Monthly price", value: "$20/mo" },
    { label: "Annual", value: "$200 upfront ≈ $17/mo effective (pricing-page card)" },
    { label: "Session allowance", value: "≥5x Free per rolling 5-hour session; resets every 5 hours" },
    { label: "Weekly cap", value: "All-model weekly limit; resets at an account-assigned time (Settings > Usage)" },
    { label: "Included models", value: "Opus, Sonnet, Haiku (200k context); Fable 5/5.1 = pay-as-you-go credits" },
    { label: "Overage", value: "Usage credits at standard API rates; $2,000/day redemption limit; optional spend cap + auto-reload" },
    { label: "Claude Code", value: "Included — shares one pool with chat" },
    { label: "Verified", value: "2026-09-07" },
  ],
  "cursor-pro": [
    { label: "Monthly price", value: "$20/mo (verified in live static text, pricing page + help table)" },
    { label: "Annual price", value: "Toggle exists in-app — yearly USD figure not published" },
    { label: "Included usage", value: "'A set amount' across Agent + bonus pools — dollar size not published" },
    { label: "Unlimited?", value: "Tab completions unlimited on Pro and above" },
    { label: "Overage", value: "On-demand at raw API list rates, billed in arrears (opt-in)" },
    { label: "Ladder", value: "Pro+ $60 = 3x Agent limits; Ultra $200 = 20x; Teams $40/$120 per user" },
    { label: "Refunds", value: "≤14 days AND period unused; consumed on-demand never refundable" },
    { label: "Verified", value: "2026-09-07" },
  ],
  "perplexity-pro": [
    { label: "Monthly price", value: "$20/mo (official pricing hub, browser-mode fetch)" },
    { label: "Annual price", value: "Not published on any official page fetched — read it at checkout" },
    { label: "Models", value: "One sub across GPT-5.2, Claude Sonnet 4.6, Gemini 3.1 Pro, Grok 4, Sonar (per Pro help article)" },
    { label: "Caps", value: "Pro Search: weekly 'average use' (no number); Deep Research: monthly 'average use' (Max = 50/mo)" },
    { label: "Credits", value: "100 = $1; no standing Pro pool — one-time 4,000 bonus credits expire after 30 days" },
    { label: "Refunds", value: "EU/UK/TR 14d; KR/BR 7d; else 24h monthly / 72h annual (a second official page says 48h — conflict noted)" },
    { label: "Student", value: "Education Pro $10/mo (SheerID)" },
    { label: "Verified", value: "2026-09-07" },
  ],
};

/** OG image per offer; anything unshipped falls back to the site card. */
const OG_IMAGE: Record<string, string> = {
  "kimi-k3-core": "/img/og/og-kimi.png",
  "muse-spark-zen-free": "/img/og/og-muse-zen.png",
  "nvidia-k3-free": "/img/og/og-nvidia.png",
};

/**
 * schema.org/Offer per snapshot. priceValidUntil = verified_at + 7 days
 * (the stated weekly re-verification cadence). Prices come from the offer's
 * own jsonld_price field (single price -> Offer; ladder -> AggregateOffer).
 * $0 routes use isAccessibleForFree instead of availability.
 */
function offerJsonLd(offer: Offer, url: string) {
  const validUntil = new Date(
    Date.parse(`${offer.verified_at}T00:00:00Z`) + 7 * 24 * 3600 * 1000,
  )
    .toISOString()
    .slice(0, 10);
  if (offer.price.now.startsWith("$0")) {
    return {
      "@context": "https://schema.org",
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      priceValidUntil: validUntil,
      url,
      isAccessibleForFree: true,
    };
  }
  const jp = offer.jsonld_price ?? { lowPrice: "19", highPrice: "199" };
  if (jp.price != null) {
    return {
      "@context": "https://schema.org",
      "@type": "Offer",
      price: jp.price,
      priceCurrency: jp.currency ?? "USD",
      priceValidUntil: validUntil,
      url,
      availability: "https://schema.org/InStock",
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    lowPrice: jp.lowPrice,
    highPrice: jp.highPrice,
    priceCurrency: jp.currency ?? "USD",
    priceValidUntil: validUntil,
    url,
    availability: "https://schema.org/InStock",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = META[slug] ?? {
    title: "AI offer — price, renewal, limits",
    description: `Price, renewal, and caveats verified ${SNAPSHOT_DATE}. Re-verify at official terms.`,
  };
  const offer = getOffer(slug);
  const ended = offer != null && offer.status !== "active";
  return {
    title: ended ? `Ended: ${m.title}` : m.title,
    description: m.description,
    alternates: { canonical: canonical(`/best/${slug}/`) },
    ...social({
      title: m.title,
      description: m.description,
      path: `/best/${slug}/`,
      type: "article",
      image: OG_IMAGE[slug] ?? "/img/og/og-home.png",
      imageAlt: "Token Perks — AI subscription offers, compared on effective cost per task",
    }),
    ...(ended ? { robots: { index: false, follow: true } } : {}),
  };
}

function OfficialLink({ label, url, note }: { label: string; url: string | null; note?: string }) {
  if (!url) {
    // Honest non-link: plain emphasis plus a tag, no anchor styling.
    return (
      <li className="rounded-lg bg-paper-deep p-3 text-sm">
        <strong className="font-semibold">{label}.</strong>{" "}
        <span className="data text-[10px] uppercase tracking-[0.1em] text-ink-mute">
          Not a link — in-product route
        </span>
        <span className="mt-0.5 block text-ink-soft">
          {note ?? "No public URL in this snapshot — navigate from the provider's official product."}
        </span>
      </li>
    );
  }
  return (
    <li className="rounded-lg border border-line bg-card p-3 text-sm">
      <a
        href={url}
        rel="noopener"
        className="min-h-[44px] font-semibold text-teal-deep underline"
      >
        {label} (official)
      </a>
      {note && <span className="block text-ink-soft">{note}</span>}
    </li>
  );
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();
  const url = canonical(offer.canonical_url);
  const ended = offer.status !== "active";
  const endedDate = offer.expiry ?? offer.verified_at;
  const specRows = SPEC_ROWS[offer.id] ?? [];
  const summary = offer.verdict;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Offers", href: "/best/" },
          { label: offer.shortTitle },
        ]}
      />

      {ended && (
        <div
          role="alert"
          className="rounded-xl border border-expired bg-expired-wash p-4 text-sm sm:p-5"
        >
          <p className="text-lg font-bold text-expired">Ended {endedDate}</p>
          <p className="mt-1 text-ink">
            This offer is no longer active and is kept for reference. See{" "}
            <Link href="/best/" className="font-semibold underline">
              all live offers side by side
            </Link>{" "}
            for the current comparison.
          </p>
        </div>
      )}

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <VerifyBadge date={offer.verified_at} />
          <span className="data rounded-full border border-line-strong px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-soft">
            {offer.badge}
          </span>
        </div>
        <p className="eyebrow mt-4">
          {offer.provider} · {offer.plan}
        </p>
        <h1 className="display-md mt-1.5 max-w-2xl">
          {PAGE_H1[offer.id] ?? offer.title}
        </h1>
        {/* First-100-words: price, renewal, verified */}
        <p className="mt-3 text-base text-ink-soft">
          <strong className="data text-ink">{offer.price.now}.</strong> Renewal: {offer.renewal}{" "}
          All figures verified <strong className="tabular">{offer.verified_at}</strong>. Re-verify at
          official terms before paying.
        </p>
      </header>

      {/* Spec table first: tiers, price, annual, est. $/task, limits, renewal, verified */}
      <section id="specs" aria-label="Specification" className="scroll-mt-16">
        <h2 className="display-lg">Specification</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong bg-card">
          <table className="ledger text-left text-sm">
            <caption className="sr-only">
              {offer.shortTitle} specification: price, annual effective cost, estimated cost per
              task, limits, and renewal
            </caption>
            <tbody>
              {specRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="w-44 px-4 py-2.5 align-top font-semibold">
                    {r.label}
                  </th>
                  <td className="tabular px-4 py-2.5 text-ink-soft">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Caveats: the catch content, presented as a calm spec warning block */}
      <div
        id="caveats"
        style={{ scrollMarginTop: "4rem" }}
        role="note"
        aria-label="Caveats"
        className="caveat-panel p-4 sm:p-5"
      >
        <p className="eyebrow">Caveats</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {offer.catches.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <section id="verdict" aria-label="Summary" className="scroll-mt-16">
        <h2 className="display-lg">Summary</h2>
        <p className="verdict-line mt-2">{summary}</p>
      </section>

      <section id="price" aria-label="Price and renewal" className="scroll-mt-16">
        <h2 className="display-lg">Price and renewal</h2>
        <dl className="mt-2 space-y-2 rounded-xl border border-line bg-card p-4 text-sm sm:p-5">
          <div>
            <dt className="font-semibold">Current price</dt>
            <dd className="tabular font-semibold">{offer.price.now}</dd>
          </div>
          <div>
            <dt className="font-semibold">Renewal</dt>
            <dd className="text-ink-soft">{offer.price.renewal}</dd>
          </div>
          {offer.expiry && (
            <div>
              <dt className="font-semibold">Expiry</dt>
              <dd className="text-ink-soft">{offer.expiry}</dd>
            </div>
          )}
        </dl>
      </section>

      <section id="gift" aria-label="Gift readiness" className="scroll-mt-16">
        <h2 className="display-lg">Gifting this offer</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {/^\$0\b/.test(offer.price.now.trim()) ? (
            <>
              Free route — there is nothing to buy. The gift is the introduction: the recipient
              activates it on their own account, where quotas are account-variable, so they should
              measure it in their first session.
            </>
          ) : (
            <>
              Paid plan tied to the buying account — the verified terms show no gift card or
              transfer path. If you want to cover someone&apos;s first month, do it on an account
              they own and control, and start monthly rather than annual — prepaid money is the
              exposed part (renewal behavior is quoted in the block above). Full per-offer
              reasoning:{" "}
              <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">
                buying AI access as a gift
              </Link>
              .
            </>
          )}
        </p>
      </section>

      <section aria-label="Eligibility and access">
        <h2 className="display-lg">Eligibility and access route</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.eligibility.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-ink-soft">
          <strong className="text-ink">Access route:</strong> {offer.access_route}
        </p>
      </section>

      <section id="limits" aria-label="Limits and restrictions" className="scroll-mt-16">
        <h2 className="display-lg">Limits and restrictions</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <h3 className="mt-3 font-semibold">Restrictions on record</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.restrictions.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section id="steps" aria-label="Access steps" className="scroll-mt-16">
        <h2 className="display-lg">Access steps (official links only)</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          {offer.claim_steps.map((s, i) => (
            <li key={i}>
              {s.step}{" "}
              {s.url && (
                <a href={s.url} rel="noopener" className="font-semibold text-teal-deep underline">
                  Open official page
                </a>
              )}
            </li>
          ))}
        </ol>
        <h3 className="mt-3 font-semibold">Official links</h3>
        <ul className="mt-2 space-y-2">
          {offer.official_links.map((l) => (
            <OfficialLink key={l.label} label={l.label} url={l.url} note={l.note} />
          ))}
        </ul>
      </section>

      <section id="economics" aria-label="Economics" className="scroll-mt-16">
        <h2 className="display-lg">{offer.economics_heading}</h2>
        {offer.economics.map((p, i) => (
          <p key={i} className="mt-2 text-sm leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong bg-card">
          <table className="ledger text-left text-sm">
            <caption className="sr-only">Key economics figures</caption>
            <thead>
              <tr>
                <th scope="col">Figure</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {offer.economics_rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-4 py-2.5 font-semibold">
                    {r.label}
                  </th>
                  <td className="data px-4 py-2.5">{r.value}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="px-4 py-2.5">
                  Median-window math · verified {offer.verified_at} · re-verify at official terms
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section id="evidence" aria-label="Evidence and confidence" className="scroll-mt-16">
        <h2 className="display-lg">Evidence and confidence</h2>
        <ul className="mt-2 space-y-2">
          {offer.evidence.map((e) => (
            <li key={e.point} className="rounded-lg border border-line bg-card p-3 text-sm">
              <p>
                <span className="data rounded-full border border-line-strong px-2 py-0.5 text-xs text-ink-soft">
                  {e.confidence} confidence
                </span>
              </p>
              <p className="mt-1 text-ink-soft">{e.point}</p>
              <p className="mt-1 text-xs text-ink-mute">Source: {e.source}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-16">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id={offer.id} items={offer.faq} />
        </div>
      </section>

      <section aria-label="Compare with the other offers">
        <h2 className="display-lg">Compare</h2>
        <p className="mt-2 text-sm text-ink-soft">
          <Link href="/best/" className="font-semibold underline">
            All {ACTIVE_OFFERS.length} offers side by side
          </Link>{" "}
          ·{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="font-semibold underline">
            Monthly vs annual plans
          </Link>
        </p>
      </section>

      <CiteBlock citation={offer.citation} />
      <ResearchSnapshot />

      <JsonLd
        data={[
          offerJsonLd(offer, url),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: offer.faq.map((f) => ({
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
              { "@type": "ListItem", position: 2, name: "Offers", item: `${SITE_URL}/best/` },
              { "@type": "ListItem", position: 3, name: offer.shortTitle, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `Token Perks snapshot: ${offer.shortTitle} — verified ${offer.verified_at}`,
            description: `First-party research snapshot of ${offer.provider} ${offer.plan} pricing, renewal, and limits. Official sources only.`,
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation: offer.citation,
            temporalCoverage: offer.verified_at,
            datePublished: offer.verified_at,
            dateModified: offer.verified_at,
            url,
            distribution: [
              {
                "@type": "DataDownload",
                contentUrl: `${SITE_URL}/api/offers.json`,
                encodingFormat: "application/json",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
