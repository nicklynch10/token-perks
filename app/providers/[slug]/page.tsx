import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getOffer } from "@/lib/offers";
import { aaCitation, getIntel, INTEL } from "@/lib/intelligence";
import { canonical, SITE_URL, social } from "@/lib/site";
import {
  blendedPerM,
  CATEGORY_LABELS,
  fmtPerM,
  getProvider,
  hostedFreeRoutes,
  providerGroups,
  UNIVERSE,
} from "@/lib/universe";

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
    description: `${g.rows.length} tracked ${g.name} access routes — subscriptions, API pricing, credits, coding tools, free tiers — with list prices, caveats, and evidence labels. Snapshot ${UNIVERSE.snapshot}.`,
    alternates: { canonical: canonical(`/providers/${g.slug}/`) },
    ...social({
      title: `Token Perks — ${g.name}`,
      description: `Every tracked ${g.name} access route, with prices and evidence labels.`,
      path: `/providers/${g.slug}/`,
    }),
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
  const excerpt = g.rows.filter((r) => r.label === "EXCERPT").length;
  const direct = g.rows.filter((r) => r.label === "DIRECT").length;
  const cheapest = g.rows
    .filter((r) => r.apiIn != null && r.apiIn > 0 && r.apiOut != null)
    .sort((a, b) => (3 * (a.apiIn as number) + (a.apiOut as number)) / 4 - (3 * (b.apiIn as number) + (b.apiOut as number)) / 4)[0];

  // Economics summary — assembled from the verified rows above, no new data.
  const paid = g.rows.filter((r) => r.priceMonthly != null && r.priceMonthly > 0);
  const cheapestPaid = [...paid].sort((a, b) => (a.priceMonthly as number) - (b.priceMonthly as number))[0];
  const subs = g.rows.filter((r) => r.category === "a");
  const cheapestSub = subs
    .filter((r) => r.priceMonthly != null && r.priceMonthly > 0)
    .sort((a, b) => (a.priceMonthly as number) - (b.priceMonthly as number))[0];
  const freeRoutes = g.rows.filter((r) => r.priceMonthly === 0);
  // Free routes for THIS provider's models sold by OTHER hosts (model→route mapping,
  // existing verified rows only — e.g. NVIDIA Build's $0 Kimi K3 dev route on Moonshot's page).
  const hostedFree = hostedFreeRoutes(g.slug, g.rows);
  const freeTotal = freeRoutes.length + hostedFree.length;
  const batchRows = g.rows.filter((r) => r.batchDiscount != null);
  const overageRows = g.rows.filter((r) => r.overage && r.overage.rate !== "not published");
  const apiRows = g.rows.filter((r) => blendedPerM(r) != null);
  const apiRange = apiRows.length
    ? `${fmtPerM(Math.min(...apiRows.map((r) => blendedPerM(r) as number)))}–${fmtPerM(Math.max(...apiRows.map((r) => blendedPerM(r) as number)))}`
    : null;
  const accessedDates = [...new Set(g.rows.map((r) => r.accessed))].sort();
  const firstAccessed = accessedDates[0] ?? UNIVERSE.snapshot;
  const lastAccessed = accessedDates[accessedDates.length - 1] ?? UNIVERSE.snapshot;
  const offerObjs = offers
    .map((r) => ({ row: r, offer: getOffer((r.offer as string).replace(/^\/best\/|\/$/g, "")) }))
    .filter((e): e is { row: (typeof g.rows)[number]; offer: NonNullable<ReturnType<typeof getOffer>> } => e.offer != null);

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
            ? ` ${direct} route${direct === 1 ? "" : "s"} verified directly on official pages this pass, ${excerpt} via official snapshot, and ${unverified} could not be verified and are labeled UNCERTAIN rather than priced from memory.`
            : excerpt > 0
              ? ` ${direct} route${direct === 1 ? "" : "s"} verified directly on official pages this pass; ${excerpt} via official snapshot rather than a live fetch.`
              : " Every route was verified directly on its official page this pass."}{" "}
          Snapshot <strong className="data">{UNIVERSE.snapshot}</strong> (rows accessed {firstAccessed}
          {lastAccessed !== firstAccessed ? `–${lastAccessed}` : ""}). Rankings live on the{" "}
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

      <section
        aria-label={`${g.name} route economics at a glance`}
        className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
      >
        <h2 className="display-lg">Route economics at a glance</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">
          Assembled from the verified rows above — no new data. Each figure links its official
          source and carries the date it was read.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              {g.name} economics summary computed from tracked rows
            </caption>
            <tbody>
              {cheapestSub && (
                <tr>
                  <th scope="row" className="font-normal">
                    Cheapest paid subscription
                  </th>
                  <td className="data text-[12.5px]">{cheapestSub.listPrice}</td>
                  <td className="text-[12.5px] text-ink-soft">{cheapestSub.plan}</td>
                  <td>
                    <a className="u-draw text-[12px] text-teal-deep" href={cheapestSub.sourceUrl} target="_blank" rel="noopener nofollow">src</a>{" "}
                    <span className="data text-[11px] text-ink-mute">{cheapestSub.accessed}</span>
                  </td>
                </tr>
              )}
              {cheapestPaid && cheapestPaid !== cheapestSub && (
                <tr>
                  <th scope="row" className="font-normal">
                    Cheapest paid route (any type)
                  </th>
                  <td className="data text-[12.5px]">{cheapestPaid.listPrice}</td>
                  <td className="text-[12.5px] text-ink-soft">{cheapestPaid.plan}</td>
                  <td>
                    <a className="u-draw text-[12px] text-teal-deep" href={cheapestPaid.sourceUrl} target="_blank" rel="noopener nofollow">src</a>{" "}
                    <span className="data text-[11px] text-ink-mute">{cheapestPaid.accessed}</span>
                  </td>
                </tr>
              )}
              <tr>
                <th scope="row" className="font-normal">
                  Free / promo routes
                </th>
                <td className="data text-[12.5px]">{freeTotal}</td>
                <td className="text-[12.5px] text-ink-soft" colSpan={2}>
                  {freeRoutes.length > 0
                    ? `${freeRoutes.length} sold by ${g.name} (${freeRoutes.map((r) => r.plan).join(" · ")})`
                    : `None sold by ${g.name} directly`}
                  {hostedFree.length > 0 && (
                    <>
                      {" · "}
                      {hostedFree.length} more free {hostedFree.length === 1 ? "route" : "routes"}{" "}
                      for {g.name}&apos;s models hosted by other sellers —{" "}
                      <a className="u-draw text-teal-deep" href="#hosted-free">
                        see below
                      </a>
                    </>
                  )}
                  .
                </td>
              </tr>
              {apiRange && (
                <tr>
                  <th scope="row" className="font-normal">
                    API per-token range (blended)
                  </th>
                  <td className="data text-[12.5px]">{apiRange}/M</td>
                  <td className="text-[12.5px] text-ink-soft" colSpan={2}>
                    Across {apiRows.length} priced API route{apiRows.length === 1 ? "" : "s"};
                    blended = (3 x input + output) / 4 — see{" "}
                    <a className="u-draw" href="/methodology/">methodology</a>.
                  </td>
                </tr>
              )}
              <tr>
                <th scope="row" className="font-normal">
                  Batch / off-peak discounts
                </th>
                <td className="data text-[12.5px]">{batchRows.length}</td>
                <td className="text-[12.5px] text-ink-soft" colSpan={2}>
                  {batchRows.length > 0
                    ? batchRows
                        .map(
                          (r) =>
                            `${r.plan} −${Math.round((r.batchDiscount as number) * 100)}%${r.batchApprox ? " (approx)" : ""}`,
                        )
                        .join(" · ")
                    : "None published on tracked routes."}
                </td>
              </tr>
              <tr>
                <th scope="row" className="font-normal">
                  Published overage terms
                </th>
                <td className="data text-[12.5px]">
                  {overageRows.length} of {g.rows.filter((r) => r.overage).length} routes
                </td>
                <td className="text-[12.5px] text-ink-soft" colSpan={2}>
                  {overageRows.length > 0
                    ? overageRows.slice(0, 3).map((r) => `${r.plan}: ${r.overage?.rate}`).join(" · ")
                    : overageRows.length === 0 && g.rows.some((r) => r.overage)
                      ? "Checked — no per-unit figure published on tracked routes."
                      : "Not applicable to tracked routes."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {hostedFree.length > 0 && (
        <section
          id="hosted-free"
          aria-label={`Free and promo routes for ${g.name} models, hosted by other sellers`}
          className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
        >
          <h2 className="display-lg">Free routes for {g.name} models — third-party hosting</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {g.name} is the model vendor here, not the seller: each route below is $0 on its
            host&apos;s terms and links the host&apos;s own official page — worth re-checking there
            before relying on it. These rows come from the same tracked data as the table above
            (model→route mapping); each route stays counted on its host&apos;s provider page.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line-strong">
            <table className="spec-table">
              <caption className="sr-only">
                Free and promo routes for {g.name} models sold by other providers
              </caption>
              <thead>
                <tr>
                  <th scope="col">Hosted by</th>
                  <th scope="col">Route</th>
                  <th scope="col">Price</th>
                  <th scope="col">Model (vendor)</th>
                  <th scope="col">Notes and caveats</th>
                  <th scope="col" className="w-24">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {hostedFree.map(({ row, hostSlug, hostName }) => (
                  <tr key={row.id}>
                    <th scope="row" className="font-normal font-medium">
                      <Link className="u-draw" href={`/providers/${hostSlug}/`}>
                        {hostName}
                      </Link>
                    </th>
                    <td className="text-[12.5px]">
                      {row.plan}
                      <span className="data block text-[11px] text-ink-mute">{row.id}</span>
                    </td>
                    <td className="data text-[12.5px]">{row.listPrice}</td>
                    <td className="text-[12.5px] text-ink-soft">
                      {getIntel(row.modelId)?.aaName ?? row.modelId}
                      <span className="block text-[11px] text-ink-mute">vendor: {g.name}</span>
                    </td>
                    <td className="text-ink-soft text-[12.5px]">
                      {row.notes}
                      {row.caveats.length > 0 && (
                        <span className="mt-1 block text-ink-mute">
                          {row.caveats.map((c) => (
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
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener nofollow"
                        aria-label={`Source for ${hostName} ${row.plan} (${row.label})`}
                      >
                        src
                      </a>
                      <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[row.label]}`}>
                        {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {offerObjs.length > 0 && (
        <section
          aria-label={`Tracked offers from ${g.name}`}
          className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
        >
          <h2 className="display-lg">Tracked offers with full breakdowns</h2>
          <ul className="mt-4 space-y-3">
            {offerObjs.map(({ row, offer }) => (
              <li key={offer.id} className="card p-4 sm:p-5">
                <p className="eyebrow">
                  {offer.provider} · {row.plan}
                </p>
                <h3 className="display-sm mt-1">
                  <Link href={offer.canonical_url} className="u-draw text-teal-deep">
                    {offer.title}
                  </Link>
                </h3>
                <p className="data mt-1 text-[13px]">{offer.price.now}</p>
                <p className="mt-1 text-sm text-ink-soft">{offer.catchSummary}</p>
                <p className="mt-2 text-xs text-ink-mute">
                  Verified <span className="data">{offer.verified_at}</span> — catches, limits,
                  break-even math, and dated evidence on the{" "}
                  <Link href={offer.canonical_url} className="u-draw text-teal-deep">
                    offer page
                  </Link>
                  .
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

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
            name: `${g.name} — tracked access routes and list prices (${g.rows.length} routes, snapshot ${UNIVERSE.snapshot})`,
            description: `First-party snapshot of ${g.rows.length} ${g.name} access routes across subscriptions, API per-token pricing, credits, coding-tool plans, and free tiers. Each row carries its list price, caveats, evidence label (DIRECT / EXCERPT / UNCERTAIN), source URL, and access date.`,
            creator: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            license: "https://creativecommons.org/licenses/by/4.0/",
            citation: `Token Perks. ${g.name} route snapshot, accessed ${firstAccessed}${lastAccessed !== firstAccessed ? `–${lastAccessed}` : ""}. Re-verify at official terms before paying.`,
            temporalCoverage:
              lastAccessed !== firstAccessed ? `${firstAccessed}/${lastAccessed}` : firstAccessed,
            datePublished: UNIVERSE.snapshot,
            dateModified: UNIVERSE.snapshot,
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
