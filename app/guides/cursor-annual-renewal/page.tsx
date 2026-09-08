import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL, social } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cursor Pro Annual Renewal Price — What $20/mo Renews At (Sep 2026)",
  description:
    "Cursor Pro renews at the then-current price — no rate guarantee, no published annual price. Exact ToS quotes for Cursor, Copilot, and Claude, plus verified refund terms. Sep 2026.",
  alternates: { canonical: canonical("/guides/cursor-annual-renewal/") },
  ...social({
    title: "Cursor Pro Annual Renewal Price — What $20/mo Renews At (Sep 2026)",
    description:
      "Renewal is not price-protected: the continued-use clause, the missing annual rate, and the same questions answered per vendor with dated terms quotes.",
    path: "/guides/cursor-annual-renewal/",
    type: "article",
  }),
};

const FAQ = [
  {
    q: "How much does Cursor Pro cost to renew?",
    a: "$20/month, billed monthly, renewing at the then-current price. The terms guarantee nothing about the renewal rate: 'continued use of the Service after the price change becomes effective constitutes your agreement to pay the changed amount' (cursor.com/terms-of-service s.4.2, accessed 2026-09-06).",
  },
  {
    q: "Does Cursor Pro have an annual plan?",
    a: "No annual price is published. The pricing page carries a monthly/yearly toggle, but no yearly rate appears on cursor.com/pricing as of 2026-09-07, and subscriptions are 'only sold directly through cursor.com.' Until a number exists on the page, budget at $20/mo.",
  },
  {
    q: "Can Cursor change my price mid-subscription?",
    a: "Prices are announced ahead of time (the terms describe advance notice, and the toggle/checkout flow is where changes surface), and acceptance runs through continued use — the s.4.2 clause quoted above. In practice: read the pricing page when the notice lands, before the next charge.",
  },
  {
    q: "Does GitHub Copilot raise your price at renewal?",
    a: "Not mid-term. 'If you agree to a subscription price, that will remain your price for the duration of the payment term' (docs.github.com ToS s.L.1, accessed 2026-09-06). Changes can apply at the renewal line, and the ToS promises 30 days' notice for price increases.",
  },
  {
    q: "Do I get a refund if I cancel a subscription early?",
    a: "Assume no unless the terms say otherwise. Cursor: refundable only if the charge is within 14 days AND the subscription was unused that period. GitHub Copilot: 'no exceptions' per its terms (one carve-out: a personal plan that overlaps a company seat is canceled with a prorated refund). Claude: payments are generally non-refundable, with regional carve-outs — a 7-day cooling-off in Brazil/Mexico/South Korea/Taiwan (consumer terms) and a prorated 14-day window for EEA/UK buyers (pricing page); cancel at least 24 hours before the renewal date, access runs to term end either way. OpenAI's consumer renewal/refund clauses were not retrievable in our snapshot (ToS pages 403'd).",
  },
  {
    q: "How fresh are these numbers?",
    a: "Research snapshot Sep 6-7 2026, re-verified weekly per Methodology v2. Terms quotes are verbatim, under 25 words, and linked to the page they came from. Re-check official terms before paying.",
  },
];

export default function GuidePage() {
  const url = canonical("/guides/cursor-annual-renewal/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Cursor renewal price" },
        ]}
      />
      <header>
        <h1 className="display-md">Cursor Pro renewal: what you&apos;ll actually pay, per the terms</h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            Short answer: $20/month renews at whatever Cursor&apos;s price is on renewal day — the
            terms guarantee no rate.
          </strong>{" "}
          There is also no published annual Pro price (the yearly toggle leads to no number). By
          contrast, Copilot locks your rate for the paid term and Claude promises no mid-term
          change with 30 days&apos; notice at renewal. OpenAI&apos;s consumer renewal terms were not
          retrievable in our snapshot. Every quote below is verbatim, under 25 words, and dated —
          accessed 2026-09-06/07.
        </p>
      </header>

      <section aria-label="Why this page exists">
        <h2 className="display-lg">Why this page exists</h2>
        <p className="mt-2 text-ink-soft">
          Search results for &ldquo;cursor pro annual renewal price&rdquo; mostly restate the
          signup price. The actual question — what happens at renewal, and can the rate change
          underneath you — lives in subscription terms, not pricing pages. So we transcribed the
          terms: the clause that governs Cursor renewals, the clause that locks Copilot, the clause
          that binds Claude, and where the record goes silent (OpenAI&apos;s pages returned HTTP 403
          to our fetcher on 2026-09-06).
        </p>
      </section>

      <section aria-label="Cursor renewal mechanics">
        <h2 className="display-lg">Cursor: renewal mechanics, per the terms</h2>
        <p className="mt-2 text-ink-soft">
          Verified against Cursor&apos;s pricing page, help center, and terms, 2026-09-06 through
          2026-09-07:
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">Cursor Pro renewal mechanics per official pages</caption>
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">Source (access date)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">What does Pro cost?</th>
                <td>$20/mo, billed monthly</td>
                <td className="text-xs">cursor.com/pricing (2026-09-06, re-checked 2026-09-07)</td>
              </tr>
              <tr>
                <th scope="row">Is there an annual plan?</th>
                <td>
                  A monthly/yearly toggle exists, but no annual rate is published anywhere on the
                  page — UNKNOWN, not a hidden discount
                </td>
                <td className="text-xs">cursor.com/pricing (2026-09-06/07)</td>
              </tr>
              <tr>
                <th scope="row">What price does it renew at?</th>
                <td>
                  The then-current price — &ldquo;renewal is not price-protected&rdquo; is the
                  honest summary of the clause below
                </td>
                <td className="text-xs">cursor.com/terms-of-service s.4.2 (2026-09-06)</td>
              </tr>
              <tr>
                <th scope="row">Can the price change under you?</th>
                <td>
                  Changes come with advance notice, and: &ldquo;continued use of the Service after
                  the price change becomes effective constitutes your agreement to pay the changed
                  amount.&rdquo;
                </td>
                <td className="text-xs">cursor.com/terms-of-service (2026-09-06)</td>
              </tr>
              <tr>
                <th scope="row">What happens when I cancel?</th>
                <td>
                  Cancel at least 24h before renewal via the billing portal: &ldquo;You keep access
                  to your paid plan features until the end of your current billing period,&rdquo;
                  then the account reverts to Hobby.
                </td>
                <td className="text-xs">cursor.com/help/account-and-billing/cancel (2026-09-07)</td>
              </tr>
              <tr>
                <th scope="row">Any refund?</th>
                <td>
                  Only if both: &ldquo;The charge was made within the last 14 days&rdquo; AND
                  &ldquo;You have not used the subscription during that billing period.&rdquo; No
                  prorated downgrade refunds; used on-demand charges are non-refundable.
                </td>
                <td className="text-xs">cursor.com/help/account-and-billing/refunds (2026-09-07)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Read together, the practical rule is: <strong>your $20 today is not a $20-tomorrow
          guarantee.</strong> The defense is a calendar — when the renewal or notice email lands,
          re-read the pricing page before the card is charged.
        </p>
      </section>

      <section aria-label="Per-vendor renewal terms">
        <h2 className="display-lg">The same questions, per vendor</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Renewal and refund mechanics by vendor, with the terms basis for each
            </caption>
            <thead>
              <tr>
                <th scope="col">Vendor</th>
                <th scope="col">Price renews at</th>
                <th scope="col">Mid-term price change</th>
                <th scope="col">Cancel / refund behavior</th>
                <th scope="col">Terms basis (accessed)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Cursor Pro</th>
                <td>Then-current price; no rate guarantee</td>
                <td>Advance notice; continued use = agreement</td>
                <td>Keep until end of paid month; refund only within 14 days AND zero usage</td>
                <td className="text-xs">cursor.com terms + help center (09-06/07)</td>
              </tr>
              <tr>
                <th scope="row">GitHub Copilot</th>
                <td>
                  Locked for the paid term — &ldquo;that will remain your price for the duration of
                  the payment term&rdquo;
                </td>
                <td>No — term lock; changes land at renewal with 30-day notice</td>
                <td>
                  Keep until term end; refunds &ldquo;no exceptions&rdquo; per the ToS (a personal
                  plan overlapping a company seat is the prorated-refund carve-out)
                </td>
                <td className="text-xs">docs.github.com ToS s.L (09-06); offers snapshot (09-07)</td>
              </tr>
              <tr>
                <th scope="row">Claude (Anthropic)</th>
                <td>
                  &ldquo;we will not make any change to the fees applicable to your Subscription
                  during the current Initial Term or Renewal Term&rdquo;
                </td>
                <td>No mid-term; increases need 30 days&apos; notice before the next term</td>
                <td>
                  Cancel 24h+ before the renewal date; fees not refunded, access continues;
                  non-refundable except regional cooling-off carve-outs (BR/MX/KR/TW 7-day;
                  EEA/UK 14-day prorated per pricing page)
                </td>
                <td className="text-xs">anthropic.com consumer-terms s.6; claude.com/pricing (09-06/07)</td>
              </tr>
              <tr>
                <th scope="row">OpenAI (ChatGPT)</th>
                <td>Not published to our fetcher — the ToS returned HTTP 403 on 2026-09-06</td>
                <td>Unknown</td>
                <td>Unknown — do not assume; check the terms yourself</td>
                <td className="text-xs">openai.com policies (09-06, blocked)</td>
              </tr>
              <tr>
                <th scope="row">Kimi K3</th>
                <td>
                  Monthly tiers renew at list price; annual tiers are a prepay (~$15/$31/$79/$159
                  per month by tier)
                </td>
                <td>Renewal price-change terms not documented on the pages we fetched (09-06)</td>
                <td>
                  Monthly: access runs to end of paid month. Annual refund/proration not stated —
                  confirm before prepaying
                </td>
                <td className="text-xs">kimi.ai membership pricing; content/offers/kimi-k3-core.json (09-06)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Two honest &ldquo;unknowns&rdquo; are better than one invented number: where a vendor
          publishes no renewal terms we can retrieve, this page says so — and the re-verification
          pass re-checks weekly.
        </p>
      </section>

      <section aria-label="What cancel means">
        <h2 className="display-lg">What &ldquo;cancel&rdquo; actually means, in one table</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">Three cancel mechanics and where each is verified</caption>
            <thead>
              <tr>
                <th scope="col">Mechanic</th>
                <th scope="col">Meaning</th>
                <th scope="col">Where verified</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Keep-until-end-of-term</th>
                <td>You keep access to the end of the paid period; then stop, no refund</td>
                <td className="text-xs">
                  Cursor (09-07 help page), Claude (consumer-terms), Copilot (ToS), Kimi monthly
                  (snapshot 09-06)
                </td>
              </tr>
              <tr>
                <th scope="row">Refund for unused time</th>
                <td>Money back mid-term — the rare one</td>
                <td className="text-xs">
                  Only Cursor documents a real path (14 days + zero usage); Copilot says no
                  exceptions; Claude pays out only in four listed countries or on vendor
                  termination; OpenAI unknown
                </td>
              </tr>
              <tr>
                <th scope="row">Proration</th>
                <td>Partial credit for the unused fraction</td>
                <td className="text-xs">
                  Documented nowhere in our snapshot for these plans — assume none until the terms
                  say otherwise
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Order of operations: read the refund terms <em>before</em> prepaying anything annual —
          the prepay math is in{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="font-bold underline">
            monthly vs annual AI plans
          </Link>{" "}
          — keep monthly while usage is unproven, and calendar the renewal date minus 30 days.
        </p>
      </section>

      <section aria-label="Budgeting an unprotected rate">
        <h2 className="display-lg">The $20 question, compounded</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>
            With no rate lock, budget the renewal, not the signup: assume $240/yr as the floor,
            and treat any future increase as something you must catch by reading notices (our
            snapshot records no published Cursor price-change history to lean on — we do not
            project numbers).
          </li>
          <li>
            Locking a price is only possible where a term lock exists (Copilot&apos;s paid term;
            annual prepay generally) — and prepay trades renewal risk for refund risk, which is
            the whole subject of{" "}
            <Link href="/guides/lifetime-ai-deals/" className="font-bold underline">
              the lifetime-deals analysis
            </Link>
            .
          </li>
          <li>
            Students: the same auto-bill cliff applies to expired student claims — see{" "}
            <Link href="/guides/ai-student-discounts/" className="font-bold underline">
              the verified student table
            </Link>
            .
          </li>
        </ul>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="car" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link href="/guides/ai-student-discounts/" className="font-bold underline">
          AI student discounts, verified live
        </Link>{" "}
        · <Link href="/best/cursor-pro/" className="font-bold underline">Cursor Pro offer details</Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “Cursor Pro renewal: what you'll actually pay, per the terms.” Research snapshot Sep 6-7 2026. ${url} Re-verify at official terms before paying.`}
      />
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cursor Pro annual renewal price: what $20/mo renews at, per the terms",
            description:
              "Cursor renews at the then-current price with no rate guarantee; Copilot and Claude lock their paid terms. Verbatim terms quotes and refund mechanics, Sep 2026.",
            url,
            datePublished: "2026-09-07",
            author: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
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
              { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/` },
              { "@type": "ListItem", position: 3, name: "Cursor renewal price", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
