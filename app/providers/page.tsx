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

export default function ProvidersIndex() {
  const url = canonical("/providers/");
  const groups = providerGroups();

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
      </section>

      <section aria-label="Provider list" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="hidden md:block overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">Providers with tracked route counts and categories</caption>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col" className="num">Routes</th>
                <th scope="col">Categories covered</th>
                <th scope="col" className="num">Unverified rows</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => {
                const cats = [...new Set(g.rows.map((r) => r.category))];
                const unverified = g.rows.filter((r) => r.label === "UNCERTAIN").length;
                return (
                  <tr key={g.slug}>
                    <th scope="row" className="font-normal font-medium">
                      <Link className="u-draw text-teal-deep" href={`/providers/${g.slug}/`}>
                        {g.name}
                      </Link>
                    </th>
                    <td className="num">{g.rows.length}</td>
                    <td className="text-ink-soft text-[12.5px]">{cats.map((c) => CATEGORY_LABELS[c]).join(" · ")}</td>
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
