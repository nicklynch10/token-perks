import intelJson from "@/content/intelligence/2026-09-07.json";

export const AA_ACCESSED = "2026-09-07";
export const AA_INDEX_VERSION = "4.3";
export const AA_HOST = "artificialanalysis.ai";

/** Snapshot age beyond which score-dependent blocks must pause. Design doc §7.7. */
export const STALENESS_DAYS = 35;

export interface IAAIndexes {
  intelligenceIndex: number;
  /** AA does not publish these publicly (docs/research/aa-benchmark-scores.md 1.3). */
  codingIndex: number | null;
  mathIndex: number | null;
  agenticIndex: number | null;
  estimate: boolean;
  sourceUrl: string;
  aaName: string;
  aaVariant: string;
}

export interface IntelSnapshot {
  accessed: string;
  source: string;
  indexVersion: string;
  terms: string;
  models: Record<string, IAAIndexes>;
}

export const INTEL = intelJson as unknown as IntelSnapshot;

export function getIntel(modelId: string | null | undefined): IAAIndexes | null {
  if (!modelId) return null;
  return INTEL.models[modelId] ?? null;
}

export function snapshotAgeDays(now: Date = new Date()): number {
  const accessed = new Date(`${INTEL.accessed}T00:00:00Z`);
  return Math.floor((now.getTime() - accessed.getTime()) / 86_400_000);
}

export function isStale(now: Date = new Date()): boolean {
  return snapshotAgeDays(now) > STALENESS_DAYS;
}

/**
 * Per-datum citation, exact form per design doc §7.1 — travels with the number,
 * linked to the AA source. Footer attribution does not substitute.
 */
export function aaCitation(modelId: string | null | undefined): string | null {
  const m = getIntel(modelId);
  if (!m) return null;
  const variant = m.aaVariant ? ` (${m.aaVariant})` : "";
  return `AA Intelligence Index v${INTEL.indexVersion}${variant} — Source: Artificial Analysis, accessed ${INTEL.accessed}`;
}

export function aaModelUrl(modelId: string | null | undefined): string | null {
  const m = getIntel(modelId);
  if (!m) return null;
  return m.sourceUrl;
}

export const AA_SITE_URL = "https://artificialanalysis.ai";
