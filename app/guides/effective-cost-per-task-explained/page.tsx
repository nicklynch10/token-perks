import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreakEvenCalc from "@/components/BreakEvenCalc";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Effective Cost Per Task Explained (Verified Sep 2026)",
  description:
    "Cost per task = price ÷ tasks done. $40 sub over 120 tasks ≈ $0.33 vs $0.80 PAYG; break-even at 50. Verified Sep 6 2026.",
  alternates: { canonical: canonical("/guides/effective-cost-per-task-explained/") },
  openGraph: {
    title: "Effective Cost Per Task Explained (Verified Sep 2026)",
    description: "$40 sub over 120 tasks ≈ $0.33 vs $0.80 PAYG; break-even at 50 tasks.",
    url: canonical("/guides/effective-cost-per-task-explained/"),
    type: "article",
  },
};

const FAQ = [
  {
    q: "What is effective cost per task?",
    a: "Monthly price divided by tasks you actually complete. A $40 subscription covering 120 tasks costs about $0.33 per task — the number that decides whether a sub beats pay-as-you-go.",
  },
  {
    q: "Where does the $0.80/task reference come from?",
    a: "It is our illustrative reference: 100k tokens per task (median over a trailing 7-day example window, Methodology v2) at an $8 per 1M blended rate. Your mix will differ — adjust with the calculator above.",
  },
  {
    q: "When is a subscription cheaper?",
    a: "When your monthly tasks clear break-even: price divided by PAYG per-task cost. $40 ÷ $0.80 = 50 tasks. Above 50, the subscription is cheaper; below, PAYG or a free route is cheaper.",
  },
  {
    q: "Do free promos change the math?",
    a: "Temporarily: at $0/task any promo is cheaper while it lasts. But promos end on the provider's schedule, so make durable decisions (like annual prepay) on post-promo prices.",
  },
  {
    q: "How fresh are these numbers?",
    a: "Research snapshot Sep 6 2026, re-verified weekly per Methodology v2. Re-check official terms before paying.",
  },
];

export default function GuidePage() {
  const url = canonical("/guides/effective-cost-per-task-explained/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Effective cost per task" },
        ]}
      />
      <header>
        <h1 className="display-md">
          Effective cost per task, explained
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            Short answer: monthly price divided by tasks you actually complete.
          </strong>{" "}
          A $40 subscription covering 120 tasks costs about $0.33 per task — under half the $0.80
          illustrative pay-as-you-go reference. If you do fewer than 50 tasks a month, PAYG (or a{" "}
          <Link href="/best/muse-spark-zen-free/" className="underline">
            $0 route
          </Link>
          ) is cheaper. Figures verified Sep 6 2026.
        </p>
      </header>

      <section aria-label="Worked example">
        <h2 className="display-lg">
          Worked example: the 50-task break-even
        </h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            Subscription side: <strong className="tabular text-ink">$40 ÷ 120 tasks ≈ $0.33/task.</strong>{" "}
            Fixed price, so every extra task makes the average cheaper.
          </li>
          <li>
            PAYG side: <strong className="tabular text-ink">120 tasks × $0.80 = $96.</strong> Linear
            price — task 1 and task 120 cost the same.
          </li>
          <li>
            Break-even: <strong className="tabular text-ink">$40 ÷ $0.80 = 50 tasks.</strong> Above
            50, subscribe; below 50, pay per task.
          </li>
          <li>
            Note: the $0.80 reference assumes 100k tokens/task (median, trailing 7-day
            example window). Heavy agent runs can double it — which halves break-even to 25.
          </li>
        </ol>
      </section>

      <section aria-label="Calculator">
        <h2 className="display-lg">Calculator</h2>
        <div className="mt-2">
          <BreakEvenCalc />
        </div>
      </section>

      <section aria-label="When this applies">
        <h2 className="display-lg">When this math applies</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Steady monthly volume (dev tools, support copilots, scheduled agents).</li>
          <li>Tasks of roughly similar size, so the average means something.</li>
          <li>Comparing a flat sub against metered billing for the same model class.</li>
        </ul>
      </section>

      <section aria-label="When this does not apply">
        <h2 className="display-lg">When it does not apply</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Spiky usage capped by 5-hour or weekly controls (see the Kimi K3 limits).</li>
          <li>Free promos — $0/task while the promo lasts; re-verify the end date.</li>
          <li>
            Mixed fleets where allowances differ by model — some plans split one window budget
            across token and request caps, so one model can run dry while another still has room.
          </li>
        </ul>
      </section>

      <section aria-label="Checklist">
        <h2 className="display-lg">Checklist before you subscribe</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Measure two real weeks of tasks and tokens-per-task.</li>
          <li>Compute break-even with your pay-as-you-go rate, not the reference here.</li>
          <li>Read the renewal and cancellation terms (monthly first, annual later).</li>
          <li>Confirm burst caps (5-hour/weekly) against your heaviest day.</li>
        </ul>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="ecpt" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link href="/guides/monthly-vs-annual-ai/" className="font-bold underline">
          Monthly vs annual AI plans
        </Link>{" "}
        · <Link href="/best/kimi-k3-core/" className="font-bold underline">Kimi K3 offer details</Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “Effective cost per task, explained.” Research snapshot Sep 6 2026. ${url} Re-verify at official terms before paying.`}
      />
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "What is effective cost per task?",
            description:
              "Cost per task = price ÷ tasks done. Worked $40/120-task/$0.80 example with 50-task break-even.",
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
              { "@type": "ListItem", position: 3, name: "Effective cost per task", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
