import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CiteBlock from "@/components/CiteBlock";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import { skuById, type TeamSeatSku } from "@/app/cost-calculator/team-seats";
import SectionAnchor from "@/components/SectionAnchor";
import { BASELINE_PAYG_PER_TASK } from "@/lib/effectiveCost";
import { canonical, SITE_URL, social } from "@/lib/site";
import { UNIVERSE, type UniverseRow } from "@/lib/universe";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI Seats for Teams: When Per-Seat Plans Beat Pooled API Spend (Sep 2026)",
  description:
    "Seat math for managers: mixed Claude Team seats (2 Standard + 1 Premium = $140/mo annual), Copilot credit buckets, Devin's base fee, and the rules for choosing seats vs pooled API spend. Every price dated.",
  alternates: { canonical: canonical("/guides/ai-seats-for-teams/") },
  ...social({
    title: "AI Seats for Teams: When Per-Seat Plans Beat Pooled API Spend (Sep 2026)",
    description:
      "Per-seat totals, mixed-seat math, and seats-vs-API decision rules on dated, tracked prices.",
    path: "/guides/ai-seats-for-teams/",
    type: "article",
  }),
};

/** Dated universe lookup for consumer rows the text may reference. */
function universeRow(id: string): UniverseRow | undefined {
  return UNIVERSE.rows.find((r) => r.id === id);
}

const std = skuById("claude-team-standard") as TeamSeatSku;
const prem = skuById("claude-team-premium") as TeamSeatSku;
const ent = skuById("claude-enterprise") as TeamSeatSku;
const biz = skuById("chatgpt-business") as TeamSeatSku;
const vibe = skuById("mistral-vibe-team") as TeamSeatSku;
const cursorStd = skuById("cursor-teams-standard") as TeamSeatSku;
const cursorPrem = skuById("cursor-teams-premium") as TeamSeatSku;
const copilotBiz = skuById("copilot-business") as TeamSeatSku;
const copilotEnt = skuById("copilot-enterprise") as TeamSeatSku;
const devin = skuById("devin-teams") as TeamSeatSku;

const usd = (v: number) =>
  `$${v.toLocaleString("en-US", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/* Worked totals — arithmetic on the catalog figures, which mirror dated rows. */
const MIX_N_STD = 2;
const MIX_N_PREM = 1;
const mixAnnual = MIX_N_STD * (std.perSeatMonthly as number) + MIX_N_PREM * (prem.perSeatMonthly as number);
const mixMonthly = MIX_N_STD * (std.perSeatMonthlyAlt as number) + MIX_N_PREM * (prem.perSeatMonthlyAlt as number);
const threeStdAnnual = 3 * (std.perSeatMonthly as number);
const threeStdMonthly = 3 * (std.perSeatMonthlyAlt as number);
const COPILOT_N = 5;
const copilotTotal = COPILOT_N * (copilotBiz.perSeatMonthly as number);
const DEVIN_N = 5;
const devinTotal = (devin.baseFee as number) + DEVIN_N * (devin.perSeatMonthly as number);
const devinTwoSeatPerSeat =
  ((devin.baseFee as number) + 2 * (devin.perSeatMonthly as number)) / 2;
const CURSOR_N = 5;
const cursorStdTotal = CURSOR_N * (cursorStd.perSeatMonthly as number);
const cursorPremTotal = CURSOR_N * (cursorPrem.perSeatMonthly as number);
const claudeProRow = universeRow("anthropic--sub--claude-pro");
const googleProRow = universeRow("google--sub--ai-pro");

const FAQ = [
  {
    q: "Are team seats cheaper than giving everyone an API key?",
    a: `Sometimes — they answer different questions. Seats buy named humans app access (chat, Claude Code, Copilot in the IDE) at a flat per-head rate; an API key funds pooled metered calls with no per-head fee. If your people write prompts in an app, seats are the compliant path. If programs call models, pooling usually wins. Compare headcount totals against metered spend in the calculators rather than guessing.`,
  },
  {
    q: "What does a Claude Team setup actually cost?",
    a: `On the annual rates verified ${std.accessed}: Standard seats are ${usd(std.perSeatMonthly as number)}/seat/mo and Premium seats ${usd(prem.perSeatMonthly as number)}/seat/mo, and the row says Premium can be mixed with Standard. So ${MIX_N_STD} Standard + ${MIX_N_PREM} Premium = ${usd(mixAnnual)}/mo. Monthly billing rates (${usd(std.perSeatMonthlyAlt as number)} and ${usd(prem.perSeatMonthlyAlt as number)}) put the same mix at ${usd(mixMonthly)}/mo. The ${usd(mixAnnual)} figure is Token Perks arithmetic on the rows' published rates, not a provider-advertised bundle price.`,
  },
  {
    q: "Do included credits pool across a team?",
    a: `Where our tracked rows say, usage is granted per seat. Copilot Business carries ${copilotBiz.includedUsage} and Copilot Enterprise ${copilotEnt.includedUsage} — stated per user, with extra credits at ${copilotBiz.overageRate?.split(";")[0].trim() ?? "not published"} (GitHub rows, accessed ${copilotBiz.accessed}). ChatGPT Business is the stated exception to a pure per-seat model: the verified structure is per-seat limits plus a shared credit pool, though its per-seat dollar is not published.`,
  },
  {
    q: "What breaks when a team plan fills up?",
    a: "Three things, depending on the row: seat-range ceilings (Claude Team's row reads 2–150 seats), fixed add-ons that small teams feel hardest (Devin Teams' $80/mo base fee is half the bill at two seats), and the wall-vs-bill switch — plans whose rows state usage billed at API rates (Claude Enterprise, Mistral Vibe Team's PAYG credits, Devin's extra usage) bill you when included quota runs out; plans with no published overage figure (both Claude Team seat rows) state no overage mechanism at all.",
  },
  {
    q: "Why is ChatGPT Business in the seat list without a price?",
    a: `Because the row is honest about the gap: the credit-based structure is verified (${biz.accessed}) but the row states there is no public per-seat dollar. The seat calculator lists it and computes nothing — a dash means none published, not zero.`,
  },
  {
    q: "How many seats should we buy for uneven usage?",
    a: `Buy the heavy users their seat, then price the rest against the alternatives the rows support: another seat class, a cheaper SKU, or pooled API. That mix is exactly what Claude Team's Standard/Premium pairing and the seat calculator's per-SKU totals are for. Re-check at quarter end: seat math only wins while the seats get used.`,
  },
];

/** Compact citation line for a SKU used in worked math. */
function Cite({ sku }: { sku: TeamSeatSku }) {
  return (
    <span className="data text-[11px] text-ink-mute">
      ({sku.provider} {sku.plan} row, {sku.label}, accessed {sku.accessed})
    </span>
  );
}

export default function AiSeatsForTeamsGuide() {
  const url = canonical("/guides/ai-seats-for-teams/");
  const usedSkus: TeamSeatSku[] = [
    std,
    prem,
    ent,
    biz,
    vibe,
    cursorStd,
    cursorPrem,
    copilotBiz,
    copilotEnt,
    devin,
  ];
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "AI seats for teams" },
        ]}
      />
      <header>
        <h1 className="display-md">AI seats for teams</h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            Short answer: buy seats when named humans need app access and you want one flat line
            item; pool API spend when programs — not people — are the user, or when a metered bill
            beats a headcount you can&apos;t keep busy.
          </strong>{" "}
          Mixed teams split the difference with more than one seat class. Every figure below comes
          from a dated row in the full price table; totals are Token Perks arithmetic on published
          rates, not provider quotes.
        </p>
      </header>

      <section aria-label="How to read a seat row">
        <h2 id="how-to-read" className="display-lg scroll-mt-16">
          How to read a seat row <SectionAnchor id="how-to-read" label="how to read a seat row" />
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          A seat price is three numbers, not one. (1)&nbsp;The&nbsp;rate per seat — and which
          billing term earns it: Claude Team&apos;s {usd(std.perSeatMonthly as number)} is the{" "}
          <em>annual</em>-billed rate, {usd(std.perSeatMonthlyAlt as number)} paid monthly{" "}
          <Cite sku={std} />. (2)&nbsp;The&nbsp;range the seller states: the same row reads 2–150
          seats. (3)&nbsp;Anything fixed on top: Devin&apos;s Teams entry is {`$${devin.baseFee}`}{" "}
          plus {usd(devin.perSeatMonthly as number)}/seat <Cite sku={devin} />. Multiply the rate by
          headcount and you have the line item; the other two numbers decide whether that line item
          survives contact with your org chart.
        </p>
      </section>

      <section aria-label="Worked seat math">
        <h2 id="worked-math" className="display-lg scroll-mt-16">
          Worked seat math <SectionAnchor id="worked-math" label="worked seat math" />
        </h2>

        <h3 id="mixed-claude" className="display-sm mt-4 scroll-mt-16">
          Mixed Claude Team seats <SectionAnchor id="mixed-claude" label="mixed Claude Team seats" />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          The row for Premium seats states 5x Standard-seat usage and mixing with Standard seats{" "}
          <Cite sku={prem} />. Two heavy users on Standard seats and one on Premium, at annual
          rates:
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[480px]">
            <caption className="sr-only">
              Claude Team mixed seats — our arithmetic on the rows&apos; published rates.
            </caption>
            <thead>
              <tr>
                <th scope="col">Seat class</th>
                <th scope="col" className="num">Seats</th>
                <th scope="col" className="num">Annual rate</th>
                <th scope="col" className="num">Monthly-billed rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="font-semibold">Standard</th>
                <td className="num">{MIX_N_STD}</td>
                <td className="num">{usd(MIX_N_STD * (std.perSeatMonthly as number))}/mo</td>
                <td className="num">{usd(MIX_N_STD * (std.perSeatMonthlyAlt as number))}/mo</td>
              </tr>
              <tr>
                <th scope="row" className="font-semibold">Premium</th>
                <td className="num">{MIX_N_PREM}</td>
                <td className="num">{usd(MIX_N_PREM * (prem.perSeatMonthly as number))}/mo</td>
                <td className="num">{usd(MIX_N_PREM * (prem.perSeatMonthlyAlt as number))}/mo</td>
              </tr>
              <tr>
                <th scope="row" className="font-semibold">Total</th>
                <td className="num">{MIX_N_STD + MIX_N_PREM}</td>
                <td className="num">{usd(mixAnnual)}/mo</td>
                <td className="num">{usd(mixMonthly)}/mo</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  Annual-billed: {usd(mixAnnual)}/mo × 12 = {usd(mixAnnual * 12)}/yr, committed up
                  front. Verified {std.accessed}; rates quoted verbatim on each row&apos;s source.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Same team, all Standard: {MIX_N_STD + MIX_N_PREM} × {usd(std.perSeatMonthly as number)} ={" "}
          {usd(3 * (std.perSeatMonthly as number))}/mo annual — {usd(mixAnnual - 3 * (std.perSeatMonthly as number))}
          /mo cheaper than the mix. The mix is worth it only if one person&apos;s usage genuinely
          needs the 5x tier; otherwise you are renting headroom.
        </p>

        <h3 id="three-person" className="display-sm mt-5 scroll-mt-16">
          Three-person office, one seat class <SectionAnchor id="three-person" label="three-person office example" />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Three Standard Claude Team seats: {usd(threeStdAnnual)}/mo on the annual rate,{" "}
          {usd(threeStdMonthly)}/mo billed monthly <Cite sku={std} />. For reference, one consumer
          Claude Pro seat runs {usd(claudeProRow?.priceMonthly ?? 0)}/mo monthly{" "}
          <span className="data text-[11px] text-ink-mute">
            (Claude Pro row, accessed {claudeProRow?.accessed})
          </span>{" "}
          — three Pro accounts match the annual-billed rate on three Team seats, but give up the
          team workspace and the mix-and-match seat classes, and the Team row states a 2-seat
          minimum.
        </p>

        <h3 id="copilot-buckets" className="display-sm mt-5 scroll-mt-16">
          Copilot: five seats, five credit buckets <SectionAnchor id="copilot-buckets" label="Copilot credit buckets example" />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {COPILOT_N} × {usd(copilotBiz.perSeatMonthly as number)} = {usd(copilotTotal)}/mo{" "}
          <Cite sku={copilotBiz} />. The included {copilotBiz.includedUsage} is stated{" "}
          <em>per user per month</em> — the row never describes a team pool — so a heavy developer
          burns their bucket while teammates&apos; sit idle, and extra credits bill at{" "}
          {copilotBiz.overageRate?.split(";")[0].trim()} per the row&apos;s terms. Copilot
          Enterprise doubles the seat fee and the bucket ({usd(copilotEnt.perSeatMonthly as number)}
          /seat, {copilotEnt.includedUsage}) <Cite sku={copilotEnt} />.
        </p>

        <h3 id="devin-base-fee" className="display-sm mt-5 scroll-mt-16">
          Devin: the base fee is the small-team trap <SectionAnchor id="devin-base-fee" label="Devin base-fee example" />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Teams is {usd(devin.baseFee as number)}/mo + {usd(devin.perSeatMonthly as number)} per
          seat <Cite sku={devin} />: {DEVIN_N} seats = {usd(devinTotal)}/mo, but at two seats the
          base fee alone makes it {usd(devinTwoSeatPerSeat)} per seat — the fixed $
          {devin.baseFee} is half the bill. The row&apos;s own caveat says its pricing came from a
          page snapshot — re-verify before quoting it in a budget.
        </p>

        <h3 id="cursor-seat-class" className="display-sm mt-5 scroll-mt-16">
          Cursor: seat class is the usage dial <SectionAnchor id="cursor-seat-class" label="Cursor seat-class example" />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {CURSOR_N} Teams seats: {usd(cursorStdTotal)}/mo on Standard or {usd(cursorPremTotal)}/mo
          on Premium, which the row defines as 5x Standard Agent limits <Cite sku={cursorStd} />.
          Upgrading a seat, not adding one, is how this row scales heavy users — and the row notes
          an Enterprise tier &ldquo;custom with pooled usage,&rdquo; i.e. past teams, the model
          switches to pool pricing.
        </p>
      </section>

      <section aria-label="Decision rules">
        <h2 id="decision-rules" className="display-lg scroll-mt-16">
          Decision rules: seats vs pooled API spend <SectionAnchor id="decision-rules" label="decision rules" />
        </h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">Named humans in apps → seats.</strong> Seats exist to give
            people a product (chat UI, Claude Code, Copilot in the IDE). A shared API key for a
            chat-tool team trades away the seat features you were buying — and usually violates the
            consumer side of the terms you&apos;re reading.
          </li>
          <li>
            <strong className="text-ink">Programs calling models → pooled spend.</strong> Bots,
            batch jobs, and internal tool backends don&apos;t need a seat; buy metered tokens and
            let one bill absorb everyone. The break-even panel in the{" "}
            <Link href="/cost-calculator/#break-even" className="u-draw text-teal-deep">
              calculators
            </Link>{" "}
            prices task volume against a flat rate.
          </li>
          <li>
            <strong className="text-ink">Uneven usage → mix seat classes, don&apos;t max them.</strong>{" "}
            The {usd(mixAnnual)}/mo example above is the pattern: the row explicitly allows it on
            Claude Team. Buying everyone the tier their loudest week needs is the classic team
            overspend.
          </li>
          <li>
            <strong className="text-ink">Know which wall you&apos;re buying.</strong> Both Claude
            Team seat rows state no per-seat overage figure (checked {std.accessed}), and the
            Standard row is defined against the consumer tier&apos;s caps — &ldquo;{std.notes
            .split(";")[0].trim().toLowerCase()}&rdquo; while the Pro row carries 5-hour session
            caps. On those rows the heavy month is a usage-limit question, not an invoice. On rows
            that publish metered excess — Claude Enterprise
            (&ldquo;{ent.overageRate}&rdquo; <Cite sku={ent} />), Copilot credits at{" "}
            {copilotBiz.overageRate?.split(";")[0].trim()}, Devin&apos;s &ldquo;extra usage bills
            at API pricing,&rdquo; Mistral&apos;s Vibe Team PAYG credits — a hungry teammate is a
            bill. Budget seats-only or seats-plus-usage-cap, deliberately.
          </li>
          <li>
            <strong className="text-ink">Compare per head, not per plan.</strong> A {usd(std.perSeatMonthly as number)}
            seat used daily for real work beats a $0 API wallet nobody remembers to fund; a seat
            nobody logs into is pure loss. If more than a third of your seats would sit idle, price
            a partial-seat setup (heavier staff seated, rest on pooled API or free tiers) before
            committing to annual billing.
          </li>
          <li>
            <strong className="text-ink">Annual seat rates are a headcount bet.</strong> The{" "}
            {usd(std.perSeatMonthly as number)} vs {usd(std.perSeatMonthlyAlt as number)} Claude delta is real only
            while the roster is stable — the seat calculator totals both terms side by side; read
            the lock-in checklist in{" "}
            <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
              monthly vs annual AI plans
            </Link>
            .
          </li>
        </ol>
        <div className="mt-4 rounded-xl border border-line bg-card p-5 text-sm leading-relaxed text-ink-soft">
          <p className="eyebrow">The cross-check</p>
          <p className="mt-1">
            To sanity-check a seat total against metered spend, divide the team&apos;s monthly
            finish-work volume by task: the site reference basket is{" "}
            {usd(BASELINE_PAYG_PER_TASK)}/task at 100k tokens (illustrative, defined in{" "}
            <Link
              href="/guides/effective-cost-per-task-explained/"
              className="u-draw text-teal-deep"
            >
              effective cost per task
            </Link>
            ). {usd(mixAnnual)}/mo equals ≈{Math.round(mixAnnual / BASELINE_PAYG_PER_TASK)} task-equivalents of
            metered work — if three people clearly produce less than that, the seats must be
            earning their keep on app access and admin, not volume.
          </p>
        </div>
      </section>

      <section aria-label="Where the data stops">
        <h2 id="data-limits" className="display-lg scroll-mt-16">
          Where the data stops <SectionAnchor id="data-limits" label="where the data stops" />
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">ChatGPT Business: no public per-seat dollar.</strong> The
            verified structure is per-seat limits plus a shared credit pool, and the row also notes
            Codex seats closed to new Business workspaces from Jun 24 2026 <Cite sku={biz} /> —
            structure yes, arithmetic no.
          </li>
          <li>
            <strong className="text-ink">Claude Team seat overage: not published.</strong> Both seat
            rows were checked against their source on {std.accessed}; no per-unit excess figure
            exists on the row, so heavy-seat months are a wall question, not a bill one, per
            current terms.
          </li>
          <li>
            <strong className="text-ink">Google seats aren&apos;t in the full price table.</strong>{" "}
            The closest Google row is the consumer AI&nbsp;Pro plan at {usd(googleProRow?.priceMonthly ?? 0)}/mo
            (accessed {googleProRow?.accessed}); we don&apos;t restate a consumer price as a seat
            price, so no Google entry appears in the seat calculator.
          </li>
        </ul>
        <p className="mt-3 text-sm">
          Every tracked seat SKU, with the full caveats, sits in the{" "}
          <Link href="/best/#for-teams" className="u-draw font-semibold text-teal-deep">
            For teams table on the offers page
          </Link>
          ; pick a SKU and a headcount in the{" "}
          <Link href="/cost-calculator/#seat-mode" className="u-draw font-semibold text-teal-deep">
            seat calculator
          </Link>
          .
        </p>
      </section>

      <section aria-label="Prices used in this guide">
        <h2 id="prices-used" className="display-lg scroll-mt-16">
          Prices used in this guide <SectionAnchor id="prices-used" label="prices used in this guide" />
        </h2>
        <div className="mt-2 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table min-w-[680px]">
            <caption className="sr-only">
              Every seat row cited in this guide, with its verified price string, evidence label,
              and access date.
            </caption>
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Published rate (verbatim)</th>
                <th scope="col">Evidence</th>
                <th scope="col">Accessed</th>
              </tr>
            </thead>
            <tbody>
              {usedSkus.map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="font-semibold">
                    <Link href={`/providers/${s.providerSlug}/`} className="u-draw text-teal-deep">
                      {s.provider} {s.plan}
                    </Link>
                  </th>
                  <td className="data text-[12.5px]">{s.listPrice}</td>
                  <td className="text-[12.5px]">{s.label}</td>
                  <td className="tabular whitespace-nowrap text-[12.5px] text-ink-mute">
                    {s.accessed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-ink-mute">
          Row sources are the provider pages linked from each provider&apos;s page; full price
          table snapshot {UNIVERSE.snapshot}.
        </p>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 id="faq" className="display-lg scroll-mt-16">
          FAQ <SectionAnchor id="faq" label="FAQ" />
        </h2>
        <div className="mt-2">
          <Faq id="seats" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link href="/guides/monthly-vs-annual-ai/" className="font-bold underline">
          Monthly vs annual AI plans
        </Link>{" "}
        ·{" "}
        <Link href="/best/#for-teams" className="font-bold underline">
          Team/seat listings
        </Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “AI seats for teams.” Universe snapshot ${UNIVERSE.snapshot}; prices verified per row. ${url} Re-verify at official terms before paying.`}
      />
      <ResearchSnapshot extra="Seat totals are list-price multiplication on dated rows — ours, not provider quotes. Re-check seat ranges and included usage before committing a roster." />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "AI seats for teams: when per-seat plans beat pooled API spend",
            description:
              "Seat math for managers with dated, tracked prices: mixed Claude Team seats, Copilot credit buckets, Devin's base fee, and seats-vs-API decision rules.",
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
              { "@type": "ListItem", position: 3, name: "AI seats for teams", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
