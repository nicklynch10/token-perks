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
  title: "Batch and Caching, Explained (Verified Sep 2026)",
  description:
    "How API prices come down: the -50% batch family, DeepSeek's exact off-peak hours, prompt-caching write/read economics, and the >200k-token repricing traps. Verified Sep 7 2026.",
  alternates: { canonical: canonical("/guides/batch-and-caching-explained/") },
  ...social({
    title: "Batch and Caching, Explained (Verified Sep 2026)",
    description:
      "Batch -50%, off-peak windows, cache write/read economics, and long-context repricing traps — every figure from the Sep 7 2026 snapshot.",
    path: "/guides/batch-and-caching-explained/",
    type: "article",
  }),
};

const FAQ = [
  {
    q: "What is a batch discount?",
    a: "A published percentage off list price for work you submit to the provider's batch endpoint — an asynchronous lane — instead of sending it through real-time calls. The common rate is exactly -50%: OpenAI publishes it across most model rows, and Anthropic (Fable 5.1), Google (Gemini 2.5 Pro), and Mistral Large carry it too. The completion window is the provider's to set; check their batch docs. Computed batch prices per model are in the Batch column of the leaderboard.",
  },
  {
    q: "Does the batch discount apply to real-time requests?",
    a: "No. The published batch modifier applies to the batch endpoint. Real-time requests pay list price unless another mechanism (caching, an off-peak window, a promo) applies. That is the trade: batch is for work with no human waiting on the other side.",
  },
  {
    q: "What is prompt caching and what does it cost?",
    a: "You pay to write a reusable prompt prefix to cache, then discounted rates to read it back. Anthropic and the newer OpenAI models charge 1.25x the input price for a standard write (2x for Anthropic's 1-hour option) and read at 0.1x input — 0.025x on Fable 5.1. Groq charges nothing to write and takes 50% off cached input. DeepSeek and Moonshot discount cache-hit input automatically, with no write fee shown. Several providers also set a minimum prompt size to be cacheable at all, from 256 tokens (Kimi) to 4,096 (some Claude and Gemini models).",
  },
  {
    q: "Which providers publish cache TTLs?",
    a: "Anthropic: 5 minutes by default, refreshed free on use, with a 1-hour option at extra cost. OpenAI: 30 minutes, refreshed on reuse, stated for the gpt-5.6 trio and gpt-6-astra — not stated per model on older rows. Groq: 2 hours without use. Alibaba Cloud Model Studio: 5 minutes, resets on hit. Not published: DeepSeek (docs note the cache is usually cleared within hours to days), Moonshot (system-managed), and Google's per-model cache lifetime in our snapshot.",
  },
  {
    q: "What is the 200k-token surcharge trap?",
    a: "Google and xAI both publish two price brackets split at a 200k-token prompt size, and the higher bracket bills the whole request — not just the tokens above the line. On grok-4.3, a 200,001-token prompt pays $2.50/M on every input token instead of $1.25/M: double the input line for one token over. Check which bracket your long-context agent actually lands in before pricing it.",
  },
  {
    q: "Can batch and caching discounts combine?",
    a: "On Anthropic, yes in principle: the caching docs state the multipliers 'stack with other pricing modifiers such as the Batch API discount.' For other providers our snapshot does not record a stacking policy — treat combination as unpublished until confirmed in their docs.",
  },
  {
    q: "How fresh are these numbers?",
    a: "Every figure comes from the Sep 7 2026 snapshot of official pricing and docs pages, cited per row. Re-check the provider page before building on any of them — Google already shows a scheduled cached-rate increase for Gemini 3.8 Flash on Jan 1, 2027.",
  },
];

export default function GuidePage() {
  const url = canonical("/guides/batch-and-caching-explained/");
  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-8 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" },
          { label: "Batch and caching" },
        ]}
      />
      <header>
        <h1 className="display-md">Batch and caching, explained</h1>
        <p className="mt-3 text-lg text-ink-soft">
          <strong className="text-ink">
            Short answer: list prices are negotiable only by changing when or how you call.
          </strong>{" "}
          Three mechanisms do that: a <strong>batch discount</strong> — almost always -50% — for
          asynchronous work; <strong>off-peak windows</strong> on the rare providers that publish
          them; and <strong>prompt caching</strong>, which reads repeated input at 50-97.5% off in
          exchange for a write fee. All figures below come from official pages in the{" "}
          <strong className="tabular">Sep 7 2026</strong> snapshot, cited per table.
        </p>
      </header>

      <section aria-label="First, what is a task">
        <h2 className="display-lg">First: what &ldquo;task&rdquo; means here</h2>
        <p className="mt-2 text-ink-soft">
          Throughout this site, a <strong>task</strong> is one finished piece of work — a draft, a
          summary, a fix. For API math we size a task at roughly 100k tokens of input + output
          combined; the reference pay-as-you-go blend is $8 per million, so a task costs about{" "}
          <strong className="tabular text-ink">$0.80</strong>. The full definition and the
          break-even logic are in{" "}
          <Link href="/guides/effective-cost-per-task-explained/" className="font-bold underline">
            effective cost per task, explained
          </Link>
          . The discounts in this guide work by moving that $0.80 — not by changing what the task
          is.
        </p>
      </section>

      <section aria-label="Batch discounts">
        <h2 className="display-lg">Batch discounts: the -50% family</h2>
        <p className="mt-2 text-ink-soft">
          A batch discount is a published percentage off list price for sending work to the
          provider&apos;s asynchronous batch endpoint instead of real-time chat completions. You
          trade immediacy for price: results come back on the provider&apos;s window, not the
          caller&apos;s. In our Sep 7 snapshot, every provider that publishes a batch modifier
          publishes <strong>-50%</strong> — across 10 OpenAI model rows (gpt-4.1 family through
          gpt-6-astra and the o-series), Anthropic&apos;s Fable 5.1, Google&apos;s Gemini 2.5 Pro,
          and Mistral Large. Gemini 3.8 Flash is the one approximate row: Google&apos;s wording is
          &ldquo;batch/flex about half&rdquo; (priority is the opposite trade, about 1.8x).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Models with a published batch discount, list in/out rates, and computed batch blend
              per million tokens
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col" className="num">
                  List in / out $/M
                </th>
                <th scope="col" className="num">
                  Batch blend $/M
                </th>
                <th scope="col">Published batch rate</th>
                <th scope="col">Source (accessed 2026-09-07)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">OpenAI gpt-5.6-luna</th>
                <td className="num">$0.20 / $1.20</td>
                <td className="num">$0.23</td>
                <td>-50%</td>
                <td className="text-xs">developers.openai.com API pricing table</td>
              </tr>
              <tr>
                <th scope="row">OpenAI gpt-5.6-terra</th>
                <td className="num">$2.00 / $12.00</td>
                <td className="num">$2.25</td>
                <td>-50%</td>
                <td className="text-xs">developers.openai.com API pricing table</td>
              </tr>
              <tr>
                <th scope="row">OpenAI gpt-5.6-sol</th>
                <td className="num">$4.00 / $20.00</td>
                <td className="num">$4.00</td>
                <td>-50%</td>
                <td className="text-xs">developers.openai.com API pricing table</td>
              </tr>
              <tr>
                <th scope="row">OpenAI gpt-6-astra</th>
                <td className="num">$10.00 / $50.00</td>
                <td className="num">$10.00</td>
                <td>-50%</td>
                <td className="text-xs">developers.openai.com API pricing table</td>
              </tr>
              <tr>
                <th scope="row">OpenAI o3</th>
                <td className="num">$2.00 / $8.00</td>
                <td className="num">$1.75</td>
                <td>-50%</td>
                <td className="text-xs">developers.openai.com API pricing table</td>
              </tr>
              <tr>
                <th scope="row">Anthropic Fable 5.1</th>
                <td className="num">$10.00 / $50.00</td>
                <td className="num">$10.00</td>
                <td>-50%</td>
                <td className="text-xs">claude.com/pricing</td>
              </tr>
              <tr>
                <th scope="row">Google Gemini 2.5 Pro</th>
                <td className="num">$1.25 / $10.00</td>
                <td className="num">$1.72</td>
                <td>$0.625 / $5.00 — both halved</td>
                <td className="text-xs">ai.google.dev/gemini-api/docs/pricing</td>
              </tr>
              <tr>
                <th scope="row">Google Gemini 3.8 Flash</th>
                <td className="num">$0.75 / $3.75</td>
                <td className="num">~$0.75</td>
                <td>&ldquo;batch/flex about half&rdquo; (approximate wording)</td>
                <td className="text-xs">ai.google.dev/gemini-api/docs/pricing</td>
              </tr>
              <tr>
                <th scope="row">Mistral Large</th>
                <td className="num">$0.50 / $1.50</td>
                <td className="num">$0.38</td>
                <td>-50% (&ldquo;Batch work reduces price by 50%&rdquo;)</td>
                <td className="text-xs">mistral.ai/pricing</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  Batch blend = our blended $/M — (3 x input + output) / 4 — x (1 - published
                  discount). The blend is Token Perks arithmetic, not a provider figure. The full{" "}
                  <Link href="/" className="font-bold underline">
                    per-row Batch column on the leaderboard
                  </Link>{" "}
                  is computed the same way from the same dated rows.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Batch pays when nobody is waiting: embeddings backfills, weekly summarization, eval
          suites, overnight migrations. It is the wrong tool for anything interactive.
        </p>
      </section>

      <section aria-label="Off-peak windows">
        <h2 className="display-lg">Off-peak windows: exact hours, rare providers</h2>
        <p className="mt-2 text-ink-soft">
          In our Sep 7 snapshot,{" "}
          <strong>
            DeepSeek is the only token-priced API provider with a complete published peak/off-peak
            schedule
          </strong>{" "}
          — and it is precise: peak is 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday; all
          other hours are off-peak; off-peak rates are exactly half of peak
          (api-docs.deepseek.com/quick_start/pricing/, accessed 2026-09-07). Alibaba
          Cloud&apos;s Hong Kong Model Studio table adds region-specific night discounts at
          22:00-08:00 UTC+8 (alibabacloud.com Model Studio pricing docs, accessed 2026-09-07).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              DeepSeek peak and off-peak rates per million tokens for v4-flash and v4-pro
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col" className="num">
                  Input peak / off-peak
                </th>
                <th scope="col" className="num">
                  Output peak / off-peak
                </th>
                <th scope="col" className="num">
                  Cache-hit input off-peak
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">deepseek-v4-flash</th>
                <td className="num">$0.44 / $0.22</td>
                <td className="num">$1.32 / $0.66</td>
                <td className="num">$0.007</td>
              </tr>
              <tr>
                <th scope="row">deepseek-v4-pro</th>
                <td className="num">$1.32 / $0.66</td>
                <td className="num">$3.96 / $1.98</td>
                <td className="num">$0.022</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  All per 1M tokens; peak cache-hit input is double the off-peak figures shown
                  ($0.014 / $0.044). Source: api-docs.deepseek.com/quick_start/pricing/, accessed
                  2026-09-07.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          The compounding effect is easy to miss: on v4-flash, an off-peak request that also hits
          cache pays <strong className="tabular">$0.007/M on input against $0.44 at a peak
          miss</strong> — about 98% off the same tokens at the worst possible time. Scheduled agent
          work that can wait until off-peak should; work that can&apos;t should at least keep its
          prefix stable so it still hits cache.
        </p>
      </section>

      <section aria-label="Prompt caching economics">
        <h2 className="display-lg">Prompt caching: the write fee is the whole question</h2>
        <p className="mt-2 text-ink-soft">
          Caching reuses the prefix of a repeated prompt — system instructions, retrieved
          documents, a long file you re-ask about. Per-row terms, all accessed 2026-09-07:
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Prompt-caching terms by provider: write fee, read discount, TTL, and minimum
              cacheable prompt
            </caption>
            <thead>
              <tr>
                <th scope="col">Provider / model</th>
                <th scope="col">Write fee</th>
                <th scope="col">Read price</th>
                <th scope="col">TTL</th>
                <th scope="col">Min prompt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Anthropic — Sonnet 5, Opus 5, Haiku 4.5</th>
                <td>1.25x input (5m) / 2x (1h)</td>
                <td>0.1x input (90% off)</td>
                <td>5m default, free refresh on use; 1h option</td>
                <td className="num">1,024-4,096 tok</td>
              </tr>
              <tr>
                <th scope="row">Anthropic — Fable 5.1</th>
                <td>1.25x (5m) / 2x (1h)</td>
                <td>0.025x input (97.5% off)</td>
                <td>5m default; 1h option</td>
                <td className="num">512 tok</td>
              </tr>
              <tr>
                <th scope="row">OpenAI — gpt-5.6 trio, gpt-6-astra</th>
                <td>1.25x input</td>
                <td>0.1x input (90% off)</td>
                <td>30m, refreshed on reuse</td>
                <td className="num">1,024 tok</td>
              </tr>
              <tr>
                <th scope="row">OpenAI — gpt-5.5 / 5.2 / 5-mini</th>
                <td>not published (no write charge shown)</td>
                <td>90% off cached input</td>
                <td>not published (30m-class typical)</td>
                <td className="num">2,048 tok</td>
              </tr>
              <tr>
                <th scope="row">OpenAI — gpt-4.1 family / o3</th>
                <td>not published</td>
                <td>75% off (o1: 50%)</td>
                <td>not published</td>
                <td className="num">2,048 tok</td>
              </tr>
              <tr>
                <th scope="row">Moonshot — kimi-k3 / K2.7 Code</th>
                <td>not shown (hit/miss rates only)</td>
                <td>$0.30 vs $3.00 miss (K3); $0.19 vs $0.95 (K2.7)</td>
                <td>not published (system-managed)</td>
                <td className="num">256 tok</td>
              </tr>
              <tr>
                <th scope="row">DeepSeek — v4 models</th>
                <td>none shown (automatic)</td>
                <td>$0.007-0.014/M vs $0.22-0.44 miss</td>
                <td>not published (docs: cleared within hours-days)</td>
                <td className="num">not published</td>
              </tr>
              <tr>
                <th scope="row">Google — Gemini 2.5 Pro / 3.1 Pro Preview</th>
                <td>not shown (cached rate listed per model)</td>
                <td>$0.125/M (2.5 Pro, up to 200k); $0.20/M (3.1 Pro, up to 200k)</td>
                <td>not published in snapshot</td>
                <td className="num">2,048 / 4,096 tok</td>
              </tr>
              <tr>
                <th scope="row">Groq — API (console list)</th>
                <td>none (&ldquo;no additional cost&rdquo;)</td>
                <td>50% off cached input</td>
                <td>2 hours without use</td>
                <td className="num">128-1,024 tok</td>
              </tr>
              <tr>
                <th scope="row">Alibaba Cloud Model Studio (Qwen)</th>
                <td>125% of input (explicit) / 100% (implicit)</td>
                <td>10% of input, explicit tier (90% off)</td>
                <td>5m, resets on hit (explicit)</td>
                <td className="num">1,024 tok</td>
              </tr>
              <tr>
                <th scope="row">MiniMax — M2.7</th>
                <td>$0.375/M</td>
                <td>$0.06/M vs $0.30 input (no % stated)</td>
                <td>not published</td>
                <td className="num">not published</td>
              </tr>
              <tr>
                <th scope="row">Mistral — Large</th>
                <td>not published</td>
                <td>up to 90% off repeated input</td>
                <td>not published</td>
                <td className="num">not published</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  Sources: platform.claude.com prompt-caching docs; developers.openai.com API
                  pricing; platform.kimi.ai/docs/pricing; api-docs.deepseek.com;
                  ai.google.dev/gemini-api/docs/pricing; console.groq.com/docs/prompt-caching;
                  alibabacloud.com Model Studio docs; platform.minimax.io; mistral.ai/pricing. All
                  accessed 2026-09-07. Where the official page states no figure, the cell says so.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-ink-soft">
          The break-even intuition, worked once so you can redo it with your own mix. On Sonnet 5
          (input $2/M, 5-minute cache write $2.50/M, cache read $0.20/M), a 10k-token prefix costs{" "}
          <strong className="tabular">$0.025</strong> to write and{" "}
          <strong className="tabular">$0.002</strong> to read on each hit; uncached the same 10k
          tokens cost <strong className="tabular">$0.02</strong> every call. The write premium
          (0.25x base) is smaller than one hit&apos;s saving (0.9x base), so{" "}
          <strong>a single cache read inside the TTL already pays for the write</strong> — two for
          the 1-hour tier. The question is almost never &ldquo;how many repeats&rdquo;; it is
          &ldquo;does it repeat within 5 minutes at all.&rdquo; High-frequency agents reuse
          prefixes well inside the window; occasional callers pay the premium for nothing. This is
          Token Perks arithmetic on provider-published rates, not a provider figure.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Two caveats the docs themselves make load-bearing. First, minimums are real: under the
          minimum prompt size nothing caches, and Anthropic notes no error is returned — you only
          see it in the usage fields. Second, cache reads discount <em>input</em> only. Output
          tokens never get cheaper, so output-heavy work barely moves.
        </p>
      </section>

      <section aria-label="Long-context repricing">
        <h2 className="display-lg">The &gt;200k repricing trap: the surcharge covers everything</h2>
        <p className="mt-2 text-ink-soft">
          Google and xAI both price long-context requests in two brackets split at a 200k-token
          prompt size — and crossing the line reprices the <strong>whole request</strong>, not just
          the overflow. From the same Sep 7 sources:
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line-strong">
          <table className="spec-table">
            <caption className="sr-only">
              Two-bracket pricing at the 200k prompt-token line for Google and xAI models
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col" className="num">
                  In / out up to 200k
                </th>
                <th scope="col" className="num">
                  In / out above 200k
                </th>
                <th scope="col" className="num">
                  Cached in, both brackets
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Google Gemini 2.5 Pro</th>
                <td className="num">$1.25 / $10.00</td>
                <td className="num">$2.50 / $15.00</td>
                <td className="num">$0.125 / $0.25</td>
              </tr>
              <tr>
                <th scope="row">Google Gemini 3.1 Pro Preview</th>
                <td className="num">$2.00 / $12.00</td>
                <td className="num">$4.00 / $18.00</td>
                <td className="num">$0.20 (above 200k: no cached rate published)</td>
              </tr>
              <tr>
                <th scope="row">xAI grok-4.6</th>
                <td className="num">$2.00 / $6.00</td>
                <td className="num">$4.00 / $12.00</td>
                <td className="num">$0.50 / $1.00</td>
              </tr>
              <tr>
                <th scope="row">xAI grok-4.5</th>
                <td className="num">$2.00 / $6.00</td>
                <td className="num">$4.00 / $12.00</td>
                <td className="num">$0.30 / $0.60</td>
              </tr>
              <tr>
                <th scope="row">xAI grok-4.3</th>
                <td className="num">$1.25 / $2.50</td>
                <td className="num">$2.50 / $5.00</td>
                <td className="num">$0.20 / $0.40</td>
              </tr>
              <tr>
                <th scope="row">xAI grok-build-0.1 (coding)</th>
                <td className="num">$1.00 / $2.00</td>
                <td className="num">$2.00 / $4.00</td>
                <td className="num">$0.20 / $0.40</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  All per 1M tokens. xAI&apos;s docs state a prompt over the threshold bills the
                  whole request at the higher rate; Google&apos;s table prices the above-200k
                  bracket as a whole. Sources: ai.google.dev/gemini-api/docs/pricing;
                  docs.x.ai/docs/models; accessed 2026-09-07.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          The practical rules: budget your agent&apos;s context against the bracket, not the
          model&apos;s maximum window; trim retrieved-document blocks to stay under 200k on Google
          and xAI; and note the brackets are provider-specific — DeepSeek and Moonshot price
          million-token contexts in the Sep 7 snapshot without a published 200k surcharge.
        </p>
      </section>

      <section aria-label="What is not published">
        <h2 className="display-lg">What is not published</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>
            Cache TTLs for DeepSeek, Moonshot, older OpenAI rows, and MiniMax — checked, no figure
            on the pricing pages (Moonshot is system-managed with no TTL control; DeepSeek&apos;s
            docs say the cache is usually cleared within hours to days).
          </li>
          <li>
            Batch completion windows on the pricing pages — the discount is published; the
            turnaround lives in batch-specific docs.
          </li>
          <li>
            Any published off-peak schedule at OpenAI, Anthropic, Google, xAI, Moonshot, Groq, or
            Mistral in the Sep 7 pass.
          </li>
          <li>
            Batch-plus-caching stacking policy outside Anthropic&apos;s own docs statement.
          </li>
          <li>
            One dated drift to watch: Gemini 3.8 Flash&apos;s cached input rises from $0.075/M to
            $0.15/M on Jan 1, 2027, per Google&apos;s table.
          </li>
        </ul>
      </section>

      <section aria-label="Which lever, when">
        <h2 className="display-lg">Which lever, when</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>
            <strong>Nobody waiting?</strong> Batch: a -50% modifier is published on 14 tracked
            rows (one of them as &ldquo;about half&rdquo;).
          </li>
          <li>
            <strong>Same long prefix every call?</strong> Cache it — one hit inside the TTL already
            pays the write fee where a write fee exists; DeepSeek and Groq have none.
          </li>
          <li>
            <strong>Schedulable work?</strong> Off-peak where published: DeepSeek&apos;s Mon-Fri
            01:00-04:00 / 06:00-10:00 UTC peak window is exactly 2x the rest of the week.
          </li>
          <li>
            <strong>Context over 200k on Google or xAI?</strong> Price the upper bracket first —
            the surcharge hits the whole request.
          </li>
        </ul>
      </section>

      <section aria-label="Frequently asked questions">
        <h2 className="display-lg">FAQ</h2>
        <div className="mt-2">
          <Faq id="bc" items={FAQ} />
        </div>
      </section>

      <p className="text-sm text-ink-soft">
        Next:{" "}
        <Link
          href="/guides/effective-cost-per-task-explained/"
          className="font-bold underline"
        >
          Effective cost per task, explained
        </Link>{" "}
        · Compare discounted rates against live list prices on the{" "}
        <Link href="/" className="font-bold underline">
          leaderboard
        </Link>
      </p>

      <CiteBlock
        citation={`Token Perks. “Batch and caching, explained.” Research snapshot Sep 7 2026. ${url}`}
      />
      <ResearchSnapshot />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Batch and caching discounts on AI APIs, explained",
            description:
              "The -50% batch family, DeepSeek's exact off-peak hours, prompt-caching write/read economics, and the >200k-token repricing traps — every figure cited to Sep 7 2026 official pages.",
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
              { "@type": "ListItem", position: 3, name: "Batch and caching", item: url },
            ],
          },
        ]}
      />
    </div>
  );
}
