import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL, social } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Monthly vs Annual AI Plans — When Prepaying Pays (Sep 2026)",
  description:
    "Kimi Allegretto $39/mo vs ~$31/mo annual (~$372 upfront, ~$96/yr difference). Prepay only stable volume. Verified Sep 6 2026.",
  alternates: { canonical: canonical("/guides/monthly-vs-annual-ai/") },
  ...social({
    title: "Monthly vs Annual AI Plans — When Prepaying Pays (Sep 2026)",
    description: "Allegretto $39/mo vs ~$31/mo effective annual. Prepay only stable volume.",
    path: "/guides/monthly-vs-annual-ai/",
    type: "article",
  }),
};

const FAQ = [
  {
    q: "How much does annual billing save on Kimi K3?",
    a: "About 20%: Allegretto drops from $39/mo to ~$31/mo effective (~$372 upfront vs $468 over a year), saving roughly $96/year. Moderato, Allegro, and Vivace scale similarly ($19→$15, $99→$79, $199→$159). Verified Sep 6 2026.",
  },
  {
    q: "When should I pay annually?",
    a: "When your volume has cleared break-even for 3+ straight months (about 39 tasks/mo on Allegretto annual vs ~49 on monthly, against the $0.80/task reference) and you have confirmed the refund and cancellation terms.",
  },
  {
    q: "When should I stay monthly?",
    a: "Seasonal or experimental usage, teams still measuring volume, anyone relying on a free promo that could end, and any plan whose refund terms you have not read.",
  },
  {
    q: "Does annual change the limits?",
    a: "No — the shared credit pool plus 5-hour and weekly controls apply either way. Annual only locks the price; it does not raise the caps.",
  },
  {
    q: "When does annual billing pay back vs monthly (break-even month)?",
    a: "Annual is $372 upfront; monthly is $39 a month. If you cancel early with no refund, monthly is cheaper until about month 10 (372 ÷ 39 ≈ 9.5). Stay past month 10 and annual reaches break-even, saving roughly $8/mo thereafter. A full-refund window would move break-even to month 1 — which is why the refund terms decide the answer.",
  },
  {
    q: "What happens on cancel — refunds, proration, keep-until-end-of-term?",
    a: "Monthly is the low-risk path: cancel and access runs to the end of the paid month, then stops — no refund needed. Annual keeps you on the tier until the term ends, but refund and proration rules are the provider's to set and are not recorded in our Sep 6 snapshot. Confirm both in the official terms before prepaying $372.",
  },
  {
    q: "How fresh are these numbers?",
    a: "Research snapshot Sep 6 2026, re-verified weekly per Methodology v2. Re-check official terms before paying.",
  },
];

export default function GuidePage() {
  const url = canonical("/guides/monthly-vs-annual-ai/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Monthly vs annual" },
        ]}
      />
      <header>
        <h1 className="display-md">
          Monthly vs annual AI plans
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            Short answer: stay monthly until your volume clears break-even for several consecutive
            months, then prepay annually.
          </strong>{" "}
          Annual Kimi K3 billing saves ~20% — Allegretto (the $39/month middle tier) at{" "}
          <strong className="tabular">~$31/mo effective (~$372 upfront)</strong> vs{" "}
          <strong className="tabular">$39/mo monthly</strong> — but only pays if you clear
          break-even (~39 tasks/mo) all year. Figures verified Sep 6 2026.
        </p>
      </header>

      <section aria-label="Worked example">
        <h2 className="display-lg">Worked example: Allegretto</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            Monthly path: <strong className="tabular text-ink">$39 × 12 = $468/year</strong>, cancellable any month.
          </li>
          <li>
            Annual path: <strong className="tabular text-ink">~$31 × 12 ≈ $372 upfront</strong>,
            saving roughly $96/year (~20.5%).
          </li>
          <li>
            Break-even moves with the price:{" "}
            <strong className="tabular text-ink">~49 tasks/mo monthly vs ~39 annual</strong>{" "}
            (against the $0.80/task reference).
          </li>
          <li>
            Risk check: if usage collapses in month 4, the monthly user has spent $156; the annual
            user has spent $372 minus whatever refund the terms allow — read them first.
          </li>
        </ol>
      </section>

      <section aria-label="Test your volume">
        <h2 className="display-lg">Test your volume first</h2>
        <div className="mt-2">
          <BreakEvenCalc defaultTasks={60} />
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Writing work? Count your drafts per month and enter the number above: about 24 drafts
          clears the $19 Moderato month, about 49 clears the $39 Allegretto month (at the
          $0.80/task reference). Pick the cheapest tier your count clears — the tier details are
          on the{" "}
          <Link href="/best/kimi-k3-core/" className="font-bold underline">
            Kimi K3 offer page
          </Link>
          .
        </p>
      </section>

      <section aria-label="When annual applies">
        <h2 className="display-lg">When annual applies</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Volume above break-even for 3+ consecutive months with no seasonal dip.</li>
          <li>Refund / cancellation terms read and acceptable.</li>
          <li>Caps (5-hour/weekly) already proven against your heaviest week.</li>
        </ul>
      </section>

      <section aria-label="When annual does not apply">
        <h2 className="display-lg">When annual does not apply</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>New team, new tool, unmeasured usage — measure quarterly first.</li>
          <li>Dependence on a limited-time promo (the Zen free route, or any similar provider promo window) that could end.</li>
          <li>Cash-flow matters more than a 20% discount in the short run.</li>
        </ul>
      </section>

      <section aria-label="Checklist">
        <h2 className="display-lg">Prepay checklist</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Refund window and proration, in writing, from the official terms.</li>
          <li>Who owns the seat if a teammate leaves mid-year.</li>
          <li>Calendar reminder 30 days before the annual renewal.</li>
        </ul>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="mva" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link href="/guides/effective-cost-per-task-explained/" className="font-bold underline">
          Effective cost per task, explained
        </Link>{" "}
        · <Link href="/best/kimi-k3-core/" className="font-bold underline">Kimi K3 offer details</Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “Monthly vs annual AI plans.” Research snapshot Sep 6 2026. ${url} Re-verify at official terms before paying.`}
      />
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Should you pay monthly or annually for AI?",
            description:
              "Annual saves ~20% (Allegretto $39 vs ~$31 effective) but only pays for stable volume. Worked example and checklist.",
            url,
            datePublished: "2026-09-06",
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
              { "@type": "ListItem", position: 3, name: "Monthly vs annual", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
