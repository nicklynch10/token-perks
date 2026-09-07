import Link from "next/link";
import { AFFILIATE_NOTICE, AFFILIATE_V0_STATE, SNAPSHOT_LINE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-8 text-sm text-ink-soft sm:px-6">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
          <Link className="min-h-[44px] content-center hover:underline" href="/">
            Home
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/best/">
            Offers
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/providers/">
            Providers
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/guides/">
            Guides
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/methodology/">
            Methodology v2
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/changes/">
            Verification log
          </Link>
          <Link className="min-h-[44px] content-center hover:underline" href="/how-we-make-money/">
            How we make money
          </Link>
        </nav>
        <p>
          {AFFILIATE_V0_STATE} {AFFILIATE_NOTICE}{" "}
          <Link className="font-semibold underline" href="/how-we-make-money/">
            See how we make money.
          </Link>
        </p>
        <p>
          Machine feeds:{" "}
          <a className="font-semibold underline" href="/llms.txt">
            llms.txt
          </a>{" "}
          ·{" "}
          <a className="font-semibold underline" href="/api/offers.json">
            offers.json
          </a>{" "}
          ·{" "}
          <a className="font-semibold underline" href="/api/leaderboard.json">
            leaderboard.json
          </a>{" "}
          ·{" "}
          <a className="font-semibold underline" href="/feed.xml">
            feed.xml
          </a>{" "}
          ·{" "}
          <a className="font-semibold underline" href="/llms-full.txt">
            llms-full.txt
          </a>
        </p>
        <p>
          Independent model benchmarks we respect (external, not affiliated):{" "}
          <a
            className="font-semibold underline"
            href="https://artificialanalysis.ai"
            rel="noopener"
          >
            Artificial Analysis
          </a>
          . We link rather than republish their numbers.
        </p>
        <p className="text-ink-mute">{SNAPSHOT_LINE}</p>
        <p className="text-ink-mute">
          Token Perks publishes point-in-time research snapshots, not live checkout data. Never
          enter credentials on any page here — we will never ask for them.
        </p>
      </div>
    </footer>
  );
}
