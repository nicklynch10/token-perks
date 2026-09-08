import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { TEAM_SEAT_SKUS, type TeamSeatSku } from "@/app/cost-calculator/team-seats";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI offers compared — consumer plans, team seats, cost per task",
  description: `All ${ACTIVE_OFFERS.length} tracked AI offers plus every tracked Team/seat plan — verified prices, caveats, limits, and renewal terms, with team totals in the seat calculator. Snapshots Sep 6–7 2026.`,
  alternates: { canonical: canonical("/best/") },
  openGraph: {
    title: "AI offers compared — consumer plans, team seats, cost per task",
    description: `${ACTIVE_OFFERS.length} tracked AI offers plus tracked Team/seat plans — caveats, limits, and dated verification.`,
    url: canonical("/best/"),
    type: "website",
    images: [
      {
        url: "/img/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Token Perks — AI subscription offers, compared on effective cost per task.",
      },
    ],
  },
};

const TASK_NOTES: Record<string, string> = {
  "kimi-k3-core": "≈ $0.33/task at 120 tasks/mo",
  "muse-spark-zen-free": "$0.00/task while promo lasts",
  "nvidia-k3-free": "$0.00/task for dev use",
  "copilot-pro": "$10/mo ≈ 13 PAYG tasks · $15 credit pool ≈ 19 (reference)",
  "chatgpt-plus": "break-even ≈ 25 tasks/mo vs $0.80 PAYG reference",
  "google-ai-pro": "≈ 25 tasks/mo AI-side (reference) + bundle value",
  "claude-pro": "≈ 25 tasks/mo; annual ≈ 21 (vs $0.80 reference)",
  "cursor-pro": "≈ 25 tasks/mo (reference); included pool unpublished",
  "perplexity-pro": "≈ 25 tasks/mo (reference); caps not numeric",
};

/** First dollar amount in a price string (e.g. "$19–$199/mo…" -> 19). Data-derived only. */
function firstUsd(s: string): number | null {
  const m = s.match(/\$\s?([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, "")) : null;
}

/**
 * One seat row per universe row (Cursor Teams carries both tiers in its
 * listPrice string, so its catalog twins collapse to a single listing row).
 */
function teamListingRows(): TeamSeatSku[] {
  const seen = new Set<string>();
  const rows: TeamSeatSku[] = [];
  for (const s of TEAM_SEAT_SKUS) {
    if (seen.has(s.rowId)) continue;
    seen.add(s.rowId);
    rows.push(s);
  }
  return rows.sort(
    (a, b) =>
      (a.perSeatMonthly ?? Number.MAX_SAFE_INTEGER) -
        (b.perSeatMonthly ?? Number.MAX_SAFE_INTEGER) || a.provider.localeCompare(b.provider),
  );
}

/** Seat-structure lines for the listing table, built only from row fields. */
function seatStructureLines(s: TeamSeatSku): string[] {
  const lines: string[] = [];
  if (s.seatsMin != null) {
    lines.push(`Seat range: ${s.seatsMin}${s.seatsMax != null ? `–${s.seatsMax}` : "+"} seats (row note).`);
  }
  if (s.baseFee != null) lines.push(`Fixed base fee: $${s.baseFee}/mo plus $${s.perSeatMonthly}/seat.`);
  if (s.includedUsage) lines.push(`Included usage: ${s.includedUsage}.`);
  if (s.seatPlusUsage) lines.push("Per-seat fee excludes usage — usage bills on top at the row's stated terms.");
  if (s.mixNote) lines.push(`${s.mixNote.charAt(0).toUpperCase()}${s.mixNote.slice(1)}.`);
  return lines;
}

/** What breaks when seats fill, for the listing table — caveats + overage verbatim. */
function seatBreaksLines(s: TeamSeatSku): string[] {
  const lines: string[] = [...s.caveats];
  if (s.overageRate) {
    lines.push(
      s.overageRate === "not published"
        ? "Overage rate not published (checked)."
        : `Overage: ${s.overageRate}.`,
    );
  }
  if (s.perSeatMonthly == null) lines.push("No per-seat dollar published — no team total can be computed here.");
  return lines;
}

export default function BestIndex() {
  const url = canonical("/best/");
  const paid = ACTIVE_OFFERS.map((o) => firstUsd(o.price.now)).filter(
    (v): v is number => v != null && v > 0,
  );
  const freeCount = ACTIVE_OFFERS.filter((o) => (firstUsd(o.price.now) ?? 0) === 0).length;
  const fmt = (v: number) => `$${v.toFixed(2).replace(/\.00$/, "")}`;
  const priceSpan = paid.length
    ? `${fmt(Math.min(...paid))}/mo to ${fmt(Math.max(...paid))}/mo tiers`
    : "no paid offers yet";
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <header>
        <h1 className="display-md">All tracked offers</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {ACTIVE_OFFERS.length} offers tracked — consumer subscriptions from {priceSpan}
          {freeCount > 0 ? `, plus ${freeCount} $0 routes with stated limits` : ""}. Cards list
          price, estimated cost per task, and the caveats for each offer. Buying for a team? The
          seat-priced plans are listed separately in{" "}
          <a href="#for-teams" className="u-draw font-semibold text-teal-deep">
            For teams
          </a>{" "}
          below, with headcount totals in the{" "}
          <Link href="/cost-calculator/#seat-mode" className="u-draw text-teal-deep">
            seat calculator
          </Link>
          . Every figure is a dated snapshot: re-verify at official terms before paying.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-mute">
          Buying as a gift? None of the tracked offers sells a gift card or a transferable
          subscription in its verified terms — gifting, where offered at all, is handled by the
          provider directly, and this site sells nothing. What to weigh instead: who activates the
          route, which refund windows make a prepay safe,{" "}
          <Link href="/guides/buying-ai-access-as-a-gift/" className="u-draw text-teal-deep">
            the gift guide
          </Link>
          ,{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
            monthly vs annual
          </Link>
          , and the{" "}
          <Link href="/cost-calculator/" className="u-draw text-teal-deep">
            calculators
          </Link>
          .
        </p>
      </header>
      {/*
       * Flex-wrap instead of a strict 3-track grid: with an odd card count the
       * last row's cards share the width evenly (no orphaned third-width card
       * stranded against empty cells). Each wrapper is a display:grid so the
       * card inside stretches to the slot.
       */}
      <div className="flex flex-wrap gap-5">
        {ACTIVE_OFFERS.map((o) => (
          <div
            key={o.id}
            className="grid min-w-[240px] flex-1 basis-[calc((100%-2.5rem)/3)]"
          >
            <OfferCard offer={o} taskNote={TASK_NOTES[o.id] ?? ""} />
          </div>
        ))}
      </div>

      <section id="for-teams" aria-label="Team and seat-based plans" className="scroll-mt-16">
        <h2 className="display-lg">For teams — seat-based plans we track</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Every Team/seat SKU in the tracked universe, listed from the same dated rows as the
          consumer cards above. Per-user consumer tool plans (Copilot Pro, Cursor Pro)
          are not seat products and stay out of this table. Multiply a rate by headcount in the{" "}
          <Link href="/cost-calculator/#seat-mode" className="u-draw text-teal-deep">
            seat calculator
          </Link>
          ; how to choose between seats and pooled API spend is in{" "}
          <Link href="/guides/ai-seats-for-teams/" className="u-draw text-teal-deep">
            AI seats for teams
          </Link>
          .
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[760px]">
            <caption className="sr-only">
              Tracked Team/seat plans with verified rates, seat terms, and what changes as seats
              fill.
            </caption>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Per seat (verified)</th>
                <th scope="col">Seat terms</th>
                <th scope="col">What breaks when seats fill</th>
                <th scope="col">Verified</th>
              </tr>
            </thead>
            <tbody>
              {teamListingRows().map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="align-top font-semibold">
                    <Link
                      href={`/providers/${s.providerSlug}/`}
                      className="u-draw text-teal-deep"
                    >
                      {s.provider}
                    </Link>{" "}
                    <span className="font-normal">— {s.plan}</span>
                  </th>
                  <td className="data align-top text-[12.5px]">{s.listPrice}</td>
                  <td className="align-top text-ink-soft">
                    {seatStructureLines(s).map((l, i) => (
                      <p key={i} className="text-[12.5px] leading-snug">
                        {l}
                      </p>
                    ))}
                  </td>
                  <td className="align-top text-ink-soft">
                    {seatBreaksLines(s).map((l, i) => (
                      <p key={i} className="text-[12.5px] leading-snug">
                        {l}
                      </p>
                    ))}
                  </td>
                  <td className="tabular align-top whitespace-nowrap text-ink-mute">
                    {s.accessed}
                    <span className="block text-[10px] uppercase tracking-wide">{s.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-ink-mute">
          Rates are the provider&apos;s published list figures as read on the &ldquo;Verified&rdquo;
          date (see each row&apos;s source on its provider page); totals in the calculator are
          list-price multiplication, ours, not quotes. Seat ranges, base fees, and credit terms are
          quoted from the same rows.
        </p>
      </section>
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              { "@type": "ListItem", position: 2, name: "Offers", item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI offers compared",
            itemListElement: ACTIVE_OFFERS.map((o, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: o.title,
              url: canonical(o.canonical_url),
            })),
          },
        ]}
      />
    </div>
  );
}
