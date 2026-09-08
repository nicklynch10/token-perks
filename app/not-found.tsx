import Link from "next/link";

/**
 * Branded 404 (audit item: unbranded default). Renders inside the root
 * layout, so the header, footer, and snapshot line stay present; with
 * output: "export" this ships as /404.html for the CDN error page.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 sm:px-6">
      <p className="data text-xs uppercase tracking-[0.12em] text-ink-mute">Error 404</p>
      <h1 className="display-md">We don&rsquo;t have that page.</h1>
      <p className="max-w-2xl leading-relaxed text-ink-soft">
        The address you followed isn&rsquo;t part of Token Perks — it may be mistyped, or the page
        may have moved. Nothing is hidden behind it: every offer, route, and calculator we track
        lives at a stable address below.
      </p>
      <nav aria-label="Where to go next">
        <ul className="mt-2 space-y-2 text-sm font-semibold">
          <li>
            <Link href="/" className="u-draw inline-flex min-h-[44px] items-center text-teal-deep touch:min-h-[44px]">
              Home — the cost leaderboard and tracked offers
            </Link>
          </li>
          <li>
            <Link href="/best/" className="u-draw inline-flex min-h-[44px] items-center text-teal-deep touch:min-h-[44px]">
              Tracked offers — prices, caveats, renewals
            </Link>
          </li>
          <li>
            <Link href="/cost-calculator/" className="u-draw inline-flex min-h-[44px] items-center text-teal-deep touch:min-h-[44px]">
              Cost calculators — break-even, team seats, cost per task
            </Link>
          </li>
          <li>
            <Link href="/guides/" className="u-draw inline-flex min-h-[44px] items-center text-teal-deep touch:min-h-[44px]">
              Guides — buying, billing, and gifting AI access
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-sm text-ink-mute">
        Believe this page should exist? Corrections are logged append-only on the{" "}
        <Link href="/changes/" className="u-draw text-teal-deep">
          verification log
        </Link>
        .
      </p>
    </div>
  );
}
