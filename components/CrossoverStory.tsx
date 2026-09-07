"use client";

import { useEffect, useState } from "react";
import {
  ALLEGRETTO_MONTHLY,
  DEFAULT_TASKS,
  PAYG_PER_TASK,
  TASKS_MAX,
  TASKS_MIN,
  TASKS_STEP,
  fmtMoney,
  paygMonthly,
  xScale,
  yScale,
} from "@/lib/crossover";

/**
 * Client island for the crossover story (step 4 + scroll emphasis).
 *
 * Progressive enhancement only: server output is the static end-state
 * (marker at 120 tasks, uniform steps, static verdict). After mount the
 * island adds the slider, moves the chart marker, and highlights the step
 * in view — skipped entirely under prefers-reduced-motion, where the
 * static end-state stands.
 */
export default function CrossoverStory() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);

  // Mount flag (reveals the slider) + scrollspy setup. Runs once.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      return;
    }
    const stage = document.getElementById("crossover");
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".crossover-step"));
    if (!stage || steps.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            stage.dataset.activeStep = (e.target as HTMLElement).dataset.step ?? "";
          }
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function moveMarker(next: number) {
    const x = xScale(next);
    document.getElementById("crossover-you-line")?.setAttribute("x1", String(x));
    document.getElementById("crossover-you-line")?.setAttribute("x2", String(x));
    const dot = document.getElementById("crossover-you-dot");
    dot?.setAttribute("cx", String(x));
    dot?.setAttribute("cy", String(yScale(paygMonthly(next))));
    const label = document.getElementById("crossover-you-label");
    if (label) {
      label.setAttribute("x", String(x));
      label.textContent = `${next} tasks/mo`;
    }
  }

  function onTasks(next: number) {
    setTasks(next);
    moveMarker(next);
  }

  const payg = paygMonthly(tasks);
  const diff = payg - ALLEGRETTO_MONTHLY;
  const verdict =
    Math.abs(diff) < 1
      ? `About tied at ${tasks} tasks/mo — metered ≈${fmtMoney(payg)}/mo vs $${ALLEGRETTO_MONTHLY} flat.`
      : diff < 0
        ? `At ${tasks} tasks/mo, metered costs less — ≈${fmtMoney(payg)}/mo vs $${ALLEGRETTO_MONTHLY} flat (saves ≈${fmtMoney(-diff)}).`
        : `At ${tasks} tasks/mo, flat costs less — $${ALLEGRETTO_MONTHLY}/mo vs ≈${fmtMoney(payg)}/mo metered (saves ≈${fmtMoney(diff)}).`;

  if (!mounted) {
    // Static end-state: also what no-JS visitors and crawlers see. The
    // min-height reserves the slider block's space so hydration never shifts
    // the layout (matches the mounted branch below).
    return (
      <p className="data mt-2 min-h-[172px] text-sm text-ink">
        At {DEFAULT_TASKS} tasks/mo: metered ≈{fmtMoney(paygMonthly(DEFAULT_TASKS))}/mo vs $
        {ALLEGRETTO_MONTHLY} flat — flat costs less by ≈
        {fmtMoney(paygMonthly(DEFAULT_TASKS) - ALLEGRETTO_MONTHLY)}.
      </p>
    );
  }

  return (
    <div className="mt-3 min-h-[172px]">
      <label htmlFor="crossover-tasks" className="flex justify-between text-sm font-semibold">
        <span>Tasks per month</span>
        <span className="data">{tasks.toLocaleString("en-US")}</span>
      </label>
      <input
        id="crossover-tasks"
        type="range"
        min={TASKS_MIN}
        max={TASKS_MAX}
        step={TASKS_STEP}
        value={tasks}
        onChange={(e) => onTasks(Number(e.target.value))}
        className="mt-2 min-h-[44px] w-full accent-teal"
        aria-describedby="crossover-verdict"
      />
      <p id="crossover-verdict" aria-live="polite" className="data mt-1 text-sm text-ink">
        {verdict}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-ink-mute">
        Metered at ${PAYG_PER_TASK.toFixed(2)}/task reference vs Allegretto ${ALLEGRETTO_MONTHLY}
        /mo. Annual (≈$31/mo eff.) would cross earlier, at ≈39 tasks.
      </p>
    </div>
  );
}
