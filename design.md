# Design — Λογοθεραπεία Λίλιαν Μπατσικώστα

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Written by `hallmark` on 2026-09-19 (first Hallmark run for the project, adapted
from the Veterinerian scaffold). The canonical token values live in
`app/globals.css` (`@theme`, hex, with measured contrast ratios in the comments);
the OKLCH values below are the same colours in Hallmark's notation.

## Genre
modern-minimal, soft register. Coral was picked over Hum on purpose: the
playful genre's own guidance routes "friendly but soft, not alive" to a single
low-chroma accent with calm easings, and an anxious parent needs calm, not
character.

## Macrostructure family

- Home: **Narrative Workflow** — the spine is the five real stages a family
  goes through (first call → assessment → plan → sessions → re-assessment),
  set as a numbered rail on a blush band directly under the hero. Hero H2
  split (7/5): promise left at a 16ch measure, the practice's plate right;
  beneath both, a hairline band of the signs parents notice, each line a link
  to the service that explains it.
- The page must not run one rhythm end to end. The 12-column split head is the
  common case, so two sections break it on purpose: the steps band stacks
  (head at 34rem, rail full width beneath) and the trust section runs flush
  left with the award cards below, not beside.
- Content pages (`/logotherapeftria`, `/to-kentro`, `/ypiresies/[slug]`,
  `/arthra/[slug]`, `/epikoinonia`, legal): **Long Document** — one reading
  column at 65ch, an opener set like the head of a memo, section heads as
  small tracked phrases in the flow (`.head-inline`), lists as hairline rows.
- Index pages (`/ypiresies`, `/arthra`, 404): **Index-First** — a label, one
  sentence, then the list (cards for services, dated rows for articles).

## Theme — Coral, tuned
Warm-grey paper, one terracotta-coral accent. Three diversification axes:
paper **light** · display **geometric-humanist sans** · accent **warm**.
(Differs from the Veterinerian source on display style and accent hue.)

**The two rules that generate the palette.**

1. **The neutrals are one hue.** Paper, hairline and the three inks sit at
   55–75° in OKLCH with chroma under 0.02 — the warm grey of unbleached
   paper, never a screen grey.
2. **One accent, and it is quiet.** Terracotta-coral at C 0.12, dark enough to
   be text (5.9:1) and to carry paper text on a fill (5.9:1). Error red is the
   only other chromatic value.

| Token | Hex | OKLCH | Role | On paper | On blush |
|---|---|---|---|---|---|
| `--color-paper` | #faf6f2 | 97.6% 0.007 75 | the page | — | — |
| `--color-paper-2` | #fefcf9 | 99.2% 0.004 75 | cards, contact band | — | — |
| `--color-blush` | #fdeae2 | 95.0% 0.024 45 | steps band, notes | — | — |
| `--color-line` | #e0d9d2 | 89.0% 0.012 70 | hairlines, card borders | 1.30 | — |
| `--color-ink` | #291f19 | 25.0% 0.018 55 | headings, display | **15.0** | 13.8 |
| `--color-ink-2` | #4b4038 | 38.0% 0.020 55 | body copy | **9.4** | 8.6 |
| `--color-ink-3` | #645850 | 47.0% 0.020 55 | labels, 12px text | **6.4** | 5.9 |
| `--color-accent` | #9c4535 | 50.0% 0.120 32 | links, CTA fill, focus, call bar | **5.9** | 5.4 |
| `--color-accent-2` | #dc8d7d | 72.0% 0.100 32 | step rail (non-text) | 2.4 | — |
| `--color-destructive` | #a1252f | 47.0% 0.160 22 | form errors | **6.9** | 6.4 |

**The practice's own three**, lifted off the logo mark — the olive line of the
profile and two of the three petals. They are a second register for the hero
and travel nowhere else on the site.

| Token | Hex | OKLCH | Role | On paper |
|---|---|---|---|---|
| `--color-olive` | #657267 | 53.8% 0.023 150 | hero eyebrow | **4.70** |
| `--color-clay` | #cfa98b | 76.1% 0.061 60 | hero rule, separators | 2.01 |
| `--color-sand` | #e5d9c9 | 89.1% 0.025 75 | the hero plate's ground | 1.29 |

Olive is text-grade on paper only; on sand it falls to 3.63, so nothing set on
the plate uses it — the plate's own type is ink (11.58) and ink-2 (7.23). Clay
is ornament: rules and separators, never a glyph.

Every figure is WCAG 2.1, measured with the script in the scratchpad, not
estimated. Hairlines sit below 3:1 on purpose: they separate, they do not
inform. Form-field borders use `ink-3` at 6.4:1.

Focus ring: 2px `--color-accent`, offset 3px, never animated.

## Typography
Two faces. Headings in **Alegreya Sans** (700, and 800 for the page's one h1),
body in **Manrope** (variable 200–800), both self-hosted through `next/font`
with the Greek subset. Alegreya Sans is humanist with calligraphic roots: its
warmth is in the flared stems and open apertures, not in rounding, which is
what keeps a children's practice from reading as a nursery. Body 400, 600 for
emphasis and labels. The OG cards carry the same pairing — `assets/fonts` holds
the static TTFs Satori needs, since it cannot read the CSS custom properties.

- Display tracking −0.022em · line-height 1.08 · `text-wrap: balance`
- Body tracking +0.004em · `text-wrap: pretty`
- Anchors: home h1 `clamp(2.4rem, 4.2vw + 1rem, 4.5rem)` · inner h1
  `clamp(2.1rem, 3.6vw + 0.5rem, 3.6rem)` · section h2
  `clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)` · card title 1.125–1.25rem ·
  body 1–1.125rem · label 0.75rem uppercase, tracking 0.14em
- No italic anywhere in headings.

## Spacing
Tailwind's 4-pt utilities. Sections `py-16 md:py-24`; the trust and article
bands tighter (`py-12 md:py-16`); inner openers `pt-10 md:pt-14`. Page
container `.shell`: max 80rem, `padding-inline: clamp(1rem, 5vw, 4rem)`.

## Surfaces
- `--radius-card` 12px · `--radius-input` 8px · `--radius-pill` 999px.
- Cards: paper-2, 1px `line` border, two-layer soft shadow (`--shadow-card`).
  Link-cards lift 2px on hover and the border warms to `accent-2`. No hard
  shadows, no square corners.
- `.note`: blush ground, no border, no shadow.
- Photographs: rounded plate with the card shadow; native `<dialog>` lightbox.

## Motion
- Easings: `--ease-expo` (entering) · `--ease-in-quart` (leaving) ·
  `--ease-standard` (state toggles). Durations 90 / 180 / 320 / 560 / 900ms.
- One orchestrated hero entrance (CSS keyframes, 70ms stagger) plus one
  scroll-linked rise (`animation-timeline: view()`, transform only, never
  opacity, off below 40rem and under reduced motion). The rise is opt-in: the
  `.reveal` class, on two lists, never on every section — a page where
  everything arrives is a page that never settles.
- Cross-document view transitions; the nav pill is named and holds still.
- Nothing bounces. Nothing pulses. Nothing delays the phone number.

## CTA voice
- Primary `.pill`: filled accent, paper text, soft shadow, 48px min height,
  verb + object («Καλέστε 23920 36417»). Lifts 1px on hover, seats on press.
- Secondary: typographic link, semibold accent, persistent 1px underline that
  retracts on hover, arrow icon.
- Outlined `.pill-outline` exists for a tertiary action; unused on v1.
- Mobile: the fixed call bar (filled accent) is the only other filled surface.

## Navigation and footer
- Nav: **N5 floating pill** — sticky, detached, max 52rem, blur backdrop,
  wordmark with the speech-bubble mark left, link cluster centre, phone pill
  right. Below `lg` the links fold into a full-screen panel.
- Footer: **Ft5 statement** — one closing sentence in display type, then
  name / address / links in small type, disclaimer last.

## Per-page allowances
- Home MAY use the therapist's portrait and two photographs of the rooms.
- Content pages: typography only; photographs inline at reading width.
- Index pages: no images.

The hero is the exception: its plate always carries the practice's mark, never
a photograph. A face in the first screen reads as a banner; the portrait
belongs on the biography, where it reads as a person.

Everything else is gated on `photosReady` in `lib/site.ts`. While it is
`false`, the galleries and the portrait stand down and nothing invented is
published. See CONTENT.md § 6.

Numbers on the page are the same rule. No rating, no counts, no percentages
unless the practice supplies them — the trust section links to the reviews at
their source rather than restating a figure copied off a directory.

## What pages MUST share
The nav pill and the footer; the palette and the accent budget; Manrope; the
CTA voice; section h2 size, opener shape, label style.

## Exports

### tokens.css
```css
:root {
  --color-paper:       oklch(97.6% 0.007 75);
  --color-paper-2:     oklch(99.2% 0.004 75);
  --color-blush:       oklch(95.0% 0.024 45);
  --color-line:        oklch(89.0% 0.012 70);
  --color-ink:         oklch(25.0% 0.018 55);
  --color-ink-2:       oklch(38.0% 0.020 55);
  --color-ink-3:       oklch(47.0% 0.020 55);
  --color-accent:      oklch(50.0% 0.120 32);
  --color-accent-2:    oklch(72.0% 0.100 32);
  --color-accent-ink:  oklch(97.6% 0.007 75);
  --color-destructive: oklch(47.0% 0.160 22);
  --color-focus:       oklch(50.0% 0.120 32);

  /* hero only, from the logo mark */
  --color-olive:       oklch(53.8% 0.023 150);
  --color-clay:        oklch(76.1% 0.061 60);
  --color-sand:        oklch(89.1% 0.025 75);

  --font-display: "Alegreya Sans", "Segoe UI", system-ui, sans-serif;
  --font-body:    "Manrope", "Segoe UI", system-ui, sans-serif;

  --space-xs: 0.5rem; --space-sm: 0.75rem; --space-md: 1rem; --space-lg: 1.5rem;
  --space-xl: 2.5rem; --space-2xl: 4rem; --space-3xl: 6rem;

  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-md: 1.125rem;
  --text-lg: 1.25rem; --text-xl: 1.5rem; --text-2xl: 2.75rem;
  --text-display: clamp(2.4rem, 4.2vw + 1rem, 4.5rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.5, 0, 0.75, 0);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-tap: 90ms; --dur-quick: 180ms; --dur-base: 320ms; --dur-slow: 560ms;
  --radius-card: 12px; --radius-pill: 999px; --radius-input: 8px;
  --rule-hair: 1px;
}
```

### Tailwind v4 `@theme`
The live block is `app/globals.css`.
