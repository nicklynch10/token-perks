# Token Perks — Round 3 Visual Identity Spec

**Goal:** lift wow 4→8+/10 and craft 5→8 while *strengthening* the trust character (no dark patterns, no countdowns, no stock humans).
**Identity in one line:** *a verified research ledger printed on warm paper.* The craft comes from typography, rules (hairlines + double-rules), stamps, and annotated data — not gradients or glassmorphism.
**Constraints honored:** self-hosted fonts only (`next/font/local`), zero JS animation libraries, static-export safe, **≤ ~400 new lines of CSS** (budget table in §8).

---

## 0. Reference research — transferable patterns

| Reference | What it does | What we take |
|---|---|---|
| **stripe.com** (identity typeface: Söhne, Klim Type Foundry) | One restrained grotesque carries everything; a single decorated hero moment per page, never site-wide; label/value "metrics ledger" stats; brand geometry echoed everywhere | Workhorse-grotesque discipline (→ Instrument Sans); exactly **one** decorated moment per page (our hero); stats as ledger pairs |
| **linear.app** | Terse, claim-dense copy floating in whitespace; sections captioned like plates ("Fig 0.1"); *real product data as the hero art* — no stock imagery | "FIG." numbering on images/sections; our cost bars ARE the hero art |
| **thepudding.cool** | Numbered editions; one consistent card anatomy; playful-but-rigorous editorial voice; tactile sticker accents used sparingly | Fixed offer-card anatomy; a tactile "stamp" accent, rationed |
| **artificialanalysis.ai** | Trust via *epistemic apparatus*: dashed reference baselines, annotated quadrants + Pareto line, confidence intervals, footnote cards under every chart, mono numerals | Dashed PAYG reference line + annotated delta in the hero; methodology footnotes; mono for all numbers |
| **nomadlist / nomads.com** | One saturated accent (Sunset Orange) with total discipline; dense data cards read as honest, maker-made | Single-accent rule (→ amber rationed to savings/catches only) |
| **waitbutwhy-style longform** | Chapter numerals, hand-annotated feel, long-form legibility | Fraunces "wonk" reserved for the hero; oversized numerals on guides |

---

## 1. Type & scale

### 1.1 Pairing (all OFL-licensed, self-hosted via `next/font/local`)

| Role | Family | Why | Files (latin subset, variable unless noted) |
|---|---|---|---|
| Display / headlines | **Fraunces** (variable: `opsz 9–144`, `wght 100–900`, `SOFT`, `WONK`) | Characterful "old-style ledger" serif; the `opsz` axis gives display sizes real ink-trap personality, and `WONK 1` is the single "wow" flourish | `app/fonts/Fraunces[SOFT,WONK,opsz,wght].woff2` (~150 KB) — fallback: Georgia, 'Times New Roman', serif |
| Body / UI workhorse | **Instrument Sans** (variable `wght 400–700`) | Söhne-inspired grotesque — the free Stripe move; neutral, dense-data friendly, slightly warmer than Inter | `app/fonts/InstrumentSans[wdth,wght].woff2` (~60 KB) — fallback: keep the existing system stack |
| Numerals / labels / stamps | **IBM Plex Mono** (static 400/500/600) | Typewriter soul — reads as "transcribed from a record," exactly the evidence voice | `app/fonts/IBMPlexMono-Regular.woff2`, `-Medium.woff2`, `-SemiBold.woff2` (~25 KB each) — fallback: ui-monospace, 'Cascadia Mono', Consolas, monospace |

Rules: numbers **always** IBM Plex Mono (it is tabular by default — retire the `.tabular` helper for anything mono). Headlines never mono. Body never Fraunces below 1.25 rem.

### 1.2 Load (`app/fonts.ts`, verified against this repo's Next docs: `next/font/local` supports `src`, `variable`, `display`, `fallback`)

```ts
import localFont from "next/font/local";

export const fraunces = localFont({
  src: "./fonts/Fraunces[SOFT,WONK,opsz,wght].woff2",
  variable: "--font-display",
  display: "swap",
  fallback: [["Georgia", "serif"]],
});
export const instrumentSans = localFont({
  src: "./fonts/InstrumentSans[wdth,wght].woff2",
  variable: "--font-sans",
  display: "swap",
  fallback: [["system-ui", "sans-serif"]],
});
export const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500" },
    { path: "./fonts/IBMPlexMono-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-mono",
  display: "swap",
});
```

Apply the three `*.variable` classes on `<html>` in `app/layout.tsx`; in Tailwind v4 `@theme`, point `--font-sans` at the sans var and add `--font-display` / `--font-mono` (generates `font-display` / `font-mono` utilities). No CDN, no `next/font/google` — survives static export.

### 1.3 Scale table (adopt as utilities; sizes are `clamp()` so no extra breakpoints)

| Token | Used for | Family | Size | Weight | Leading | Tracking | Notes |
|---|---|---|---|---|---|---|---|
| `display-xl` | h1 (hero, one per page) | Fraunces | clamp(2.75rem → 4.25rem) | 560 | 1.04 | −0.015em | `font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 1` |
| `display-lg` | h2 section heads | Fraunces | clamp(1.6rem → 2.1rem) | 520 | 1.12 | −0.01em | opsz auto |
| `display-sm` | h3 card titles | Fraunces | 1.25rem | 560 | 1.25 | −0.005em | |
| `lede` | hero/section intros | Instrument Sans | clamp(1.125rem → 1.25rem) | 450 | 1.6 | −0.005em | replaces current `.lede` styling |
| `body` | paragraphs | Instrument Sans | 1rem | 430 | 1.65 | 0 | 430 via variable axis |
| `small` | captions, notes | Instrument Sans | 0.8125rem | 500 | 1.5 | 0 | |
| `eyebrow` | section kickers | IBM Plex Mono | 0.6875rem | 600 | 1.3 | +0.16em | uppercase, teal-deep |
| `data` | all numerals | IBM Plex Mono | 0.875–1rem | 500 | 1.4 | 0 | deltas 600 |
| `stamp` | stamps/flags | IBM Plex Mono | 0.625–0.6875rem | 600 | 1.2 | +0.14em | uppercase |

---

## 2. Color refinement

Keep the four anchors; migrate the code's near-misses to the round-3 targets (single-token edits in `app/globals.css`):

| Current (`globals.css`) | Round-3 token | Hex | Why |
|---|---|---|---|
| `--color-paper: #fafaf8` | `--color-paper` | **#FAF8F3** | warmer paper, kills the blue cast |
| `--color-ink: #111827` | `--color-ink` | **#1A1A18** | true warm ink (was Tailwind gray-900) |
| `--color-verified: #0d9488` | `--color-teal` | **#0F766E** | deeper, print-like teal |
| `--color-catch: #92400e` | `--color-amber-deep` | **#8A3E06** | amber *text* tone (see ramp) |

### 2.1 Extended ramp (verified contrast, computed WCAG ratios in parentheses)

| Token | Hex | Role |
|---|---|---|
| `--color-paper` | #FAF8F3 | page ground |
| `--color-paper-deep` | #F3EFE6 | alternating band ground |
| `--color-card` | #FFFFFF | card/panel surface |
| `--color-ink` | #1A1A18 | body/headline ink (16.4:1 on paper) |
| `--color-ink-soft` | #4A4741 | secondary text (8.7:1) |
| `--color-ink-mute` | **#6F6A61** | muted text — *replaces #6b7280, which fails AA at 4.37:1; this passes everywhere (5.1 paper / 4.7 paper-deep)* |
| `--color-line` | #E4DFD3 | hairlines |
| `--color-line-strong` | #CFC8B8 | card borders, reference lines |
| `--color-teal` | #0F766E | action + verified (5.2:1 on paper; white on it 5.5:1) |
| `--color-teal-deep` | #0B5A54 | hover, links, inverted band bg (7.6:1; white on it 8.1:1) |
| `--color-teal-wash` | #E7F1EF | tint band, focus halo |
| `--color-teal-band` | #F0F6F4 | full-bleed tinted section ground |
| `--color-amber` | #B45309 | **wow accent** — fills/flags only on paper (4.7:1; white on it 5.1:1) |
| `--color-amber-deep` | #8A3E06 | amber *text* on paper or wash (7.1:1 / 6.7:1) — never raw `#B45309` text on wash (4.4:1, fails) |
| `--color-amber-wash` | #FAF0DC | catch band, delta chips |
| `--color-amber-line` | #E8C98A | catch band borders |

Legacy aliasing to keep diffs small: `--color-verified → teal`, `--color-catch → amber-deep`, `--color-catch-wash → amber-wash`, `--color-catch-line → amber-line`.

### 2.2 The wow-accent rule (one sentence, enforce it in review)

> **Amber appears only where money is saved or a catch is stated** — savings deltas, the "catch" eyebrow, the hero underline — never for links, buttons, or decoration; teal keeps all trust/action duties (verified, CTAs, links, focus).

One saturated warm moment per viewport is the Stripe/NomadList discipline. The *second* wow device is typographic, not chromatic: the **double rule** (2px ink over 1px line, §7) used on table heads and the colophon.

### 2.3 Dark mode note

**Light-only is fine for v1.** The paper/ledger identity *is* the trust signal; a half-polished dark mode would cost more craft than it earns, and price tables/screenshots read best on paper. Do add `color-scheme: light` on `:root` (plus `<meta name="color-scheme" content="light">`) so OS forced-dark doesn't garble the paper tint. Revisit dark only if round-4 data shows demand; when it comes, invert paper↔ink and swap teal-wash for a deep-teal surface — do not invent new hues.

```css
:root { color-scheme: light; }
```

---

## 3. Hero art direction — "The Ledger Hero" (CSS-native)

Replace the hero card's flat gradient wash with an **annotated, to-scale cost chart printed on grid paper**. Same slot (`figure` right column), same data (`HERO_ROUTE_BARS`), one stamp, one delta flag. This is the page's single decorated moment (the Stripe rule).

**Composition, top to bottom:**
1. White card, 1px `line-strong` border, **hard offset shadow** `4px 4px 0 rgb(26 26 24 / .07)` (print, not glass) over a 24px grid-paper texture that fades out at the card's bottom via mask.
2. Mono eyebrow `EFFECTIVE COST PER TASK — TO SCALE`; below it the bars, baseline axis 2px ink, tick labels `$0.00 / $0.40 / $0.80` in mono 10px `ink-mute`.
3. **Dashed vertical reference line** at 100% width labeled `PAYG $0.80/TASK` (the artificialanalysis baseline move — this is what makes the chart feel researched).
4. Bars grow on load, staggered; free routes render as 1.5px "slivers" with a `$0.00` mono tag.
5. **Amber delta flag** pinned to the Kimi bar end: `−59% vs PAYG` (arrow pointing at the gap).
6. **Stamp** `VERIFIED · SEP 6 2026` rotated −4°, overlapping the card's top-right corner, `mix-blend-mode: multiply` so it sits *in* the paper.

### 3.1 Recipes (drop-in CSS)

```css
/* Grid paper, fading at the bottom */
.paper-grid {
  background-image:
    linear-gradient(to right, rgb(26 26 24 / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(26 26 24 / 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent);
          mask-image: linear-gradient(to bottom, black 55%, transparent);
}

/* Axis + ticks (one element, no children) */
.chart-axis {
  height: 9px;
  border-bottom: 2px solid var(--color-ink);
  background: repeating-linear-gradient(90deg,
    var(--color-line-strong) 0 1px, transparent 1px 12.5%);
  font: 500 10px/1 var(--font-mono); color: var(--color-ink-mute);
}

/* Reference line + label */
.ref-line {
  position: absolute; inset-block: 0; right: 0; width: 0;
  border-left: 1px dashed var(--color-ink-mute);
}
.ref-line::after {
  content: "PAYG $0.80/TASK";
  position: absolute; top: -1.4rem; right: 0;
  font: 600 10px/1.2 var(--font-mono); letter-spacing: .08em;
  color: var(--color-ink-mute); white-space: nowrap;
}

/* Amber delta flag with pointer */
.delta-flag {
  position: absolute; transform: translate(-100%, -50%);
  background: var(--color-amber); color: #fff;
  font: 600 11px/1 var(--font-mono);
  padding: .2rem .4rem .22rem; border-radius: 4px;
}
.delta-flag::after {           /* pointer to the bar gap */
  content: ""; position: absolute; top: 100%; left: .8rem;
  border: 5px solid transparent; border-top-color: var(--color-amber);
}

/* Ink stamp: double frame + rough multiply */
.stamp {
  display: inline-block; transform: rotate(-4deg);
  font: 600 11px/1 var(--font-mono); letter-spacing: .14em;
  text-transform: uppercase; color: rgb(26 26 24 / .82);
  border: 2px solid currentColor; border-radius: 4px;
  padding: .32rem .55rem; mix-blend-mode: multiply;
  position: relative; background: transparent;
}
.stamp::before {
  content: ""; position: absolute; inset: 3px;
  border: 1px dashed currentColor; border-radius: 2px;
}
```

```html
<figure class="ledger-hero paper-grid rounded-2xl border border-line-strong p-4 shadow-[4px_4px_0_rgb(26_26_24/0.07)]">
  <span class="stamp absolute -top-3 right-4">Verified · Sep 6 2026</span>
  <p class="eyebrow">Effective cost per task — to scale</p>
  <!-- bars … -->
  <span class="ref-line" aria-hidden="true"></span>
  <span class="delta-flag" style="right: 41%">−59% vs PAYG</span>
  <div class="chart-axis" aria-hidden="true"><span>$0.00</span>…<span>$0.80</span></div>
</figure>
```

Hero headline treatment: keep the h1 ink; the phrase "The catches, upfront." gets an **amber marker underline**, not colored text:

```css
.mark-underline {
  background-image: linear-gradient(100deg, transparent 1%, var(--color-amber) 4%, var(--color-amber) 96%, transparent 99%);
  background-repeat: no-repeat; background-size: 100% 0.16em;
  background-position: 0 88%;
}
```

`mix-blend-mode: multiply` on the stamp and grid makes them sit "printed into" the paper wash (verify no stacking-context surprise with the card's `overflow-hidden`; if blended children get clipped, blend on the texture layer instead).

---

## 4. Interaction delight (CSS-only, no JS libraries)

All motion is wrapped in `prefers-reduced-motion: no-preference`; unsupported browsers and reduced-motion users get the final static state — numbers are never wrong, nothing is ever hidden. No JavaScript at all.

### 4.1 Card lift (print lift, not float)

```css
.card {
  border: 1px solid var(--color-line-strong); border-radius: 16px;
  background: var(--color-card);
  box-shadow: 3px 3px 0 0 rgb(26 26 24 / .06);
  transition: translate .16s cubic-bezier(.2, .7, .3, 1), box-shadow .16s cubic-bezier(.2, .7, .3, 1), border-color .16s;
}
@media (hover: hover) {
  .card:hover {
    translate: 0 -3px;
    box-shadow: 5px 7px 0 0 rgb(26 26 24 / .09);
    border-color: var(--color-teal);
  }
}
.card:active { translate: 0 1px; box-shadow: 2px 2px 0 0 rgb(26 26 24 / .06); }
```

### 4.2 Bars grow on first view (scroll-driven, with safe fallback)

Inline `style="width: <pct>%"` stays the source of truth, so no-support browsers render final widths. The animation only exists where `animation-timeline: view()` is supported.

```css
.grow { transform-origin: left center; }
@media (prefers-reduced-motion: no-preference) {
  /* Hero: grow on load, staggered */
  .hero .grow { animation: grow .7s cubic-bezier(.2, .7, .3, 1) both; }
  .hero .grow:nth-child(2) { animation-delay: .12s; }
  .hero .grow:nth-child(3) { animation-delay: .24s; }
  @keyframes grow { from { transform: scaleX(0); } }

  /* Below the fold: grow as the element enters the viewport */
  @supports (animation-timeline: view()) {
    .scroll-grow { animation: grow linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
  }
}
```

### 4.3 Count-up feel via `steps()` (true value even when unsupported)

Registered `--p` counter ticks a mono figure up as it scrolls in; the `::after` default is `attr(data-final)`, so the **real** number always renders without support — honesty preserved, no JS.

```css
@property --p { syntax: "<integer>"; inherits: false; initial-value: 0; }
.count-up { counter-reset: n var(--p); font: 600 1rem/1.4 var(--font-mono); }
.count-up::after { content: attr(data-final); }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .count-up::after { content: counter(n); animation: tally linear both;
      animation-timeline: view(); animation-range: entry 0% entry 80%; }
    @keyframes tally { to { --p: var(--target, 100); } }
  }
}
```
```html
<span class="count-up" data-final="$19/mo" style="--target: 19">$19/mo</span>
```
(The fallback duplicates the final value in content + attribute; keep them in sync.)

### 4.4 Focus rings in brand color (replaces the current bare outline)

```css
:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--color-teal-deep);
  outline-offset: 2px;
  border-radius: 6px;
  box-shadow: 0 0 0 5px var(--color-teal-wash); /* the "paper punch" halo */
}
```

### 4.5 Link underline draw + button press

```css
.u-draw {
  text-decoration: none; font-weight: 600;
  background-image: linear-gradient(var(--color-teal-deep), var(--color-teal-deep));
  background-size: 0% 2px; background-repeat: no-repeat; background-position: 0 100%;
  transition: background-size .18s cubic-bezier(.2, .7, .3, 1);
}
.u-draw:hover, .u-draw:focus-visible { background-size: 100% 2px; }

.btn { transition: translate .12s, box-shadow .12s; box-shadow: 2px 2px 0 0 rgb(26 26 24 / .18); }
.btn:hover { translate: 0 -1px; box-shadow: 3px 3px 0 0 rgb(26 26 24 / .18); }
.btn:active { translate: 0 1px; box-shadow: 1px 1px 0 0 rgb(26 26 24 / .18); }
```

Anti-patterns (compliance): no pulse/flash on CTAs, no countdown timers, no shake, no exit-intent anything, no auto-playing anything. Motion signals *craft*, never *urgency*.

---

## 5. Layout rhythm

**Two rules:** (1) no two full-bleed bands of the same ground touch; (2) decorated moments are rationed to one per viewport.

### 5.1 Scales

- **Max-width:** `prose` 42rem · `standard` 64rem (current `max-w-5xl`, keep) · `wide` 72rem *only* for the comparison band's table so the ledger breathes · gutters 1.25rem → 2rem (sm).
- **Spacing (4-px base):** `--space-1…9` = 4, 8, 12, 16, 24, 32, 48, 64, 96. Section rhythm: 64px between sections, 96px before the footer colophon. Fixed anatomy per section: eyebrow → 8px → h2 (`display-lg`) → 16px → content.

### 5.2 Homepage surface plan (maps to the existing `app/page.tsx` section order)

| # | Section | Surface | Monotony breaker |
|---|---|---|---|
| 1 | Hero | paper, with the Ledger Hero card (§3) | grid texture + stamp + delta flag — the page's one big decorated moment |
| 2 | Comparison table | **full-bleed `paper-deep` band**, inner `wide` container | ledger table with double-rule head (§7); sticky first column kept |
| 3 | Top-3 offer cards | paper | cards switch to `card` treatment (hard shadow, no blur); each thumbnail gets a mono `FIG. 1/2/3` caption |
| 4 | New/changed strip | paper, boxless | ticker anatomy: mono dateline · dotted leader · title; hairline top+bottom rules only — **no card** |
| 5 | Break-even calculator | **full-bleed `teal-deep` inverted band** | faint white grid (`rgb(255 255 255 / .08)` lines, 24px) + mono numerals; the interactive centerpiece earns the inversion |
| 6 | Pareto strip | paper | amber-wash annotation chip behind the headline takeaway — the wow rule's home turf |
| 7 | Guides teasers | paper | oversized Fraunces numerals `01 / 02` at ~5rem, `ink-mute`, replaced top rule with double rule |
| 8 | Reader reports | **full-bleed `amber-wash` band**, dashed `amber-line` border | the dashed frame says "form not yet opened" — honest emptiness, styled |
| 9 | FAQ | paper | remove card boxes on items; hairline rules between answers |
| 10 | Citation + snapshot | **full-bleed `paper-deep` colophon zone** | double rule on top; everything mono-small, like a book's imprint page |

Bands 2, 5, 8, 10 are the alternation spine (sand → teal → amber → sand): paper sections sit between each, so the page breathes and no two bands touch.

---

## 6. Illustration language

### 6.1 Locks for the 4 existing flat images (hero + 3 offer thumbnails)

1. **Palette lock:** only paper `#FAF8F3` bg, ink `#1A1A18` strokes/fills, teal `#0F766E`, amber `#B45309`, line `#E4DFD3`. No new hues, no gradients, no textures inside the artwork.
2. **Stroke:** 2.5px ink outlines on every shape; flat fills only; geometric vocabulary echoes the chart motif (rectangles, ticks, dashed rules — the "bars" are the brand shape).
3. **Ground:** soft ellipse shadow under objects, 6% ink; image ground = paper (not pure white) so artwork never halos against cards; the 1px border does the framing.
4. **Format:** 16:9, export ≥ 1024×576, `border-radius: 16px`, `loading="lazy"` except the hero image (`fetchpriority="high"`).
5. **Fig captions (the Linear/Pudding move):** every image gets a mono caption strip directly beneath: `FIG. 1 — KIMI K3 CORE ROUTE` / `FIG. 2 — MUSE SPARK ZEN (FREE)` / `FIG. 3 — NVIDIA DEV ROUTE` / `FIG. 0 — COST PER TASK, TO SCALE`. This single convention does more for coherence than any redraw.
6. **No humans, no faces, no logos-as-art** — objects and diagrams only; provider names live in text, not in artwork.

Do not redraw the 4 images for round 3; the palette lock + fig captions make them coherent. Recomposite only if an image's ground is pure white (halo check: view on `paper-deep`).

### 6.2 The one extra image: "The Verification Receipt"

A flat illustration of a paper **receipt** — line items (`BASE FEE`, `RENEWAL`, `LIMITS`), a dashed tear edge, and the teal stamp diagonally across it — placed in the MethodologyNote/colophon zone on the homepage and as the `/methodology` hero. Rationale: it illustrates the site's actual differentiator (the verification *process*), which no current image covers; it's palette-locked and chart-adjacent; and it gives the evidence blocks (§7) an emblem. A fifth "more products" or decorative image would add nothing the fig captions don't already. (Per-page OG art stays out of scope, as agreed.)

---

## 7. Evidence-block aesthetic (the trust layer, made premium)

### 7.1 Stamps & badges

- **VERIFIED [date]** → the §3.1 `.stamp`, teal ink variant (`color: var(--color-teal-deep)`), rotate −4°, multiply. Used once per page.
- **THE CATCH** blocks → amber-wash panel, 2px `amber-line` border on the *left* only, mono eyebrow `THE CATCH` in `amber-deep`, body in `ink-soft`. Never red; catches are findings, not alarms.
- **As-of datelines** → `AS OF SEP 6 2026` in mono 11px `ink-mute`, flanked by 24px hairlines: `.asof::before/::after { content:""; width:24px; height:1px; background: var(--color-line-strong); }` inline-flex. Reads as an archive stamp, not a countdown.

### 7.2 Ledger tables (comparison + price tables)

```css
.ledger { width: 100%; border-collapse: collapse; background: var(--color-card); }
.ledger thead th {
  font: 600 11px/1.4 var(--font-mono); letter-spacing: .08em; text-transform: uppercase;
  color: var(--color-ink-soft); text-align: left;
  padding: .6rem .75rem;
  border-bottom: 2px solid var(--color-ink);
  box-shadow: inset 0 -4px 0 -3px var(--color-line-strong); /* the double rule */
}
.ledger tbody td { padding: .65rem .75rem; border-bottom: 1px solid var(--color-line); }
.ledger tbody tr:hover { background: color-mix(in srgb, var(--color-teal-wash) 45%, transparent); }
.ledger .num { text-align: right; font: 500 .875rem/1.4 var(--font-mono); }
.ledger tfoot td { font-style: italic; color: var(--color-ink-mute); border-bottom: 0; }
.delta-up::before  { content: ""; display: inline-block; margin-right: .3em;
  border: 4px solid transparent; border-bottom-color: var(--color-amber-deep); translate: 0 -2px; }
.delta-down::before { content: ""; display: inline-block; margin-right: .3em;
  border: 4px solid transparent; border-top-color: var(--color-teal-deep); translate: 0 2px; }
```

Rules: no zebra striping (hairlines only — ledgers don't stripe), numbers right-aligned mono, deltas get the triangles (amber = cheaper, teal = guidance), every table ends with a `tfoot` methodology/footnote line ("Median-window math · verified Sep 6 2026 · re-verify at official terms") — the artificialanalysis footnote-card move.

### 7.3 Verdict & citation anatomy

- **Verdict line** on offer cards: mono `VERDICT:` + Fraunces `display-sm` phrase, separated by a 24px hairline — the serif/mono tension is the signature.
- **CiteBlock** becomes a colophon: double rule above, mono 12px, `ink-mute`, generous leading, CC-BY note included. Looks like a book imprint — quietly authoritative.
- **ResearchSnapshot**: mono, dashed top rule, `AS OF` dateline treatment (§7.1).

---

## 8. CSS budget (new lines, target ≤ 400)

| Module | Est. lines |
|---|---|
| Ramp tokens + `color-scheme` (§2) | 30 |
| Type utilities: display/eyebrow/lede/data/stamp (§1) | 35 |
| Ledger Hero: grid, axis, ref-line, delta-flag, stamp, underline (§3) | 75 |
| Interactions: lift, grow, count-up, focus, underline/press (§4) | 70 |
| Bands, rhythm helpers, fig captions (§5–6) | 45 |
| Ledger tables, catch blocks, as-of, colophon (§7) | 65 |
| Reduced-motion, hover-guards, misc | 15 |
| **Total** | **~335** |

Fonts add ~0 CSS (next/font injects `@font-face`). Payload cost: ~150 + 60 + 75 KB woff2 (latin) — acceptable; drop Fraunces' `SOFT/WONK` axes (~40 KB saved) if LCP budgets complain.

## 9. Implementation checklist & guardrails

1. Add `app/fonts/` + `app/fonts.ts`; wire variables on `<html>`; map `@theme` font tokens.
2. Migrate the four anchor tokens + add the ramp (§2.1) incl. the `ink-mute` AA fix; add legacy aliases.
3. Build the Ledger Hero in the existing hero `figure`; keep `HERO_ROUTE_BARS` as the data source; widths stay inline styles.
4. Swap table markup to `.ledger`; add fig captions under the 4 images; restyle bands per §5.2.
5. Add the interactions module; verify with `prefers-reduced-motion` on and JS off.
6. Commission the Verification Receipt illustration (palette lock §6.1).

**Guardrails (hard):** no countdowns, no fake scarcity, no urgency red on CTAs, no stock humans, no number that isn't real (the count-up only animates figures that already exist in markup), amber never on links/buttons. Every decorative layer `aria-hidden`. `translate`/`transform`/`opacity` animations only (no layout-thrash properties except the pre-existing inline bar widths).

**Sources consulted:** stripe.com (structure), linear.app (structure), pudding.cool, artificialanalysis.ai (+ brand-kit), nomads.com/Brandfetch, Klim Type Foundry (Söhne), Fonts In Use, Typewolf, fontalternatives.com (Stripe/Söhne pairing), a1.gallery (Söhne usage), smartbranding.com (Nomads rebrand).

