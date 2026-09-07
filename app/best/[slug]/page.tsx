import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnchorBar from "@/components/AnchorBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import VerifyBadge from "@/components/VerifyBadge";
import { getOffer, offerSlugs } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return offerSlugs().map((slug) => ({ slug }));
}

const META: Record<string, { title: string; description: string }> = {
  "kimi-k3-core": {
    title: "Kimi K3 Pricing: True Cost Guide ($19–$199/mo)",
    description:
      "Kimi K3 $19–$199/mo, annual effective $15–$159. Shared credit pool + 5h controls explained. Verified Sep 6 2026 — re-verify before paying.",
  },
  "muse-spark-zen-free": {
    title: "Muse Spark Zen Free: $0 Promo Guide",
    description:
      "$0 input/cache/output via /connect → Zen → /models. Limited-time promo, exact string required. Verified Sep 6 2026 — confirm in-product.",
  },
  "nvidia-k3-free": {
    title: "NVIDIA Kimi K3 Free: Dev Guide",
    description:
      "Kimi K3 free for dev/prototyping on NVIDIA Build with reasoning preserved. Limits vary by account. Verified Sep 6 2026 — check console.",
  },
};

/**
 * Verdict-first H1s (evergreen — no baked dates; the noun-phrase title lives
 * in the breadcrumb/meta, the date lives in the badge and snapshot line).
 */
const VERDICT_H1: Record<string, string> = {
  "kimi-k3-core": "Kimi K3: buy it if you clear ~49 tasks a month",
  "muse-spark-zen-free": "Muse Spark Zen Free: claim it now, don’t build on it",
  "nvidia-k3-free": "NVIDIA K3: free to validate on, never to serve from",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = META[slug] ?? {
    title: "AI Offer Guide: Price, Renewal & Catches",
    description: "Price, renewal, and catches verified Sep 6 2026. Re-verify at official terms.",
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
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: "Token Perks — The best AI offers. The catches, upfront.",
        },
      ],
    },
    ...(ended ? { robots: { index: false, follow: true } } : {}),
  };
}

const DUAL_PRICE: Record<string, string> = {
  "kimi-k3-core": "Unit + task view: $39/mo Allegretto ≈ $0.33/task at 120 tasks/mo (illustrative).",
  "muse-spark-zen-free":
    "Unit + task view: $0.00/task for input, cache, and output while the promo lasts.",
  "nvidia-k3-free": "Unit + task view: $0.00/task for dev/prototyping within your account limits.",
};

function OfficialLink({ label, url, note }: { label: string; url: string | null; note?: string }) {
  if (!url) {
    // Honest non-link: no box, no anchor styling — plain emphasis plus a tag.
    return (
      <li className="rounded-xl bg-paper p-3 text-sm">
        <strong className="font-semibold">{label}.</strong>{" "}
        <span className="data text-[10px] uppercase tracking-[0.12em] text-ink-mute">
          Not a link — in-product route
        </span>
        <span className="mt-0.5 block text-ink-soft">
          {note ?? "No public URL in this snapshot — navigate from the provider's official product."}
        </span>
      </li>
    );
  }
  return (
    <li className="rounded-xl border border-line bg-paper p-3 text-sm">
      <a
        href={url}
        rel="noopener"
        className="min-h-[44px] font-bold text-verified-deep underline"
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

  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Best offers", href: "/best/" },
          { label: offer.shortTitle },
        ]}
      />

      {ended && (
        <div
          role="alert"
          className="rounded-2xl border border-expired bg-expired-wash p-4 text-sm sm:p-5"
        >
          <p className="text-lg font-extrabold text-expired">Ended {endedDate}</p>
          <p className="mt-1 text-ink">
            This offer is no longer active and is kept for reference. See{" "}
            <Link href="/best/" className="font-bold underline">
              all live offers side by side
            </Link>{" "}
            for the current successor pick.
          </p>
        </div>
      )}

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <VerifyBadge date={offer.verified_at} variant="stamp" />
          <span className="data rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {offer.badge}
          </span>
        </div>
        {/* Noun-phrase title as eyebrow; the H1 leads with the verdict */}
        <p className="eyebrow eyebrow-ink mt-4">
          {offer.title} · {offer.provider}
        </p>
        <h1 className="display-md mt-1.5 max-w-2xl">
          {VERDICT_H1[offer.id] ?? offer.title}
        </h1>
        {/* First-100-words: price, renewal, verified */}
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="data text-ink">{offer.price.now}.</strong> Renewal: {offer.renewal}{" "}
          All figures verified <strong>{offer.verified_at}</strong> —{" "}
          <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
            compare by cost per task
          </Link>
          .
        </p>
        <p className="data mt-2 text-sm text-teal-deep">
          {DUAL_PRICE[offer.id]}
        </p>
      </header>

      {/* Sticky on-page index with active-section highlighting */}
      <AnchorBar
        items={[
          { href: "#catch", label: "Catch" },
          { href: "#verdict", label: "Verdict" },
          { href: "#price", label: "Price" },
          { href: "#limits", label: "Limits" },
          { href: "#steps", label: "Claim" },
          { href: "#economics", label: "Economics" },
          { href: "#evidence", label: "Evidence" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      <div
        id="catch"
        style={{ scrollMarginTop: "4rem" }}

        role="note"
        aria-label="The catch, upfront"
        className="catch-panel p-4 sm:p-5"
      >
        <p className="eyebrow eyebrow-amber">The catch, upfront</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {offer.catches.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <section id="verdict" aria-label="Verdict in 30 seconds" className="scroll-mt-16">
        <h2 className="display-lg">Verdict in 30 seconds</h2>
        <p className="verdict-line mt-2">{offer.verdict}</p>
      </section>

      <section id="price" aria-label="Price and renewal" className="scroll-mt-16">
        <h2 className="display-lg">Price now, renewal later</h2>
        <dl className="mt-2 space-y-2 rounded-2xl border border-line bg-card p-4 text-sm sm:p-5">
          <div>
            <dt className="font-bold">Price now</dt>
            <dd className="tabular font-semibold">{offer.price.now}</dd>
          </div>
          <div>
            <dt className="font-bold">Renewal</dt>
            <dd className="text-ink-soft">{offer.price.renewal}</dd>
          </div>
          {offer.expiry && (
            <div>
              <dt className="font-bold">Expiry</dt>
              <dd className="text-ink-soft">{offer.expiry}</dd>
            </div>
          )}
        </dl>
      </section>

      <section aria-label="Eligibility and access">
        <h2 className="display-lg">Eligibility &amp; access route</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.eligibility.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-ink-soft">
          <strong className="text-ink">Access route:</strong> {offer.access_route}
        </p>
      </section>

      <section id="limits" aria-label="Limits and catches" className="scroll-mt-16">
        <h2 className="display-lg">Limits &amp; catches</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <h3 className="mt-3 font-extrabold">Restrictions on record</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {offer.restrictions.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section id="steps" aria-label="Claim steps" className="scroll-mt-16">
        <h2 className="display-lg">Claim steps (official links only)</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          {offer.claim_steps.map((s, i) => (
            <li key={i}>
              {s.step}{" "}
              {s.url && (
                <a href={s.url} rel="noopener" className="font-bold text-verified-deep underline">
                  Open official page
                </a>
              )}
            </li>
          ))}
        </ol>
        <h3 className="mt-3 font-extrabold">Official links</h3>
        <ul className="mt-2 space-y-2">
          {offer.official_links.map((l) => (
            <OfficialLink key={l.label} label={l.label} url={l.url} note={l.note} />
          ))}
        </ul>
      </section>

      <section id="economics" aria-label="Economics" className="scroll-mt-16">
        <h2 className="display-lg">{offer.economics_heading}</h2>
        {offer.economics.map((p, i) => (
          <p key={i} className="mt-2 text-sm text-ink-soft">
            {p}
          </p>
        ))}
        <p className="mt-2 text-xs font-semibold text-ink-mute">
          Direction hint: lower cost-per-task is better.
        </p>
        <div className="mt-2 overflow-x-auto rounded-2xl border border-line-strong bg-card shadow-[3px_3px_0_rgb(26_26_24/0.06)]">
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
                  <th scope="row" className="px-4 py-2.5 font-bold">
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

      <section id="evidence" aria-label="Evidence and uncertainty" className="scroll-mt-16">
        <h2 className="display-lg">Evidence &amp; uncertainty</h2>
        <ul className="mt-2 space-y-2">
          {offer.evidence.map((e) => (
            <li key={e.point} className="rounded-xl border border-line bg-card p-3 text-sm">
              <p>
                <span
                  className={
                    e.confidence === "high"
                      ? "rounded-full bg-verified-wash px-2 py-0.5 text-xs font-bold text-verified-deep"
                      : e.confidence === "medium"
                        ? "rounded-full bg-catch-wash px-2 py-0.5 text-xs font-bold text-catch"
                        : "rounded-full bg-paper px-2 py-0.5 text-xs font-bold text-ink-mute"
                  }
                >
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
          <Link href="/best/" className="font-bold underline">
            All 3 offers side by side
          </Link>{" "}
          ·{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="font-bold underline">
            Monthly vs annual: which wins?
          </Link>
        </p>
      </section>

      <CiteBlock citation={offer.citation} />
      <ResearchSnapshot />

      <JsonLd
        data={[
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
              { "@type": "ListItem", position: 2, name: "Best offers", item: `${SITE_URL}/best/` },
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
