import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Raw-text robots.txt. MetadataRoute.Robots cannot emit custom lines, so this
 * route serves the file directly and includes an llms.txt discovery comment
 * plus the sitemap reference.
 */
export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# AI crawlers explicitly allowed; machine-readable summaries linked below.",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: CCBot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "# Machine-readable summaries for AI assistants:",
    `# llms.txt: ${SITE_URL}/llms.txt`,
    `# llms-full.txt: ${SITE_URL}/llms-full.txt`,
    `# offers.json: ${SITE_URL}/api/offers.json`,
    `# feed.xml: ${SITE_URL}/feed.xml`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
