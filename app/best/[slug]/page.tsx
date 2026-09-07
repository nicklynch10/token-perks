import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import VerifyBadge from "@/components/VerifyBadge";
import { getOffer, offerSlugs, type Offer } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

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
};

/** Spec-like H1: what this page documents. */
const PAGE_H1: Record<string, string> = {
  "kimi-k3-core": "Kimi K3 Membership — prices, limits, effective cost per task",
  "muse-spark-zen-free": "Zen Muse Spark 1.3 Free promo — price, limits, access route",
  "nvidia-k3-free": "NVIDIA Build Kimi K3 Free — price, limits, access route",
};

/** Lead spec table rows, per offer: figures first, then limits and renewal. */
const SPEC_ROWS: Record<string, { label: string; value: string }[]> = {
  "kimi-k3-core": [
    { label: "Monthly tiers", value: "$19 · $39 · $99 · $199 (Moderato / Allegretto / Allegro / Vivace)" },
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
};

/**
 * schema.org/Offer per snapshot. priceValidUntil = verified_at + 7 days
 * (the stated weekly re-verification cadence). Tiered pricing uses
 * AggregateOffer lowPrice/highPrice from the snapshot ($19/$199).
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
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    lowPrice: "19",
    highPrice: "199",
    priceCurrency: "USD",
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
    description: "Price, renewal, and caveats verified Sep 6 2026. Re-verify at official terms.",
  };
  const offer = getOffer(slug);
  const ended = offer != null && offer.status !== "active";
  return {
    title: ended ? `Ended: ${m.title}` : m.title,
    description: m.description,
    alternates: { canonical: canonical(`/best/${slug}/`) },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical(`/best/${slug}/`),
      type: "article",
      images: [
        {
          url: `/img/og/og-${slug === "kimi-k3-core" ? "kimi" : slug === "muse-spark-zen-free" ? "muse-zen" : "nvidia"}.png`,
          width: 1200,
          height: 630,
          alt: "Token Perks — AI subscription offers, compared on effective cost per task",
        },
      ],
    },
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
            All 3 offers side by side
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
            name: `Token Perks snapshot: ${offer.shortTitle} — Sep 6 2026`,
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
