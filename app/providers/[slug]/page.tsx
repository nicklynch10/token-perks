import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { canonical, SITE_URL } from "@/lib/site";
import { CATEGORY_LABELS, getProvider, providerGroups } from "@/lib/universe";

export const dynamic = "force-static";

export function generateStaticParams() {
  return providerGroups().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getProvider(slug);
  if (!g) return {};
  return {
    title: `${g.name} — routes, list prices, and evidence`,
    description: `${g.rows.length} tracked ${g.name} access routes — subscriptions, API pricing, credits, coding tools, free tiers — with list prices, caveats, and evidence labels. Snapshot ${g.rows[0] ? "2026-09-07" : ""}.`,
    alternates: { canonical: canonical(`/providers/${g.slug}/`) },
    openGraph: {
      title: `Token Perks — ${g.name}`,
      description: `Every tracked ${g.name} access route, with prices and evidence labels.`,
      url: canonical(`/providers/${g.slug}/`),
      type: "website",
    },
  };
}

const LABEL_STYLES: Record<string, string> = {
  DIRECT: "text-teal-deep",
  EXCERPT: "text-ink-soft",
  UNCERTAIN: "text-ink-mute",
};

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getProvider(slug);
  if (!g) notFound();

  const url = canonical(`/providers/${g.slug}/`);
  const offers = g.rows.filter((r) => r.offer);
  const cats = [...new Set(g.rows.map((r) => r.category))];
  const unverified = g.rows.filter((r) => r.label === "UNCERTAIN").length;
  const cheapest = g.rows
    .filter((r) => r.apiIn != null && r.apiIn > 0 && r.apiOut != null)
    .sort((a, b) => (3 * (a.apiIn as number) + (a.apiOut as number)) / 4 - (3 * (b.apiIn as number) + (b.apiOut as number)) / 4)[0];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          trail={[{ label: "Home", href: "/" }, { label: "Providers", href: "/providers/" }, { label: g.name }]}
        />
      </div>

      <section aria-label={`About ${g.name}`} className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6">
        <h1 className="display-xl max-w-4xl">{g.name} — tracked routes and prices</h1>
        <p className="lede mt-4 max-w-3xl">
          {g.rows.length} access routes across {cats.map((c) => CATEGORY_LABELS[c].toLowerCase()).join(", ")}.
          {cheapest
            ? ` Cheapest verified per-token route: ${cheapest.plan} at $${((3 * (cheapest.apiIn as number) + (cheapest.apiOut as number)) / 4).toFixed(2)}/M blended.`
            : ""}{" "}
          {unverified > 0
            ? `${unverified} route${unverified === 1 ? "" : "s"} could not be verified this pass and are labeled UNCERTAIN rather than priced from memory.`
            : "Every route was verified on its official page this pass."}{" "}
          Snapshot <strong className="data">2026-09-07</strong>. Rankings live on the{" "}
          <Link href="/" className="u-draw text-teal-deep">
            cost leaderboard
          </Link>
          .
        </p>
        {offers.length > 0 && (
          <p className="mt-3 text-sm text-ink-soft">
            Tracked offers:{" "}
            {offers.map((r, i) => (
              <span key={r.id}>
                {i > 0 && " · "}
                <Link className="u-draw text-teal-deep" href={r.offer as string}>
                  {r.plan}
                </Link>
              </span>
            ))}
          </p>
        )}
      </section>

      <section aria-label={`${g.name} routes`} className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="hidden md:block overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">{g.name} access routes with prices and evidence labels</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Route</th>
                <th scope="col">Price (list)</th>
                <th scope="col">Notes and caveats</th>
                <th scope="col" className="w-24">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.id}>
                  <td className="text-ink-mute text-[12px]">{CATEGORY_LABELS[r.category]}</td>
                  <th scope="row" className="font-normal">
                    <span className="font-medium">{r.plan}</span>
                    {r.offer && (
                      <>
                        {" "}
                        <Link className="u-draw text-[12px] text-teal-deep" href={r.offer}>
                          offer
                        </Link>
                      </>
                    )}
                    <span className="data block text-[11px] text-ink-mute">{r.id}</span>
                  </th>
                  <td className="data text-[12.5px]">{r.listPrice}</td>
                  <td className="text-ink-soft text-[12.5px]">
                    {r.notes}
                    {r.caveats.length > 0 && (
                      <span className="mt-1 block text-ink-mute">
                        {r.caveats.map((c) => (
                          <span key={c} className="mr-2 inline-block">
                            · {c}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td>
                    <a
                      className="u-draw text-ink-mute text-[12px]"
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener nofollow"
                      aria-label={`Source for ${r.plan} (${r.label})`}
                    >
                      src
                    </a>
                    <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 space-y-2 md:hidden">
          {g.rows.map((r) => (
            <li key={r.id} className="card p-3 text-sm">
              <p className="font-medium">{r.plan}</p>
              <p className="data mt-1 text-[13px] text-ink-soft">{r.listPrice}</p>
              <p className="mt-1 text-[11.5px] text-ink-mute">
                {CATEGORY_LABELS[r.category]} · {r.label}
                {r.caveats.length > 0 ? ` · ${r.caveats[0]}` : ""}
              </p>
              {r.offer && (
                <Link className="u-draw text-[12px] text-teal-deep" href={r.offer}>
                  View tracked offer
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${g.name} — tracked access routes`,
            numberOfItems: g.rows.length,
            itemListElement: g.rows.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${g.name} ${r.plan} (${CATEGORY_LABELS[r.category]}, ${r.listPrice})`,
              item: r.offer ? canonical(r.offer) : url,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
              { "@type": "ListItem", position: 2, name: "Providers", item: canonical("/providers/") },
              { "@type": "ListItem", position: 3, name: g.name, item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
