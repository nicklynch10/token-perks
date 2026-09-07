# Doctor of Credit teardown: patterns for a comprehensive cost-intelligence site

Research date: 2026-09-07. Source: live fetches of doctorofcredit.com (homepage, Best Bank Account Bonuses hub, Wells Fargo $500 Checking Bonus post, Bank Account Quick Reference Table, List Of Methods Banks Count As Direct Deposits, plus site policy pages found via search).

DoC is the canonical example of "tracks EVERYTHING in its niche systematically": ~3,820 pages of archive, every bank bonus logged with additions AND removals, and a community that supplies data points the site itself curates. This doc captures the mechanics that make it feel complete and trustworthy, maps each to our LLM cost-leaderboard, and lists what not to copy.

---

## 1. The 10 transferable patterns

### P1. Living list on a stable URL (the hub rotates, the link never breaks)
The monthly hub is titled "Best Bank Account Bonuses For September, 2026" but lives at `/best-bank-account-bonuses/` forever, with a standing note quoted verbatim:

> "Note: This page is updated monthly and keeps the same URL, so feel free to bookmark it or link to it knowing that it'll be kept up to date. Because of this the comment section might contain discussion about deals that are no longer current, please keep that in mind. You can view the most recent changes by clicking here."

The note does three jobs at once: invites bookmarking, pre-explains stale comments, and points to the changelog.
**Mapping:** our `/best` and per-use-case best pages are permanent URLs regenerated as prices change; each carries a "last updated" line + link to `/changes` in the same position (top note under the H1).

### P2. Best-to-worst ordering, exhaustive coverage — curation of order, not of inclusion
Hub intro, verbatim:

> "Below we've listed the best checking & saving account bonuses in order from best to worst for September, 2026. We've also included a little bit of information on each bonus, make sure you click through and read our detailed posts on each offer before signing up – that way you won't be caught unawares of hidden fees."

Everything is on the list; rank is the editorial act. Coverage breadth is stated numerically in the meta: "$3,500+ in nationwide bonuses. $10,000+ in state bonuses."
**Mapping:** the leaderboard includes every validated offer, sorted by effective cost/value score — the claim "we list all N plans we track, ranked" goes in the intro; incompleteness is never hidden by omission.

### P3. Per-item unit template: name → headline number → one judgment sentence → attribute bullets
Each hub entry is an H3 with the price embedded, a direct external link, one editorial sentence, then standardized bullets. Verbatim example:

> "### U.S. Bank $450 / Direct link to offer / Anti churn language is now 12 months instead of 24 months… / - Read our full post / - Soft pull / - Can fund up to $250 with a credit card / - Direct deposit of $2,000-$8,000 required"

The bullet vocabulary is a fixed attribute schema applied identically to ~200 entries on one page. That repetition is what reads as "systematic."
**Mapping:** `OfferCard` rows: plan name with effective cost in the heading (e.g., "Kimi K3 Core — $X/M effective"), one plain judgment sentence, then fixed bullets: context window, free tier, rate caps, "verified 9/5" status, "full analysis →".

### P4. Two-tier structure with explicit cross-links in BOTH directions
Hub entries say "Read our full post"; the detail post closes the loop — the Wells Fargo post's verdict section ends:

> "We will add this to our list of the best bank account bonuses."

Every detail artifact knows its place in the canonical list; every list entry points to its detail page. The site is a ledger, not a pile of articles.
**Mapping:** `/best/[slug]` rows link to per-provider pages; each provider page links back to its current rank(s) on the leaderboard. Rank provenance is visible from both ends.

### P5. Dated Added/Removed changelog as a first-class page section, with an archive
The hub's "Recent Changes" section logs removals with the same weight as additions, most-recent-first, bracketed dates:

> "[9/2/26] Removed WesBanco $300 – WV, PA, OH, IN, KY, MD"
> "[9/1/26] Removed Bank of America $100-$500"
> "[8/26/26] Added GalaxyOne $1,000 bonus"
> "[8/23/26] Added Greater Nevada Credit Union – $250 – NV"
> "For changes before, click here." (archive link)

Logging removals is the single strongest "this is a database, not a blog" signal.
**Mapping:** `/changes` logs every addition, removal, price change, and validation failure in the same `[date] Added/Removed/Changed` format, with an archive for older entries; removals are never silently dropped.

### P6. Honest-unknown attribute vocabulary + bracketed status tags
Bullets deliberately encode uncertainty instead of going quiet:

> "Unknown if hard/soft pull" · "Mixed DP on hard/soft pull" · "Unknown if credit card funding is possible" · "Can fund with a credit card but codes as a cash advance"

Titles carry bracketed status tags: "[New Boosts] Cash App…", "[Targeted] AmEx Offers…", "[YMMV] Ibotta…", "[NY, PA, NJ] Visions Federal Credit Union $500 Checking Bonus". Four characters of tag replace a paragraph of hedging.
**Mapping:** a fixed status vocabulary on every plan: `[Verified] [Stale] [Unverified] [YMMV]` plus cells like "unknown if rate limits apply", "no official pricing page" — uncertainty is written down, never a blank cell.

### P7. Per-item detail page with fixed labeled sections and an explicit expiration
The Wells Fargo $500 post template, exact heading labels in order:

> "Offer at a glance" (bullets: "Maximum bonus amount: $500", "Direct deposit required: Yes, $1,000+") → "The Offer" → "The Fine Print" → "Avoiding Fees" (sub: "Monthly Fees", "Early Account Termination Fee") → "Our Verdict" → "F.A.Q's" (sub: "Am I eligible?", "Can I get matched to this higher $500 bonus?")

Terms state an expiration: "October 6, 2026". Same skeleton on every deal post — readers learn it once.
**Mapping:** per-provider page template: "At a glance" (eff. cost, context, free tier) → "Pricing" → "Rate limits & caps" → "What breaks the math" → "Verdict" → FAQ; every plan carries an as-of/verified date and, where known, a price-change or deprecation horizon.

### P8. Standing reference pages that answer recurring questions, with cited receipts
Evergreen URLs like "Is Opening A Bank Account A Soft Or Hard Pull?" and "List Of Methods Banks Count As Direct Deposits". The latter is a crowdsourced database: two tiers ("Big Banks/Banks With Regular Sign Up Bonuses" / "Credit Unions/Small Banks"), one heading per institution, methods as bullets, and every claim cited by bracketed links to individual comment permalinks (or Reddit/Slickdeals/FlyerTalk). Intro: "We've included the source(s) in brackets next to each method." Negative results kept too — under Ally: "The following didn't work:".
**Mapping:** methodology as permanent reference pages — "What counts as effective cost?", "Which fees are in the number?", "How we verify prices" — with each claim cited to its source (pricing-page capture date, changelog entry, benchmark run), including negative findings ("this provider's free tier does not include function calling").

### P9. Crowdsourcing loop with visible receipts and volume signals
Hub closing line: "If you know of any better bank account bonuses, let us know in the comments section and we will add them." Comment counts are surfaced on feed cards ("3,704 Comments"), signaling an active correction community. Contributions flow into the reference pages as cited bullets (P8) and into the changelog as entries.
**Mapping:** a standing one-line call-to-action on `/best` and provider pages ("Spot a wrong price? Tell us — corrections are logged in /changes"), plus per-change attribution so the ledger visibly absorbs corrections.

### P10. Full-universe filter table as the companion to the editorial list
"Bank Account Quick Reference Table (Spreadsheet)": one row per bank, one column per state, "*" marking partial availability, and named filter views: "Post Last 30 Days", "Not Expired", "CC Funding (sorted by potential funding size)", "CC Funding–Soft–Michigan", "$250+", "Hub Account Prospect". Cells link to positions within resource pages. Honest caveat, verbatim: "this resource is incomplete and filled with errors."
**Mapping:** the complete-universe table — every provider/plan we track including unvalidated ones — filterable by use case, price tier, context size, verification status; it lives in-app (not a Google Sheet) and is clearly separated from the curated best list.

---

## 2. Freshness/tracking mechanics (how "current" is made visible)
- **Dual timestamps in metadata:** `article:published_time 2026-08-18` vs `article:modified_time 2026-09-03` on the hub — machines and readers can both see "created long ago, maintained recently." Maintenance recency is a feature, not an embarrassment.
- **Per-post update-prepend convention:** feed excerpts lead with the newest change, older ones stacked below: "Update 9/4/26: Some people are getting buy $20 in Bitcoin, get $10 bonus. Update 8/3/26: … Update 7/19/26: 20% back on Uber, up to..." — newest-first, dated to the day, always same format.
- **Section-level changelog** on hubs (P5) plus a full archive behind "For changes before, click here."
- **Expiration dates** on individual offers, and an entire "Expired*" category taxonomy (Expired Bank Account Bonuses, Expired Credit Card Offers, Expired Savings Account Bonuses, etc.) — dead items are archived and findable, not deleted.
- **Caveat labeling of time-sensitive context:** the hub warns its comments may discuss now-dead deals (P1).

## 3. Trust mechanics
- **Positioning tagline** (homepage meta): "Find the best current bank account & credit card bonuses. We don't use affiliate links to remain unbiased." Reinforced by a dedicated policy post: "Affiliate Links & Bank Bonuses – We Won't Be Using Them."
- **Category-split monetization honesty:** bank content is affiliate-free; credit-card content monetizes via third-party tools (their CardMatch page embeds "ADVERTISER DISCLOSURE: CreditCards.com is an independent...") and display ads (Mediavine per their privacy policy). The split is explicit rather than smoothed over.
- **Per-item terms presentation:** "The Fine Print" / "Avoiding Fees" sections quote eligibility and fee mechanics directly, so the recommendation is auditable.
- **Honesty bullets** (P6) and **cited community receipts** (P8) mean every claim carries its evidence one click away.
- **Editorial accountability:** named authors on posts ("by William Charles", "by Chuck"), and verdicts commit to list placement ("We will add this to our list…") — predictions and placements are on the record.

## 4. Typography/tone: density without hype
- Prices live in headings ("### Chase $300-$400 ($900 With Savings)"); eligibility lives in headings ("### Truist $400/$800 AL, AR, GA, FL, IN, KY, MD, MS, NC, NJ, OH, PA, SC, TN, TX, VA, WV or DC").
- Judgments are one plain sentences woven into the entry: "Nice part of this bonus is that…", "Bit annoying that…", "Unfortunately it's a hard pull", "This is the highest bonus they have offered", "Has been as high as $500 in the past", "$350 is an all time high for this bonus", "Look back period recently improved", "Formerly known as bethpage", "This is the first business bonus we've seen from SECU".
- No exclamation marks, no "AMAZING", no stacked adjectives — the superlatives are numbers ("all time high", "as high as $500"), not adjectives. This matches our calm-data-platform direction.

## 5. What NOT to copy
- **Homepage as a reverse-chronological blog feed** paginated to 3,820 pages — our homepage should be the ledger/table, not a stream.
- **Sidebar clutter:** search + a ~40-item alphabetical category list (with catch-alls like "Uncategorized", "Expired Free Money") + two "Most Popular" widgets + email subscribe, all stacked. Keep chrome minimal; navigation belongs in the header taxonomy.
- **External Google Spreadsheet as the data layer:** it lags ("may get out of sync with the source data"), self-describes as "incomplete and filled with errors," and was last touched as a page in 2017. Own the table in-app with real filters.
- **Inconsistent freshness discipline:** the direct-deposits reference page has no changelog at all while the hub has a meticulous one. One freshness convention everywhere.
- **Stale-comment mixing** on monthly hubs (they warn about it themselves) — separate historical discussion from the current state of an offer.
- **Template artifacts:** the hub contains entries with blank H3 headings; a strict schema (our offers JSON validation) prevents this class of rot.
- **Disclosure located nowhere in particular:** individual deal posts carry no disclosure block; it lives in syndication snippets and a single policy post. Disclosures belong on every page (footer + link from each table).

---

## Sources
- https://www.doctorofcredit.com/ (homepage, nav taxonomy, feed-card anatomy, pagination)
- https://www.doctorofcredit.com/best-bank-account-bonuses/ (hub structure, unit template, Recent Changes, stable-URL note)
- https://www.doctorofcredit.com/wells-fargo-500-checking-bonus/ (post template, section labels, verdict loop)
- https://www.doctorofcredit.com/bank-account-quick-reference-table/ (filter-table pattern, caveat language)
- https://www.doctorofcredit.com/list-of-methods-banks-count-as-direct-deposits/ (cited crowdsourced reference page)
- https://www.doctorofcredit.com/privacy-policy/ and https://www.doctorofcredit.com/check-card-match/ (ad/monetization mechanics, via search)
