import { publicFeed } from "@/lib/offers";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(publicFeed(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
