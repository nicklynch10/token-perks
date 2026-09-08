import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { canonical, SITE_URL } from "@/lib/site";
import { CATEGORY_LABELS, providerGroups, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Providers — every tracked AI access route, by company",
  description:
    "One page per provider: subscriptions, API pricing, credit systems, coding-tool plans, and free tiers we track, each with its price, caveats count, and evidence label.",
  alternates: { canonical: canonical("/providers/") },
  openGraph: {
    title: "Token Perks — Providers",
    description: "Every tracked AI access route, grouped by provider, with evidence labels.",
    url: canonical("/providers/"),
    type: "website",
  },
};

function evidenceMix(rows: { label: string }[]): string {
  const direct = rows.filter((r) => r.label === "DIRECT").length;
  const excerpt = rows.filter((r) => r.label === "EXCERPT").length;
  const uncertain = rows.filter((r) => r.label === "UNCERTAIN").length;
  const parts: string[] = [];
  if (direct) parts.push(`${direct} direct`);
  if (excerpt) parts.push(`${excerpt} snapshot`);
  if (uncertain) parts.push(`${uncertain} uncertain`);
  return parts.join(" · ");
}

export default function ProvidersIndex() {
  const url = canonical("/providers/");
  const groups = providerGroups();
  const totalOffers = new Set(UNIVERSE.rows.map((r) => r.offer).filter(Boolean)).size;

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Providers" }]} />
      </div>

      <section aria-label="About provider pages" className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6">
        <h1 className="display-xl max-w-4xl">Providers</h1>
        <p className="lede mt-4 max-w-3xl">
          {groups.length} providers, {UNIVERSE.rows.length} tracked access routes as of{" "}
          <strong className="data">{UNIVERSE.snapshot}</strong>. Each provider page lists every
          route we track — what it costs on paper, the caveats attached, and how well verified it
          is — with cross-links into the cost leaderboard and any tracked offer.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-ink-mute">
          Evidence mix below counts every route by label: DIRECT = read on the provider&apos;s own
          page this pass; EXCERPT = official copy obtained via snapshot or search index; UNCERTAIN =
          not verified this pass, shown as-is.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-mute">
          Buying as a gift? No provider page here lists a gift-card or transfer mechanism in its
          verified terms — subscriptions are billed to, and capped on, the paying account. What
          gifting actually means per offer (activation, refund windows, when to give a month
          instead of a login):{" "}
          <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">
            buying AI access as a gift
          </Link>
          .
        </p>
      </section>

      <section aria-label="Provider list" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="hidden md:block overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Providers with tracked route counts, categories, verification mix, entry prices, and offer coverage
            </caption>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col" className="num">Routes</th>
                <th scope="col">Categories covered</th>
                <th scope="col">Evidence mix</th>
                <th scope="col">Cheapest paid route</th>
                <th scope="col">Tracked offers</th>
                <th scope="col" className="num">Unverified rows</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => {
                const cats = [...new Set(g.rows.map((r) => r.category))];
                const unverified = g.rows.filter((r) => r.label === "UNCERTAIN").length;
                const cheapestPaid = g.rows
                  .filter((r) => r.priceMonthly != null && r.priceMonthly > 0)
                  .sort((a, b) => (a.priceMonthly as number) - (b.priceMonthly as number))[0];
                const offerCount = new Set(g.rows.map((r) => r.offer).filter(Boolean)).size;
                return (
                  <tr key={g.slug}>
                    <th scope="row" className="font-normal font-medium">
                      <Link className="u-draw text-teal-deep" href={`/providers/${g.slug}/`}>
                        {g.name}
                      </Link>
                    </th>
                    <td className="num">{g.rows.length}</td>
                    <td className="text-ink-soft text-[12.5px]">{cats.map((c) => CATEGORY_LABELS[c]).join(" · ")}</td>
                    <td className="text-[12px] text-ink-soft">{evidenceMix(g.rows)}</td>
                    <td className="data text-[12.5px]">
                      {cheapestPaid ? (
                        <>
                          {cheapestPaid.listPrice}
                          <span className="block text-[11px] text-ink-mute">{cheapestPaid.plan}</span>
                        </>
                      ) : (
                        <span className="text-ink-mute">
                          {g.rows.some((r) => r.priceMonthly === 0) ? "free only" : "n/a"}
                        </span>
                      )}
                    </td>
                    <td className="text-[12.5px]">{offerCount > 0 ? `${offerCount} tracked` : "—"}</td>
                    <td className="num text-ink-mute">{unverified}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 grid gap-2 md:hidden">
          {groups.map((g) => (
            <li key={g.slug} className="card p-3 text-sm">
              <Link className="u-draw font-medium text-teal-deep" href={`/providers/${g.slug}/`}>
                {g.name}
              </Link>
              <span className="data ml-2 text-[12px] text-ink-soft">{g.rows.length} routes</span>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Providers — tracked AI access routes",
            url,
            isPartOf: { "@type": "WebSite", name: "Token Perks", url: SITE_URL },
            description:
              "Provider-by-provider listing of AI access routes with prices, caveats, and evidence labels.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
              { "@type": "ListItem", position: 2, name: "Providers", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
