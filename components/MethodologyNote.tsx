import Link from "next/link";

export default function MethodologyNote() {
  return (
    <section aria-label="Methodology summary" className="card p-5 sm:p-6">
      <p className="eyebrow eyebrow-ink">Methodology v0.1</p>
      <h2 className="display-sm mt-2">How we verify</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
        <li>Snapshots, not live prices — every figure carries its verification date.</li>
        <li>
          Median-window aggregation: per-task costs use the median over a trailing 7-day example
          window at 100k tokens/task.
        </li>
        <li>Cadence: full re-verification weekly; active promos checked daily.</li>
        <li>Official sources only; independent benchmarks are linked, never republished.</li>
      </ul>
      <p className="mt-3 text-sm">
        <Link href="/methodology/" className="u-draw text-teal-deep">
          Read the full methodology
        </Link>{" "}
        ·{" "}
        <Link href="/changes/" className="u-draw text-teal-deep">
          Verification log
        </Link>
      </p>
    </section>
  );
}
