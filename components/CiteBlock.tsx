"use client";

import { useState } from "react";

export default function CiteBlock({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <section aria-label="Cite this page" className="colophon rounded-none p-0 pt-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
        Cite this page
      </h2>
      <blockquote className="mt-2 border-l-2 border-line-strong pl-3">{citation}</blockquote>
      <p className="mt-2">
        CC-BY-4.0 with attribution. Includes the snapshot date so readers know how fresh the
        numbers are.
      </p>
      <button
        type="button"
        onClick={copy}
        className="btn mt-3 inline-flex min-h-[40px] items-center rounded-lg bg-ink px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-teal-deep"
      >
        {copied ? "Copied" : "Copy citation"}
      </button>
    </section>
  );
}
