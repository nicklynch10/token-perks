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
  title: "AI Student Discounts, Verified Live (Sep 2026): Who Still Offers One",
  description:
    "Cursor's student program closed June 25, 2026. The live offers, their verification cycles, and exactly what happens when each free period ends — dated to Sep 6-7 2026.",
  alternates: { canonical: canonical("/guides/ai-student-discounts/") },
  ...social({
    title: "AI Student Discounts, Verified Live (Sep 2026)",
    description:
      "Which student offers actually exist right now, and what each one does when it ends — re-verify, downgrade, or auto-bill.",
    path: "/guides/ai-student-discounts/",
    type: "article",
  }),
};

const FAQ = [
  {
    q: "Is Cursor Pro free for students in 2026?",
    a: "No. 'Cursor discontinued new sign-ups for the legacy student discount on June 25, 2026' (cursor.com/help/account-and-billing/student-discount, accessed 2026-09-06/07). Students who already redeemed keep their rate until it expires, then Pro continues at the regular $20/month unless cancelled.",
  },
  {
    q: "What happens when my free Cursor student year ends — does it auto-charge?",
    a: "Yes, unconditionally: 'Your Pro subscription continues at the regular $20/month rate unless you cancel' (cursor.com/help/account-and-billing/student-discount, 2026-09-07). There is no re-verification gate on the legacy path — the charge lands unless you act.",
  },
  {
    q: "Is GitHub Copilot free for students, and which plan?",
    a: "Yes, via the GitHub Copilot Student plan for verified students — free, with unlimited code completions, an AI-credit allowance, and limited chat/agent usage on auto model selection only (third-party agents excluded). It is a distinct plan, not Copilot Pro; free Copilot Pro is for verified teachers and popular open-source maintainers. Sources: github.com/features/copilot/plans, docs.github.com/en/copilot/get-started/plans, education.github.com/pack, all accessed 2026-09-06.",
  },
  {
    q: "Is Google AI Pro free for students, and does it charge after?",
    a: "Eligible U.S. college students 18+ get one free year, verified through SheerID, redeemable until December 31, 2026. 'Eligibility must be verified each year to maintain access,' and 'Unless cancelled earlier, Google AI Pro will automatically charge $19.99/month after the trial ends' (gemini.google/students, accessed 2026-09-07). The multi-year figure that circulates — 'up to 4 years' — appears on Google's discounted YouTube bundle, not on the free plan itself.",
  },
  {
    q: "Is ChatGPT Plus free for students, and until when?",
    a: "As a limited window, yes: 4 months free for eligible U.S. college students, claimed by October 31, 2026, an $80 value (chatgpt.com/students/2026 and help.openai.com, both 403 to direct fetch — copy obtained via search index on 2026-09-07). Post-promo billing continues at the standard rate unless cancelled. OpenAI runs no standing student discount; adjacent programs are free ChatGPT for Teachers and up to 75% off Business/Enterprise for nonprofits.",
  },
  {
    q: "Does Claude have a student discount?",
    a: "No individual student offer. Anthropic sells Claude for higher education institution-wide and runs an academic/nonprofit scientist program, but claude.com/pricing carries no student tier as of 2026-09-06.",
  },
  {
    q: "Does Windsurf still have a student discount?",
    a: "No active program. The brand moved to Devin Desktop on June 2, 2026, windsurf.com now redirects to devin.ai, and the student page was removed. The legacy terms survive at windsurf.com/student-terms-and-conditions: 12-month discount periods, up to 3 re-verified extensions, then automatic migration 'at the then-full price.'",
  },
  {
    q: "Will a free student plan ever charge me without warning?",
    a: "It depends entirely on the mechanism, and that is the column worth reading twice. Auto-bill: Cursor legacy, Google AI Pro/Plus, Windsurf legacy. Re-verify or downgrade, never charge: GitHub (access expires; reapply), Notion (moves to Free Plan), Figma (reapply; expires to Starter/view-only), JetBrains (manual renewal, not automatic). Set the reminder the day you claim, not the day the charge arrives.",
  },
  {
    q: "How fresh is this?",
    a: "Every row was checked against an official page on 2026-09-06 or 2026-09-07 and is labelled with its source. Where a page blocks our fetcher, the copy is marked as search-indexed. Re-check before you claim — student promos move faster than any other pricing on this site.",
  },
];

export default function GuidePage() {
  const url = canonical("/guides/ai-student-discounts/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Student discounts" },
        ]}
      />
      <header>
        <h1 className="display-md">AI student discounts, verified live: who still offers one</h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            If you searched &ldquo;cursor pro student discount&rdquo;: that program closed June 25,
            2026, and most pages still ranking for it are stale.
          </strong>{" "}
          The live student offers as of 2026-09-06/07 are GitHub Copilot Student (free while
          verified), Google AI Pro for one year, a 4-month ChatGPT window that must be claimed by
          October 31, 2026, and a handful of adjacent programs for teachers and nonprofits. Claude
          has none, and Windsurf&apos;s is gone. The column that matters most below is the last
          one: <strong>what happens when the free period ends.</strong>
        </p>
      </header>

      <section aria-label="The stale SERP problem">
        <h2 className="display-lg">The stale-SERP problem: Cursor edition</h2>
        <p className="mt-2 text-ink-soft">
          The sequence, per Cursor&apos;s own pages (accessed 2026-09-06 and re-checked
          2026-09-07):
        </p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            New student sign-ups ended 2026-06-25, cited to fraud and a desire to reach students
            globally. If you did not claim before that date, there is currently no student route
            to Cursor Pro.
          </li>
          <li>
            Legacy claimants keep their rate until the plan expires, then: &ldquo;Your Pro
            subscription continues at the regular $20/month rate unless you cancel&rdquo; (
            cursor.com/help/account-and-billing/student-discount). That is an unconditional
            auto-bill, not a re-verification gate — a month-13 charge of $240/year if you do not
            act.
          </li>
          <li>
            The replacement path is event-based: &ldquo;Undergraduates can claim credits and
            discounts at on-campus and online events starting this fall&rdquo; — undated as of
            2026-09-07 — plus a credits request form for master&apos;s, PhD, researcher, and
            educator applicants.
          </li>
        </ol>
        <p className="mt-3 text-sm text-ink-soft">
          If you hold a legacy claim, the entire defense is a calendar reminder 30+ days before
          your free year ends.
        </p>
      </section>

      <section aria-label="Verified live student table">
        <h2 className="display-lg">The verified live table</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Every row checked against an official page on the access date. &ldquo;Via index&rdquo;
          means the page 403s to our fetcher and the wording came from search-indexed official
          copy.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Student offers by vendor: eligibility, benefit, end behavior, and source
            </caption>
            <thead>
              <tr>
                <th scope="col">Offer</th>
                <th scope="col">Who qualifies</th>
                <th scope="col">What you get</th>
                <th scope="col">What happens when it ends</th>
                <th scope="col">Source (accessed)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">GitHub Copilot Student</th>
                <td>Verified students, 13+, degree/diploma course of study; school email or dated proof</td>
                <td>Free: unlimited completions, AI-credit allowance, limited chat/agents, auto model selection only</td>
                <td>
                  Access expires; reapply if still eligible. No auto-charge documented. Official
                  validity period is not published
                </td>
                <td className="text-xs">education.github.com/pack; docs.github.com (09-06)</td>
              </tr>
              <tr>
                <th scope="row">Google AI Pro (student)</th>
                <td>Eligible U.S. college students 18+, personal account, SheerID</td>
                <td>1 year free ($19.99/mo value; 4x Gemini limits, 5 TB)</td>
                <td>
                  Re-verify each year to keep access; unless cancelled, auto-charges $19.99/mo after
                  the trial. Redeem by 2026-12-31
                </td>
                <td className="text-xs">gemini.google/students (09-07)</td>
              </tr>
              <tr>
                <th scope="row">ChatGPT student window</th>
                <td>Eligible U.S. college students; SheerID</td>
                <td>4 months free, an $80 value — claim by 2026-10-31</td>
                <td>
                  Continues at the standard rate unless cancelled before the next charge. No
                  standing discount outside this window
                </td>
                <td className="text-xs">chatgpt.com/students/2026, help.openai.com (via index, 09-07)</td>
              </tr>
              <tr>
                <th scope="row">OpenAI for Teachers</th>
                <td>Verified U.S. K-12 educators</td>
                <td>ChatGPT for Teachers free</td>
                <td>
                  Announced Nov 19, 2025 through June 2027; indexed help copy now runs through June
                  2028. Re-check at claim — dates move
                </td>
                <td className="text-xs">openai.com/index/chatgpt-for-teachers (via index, 09-07)</td>
              </tr>
              <tr>
                <th scope="row">OpenAI for nonprofits</th>
                <td>Eligible nonprofit organizations</td>
                <td>Up to 75% off Business or Enterprise</td>
                <td>
                  Ongoing while eligibility holds; org-level re-verification cadence is not published
                </td>
                <td className="text-xs">openai.com/index/introducing-openai-for-nonprofits (via index, 09-06)</td>
              </tr>
              <tr>
                <th scope="row">Claude</th>
                <td>&mdash;</td>
                <td>No student tier (verified absence)</td>
                <td>n/a — standard pricing. Education is sold institution-wide</td>
                <td className="text-xs">claude.com/pricing; claude.com/solutions/education (09-06)</td>
              </tr>
              <tr>
                <th scope="row">Windsurf (ended)</th>
                <td>Legacy claimants only</td>
                <td>Was discounted Pro for 12-month periods, up to 3 re-verified extensions</td>
                <td>
                  Then &ldquo;automatically migrate to a subscription to Windsurf Pro on a monthly
                  recurring basis, at the then-full price&rdquo;
                </td>
                <td className="text-xs">windsurf.com/student-terms-and-conditions (09-06)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Status count as of 2026-09-07: <strong>three live student routes</strong> — GitHub
          Copilot Student, Google AI Pro&apos;s free year, and OpenAI&apos;s 4-month window (the
          last one has a hard claim deadline) — plus two adjacent teacher/nonprofit programs;{" "}
          <strong>two ended</strong> (Cursor for new sign-ups, Windsurf entirely);{" "}
          <strong>one never existed</strong> for individuals (Claude).
        </p>
      </section>

      <section aria-label="The question behind the query">
        <h2 className="display-lg">&ldquo;Will I be charged later?&rdquo; — the question behind the query</h2>
        <p className="mt-2 text-ink-soft">
          Every &ldquo;free for students&rdquo; AI offer is a timed subscription, not a gift. Three
          renewal mechanics, and they are genuinely different:
        </p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
          <li>
            <strong>Re-verify or lapse</strong> (GitHub, Google): free access lasts only while you
            can prove enrollment again. Google states it plainly: &ldquo;Eligibility must be
            verified each year to maintain access&rdquo; — and its trial still auto-charges
            $19.99/mo unless cancelled, so a missed re-verify email and a card on file are the
            same event.
          </li>
          <li>
            <strong>Hard end dates</strong> (OpenAI&apos;s 4-month window, teachers&apos; program):
            the countdown starts at claim, not at graduation, and the claim itself has a deadline —
            waiting costs the offer entirely.
          </li>
          <li>
            <strong>Unconditional auto-bill</strong> (Cursor legacy, Windsurf legacy): the paid rate
            takes over at expiry with no gate in between. Cursor: &ldquo;continues at the regular
            $20/month rate unless you cancel.&rdquo;
          </li>
        </ol>
        <p className="mt-3 text-sm text-ink-soft">
          The pattern worth knowing from the rest of the software market: education programs that
          are <em>licenses to a tool</em> (Notion, Figma, JetBrains) downgrade you when verification
          lapses — they do not charge. Education programs that are <em>metered AI access on a card
          you supplied</em> (everything in the table above) trend the other way. Disputed
          conversions refund only under the vendor&apos;s ordinary terms, which are narrow:
          Cursor&apos;s 14-day-plus-zero-usage rule, Claude&apos;s regional cooling-offs, GitHub
          Copilot&apos;s &ldquo;no exceptions.&rdquo; Assume no refund.
        </p>
      </section>

      <section aria-label="If you missed the Cursor window">
        <h2 className="display-lg">If you missed the Cursor window</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>
            <strong>GitHub Copilot Student</strong> is the strongest like-for-like coding-assistant
            substitute for a verified student — completions plus an AI-credit allowance, free while
            verified.
          </li>
          <li>
            <strong>Watch cursor.com/students</strong> — the page promises event credits
            &ldquo;starting this fall,&rdquo; undated as of 2026-09-07. Our weekly pass re-checks
            it; there was nothing live to publish at verification.
          </li>
          <li>
            <strong>Routes that need no student ID at all:</strong> the NVIDIA dev route (
            <Link href="/best/nvidia-k3-free/" className="font-bold underline">
              verdict
            </Link>
            ) and Z.ai&apos;s zero-priced GLM flash models on the leaderboard.
          </li>
          <li>
            <strong>Cheapest paid option may beat chasing promos:</strong> if a $19 tier clears your
            volume, the{" "}
            <Link href="/guides/monthly-vs-annual-ai/" className="font-bold underline">
              monthly vs annual math
            </Link>{" "}
            applies to students too.
          </li>
        </ul>
      </section>

      <section aria-label="Adjacent education offers">
        <h2 className="display-lg">Adjacent: the education offers that never auto-charge</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Verified 2026-09-06 against each help center; useful because they invert the pattern:
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Notion, Figma, and JetBrains education programs and their expiry mechanics
            </caption>
            <thead>
              <tr>
                <th scope="col">Program</th>
                <th scope="col">What is free</th>
                <th scope="col">End behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Notion for Education</th>
                <td>Plus-tier plan, one-member workspace; unlimited re-verification</td>
                <td>Verification lapse moves the workspace to the Free Plan — it never charges</td>
              </tr>
              <tr>
                <th scope="row">Figma for Education</th>
                <td>Professional-tier features; 1 year for students, 2 for educators; SheerID</td>
                <td>Must reapply; expiry downgrades to Starter/view-only — never charges</td>
              </tr>
              <tr>
                <th scope="row">JetBrains educational license</th>
                <td>IDE licenses, 12 months; AI gets the Free tier + 30-day trial only</td>
                <td>Manual renewal with fresh verification — not auto-renewed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="asd" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link href="/guides/cursor-annual-renewal/" className="font-bold underline">
          What $20/mo renews at, per the terms
        </Link>{" "}
        · <Link href="/guides/lifetime-ai-deals/" className="font-bold underline">Lifetime deals: why no real one exists</Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “AI student discounts, verified live.” Research snapshot Sep 6-7 2026. ${url}`}
      />
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "AI student discounts, verified live: who still offers one",
            description:
              "Cursor's student program ended June 25, 2026. The verified live offers — GitHub, Google, OpenAI's 4-month window — and exactly what happens when each ends.",
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
              { "@type": "ListItem", position: 3, name: "Student discounts", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
