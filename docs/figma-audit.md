# Figma Audit — Portfolio

Source: Figma file `JWt6OLpeh0o047V1mC3rTx` (Portfolio).
Frames of record: Section 01 (node `1:56`), Section 02 (node `1:65`), Section 03 (node `11:176`).
Base frame: 1728 × 1000 per section.
Global safe zones: 120 px top / 120 px bottom. Content-left anchor x = 96.

---

## Section 01 — Hero (node 1:56)

Background image (full-bleed) + top navigation. **No hero headline text exists in the Figma frame.**

Navigation:
- Bar: 1728 × 64, background black at 80 % opacity, pinned to top.
- Logo (1:62): 31 × 34 SVG, left anchor x = 96, vertically centred in 64 px bar.
- Nav link group: right-aligned, contains `WORK`, `ABOUT`, `CONTACT` as individual text nodes.
  - Font: AtkinsonMono Bold 16 / 24, letter-spacing −0.32, colour `#ffffff`, uppercase.
  - Right edge at x = 1632 (inset 96 from frame right).
  - Approximate positions for reference: `WORK` at x ≈ 1329, `ABOUT` at x ≈ 1441, `CONTACT` at x ≈ 1563 (flex row with 48 px gaps would reproduce this to within a pixel).

Background:
- Single image node filling 1728 × 1000 behind the nav.

---

## Section 02 — Selected Work (node 1:65)

Background `#ffffff` (bone). Frame 1728 × 1000.

Heading:
- `Selected Work` — NeueHaasDisplay Bold 36 / 42 / −0.72, colour ink.
- Top 120, left 96.

Work list column (left):
- 5 work rows indexed `01–05`.
- Vertical rhythm: hairline rules at y = 217, 416, 505, 594, 683, 772 (ink @ 10 %).
- Active row height: 199 (only 01 is active in the Figma comp).
- Inactive row height: 89.
- Inactive opacity for both title and index: 0.30.
- Active index uses colour `#61757c`, opacity 1.0.

Per row:
- Index (`01`… `05`): HelveticaNeue Bold 24 / 32 / −0.48, top 18, left 96.
- Title: NeueHaasUnica Bold 24 / 32 / −0.48, top 20, left 152.
- Meta row (campaign / client / city / year): AtkinsonMono Regular 12 / 12 / −0.24, colour `#a7a7a7`, uppercase, 28 px gaps, top 57, left 152.
- Body copy (active only): HelveticaNow Regular 16 / 19.2, ink, width 392, top 85, left 152.
- Rule above row: 447 px wide, starting at left 96.

Player (right):
- Plate: 1013 × 570, top 215, left 619, background `#000000`.
- Video fills plate, cropped cover.
- Caption bar: 40 px tall, bottom-aligned, background ink @ 40 %.
  - Title block: AtkinsonMono Regular 12 / 12 / −0.24 white, uppercase, vertically centred, left 32.
  - Year block: same style, vertically centred, left 232.

---

## Section 03 — Services (node 11:176)

Background `#ffffff` (bone). Frame 1728 × 1000.

Heading:
- `Services` — NeueHaasDisplay Bold 36 / 42 / −0.72, ink.
- Top 120, left 96.

List:
- 6 rows + 1 closing rule.
- Rules at y = 217, 310, 403, 496, 589, 682, 775 (ink @ 10 %), from left 96 to right 96 (width 1536).
- Wait — correction from live measurement: the active row (`Post-Production`) expands to 197 px, shifting all subsequent rows down by 104 px. Final closing rule lives at y = 217 + 93 + 93 + 197 + 93 + 93 + 93 = 879.
- Inactive row height: 93.
- Active row height: 197.

Per row:
- Title: NeueHaasUnica Regular 36 / 40 / −0.72.
  - Inactive opacity: 0.20. Active opacity: 1.0.
  - Top 32, left 96.
- Arrow (inactive rows only): 32 × 32 outlined circle with NE-pointing arrow glyph, top 31, left 1554. Stroke width 1.
- Body copy (active row only): HelveticaNow Regular 16 / 19.2, ink, width 1275, top 90, left 96.

Row order (top to bottom): Creative Direction · Cinematography · Post-Production (active) · Photography · Visual Motion · Color & Grade.

---

## Tokens confirmed from `get_variable_defs`

| Token | Value |
|---|---|
| heading (§03) | NHGD Bold 36 / 42 / −2 |
| subtitle-regular (§03) | Unica Regular 36 / 40 / −2 |
| subtitle-bold (§02) | Unica Bold 24 / 32 / −0.48 |
| body | HelveticaNow Regular 16 / 19.2 |
| caption-mono | AtkinsonMono Regular 12 / 12 / −0.24 |
| nav-mono | AtkinsonMono Bold 16 / 24 / −0.32 |

Nav bar uses `#000000` at 80 % opacity. Body sections use `#ffffff`.
