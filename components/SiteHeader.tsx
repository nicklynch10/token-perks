import Link from "next/link";
import { SNAPSHOT_DATE } from "@/lib/site";
import PrimaryNav from "./PrimaryNav";

export default function SiteHeader({
  siteName,
  tagline,
}: {
  siteName: string;
  tagline: string;
}) {
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-tight" aria-label="Token Perks — home">
          <span className="font-display text-xl font-semibold tracking-tight">{siteName}</span>
          <span className="hidden text-xs text-ink-mute min-[420px]:block">{tagline}</span>
        </Link>
        <PrimaryNav />
        <span className="data inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-mute">
          Verified {SNAPSHOT_DATE}
        </span>
      </div>
    </header>
  );
}
