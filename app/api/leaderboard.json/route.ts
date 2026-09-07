import { INTEL } from "@/lib/intelligence";
import { batchPerM, blendedPerM, providerIdOf, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

/**
 * Stable machine contract: the full universe of tracked access routes with
 * COST-SIDE data only. Intelligence scores are intentionally absent — quoting
 * AA scores into a machine-readable feed would be structured reproduction of
 * licensed data (see /methodology/ citation policy). Dates and arithmetic
 * conventions are stated inline so the file is self-describing.
 */
export async function GET() {
  const rows = UNIVERSE.rows.map((r) => {
    const blended = blendedPerM(r);
    const batch = batchPerM(r);
    return {
      id: r.id,
      provider: r.provider,
      providerSlug: providerIdOf(r),
      category: r.category,
      plan: r.plan,
      listPrice: r.listPrice,
      priceMonthly: r.priceMonthly,
      apiInPerM: r.apiIn,
      apiOutPerM: r.apiOut,
      blendedPerM: blended == null ? null : Number(blended.toFixed(4)),
      batchDiscount: r.batchDiscount ?? null,
      batchApprox: r.batchApprox ?? false,
      batchPerM: batch == null ? null : Number(batch.toFixed(4)),
      unit: r.unit,
      caveats: r.caveats,
      notes: r.notes,
      evidence: r.label,
      accessed: r.accessed,
      sourceUrl: r.sourceUrl,
      trackedOffer: r.offer,
    };
  });

  const ranked = rows
    .filter((r) => r.blendedPerM != null && (r.apiInPerM ?? 0) > 0)
    .sort((a, b) => (a.blendedPerM as number) - (b.blendedPerM as number))
    .map((r, i) => ({ id: r.id, rank: i + 1, blendedPerM: r.blendedPerM }));

  return Response.json(
    {
      contract: "token-perks/leaderboard@2",
      snapshot: UNIVERSE.snapshot,
      accessed: INTEL.accessed,
      conventions: {
        ...UNIVERSE.conventions,
        rankedBy: "blendedPerM ascending; rank covers routes with a positive blended figure only",
      },
      counts: {
        total: rows.length,
        ranked: ranked.length,
        byCategory: rows.reduce<Record<string, number>>((acc, r) => {
          acc[r.category] = (acc[r.category] ?? 0) + 1;
          return acc;
        }, {}),
      },
      rank: ranked,
      routes: rows,
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
