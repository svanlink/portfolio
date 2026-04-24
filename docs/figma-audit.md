# Figma Audit — Portfolio

Source: Figma file `JWt6OLpeh0o047V1mC3rTx` (Portfolio).
Last verified: 2026-04-24 via Figma MCP (`get_design_context` + `get_metadata`).
Frames of record: Section 01 (node `1:56`), Section 02 (node `1:65`), Section 03 (node `11:176`).
Base frame: 1728 × 1000 per section.
Global safe zones: 120 px top / 120 px bottom.
Content-left anchor: x = 96. Content-inset anchor: x = 152.

---

## Fluid unit conversion model

All raw Figma measurements are in pixels against a 1728 × 1000 frame. The CSS implementation converts these to viewport-relative units so proportions hold at any screen size. Raw px values in this document are the source of truth; the formulas below derive the CSS values.

| Direction | Formula | Example |
|---|---|---|
| Horizontal position/size | `px ÷ 1728 × 100` → `vw` | 619 px → `35.822vw` |
| Vertical position/size | `px ÷ 1000 × 100` → `vh` | 215 px → `21.5vh` |
| Within-player offsets | `px ÷ 1013 × 100` → `%` | 32 px → `3.159%` |
| Icon / border sizes | keep `px` | 32 px icon, 1 px rule |
| Font sizes | keep `px` | `16px`, `36px` |

**What stays in px:** border widths, icon dimensions, font sizes, line-heights, letter-spacings. These do not scale with the viewport in the Figma design intent.

**Tokens:** `--content-left: 5.556vw` (96 ÷ 1728), `--content-inset: 8.796vw` (152 ÷ 1728). All selectors use these tokens rather than repeating the vw value.

---

## Typography — complete role table

All values sourced directly from `get_design_context`. Letter-spacing in the Figma API is reported in percent-of-em × 100 (so −2 = −0.02 em). All text roles use −0.02 em except body copy which is 0.

| Role | CSS family token | Figma family name | Weight | Size | Line-height | Line-height ratio | Letter-spacing px | Letter-spacing em |
|---|---|---|---|---|---|---|---|---|
| Section heading | `--font-display` (NeueHaasDisplay) | Neue Haas Grotesk Display Pro 75 Bold | 700 | 36 px | 42 px | 1.167 | −0.72 px | −0.02 em |
| Work row title (§02) | `--font-subtitle` (NeueHaasUnica) | Neue Haas Unica W1G Bold | 700 | 24 px | 32 px | 1.333 | −0.48 px | −0.02 em |
| Service row title (§03) | `--font-subtitle` (NeueHaasUnica) | Neue Haas Unica W1G Regular | 400 | 36 px | 40 px | 1.111 | −0.72 px | −0.02 em |
| Body copy | `--font-body` (HelveticaNow) | Helvetica Now Text Regular | 400 | 16 px | 19.2 px | 1.2 | 0 | 0 |
| Meta / caption | `--font-mono` (AtkinsonMono) | Atkinson Hyperlegible Mono Regular | 400 | 12 px | 12 px | 1.0 | −0.24 px | −0.02 em |
| Player caption | `--font-mono` (AtkinsonMono) | Atkinson Hyperlegible Mono Regular | 400 | 12 px | 12 px | 1.0 | −0.24 px | −0.02 em |
| Nav links | `--font-mono` (AtkinsonMono) | Atkinson Hyperlegible Mono Bold | 700 | 16 px | 24 px | 1.5 | −0.32 px | −0.02 em |
| Work index (01–05) | `--font-index` ('Helvetica Neue') | Helvetica Neue Bold | 700 | 24 px | 32 px | 1.333 | −0.48 px | −0.02 em |

**Note on index font:** Figma specifies "Helvetica Neue" (system) for the 01–05 index numbers, not Helvetica Now Text. `--font-index` falls back to `HelveticaNow` Bold if system Helvetica Neue is unavailable. This is intentional — no separate TTF is loaded.

---

## Colour values

| Token | Hex / value | Where used |
|---|---|---|
| `--color-ink` | `#000000` | Text, nav bar base, player plate, hairlines (at opacity) |
| `--color-bone` | `#ffffff` | §02, §03 section background |
| `--color-meta` | `#a7a7a7` | Row meta text, caption year |
| `--color-index-active` | `#61757c` | Active row index number |
| Nav bar | `rgba(0,0,0,0.80)` = `--color-nav-bg` | Nav background |
| Caption bar | `rgba(0,0,0,0.40)` = `--ink-40` | Player caption strip |
| Hairlines §02 | ink at ~10% opacity | Row separators (left column) |
| Hairlines §03 | ink at ~10% opacity | Row separators (full width) |
| Player gradient | `rgba(255,255,255,0)` → `rgba(0,0,0,0.20)` at 66.35% | Subtle vignette on player image |
| Active row body | `rgba(0,0,0,0.60)` = `--ink-60` | Body copy in active work row |
| Inactive rows | opacity 0.30 on container | §02 inactive row content |
| §03 inactive titles | opacity 0.20 on text | Service row titles (inactive) |

---

## Grid system

All sections use `position: absolute` for children. There is no CSS grid or flex column structure within sections — Figma uses absolute layout throughout. Preserve this in the CSS; do not coerce to flex.

| Property | Value | Notes |
|---|---|---|
| Section frame | 1728 × 1000 | CSS: `width: 100%; height: 100vh` |
| Content-left anchor | x = 96 px | `--content-left` — headings, rules, index numbers |
| Content-inset anchor | x = 152 px | `--content-inset` — §02 row titles, meta, body |
| Content-right anchor | x = 1632 px | = 1728 − 96 |
| Content width | 1536 px | = 1632 − 96 |
| Safe zone top | y = 0–120 px | `--safezone: 120px` |
| Safe zone bottom | y = 880–1000 px | Same token |
| Content area | y = 120–880 px | 760 px tall |

---

## Section 01 — Hero (node 1:56)

Frame: 1728 × 1000. Background: #000000 with full-bleed media behind nav.

### Nav bar (node 1:57)

| Element | Property | Value |
|---|---|---|
| Bar frame | size | 1728 × 64 px |
| Bar frame | position | top 0, left 0 |
| Bar background | fill | #000000 at 80% opacity |
| Bar background | width | 2048 px (overflows intentionally; clip on nav frame) |

### Nav links

Container: `left: 1331px`, `width: 301px`, `top: 20px` within bar (vertically centred in 64 px).

| Link | Left from section edge | Font | Size | Weight | Line-height | Letter-spacing | Case | Color |
|---|---|---|---|---|---|---|---|---|
| WORK | 1329 px | AtkinsonMono | 16 px | 700 | 24 px | −0.32 px | uppercase | #ffffff |
| ABOUT | 1441 px | AtkinsonMono | 16 px | 700 | 24 px | −0.32 px | uppercase | #ffffff |
| CONTACT | 1563 px | AtkinsonMono | 16 px | 700 | 24 px | −0.32 px | uppercase | #ffffff |

Gaps between links: WORK→ABOUT = 112 px, ABOUT→CONTACT = 122 px (approximately 48 px gap between text nodes based on Figma flex row logic).

### Logo (node 1:62)

| Property | Value | Notes |
|---|---|---|
| Size | 34 × 31 px (w × h) | SVG |
| Center x | 145 px from section left | `calc(50% - 719px)` of 1728 px frame |
| Left edge | ≈ 128 px | Center minus half-width (17 px) |
| Center y | 32.5 px | Vertically centred in 64 px nav bar |

The logo is NOT aligned to the 96 px content anchor. Its visual centre sits at x = 145 px.

---

## Section 02 — Selected Work (node 1:65)

Frame: 1728 × 1000. Background: #ffffff.

### Section heading (node 1:19)

| Property | Value |
|---|---|
| Text | "Selected Work" |
| Font | NeueHaasDisplay Bold |
| Size | 36 px |
| Line-height | 42 px |
| Letter-spacing | −0.72 px |
| Color | #000000 |
| Top (text top edge) | 120 px |
| Left | 96 px |

### Layout zones

| Zone | Left | Right | Width |
|---|---|---|---|
| Left column (rule + index + content) | 96 px | 619 px | 523 px |
| Left column content (title, meta, body) | 152 px | 544 px (title) / varies | — |
| Player plate | 619 px | 1632 px | 1013 px |
| Right margin | 1632 px | 1728 px | 96 px |

### Hairline rules

All hairlines start at x = 96, width = 447 px. Color: ink at ~10% opacity.

| Row | Hairline top y | Notes |
|---|---|---|
| Above row 01 | 215 px | Visually 2 px stroke (others are 1 px) |
| Above row 02 | 416 px | |
| Above row 03 | 505 px | |
| Above row 04 | 594 px | |
| Above row 05 | 683 px | |

### Row heights

| State | Height (hairline-to-hairline) | Container height (content only) |
|---|---|---|
| Active (row 01) | 201 px | 161 px |
| Inactive (rows 02–05) | 89 px | 49 px |

The container height is the visible content area. The extra space between container bottom and next hairline is white space that gives the row its editorial breathing room.

### Active row — row 01 (Decathlon Switzerland)

All positions are from the section top-left.

| Element | Left | Top | Width | Height | Font | Size | Weight | Color | Opacity |
|---|---|---|---|---|---|---|---|---|---|
| Index "01" | 96 | 235 | 27 | 32 | --font-index (Helvetica Neue) | 24 px | 700 | #61757c | 1.0 |
| Title | 152 | 237 | 490 | 29 | NeueHaasUnica | 24 px | 700 | #000000 | 1.0 |
| Meta row | 152 | 274 | 262 | 12 | AtkinsonMono | 12 px | 400 | #a7a7a7 | 1.0 |
| Body copy | 152 | 302 | 392 | 96 | HelveticaNow | 16 px | 400 | #000000 | **0.60** |

Meta row items separated by 28 px gap. Items (left to right): Category · Brand · Location · Year. Uppercase.

### Inactive rows

Container opacity: **0.30** applied to the whole row container.

| Row | Index | Index top y | Row container top y |
|---|---|---|---|
| 02 | "02" | 434 | 436 |
| 03 | "03" | 523 | 525 |
| 04 | "04" | 612 | 614 |
| 05 | "05" | 701 | 703 |

Inactive index color: #000000. Active index color: #61757c (override on row 01 only).

### Video player (node 7:30)

| Property | Value |
|---|---|
| Left | 619 px |
| Top | 215 px |
| Width | 1013 px |
| Height | 570 px |
| Background | #000000 |
| Image gradient | rgba(255,255,255,0) → rgba(0,0,0,0.20) stopping at 66.35% — subtle bottom vignette |

### Caption bar (node 10:158)

| Property | Value |
|---|---|
| Height | 40 px |
| Top (within plate) | 530 px → y = 745 from section top |
| Bottom-aligned | yes |
| Background | #000000 at 40% opacity |
| Title left | 32 px from plate left |
| Year left | 232 px from plate left |
| Font | AtkinsonMono Regular |
| Size | 12 px |
| Line-height | 12 px |
| Letter-spacing | −0.24 px |
| Color | #ffffff |
| Case | uppercase |

---

## Section 03 — Services (node 11:176)

Frame: 1728 × 1000. Background: #ffffff.

### Section heading (node 11:178)

| Property | Value |
|---|---|
| Text | "Services" |
| Font | NeueHaasDisplay Bold |
| Size | 36 px |
| Line-height | 42 px |
| Letter-spacing | −0.72 px |
| Color | #000000 |
| Top | 120 px |
| Left | 96 px |

### Grid lines

All span full content width: left = 96, right = 1632, width = 1536 px. Color: ink at ~10% opacity.

| Line | Top y | Between rows |
|---|---|---|
| Above Creative Direction | 217 px | — |
| Above Cinematography | 310 px | 93 px |
| Above Post-Production | 403 px | 93 px |
| Above Photography | 600 px | 197 px (active row) |
| Above Visual Motion | 693 px | 93 px |
| Above Color & Grade | 786 px | 93 px |
| Closing rule | 879 px | 93 px |

### Row heights

| State | Height | Notes |
|---|---|---|
| Inactive | 93 px | Rows 1, 2, 4, 5, 6 |
| Active | 197 px | Row 3: Post-Production |

### Service titles

Font: NeueHaasUnica Regular, 36 px / 40 px line-height / −0.72 px letter-spacing.
Left: **97 px** (1 px right of content-left anchor — Figma measurement; treat as 96 px in CSS).

| Service | Left | Top y | Width | Opacity |
|---|---|---|---|---|
| Creative Direction | 97 | 249 | 490 | **0.20** (inactive) |
| Cinematography | 97 | 342 | 490 | **0.20** (inactive) |
| Post-Production | 97 | 435 | 490 | **1.0** (active) |
| Photography | 97 | 632 | 490 | **0.20** (inactive) |
| Visual Motion | 97 | 725 | 490 | **0.20** (inactive) |
| Color & Grade | 97 | 818 | 490 | **0.20** (inactive) |

### Active row body (Post-Production)

| Property | Value |
|---|---|
| Font | HelveticaNow Regular |
| Size | 16 px |
| Line-height | 19.2 px |
| Color | #000000 |
| Left | 96 px |
| Width | 1275 px |
| Top | 493 px (90 px below active row hairline at 403) |

### Arrow icons (inactive rows only)

| Property | Value |
|---|---|
| Size | 32 × 32 px |
| Left edge | 1554 px (= 89.93% of 1728) |
| Shape | Outlined circle with NE-pointing arrow |
| Stroke | 1 px |
| Present on | All rows except active (Post-Production has none) |

Arrows at y (vertically centred in row): 264 (row 1 centre), 357 (row 2), 647 (row 4), 740 (row 5), 833 (row 6).

---

## Tokens confirmed from Figma MCP

| Token | Figma value | CSS token |
|---|---|---|
| Section heading | NHGD Bold 36 / 42 / −0.72 px | `--fs-heading`, `--lh-heading`, `--ls-heading` |
| Work row title | Unica Bold 24 / 32 / −0.48 px | `--fs-subtitle-bold`, `--lh-subtitle-bold`, `--ls-subtitle-bold` |
| Service row title | Unica Regular 36 / 40 / −0.72 px | `--fs-subtitle-reg`, `--lh-subtitle-reg`, `--ls-subtitle-reg` |
| Body | HelveticaNow Regular 16 / 19.2 | `--fs-body`, `--lh-body` |
| Caption/meta | AtkinsonMono Regular 12 / 12 / −0.24 px | `--fs-caption`, `--lh-caption`, `--ls-caption` |
| Nav | AtkinsonMono Bold 16 / 24 / −0.32 px | `--fs-nav`, `--lh-nav`, `--ls-nav` |
| Index | Helvetica Neue Bold 24 / 32 / −0.48 px | `--fs-index`, `--lh-index`, `--ls-index` |
| Safe zone | 120 px top + bottom | `--safezone` |
| Content-left | 96 px | `--content-left` |
| Content-inset | 152 px | `--content-inset` |
| Nav height | 64 px | `--nav-height` |
| Active index colour | #61757c | `--color-index-active` |
| Meta text colour | #a7a7a7 | `--color-meta` |

---

## Corrections from prior audit (pre-2026-04-24)

| Item | Previous value | Correct value | Source |
|---|---|---|---|
| Logo left anchor | x = 96 px | x ≈ 128 px (centre at 145 px) | `get_design_context` node 1:62 |
| Active row height §02 | 199 px | 201 px | Hairline positions 215 → 416 |
| Active row body opacity §02 | not documented | 0.60 | `get_design_context` node 7:27 |
| §03 service title left | 96 px | 97 px (use 96 px in CSS) | `get_design_context` node 11:316 |
| §03 grid line width | 1536 px | 1536 px (left 96 → right 1632) | confirmed ✓ |
| Body text Figma name | "Helvetica Now Text" | "Helvetica Now Text " (trailing space in API) | `get_design_context` style report |
