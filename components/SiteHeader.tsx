import Link from "next/link";
import { SNAPSHOT_DATE } from "@/lib/site";

export default function SiteHeader({
  siteName,
  tagline,
}: {
  siteName: string;
  tagline: string;
}) {
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-semibold tracking-tight">{siteName}</span>
          <span className="text-xs text-ink-mute">{tagline}</span>
        </Link>
        <nav aria-label="Primary" className="ml-auto flex items-center gap-1 text-sm font-semibold">
          <Link className="rounded-lg px-3 py-2.5 hover:bg-paper" href="/">
            Home
          </Link>
          <Link className="rounded-lg px-3 py-2.5 hover:bg-paper" href="/best/">
            Offers
          </Link>
          <Link className="rounded-lg px-3 py-2.5 hover:bg-paper" href="/guides/">
            Guides
          </Link>
        </nav>
        <span className="data inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-mute">
          Verified {SNAPSHOT_DATE}
        </span>
      </div>
    </header>
  );
}
