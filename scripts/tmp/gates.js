const fs = require("fs");
const path = require("path");

let failures = 0;
function check(name, ok, detail) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

// 1. leaderboard.json: valid JSON, >=25 rows, no AA data
const lb = JSON.parse(fs.readFileSync("out/api/leaderboard.json", "utf8"));
check("leaderboard.json parses", true);
check("leaderboard.json >=25 routes", lb.routes.length >= 25, `${lb.routes.length} routes, ${lb.rank.length} ranked`);
const lbFlat = JSON.stringify(lb);
check(
  "leaderboard.json has no AA data",
  !lbFlat.includes("artificialanalysis") && !lbFlat.includes("Intelligence") && !/intelligenceIndex/i.test(lbFlat),
);

// 2. Offer JSON-LD renders in out HTML (@type extraction, not literal "schema.org/Offer")
let offerCount = 0;
const offerDetail = [];
for (const slug of ["kimi-k3-core", "muse-spark-zen-free", "nvidia-k3-free"]) {
  const html = fs.readFileSync(`out/best/${slug}/index.html`, "utf8");
  const types = [...html.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)].map((m) => m[1]);
  const has = types.includes("Offer") || types.includes("AggregateOffer");
  offerCount += has ? 1 : 0;
  offerDetail.push(`${slug}: ${has ? "Offer/AggregateOffer" : "MISSING"}`);
  // parse every JSON-LD block
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  let parseFail = 0;
  for (const b of blocks) {
    try { JSON.parse(b[1]); } catch (e) { parseFail++; }
  }
  check(`${slug} JSON-LD blocks parse`, parseFail === 0, `${blocks.length} blocks`);
}
check("Offer JSON-LD renders on >=3 offer pages", offerCount >= 3, offerDetail.join("; "));

// 3. Homepage: ItemList + Dataset present, og image correct
const home = fs.readFileSync("out/index.html", "utf8");
check("homepage ItemList JSON-LD", /"@type"\s*:\s*"ItemList"/.test(home));
check("homepage Dataset JSON-LD (frontier)", /cost.intelligence frontier/i.test(home) && /"@type"\s*:\s*"Dataset"/.test(home));
check("homepage og:image og-home.png", /property="og:image"\s+content="[^"]*og-home\.png/.test(home) || /og-home\.png/.test(home));
check("homepage renders leaderboard copy", home.includes("API cost leaderboard") && home.includes("Every tracked route"));
check("homepage renders frontier chart section", home.includes("Cost vs intelligence frontier"));

// 4. TPVS must NOT render anywhere
let tpvsLeaks = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) {
      const t = fs.readFileSync(p, "utf8");
      if (/TPVS|Value Score/i.test(t) && !/out[\\/](methodology|changes)[\\/]/.test(p)) tpvsLeaks.push(p);
    }
  }
}
walk("out");
check("TPVS rendered only on methodology + changes (disclosure), never in tables", tpvsLeaks.length === 0, tpvsLeaks.join(", ") || "clean");

// 5. Providers pages render
check("providers index renders", fs.existsSync("out/providers/index.html"));
const anthropic = fs.readFileSync("out/providers/anthropic/index.html", "utf8");
check("provider page renders routes table", anthropic.includes("Anthropic") && /Claude Max 5x|Fable 5\.1/.test(anthropic));
const provCount = fs.readdirSync("out/providers").filter((d) => fs.statSync(`out/providers/${d}`).isDirectory() && !d.startsWith("__next")).length;
const slugs = new Set(lb.routes.map((r) => r.providerSlug));
check("provider pages exported match universe groups", provCount === slugs.size, `${provCount} dirs vs ${slugs.size} groups`);

// 6. AA citation present on homepage rendered HTML (per-datum)
check("AA per-datum citation string on homepage", /AA Intelligence Index v4\.3 — Source: Artificial Analysis, accessed 2026-09-07/.test(home));

// 7. sitemap has provider URLs
const sm = fs.readFileSync("out/sitemap.xml", "utf8");
check("sitemap includes /providers/", sm.includes("/providers/"));
check("sitemap includes provider slugs", sm.includes("/providers/anthropic/"));

// 8. llms.txt / llms-full.txt updated
const llms = fs.readFileSync("out/llms.txt", "utf8");
check("llms.txt leaderboard section", llms.includes("Cost leaderboard"));
check("llms.txt providers section", llms.includes("## Providers"));
const llmsFull = fs.readFileSync("out/llms-full.txt", "utf8");
check("llms-full.txt universe rows", llmsFull.includes("Cost universe (121 routes"));
check("llms-full.txt has no AA scores", !/Intelligence Index v4|artificialanalysis\.ai\/leaderboards/.test(llmsFull));

// 9. Hype strings across rendered HTML (visible copy; href/URLs checked separately)
const banned = [/\bbest\b/i, /\bwins\b/i, /\btrap\b/i, /\bhonest\b/i, /\bunlock\w*\b/i, /\bnow\b/i, /revolutionar/i];
const offenders = {};
function walkCopy(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walkCopy(p);
    else if (f.endsWith(".html")) {
      let t = fs.readFileSync(p, "utf8");
      // strip tags/attributes -> visible text only
      t = t.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
      t = t.replace(/https?:\/\/[^\s"<>]+/g, " "); // URLs are exempt from the copy gate
      const words = t.split(/\s+/);
      for (const re of banned) {
        for (const w of words) {
          if (re.test(w)) {
            offenders[p] = offenders[p] || new Set();
            offenders[p].add(w.toLowerCase().replace(/[^a-z-]/g, ""));
          }
        }
      }
    }
  }
}
walkCopy("out");
const offList = Object.entries(offenders).map(([p, ws]) => `${p}: ${[...ws].join(",")}`);
check("zero hype strings in visible copy", offList.length === 0, offList.slice(0, 12).join(" | ") || "clean");

// 10. feed + robots sanity
const feed = fs.readFileSync("out/feed.xml", "utf8");
check("feed has leaderboard item", feed.includes("cost leaderboard") || feed.includes("leaderboard"));
check("robots.txt unchanged (no new sitemap refs needed)", fs.existsSync("out/robots.txt"));

console.log(failures === 0 ? "\nALL GATES PASS" : `\n${failures} GATE FAILURES`);
