import Link from "next/link";
import ChartDownloadButton from "@/components/ChartDownloadButton";
import CrossoverStory from "@/components/CrossoverStory";
import SectionAnchor from "@/components/SectionAnchor";
import styles from "@/components/CrossoverSection.module.css";
import {
  ALLEGRETTO_ANNUAL_EFF,
  ALLEGRETTO_ANNUAL_UPFRONT,
  ALLEGRETTO_MONTHLY,
  ALLEGRETTO_YEARLY_AT_MONTHLY,
  ANNUAL_SAVING,
  CHART,
  CROSS_ANNUAL,
  CROSS_MONTHLY,
  DEFAULT_TASKS,
  PAYG_PER_TASK,
  X_TICKS,
  Y_TICKS,
  paygMonthly,
  xScale,
  yScale,
} from "@/lib/crossover";

/**
 * "Where flat beats metered" — the break-even scroll story (homepage).
 *
 * Server-rendered end-state: a static crossover chart, four step cards with
 * precomputed figures, and a ledger table. A small client island
 * (CrossoverStory) progressively enhances step 4 with a tasks slider and
 * scroll-driven emphasis. With JS disabled or reduced motion, the static
 * end-state below is the whole experience — nothing is hidden or moved.
 */
export default function CrossoverSection() {
  const { W, H, M } = CHART;
  const plotRight = W - M.right;
  const plotBottom = H - M.bottom;

  const paygX2 = xScale(CHART.X_MAX);
  const paygY2 = yScale(paygMonthly(CHART.X_MAX));
  const flatY = yScale(ALLEGRETTO_MONTHLY);
  const annualY = yScale(ALLEGRETTO_ANNUAL_EFF);
  const crossMx = xScale(CROSS_MONTHLY);
  const crossAx = xScale(CROSS_ANNUAL);
  const youX = xScale(DEFAULT_TASKS);
  const youDotY = yScale(paygMonthly(DEFAULT_TASKS));

  return (
    <section
      id="crossover"
      aria-labelledby="crossover-h"
      data-testid="crossover"
      className={`${styles.stage} mx-auto max-w-6xl px-4 pb-12 sm:px-6`}
    >
      <p className="eyebrow">Break-even, in one chart</p>
      <h2 id="crossover-h" className="display-lg mt-1">
        Where flat beats metered
        <SectionAnchor id="crossover-h" label="the crossover story" />
      </h2>
      <p className="lede mt-3 max-w-3xl">
        Metered billing climbs with every task; a flat plan holds its price. Scroll through the
        four steps to watch the two lines cross — first on monthly billing, then on annual.
      </p>
      <nav aria-label="Jump to a block" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="eyebrow mr-1">On this page</span>
        <a href="#chart" className="u-draw inline-flex min-h-[40px] items-center text-teal-deep touch:min-h-[44px]">Chart</a>
        <a href="#steps" className="u-draw inline-flex min-h-[40px] items-center text-teal-deep touch:min-h-[44px]">Four steps</a>
        <a href="#ledger" className="u-draw inline-flex min-h-[40px] items-center text-teal-deep touch:min-h-[44px]">Ledger table</a>
      </nav>

      <div className={`${styles.grid} mt-6`}>
        {/* Chart column: sticky instrument on desktop, static figure otherwise */}
        <div className={styles.chartCol}>
          <figure id="chart" className="card scroll-mt-16 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <ul className={styles.legend} aria-label="Chart legend">
              <li>
                <span className={styles.sw} aria-hidden="true" /> Metered · ${PAYG_PER_TASK.toFixed(2)}/task
              </li>
              <li>
                <span className={`${styles.sw} ${styles.swFlat}`} aria-hidden="true" /> Allegretto monthly · ${ALLEGRETTO_MONTHLY}
              </li>
                <li>
                  <span className={`${styles.sw} ${styles.swAnnual}`} aria-hidden="true" /> Allegretto annual · ≈${ALLEGRETTO_ANNUAL_EFF}/mo eff.
                </li>
              </ul>
              <ChartDownloadButton targetId="crossover-chart" filename="token-perks-crossover-chart.png" />
            </div>
            <svg
              id="crossover-chart"
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={`Line chart of monthly cost against tasks per month. Metered billing at $0.80 per task rises from $0 to $${paygMonthly(CHART.X_MAX).toFixed(0)} at ${CHART.X_MAX} tasks. The $39 monthly flat line crosses it at about 49 tasks per month; the $31 annual-effective line crosses at about 39 tasks per month.`}
              className="h-auto w-full"
            >
              {X_TICKS.map((t) => (
                <g key={t}>
                  <line
                    x1={xScale(t)}
                    x2={xScale(t)}
                    y1={M.top}
                    y2={plotBottom}
                    stroke="var(--color-line)"
                  />
                  <text
                    x={xScale(t)}
                    y={plotBottom + 18}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="var(--color-ink-mute)"
                    fontFamily="var(--font-mono)"
                  >
                    {t}
                  </text>
                </g>
              ))}
              {Y_TICKS.map((t) => (
                <g key={t}>
                  <line
                    x1={M.left}
                    x2={plotRight}
                    y1={yScale(t)}
                    y2={yScale(t)}
                    stroke="var(--color-line)"
                  />
                  <text
                    x={M.left - 8}
                    y={yScale(t) + 3.5}
                    textAnchor="end"
                    fontSize="10.5"
                    fill="var(--color-ink-mute)"
                    fontFamily="var(--font-mono)"
                  >
                    ${t}
                  </text>
                </g>
              ))}
              <text
                x={(W + M.left) / 2}
                y={H - 8}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-ink-soft)"
              >
                Tasks per month
              </text>
              <text
                x={16}
                y={(plotBottom + M.top) / 2}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-ink-soft)"
                transform={`rotate(-90 16 ${(plotBottom + M.top) / 2})`}
              >
                Cost per month ($)
              </text>

              {/* Annual-effective flat line (bottom layer) */}
              <g className={styles.layerAnnual}>
                <line
                  x1={M.left}
                  x2={plotRight}
                  y1={annualY}
                  y2={annualY}
                  stroke="var(--color-teal-deep)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <circle cx={crossAx} cy={annualY} r="5" fill="var(--color-teal-deep)" />
                <text x={crossAx + 9} y={annualY + 16} fontSize="11" fill="var(--color-ink-soft)" fontFamily="var(--font-mono)">
                  ≈39 tasks/mo
                </text>
              </g>

              {/* Monthly flat line */}
              <g className={styles.layerFlat}>
                <line
                  x1={M.left}
                  x2={plotRight}
                  y1={flatY}
                  y2={flatY}
                  stroke="var(--color-teal)"
                  strokeWidth="2"
                />
                <circle cx={crossMx} cy={flatY} r="5" fill="var(--color-teal)" />
                <text x={crossMx + 9} y={flatY - 9} fontSize="11" fill="var(--color-ink-soft)" fontFamily="var(--font-mono)">
                  ≈49 tasks/mo
                </text>
              </g>

              {/* Metered line */}
              <g className={styles.layerPayg}>
                <line
                  x1={M.left}
                  x2={paygX2}
                  y1={yScale(0)}
                  y2={paygY2}
                  stroke="var(--color-ink-soft)"
                  strokeWidth="2"
                />
              </g>

              {/* "You are here" marker — static at 120 tasks; the client
                  island moves it when the slider is dragged. */}
              <g id="crossover-you" aria-hidden="true">
                <line
                  id="crossover-you-line"
                  x1={youX}
                  x2={youX}
                  y1={M.top}
                  y2={plotBottom}
                  stroke="var(--color-ink-mute)"
                  strokeWidth="1.25"
                  strokeDasharray="3 3"
                />
                <circle id="crossover-you-dot" cx={youX} cy={youDotY} r="4.5" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.5" />
                <text id="crossover-you-label" x={youX} y={M.top - 5} textAnchor="middle" className={styles.markerLabel}>
                  {DEFAULT_TASKS} tasks/mo
                </text>
              </g>
            </svg>
            <figcaption className="mt-2 text-[12px] leading-relaxed text-ink-mute">
              Metered = tasks × ${PAYG_PER_TASK.toFixed(2)} reference (100k-token task). Crossings: $
              {ALLEGRETTO_MONTHLY} ÷ ${PAYG_PER_TASK.toFixed(2)} ≈ 49 tasks/mo; ≈$
              {ALLEGRETTO_ANNUAL_EFF} ÷ ${PAYG_PER_TASK.toFixed(2)} ≈ 39 tasks/mo. Prices verified
              Sep 6 2026; the arithmetic is ours. Full method in{" "}
              <Link href="/guides/effective-cost-per-task-explained/" className="u-draw">
                effective cost per task, explained
              </Link>
              .
            </figcaption>
          </figure>

          {/* Static data table: the chart's numbers in tabular form (SEO, agents, no-JS) */}
          <div id="ledger" className={`${styles.tableWrap} card mt-4 scroll-mt-16`}>
            <table className="ledger text-left text-[13px]">
              <caption className="px-4 pb-1 pt-3 text-left text-[12px] text-ink-mute">
                Monthly cost at three volumes — Allegretto monthly vs metered reference.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-2">Tasks/mo</th>
                  <th scope="col" className="px-4 py-2 text-right">Metered @ $0.80</th>
                  <th scope="col" className="px-4 py-2 text-right">Allegretto $39</th>
                  <th scope="col" className="px-4 py-2 text-right">Lower</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="data px-4 py-2 font-normal">24</th>
                  <td className="data px-4 py-2 text-right">$19.20</td>
                  <td className="data px-4 py-2 text-right">$39</td>
                  <td className="px-4 py-2 text-right">Metered</td>
                </tr>
                <tr>
                  <th scope="row" className="data px-4 py-2 font-normal">49</th>
                  <td className="data px-4 py-2 text-right">$39.20</td>
                  <td className="data px-4 py-2 text-right">$39</td>
                  <td className="px-4 py-2 text-right">≈ Tie</td>
                </tr>
                <tr>
                  <th scope="row" className="data px-4 py-2 font-normal">120</th>
                  <td className="data px-4 py-2 text-right">$96</td>
                  <td className="data px-4 py-2 text-right">$39</td>
                  <td className="px-4 py-2 text-right">Flat (−$57)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Steps column */}
        <ol id="steps" className={`${styles.steps} scroll-mt-16`} aria-label="Break-even story in four steps">
          <li className={`${styles.step} crossover-step`} data-step="1">
            <p className={styles.stepNum}>Step 1 · Metered climbs</p>
            <p className={styles.stepTitle}>Every task adds about $0.80.</p>
            <p className={styles.stepText}>
              At the $0.80/task reference, {DEFAULT_TASKS} tasks run ≈$
              {paygMonthly(DEFAULT_TASKS).toFixed(0)}/mo — the rising line. Double the tasks,
              double the bill.
            </p>
          </li>
          <li className={`${styles.step} crossover-step`} data-step="2">
            <p className={styles.stepNum}>Step 2 · Flat holds at $39</p>
            <p className={styles.stepTitle}>Allegretto costs $39 at 10 tasks or 150.</p>
            <p className={styles.stepText}>
              The lines cross at ≈49 tasks/mo ($39 ÷ $0.80). Below it, metered billing or a free
              route costs less — flat only wins past the crossing.
            </p>
          </li>
          <li className={`${styles.step} crossover-step`} data-step="3">
            <p className={styles.stepNum}>Step 3 · Annual lowers the crossing</p>
            <p className={styles.stepTitle}>≈$31/mo effective moves it to ≈39 tasks.</p>
            <p className={styles.stepText}>
              Annual billing is ≈${ALLEGRETTO_ANNUAL_UPFRONT} upfront vs $
              {ALLEGRETTO_YEARLY_AT_MONTHLY} across a year — ≈${ANNUAL_SAVING} less. Worth it only
              if volume holds all year;{" "}
              <Link href="/guides/monthly-vs-annual-ai/" className="u-draw text-teal-deep">
                the refund terms decide
              </Link>
              .
            </p>
          </li>
          <li className={`${styles.step} crossover-step`} data-step="4">
            <p className={styles.stepNum}>Step 4 · Your turn</p>
            <p className={styles.stepTitle}>Place yourself on the line.</p>
            <CrossoverStory />
          </li>
        </ol>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Allegretto figures from the{" "}
        <Link href="/best/kimi-k3-core/" className="u-draw text-teal-deep">
          Kimi K3 core membership
        </Link>{" "}
        snapshot (verified Sep 6 2026). For tokens-per-task and team-size math, use the{" "}
        <Link href="/guides/effective-cost-per-task-explained/" className="u-draw text-teal-deep">
          full calculator
        </Link>
        .
      </p>
      <p className="mt-3">
        <Link
          href="/best/kimi-k3-core/#economics"
          className="inline-flex min-h-[44px] items-center rounded-full bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-deep"
        >
          See the matching tier — Kimi K3 plans →
        </Link>
      </p>
    </section>
  );
}
