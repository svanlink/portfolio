# Figma → Implementation Spec

This document maps each Figma node in Sections 01, 02, 03 to the exact CSS rule implementing it. See `figma-audit.md` for the node-level data.

---

## Section 01 — Hero

| Figma element | Selector | Key properties |
|---|---|---|
| Section frame | `.section-hero` | `height: 100vh`; `background: #000`; `position: relative` |
| Background media | `.hero-media`, `.hero-video iframe` | `inset: 0`, zoom-to-fill transform |
| Image fallback | `.video-fallback` | `object-fit: cover`; removed after Vimeo play event |
| Nav bar | `.site-nav` | `height: 64px`; `background: rgba(0,0,0,0.80)`; `position: fixed` |
| Logo | `.nav-identity > .nav-logo` | `31 × 34 SVG`; left anchor 96 |
| Nav link | `.nav-link` | AtkinsonMono Bold 16/24/−0.32 uppercase white |

---

## Section 02 — Selected Work

| Figma element | Selector | Key properties |
|---|---|---|
| Section frame | `.section-work` | `height: 100vh`; `background: bone` |
| Heading | `.work-heading` | top 120, left 96; NHGD Bold 36/42/−0.72 |
| List container | `.work-list` | top 217, absolute, no list-style |
| Row (inactive) | `.work-row` | height 89 |
| Row (active) | `.work-row.is-active` | height 199 |
| Row hairline | `.work-row__rule` | top 0, left 96, width 447, border-top 1px ink@10% |
| Row index | `.work-row__index` | top 18, left 96; HelveticaNeue Bold 24/32/−0.48 |
| Row title | `.work-row__title` | top 20, left 152; Unica Bold 24/32/−0.48 |
| Row meta | `.work-row__meta` | top 57, left 152; AtkinsonMono 12, gap 28, uppercase, #a7a7a7 |
| Row body | `.work-row__body` | top 85, left 152, width 392; HelveticaNow 16/19.2; shown only on `.is-active` |
| Player plate | `.work-player` | top 215, left 619, 1013 × 570, bg ink |
| Player image | `.work-player__image` | `object-fit: cover` |
| Player iframe | `.work-player__frame` | fills plate |
| Caption bar | `.work-player__caption` | bottom 0, height 40, bg ink@40% |
| Caption title | `.work-player__caption-title` | abs, top 50%, left 32, uppercase, mono 12 white |
| Caption meta | `.work-player__caption-meta` | abs, top 50%, left 232, uppercase, mono 12 white |

Opacity rules:
- Inactive row: title + index at `opacity: 0.30`.
- Active row: title at 1.0; index gets colour `#61757c` + opacity 1.0.

---

## Section 03 — Services

| Figma element | Selector | Key properties |
|---|---|---|
| Section frame | `.section-services` | `height: 100vh`; `background: bone` |
| Heading | `.services-heading` | top 120, left 96; NHGD Bold 36/42/−0.72 |
| List container | `.services-list` | top 217, absolute |
| Row (inactive) | `.service-row` | height 93 |
| Row (active) | `.service-row.is-active` | height 197 |
| Row rule | `.service-row__rule` | top 0, left 96 right 96, border-top 1px ink@10% |
| Row title | `.service-row__title` | top 32, left 96; Unica Regular 36/40/−0.72; opacity 0.20 → 1.0 on active/hover |
| Row arrow | `.service-row__arrow` | top 31, left 1554, 32 × 32; inline SVG; hidden on active |
| Row body | `.service-row__body` | top 90, left 96, width 1275; HelveticaNow 16/19.2 |
| Closing rule | `.services-list__closing-rule` | top calc(217 + 93·4 + 197 + 93·2) = 879, left 96 right 96 |

---

## Shared tokens

See `assets/css/variables.css`:
- `--content-left: 96px`
- `--content-inset: 152px` (row title/meta/body anchor in §02)
- `--fs-heading / --lh-heading / --ls-heading` (§ headings)
- `--fs-subtitle-bold` (§02 row titles), `--fs-subtitle-reg` (§03 row titles)
- `--fs-body / --lh-body` (body copy)
- `--fs-caption / --lh-caption / --ls-caption` (meta + caption mono)

All positions quoted in px assume a 1728 × 1000 section frame.
