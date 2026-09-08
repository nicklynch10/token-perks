import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { ACTIVE_OFFERS, type Offer } from "@/lib/offers";
import { ALLEGRETTO_ANNUAL_UPFRONT, ALLEGRETTO_MONTHLY } from "@/lib/crossover";
import { canonical, SNAPSHOT_LINE, SITE_URL, social } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buying AI access as a gift — gift cards, refund windows, and what to do instead",
  description:
    "Can you gift a ChatGPT, Claude, Kimi, Copilot, or Cursor subscription? No gift cards on our tracked offers — so here is what gifting AI access actually means: activation, first month, refund windows, and quota reality, per verified offer.",
  alternates: { canonical: canonical("/guides/buying-ai-access-as-a-gift/") },
  ...social({
    title: "Buying AI access as a gift",
    description:
      "Gift cards, transferability, refund windows, and the practical gift for each tracked AI offer. Dated snapshot — re-verify at official terms.",
    path: "/guides/buying-ai-access-as-a-gift/",
    type: "article",
  }),
};

/** Is the price a $0 route (by the verified string, not by guess)? */
function isFree(o: Offer): boolean {
  return /^\$0\b/.test(o.price.now.trim());
}

/** First sentence that mentions refund or cancellation, if the verified copy has one. */
function refundClause(o: Offer): string {
  const s = `${o.price.renewal} ${o.renewal}`;
  const sentence = s
    .split(/(?<=[.!?])\s+/)
    .find((x) => /refund|cancel/i.test(x));
  return sentence ? sentence.trim() : "Refund terms not restated in the verified snapshot — see the offer's official terms link.";
}

/** One-clip helper for table cells. */
function clip(s: string, n = 130): string {
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;
}

function giftRead(o: Offer): string {
  if (isFree(o)) {
    return "Free route — there is nothing to buy. The gift is the introduction: the recipient activates it on their own account.";
  }
  return `Paid plan tied to the buying account — no transfer, no gift-card path in the verified terms. Cover the first month only if they want it, and start monthly, not annual.`;
}

const FAQ = [
  {
    q: "Is there a gift card for ChatGPT, Claude, Kimi, Copilot, Cursor, or Google AI?",
    a: "None of our tracked offers shows a gift-card or transferable-subscription mechanism in its verified terms, as of this snapshot. Providers add these occasionally — re-check the official terms link on each offer page before relying on one.",
  },
  {
    q: "So can I gift a subscription or not?",
    a: "Not in the gift-card sense. A subscription lives on the account that pays for it. What works: paying someone's first month (with their consent, on an account they control), gifting a $0 route they activate themselves, or gifting credit/top-up packs where a provider sells them. If you buy on your own account and hand over the login, you are the account owner to the provider — caps, billing, and recovery all point at you.",
  },
  {
    q: "What if they don't like it?",
    a: "That is the refund-window question, and it decides how risky a prepaid gift is. Monthly plans stop at the next renewal when canceled; annual prepaid money is the exposed part. The per-offer refund rows below quote the verified terms — when in doubt, give a month, not a year.",
  },
  {
    q: "Do free routes have the same limits for the recipient?",
    a: "Free-route limits are typically account-level and variable — quotas, regions, and promo eligibility can differ between two accounts. A free route that works for you may throttle or be unavailable for them; the recipient should measure it on their own account in the first session.",
  },
];

export default function GiftGuidePage() {
  const url = canonical("/guides/buying-ai-access-as-a-gift/");
  const paid = ACTIVE_OFFERS.filter((o) => !isFree(o));
  const free = ACTIVE_OFFERS.filter((o) => isFree(o));

  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Buying AI access as a gift" },
        ]}
      />
      <header>
        <p className="eyebrow">Practical guide · {SNAPSHOT_LINE}</p>
        <h1 className="display-md mt-1">Buying AI access as a gift</h1>
        <p className="lede mt-3">
          The short answer: you usually cannot gift an AI subscription the way you gift a Netflix
          plan. None of the {ACTIVE_OFFERS.length} offers we track sells a gift card or a
          transferable subscription in its verified terms — so this guide covers what gifting AI
          access actually means: who can activate a $0 route, what &ldquo;covering their first
          month&rdquo; involves, and which refund windows make a prepaid gift safe or risky.
        </p>
      </header>

      <ResearchSnapshot />

      <section aria-label="Gift-card mechanics">
        <h2 className="display-lg">Gift-card mechanics: what exists and what doesn&apos;t</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          A gift card works because the subscription is expected to start on the{" "}
          <em>recipient&apos;s</em> account. Consumer AI plans are billed to, and cap-managed on,
          the account that pays — so a purchased plan is not a transferable object. Two
          near-misses are worth naming: <strong className="text-ink">store-billed
          subscriptions</strong> (an app-store gift balance can technically pay for an
          iOS/Android-billed plan, and cancellation then happens in the store, not the AI
          provider) and <strong className="text-ink">bundled plans</strong> (a bundle with family
          sharing covers more people, but sharing is defined by the bundle&apos;s own terms, not by
          ours). Where a provider adds real gift mechanics after this snapshot, the offer page
          links its official terms — check there before buying.
        </p>
      </section>

      <section aria-label="Gifting reality per offer">
        <h2 className="display-lg">Per-offer reality: paid plans</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[560px]">
            <caption className="sr-only">
              Paid tracked offers with verified price, renewal behavior, refund wording, and the
              gift read for each.
            </caption>
            <thead>
              <tr>
                <th scope="col">Offer</th>
                <th scope="col">Price (verified)</th>
                <th scope="col">Refund / cancel, in the verified copy</th>
                <th scope="col">Gift read</th>
              </tr>
            </thead>
            <tbody>
              {paid.map((o) => (
                <tr key={o.id}>
                  <th scope="row" className="font-normal">
                    <Link href={o.canonical_url} className="u-draw font-semibold text-teal-deep">
                      {o.provider} {o.shortTitle}
                    </Link>
                    <span className="block text-[11.5px] text-ink-mute">
                      verified {o.verified_at}
                      {o.official_terms_url ? " · official terms linked on the offer page" : ""}
                    </span>
                  </th>
                  <td className="data text-[12.5px]">{clip(o.price.now, 64)}</td>
                  <td className="text-[12.5px] text-ink-soft">{clip(refundClause(o), 150)}</td>
                  <td className="text-[12.5px] text-ink-soft">{clip(giftRead(o), 150)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Free routes as gifts">
        <h2 className="display-lg">The $0 routes — the easiest gift is nothing</h2>
        <ul className="mt-3 space-y-3">
          {free.map((o) => (
            <li key={o.id} className="card p-4 text-sm">
              <p className="font-semibold">
                <Link href={o.canonical_url} className="u-draw text-teal-deep">
                  {o.provider} {o.shortTitle}
                </Link>{" "}
                <span className="data text-xs font-normal text-ink-mute">
                  {clip(o.price.now, 48)} · verified {o.verified_at}
                </span>
              </p>
              <p className="mt-1 text-ink-soft">{clip(o.catchSummary, 180)}</p>
              <p className="mt-1 text-[12.5px] text-ink-mute">{giftRead(o)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Quota reality">
        <h2 className="display-lg">Quota reality: what the fee does and doesn&apos;t buy</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Before this becomes a gift, know what the recipient is actually getting. On every paid
          route we track, the monthly fee buys access to a metered pool, not unlimited frontier
          work — the limits arrive as 5-hour windows, weekly allowances, credit budgets, or
          on-demand billing at raw rates once an included pool runs out. Gifting a month of a plan
          whose caps are shaped for someone else&apos;s workload gifts a throttled experience.
          Two specific traps: free-route quotas are account-variable (what you measure is not
          what they&apos;ll see), and promo rates can be region- or version-gated. The offer pages
          carry the exact limits; read the recipient&apos;s likely workload against them.
        </p>
      </section>

      <section aria-label="Works for them, not you">
        <h2 className="display-lg">&ldquo;Works for them&rdquo; is the test</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
          <li>Activation belongs to a person: email, region availability, payment method, and any app-store billing all sit on their side.</li>
          <li>Caps, usage history, and account recovery point at the account owner — if you buy it on your account, it is your account.</li>
          <li>A gift that survives: a $0 route they activate, an explicit credit pack the provider sells, or a first month paid directly into an account they own and control.</li>
        </ul>
      </section>

      <section aria-label="Prepay risk">
        <h2 className="display-lg">Prepay risk: months, not years</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Annual billing is where gift money gets trapped: {paid.some((o) => /annual/i.test(o.price.renewal)) ? "several tracked offers bill annual up front" : "annual terms vary by offer"} — the
          Kimi Allegretto tier is ${ALLEGRETTO_MONTHLY}/mo monthly but ${ALLEGRETTO_ANNUAL_UPFRONT}
          upfront for the year at the discounted effective rate, and Claude Pro&apos;s annual option
          bills once up front for the year. Upfront money + someone else&apos;s usage pattern =
          refund-window exposure. The calm rule: <strong className="text-ink">gift a month,
          let them choose the year.</strong> If volume holds, annual is their (cheaper) decision
          next cycle — the math is in{" "}
          <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
            monthly vs annual AI plans
          </Link>
          .
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Ready to price it properly? The break-even tool is on the{" "}
          <Link href="/#break-even" className="u-draw text-teal-deep">
            homepage
          </Link>{" "}
          and everything interactive lives on{" "}
          <Link href="/cost-calculator/" className="u-draw text-teal-deep">
            the calculators page
          </Link>
          .
        </p>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">Questions, answered plainly</h2>
        <div className="mt-3">
          <Faq id="gift-faq" items={FAQ} />
        </div>
      </section>

      <CiteBlock citation={`Token Perks. "Buying AI access as a gift." Research snapshot Sep 6–7 2026. ${url}`} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Buying AI access as a gift — gift cards, refund windows, and what to do instead",
            datePublished: "2026-09-07",
            dateModified: "2026-09-07",
            author: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            publisher: { "@type": "Organization", name: "Token Perks", url: SITE_URL },
            about: { "@type": "Thing", name: "Gifting AI subscriptions and access routes" },
            url,
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
              { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
              { "@type": "ListItem", position: 2, name: "Guides", item: canonical("/guides/") },
              { "@type": "ListItem", position: 3, name: "Buying AI access as a gift", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
