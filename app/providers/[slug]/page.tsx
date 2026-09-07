import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { aaCitation, getIntel, INTEL } from "@/lib/intelligence";
import { canonical, SITE_URL } from "@/lib/site";
import { CATEGORY_LABELS, getProvider, providerGroups, UNIVERSE } from "@/lib/universe";

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

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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

  // Quoted benchmark scores for this provider's models (one citation per
  // datum, linked to the exact AA source row — never a republished table).
  const intelEntries = g.rows
    .filter((r, i, all) => r.modelId != null && all.findIndex((o) => o.modelId === r.modelId) === i)
    .map((r) => ({ row: r, intel: getIntel(r.modelId) }))
    .filter(
      (e): e is { row: (typeof g.rows)[number]; intel: NonNullable<ReturnType<typeof getIntel>> } =>
        e.intel != null,
    );

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

      {intelEntries.length > 0 && (
        <section
          aria-label={`${g.name} cited intelligence scores`}
          className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
        >
          <h2 className="display-lg">Cited intelligence scores</h2>
          <p className="mt-2 max-w-3xl text-sm text-ink-soft">
            Quoted from the Artificial Analysis Intelligence Index v{INTEL.indexVersion}, accessed{" "}
            {INTEL.accessed} — not measured by us. Each value links its exact AA source row.
            Artificial Analysis scores every reasoning-effort variant separately; we quote the
            named variant shown. An asterisk marks scores AA itself flags as estimates.
          </p>
          <ul className="mt-4 space-y-2">
            {intelEntries.map(({ row, intel }) => (
              <li key={row.modelId} className="card p-3 text-sm sm:p-4">
                <p>
                  <strong>
                    {intel.aaName}
                    {intel.aaVariant ? ` (${intel.aaVariant})` : ""}
                  </strong>{" "}
                  <span className="data">
                    —{" "}
                    <a
                      className="u-draw font-semibold text-teal-deep"
                      href={intel.sourceUrl}
                      target="_blank"
                      rel="noopener nofollow"
                      title={aaCitation(row.modelId) ?? undefined}
                    >
                      {intel.intelligenceIndex}
                      {intel.estimate ? "*" : ""}
                    </a>
                  </span>
                </p>
                <p className="mt-1 text-[12px] text-ink-mute">
                  {aaCitation(row.modelId)} ·{" "}
                  <a
                    className="u-draw"
                    href={intel.sourceUrl}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    AA source
                  </a>{" "}
                  · priced on this page as {row.plan}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label={`${g.name} sources and methods`} className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="display-lg">Sources &amp; methods</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">
          Snapshot {UNIVERSE.snapshot} (per-datum access dates at right; a few rows rest on dated official snapshots — see notes). Every price above links
          its official source in the routes table; every score above links its AA source row.
          Below, each datum&apos;s source and access date, in full. Method:{" "}
          <a className="u-draw text-teal-deep" href="/methodology/">
            methodology
          </a>
          .
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              {g.name} datum-level sources: each price and score with its source and access date
            </caption>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Source</th>
                <th scope="col">Accessed</th>
                <th scope="col" className="w-24">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.id}>
                  <th scope="row" className="font-normal">
                    <span className="font-medium">{r.plan}</span>
                    <span className="data block text-[11px] text-ink-mute">
                      {CATEGORY_LABELS[r.category]} · {r.listPrice}
                    </span>
                  </th>
                  <td className="text-[12.5px]">
                    <a
                      className="u-draw text-teal-deep"
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      {hostOf(r.sourceUrl)}
                    </a>
                  </td>
                  <td className="data text-[12.5px] text-ink-soft">{r.accessed}</td>
                  <td>
                    <span className={`text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                  </td>
                </tr>
              ))}
              {intelEntries.map(({ row, intel }) => (
                <tr key={`intel-${row.modelId}`}>
                  <th scope="row" className="font-normal">
                    <span className="font-medium">
                      {intel.aaName}
                      {intel.aaVariant ? ` (${intel.aaVariant})` : ""} — II v{INTEL.indexVersion}:{" "}
                      {intel.intelligenceIndex}
                      {intel.estimate ? "*" : ""}
                    </span>
                    <span className="data block text-[11px] text-ink-mute">
                      Quoted score, not measured by us{intel.estimate ? "; AA-marked estimate" : ""}
                    </span>
                  </th>
                  <td className="text-[12.5px]">
                    <a
                      className="u-draw text-teal-deep"
                      href={intel.sourceUrl}
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      {hostOf(intel.sourceUrl)}
                    </a>
                  </td>
                  <td className="data text-[12.5px] text-ink-soft">{INTEL.accessed}</td>
                  <td>
                    <span className="text-[10.5px] text-teal-deep">CITED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `${g.name} — tracked access routes and list prices (${g.rows.length} routes, 2026-09-07)`,
            description: `First-party snapshot of ${g.rows.length} ${g.name} access routes across subscriptions, API per-token pricing, credits, coding-tool plans, and free tiers. Each row carries its list price, caveats, evidence label (DIRECT / EXCERPT / UNCERTAIN), source URL, and access date.`,
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation: `Token Perks. ${g.name} route snapshot, accessed 2026-09-06/07. Re-verify at official terms before paying.`,
            temporalCoverage: "2026-09-06/2026-09-07",
            datePublished: "2026-09-07",
            dateModified: "2026-09-07",
            url,
            variableMeasured: ["listPrice", "apiInPerM", "apiOutPerM", "blendedPerM", "evidence label", "accessed"],
            distribution: [
              {
                "@type": "DataDownload",
                contentUrl: `${SITE_URL}/api/leaderboard.json`,
                encodingFormat: "application/json",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${g.name} — tracked access routes`,
            numberOfItems: g.rows.length,
            itemListElement: g.rows.map((r, i) =>
              r.offer
                ? {
                    "@type": "ListItem",
                    position: i + 1,
                    name: `${g.name} ${r.plan} (${CATEGORY_LABELS[r.category]}, ${r.listPrice})`,
                    item: canonical(r.offer),
                  }
                : {
                    "@type": "ListItem",
                    position: i + 1,
                    name: `${g.name} ${r.plan} (${CATEGORY_LABELS[r.category]}, ${r.listPrice})`,
                  },
            ),
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
