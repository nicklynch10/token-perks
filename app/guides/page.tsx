import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { canonical, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI Pricing Guides (Verified Sep 6 2026) | Token Perks",
  description:
    "Two practical guides: effective cost per task and monthly vs annual AI plans. Worked examples, checklists, verified Sep 6 2026.",
  alternates: { canonical: canonical("/guides/") },
  openGraph: {
    title: "AI Pricing Guides (Verified Sep 6 2026) | Token Perks",
    description: "Cost per task and monthly-vs-annual guides with worked examples.",
    url: canonical("/guides/"),
    type: "website",
  },
};

const GUIDES = [
  {
    href: "/guides/effective-cost-per-task-explained/",
    title: "Effective cost per task, explained",
    text: "Price ÷ tasks done. The $40 / 120-task / $0.80 example breaks even at 50 tasks — plus the calculator.",
  },
  {
    href: "/guides/monthly-vs-annual-ai/",
    title: "Monthly vs annual AI plans",
    text: "Annual saves ~20% but only for stable volume. Allegretto (the $39/month middle tier) $39 vs ~$31 effective, with a prepay checklist.",
  },
];

export default function GuidesIndex() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <header>
        <h1 className="display-md">
          Guides
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Two short guides with worked examples and stated assumptions. Research snapshot Sep 6 2026.
          Throughout, a &ldquo;task&rdquo; means one finished piece of work — a draft, a summary, a
          fix. The definition and the math are in{" "}
          <Link href="/guides/effective-cost-per-task-explained/" className="font-bold underline">
            effective cost per task, explained
          </Link>
          .
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {GUIDES.map((g) => (
          <article key={g.href} className="card p-5 sm:p-6">
            <p className="eyebrow">Guide</p>
            <h2 className="display-sm mt-2">
              <Link href={g.href} className="hover:underline">
                {g.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{g.text}</p>
            <Link
              href={g.href}
              className="mt-3 inline-flex min-h-[44px] items-center font-bold text-teal-deep hover:underline"
            >
              Read the guide →
            </Link>
          </article>
        ))}
      </div>
      <ResearchSnapshot />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Guides", item: canonical("/guides/") },
          ],
        }}
      />
    </div>
  );
}
