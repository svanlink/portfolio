# Figma → Implementation Spec

Maps each Figma node in Sections 01, 02, 03 to the CSS selector implementing it.
Raw measurements are against a 1728 × 1000 Figma frame. The CSS converts them to fluid units so the layout scales proportionally at any viewport — horizontal values as `vw` (÷ 1728), vertical values as `vh` (÷ 1000), within-player offsets as `%` (÷ 1013). Font sizes, icon dimensions, and border weights stay in `px`. For the full conversion table see the "Fluid unit conversion model" section in `figma-audit.md`.
Last verified: 2026-04-24 via Figma MCP.

---

## Section 01 — Hero (node 1:56)

| Figma element | Node | Selector | Key CSS properties |
|---|---|---|---|
| Section frame | 1:56 | `.section-hero` | `height: 100vh`; `background: var(--color-ink)`; `position: relative` |
| Background media | — | `.hero-media`, `.hero-video iframe` | `position: absolute; inset: 0`; zoom-to-fill transform |
| Image fallback | — | `.video-fallback` | `object-fit: cover`; removed after Vimeo play event |
| Nav bar | 1:57 | `.site-nav` | `height: 64px`; `background: var(--color-nav-bg)`; `position: fixed`; `top: 0`; `width: 100%` |
| Nav background | 1:58 | `.site-nav::before` or `.nav-bg` | `background: #000`; `opacity: 0.80`; overflow fill (wider than viewport) |
| Nav links group | 10:175 | `.nav-links` | `position: absolute`; `left: 1331px`; `top: 20px`; flex row; `gap: 48px` |
| Nav link | 1:59–1:61 | `.nav-link` | `font-family: var(--font-mono)`; `font-size: 16px`; `font-weight: 700`; `line-height: 24px`; `letter-spacing: -0.32px`; `text-transform: uppercase`; `color: var(--color-bone)` |
| Logo | 1:62 | `.nav-logo` | SVG 34 × 31 px; **centre at x = 145 px** (not 96); `position: absolute`; vertically centred in 64 px bar |

**Logo position note:** The logo centre is at x = 145 px from the section left edge (`calc(50% - 719px)` in a 1728 px frame). It is not aligned to the 96 px content anchor. CSS should use `left: 128px` (left edge) or replicate the Figma calc.

---

## Section 02 — Selected Work (node 1:65)

| Figma element | Node | Selector | Key CSS properties |
|---|---|---|---|
| Section frame | 1:65 | `.section-work` | `height: 100vh`; `background: var(--color-bone)` |
| Safe zone top | 1:72 | — | Implicit — content starts at y = 120 px |
| Safe zone bottom | 1:75 | — | Implicit — content ends at y = 880 px |
| Heading | 1:19 | `.work-heading` | `position: absolute`; `top: 120px`; `left: var(--content-left)`; `font-family: var(--font-display)`; `font-size: var(--fs-heading)`; `line-height: var(--lh-heading)`; `letter-spacing: var(--ls-heading)`; `font-weight: 700`; `color: var(--color-ink)` |
| Row hairline above 01 | 10:145 | `.work-row__rule` | `position: absolute`; `top: 0`; `left: 0`; `width: 447px`; `border-top: 1px solid var(--ink-10)` |
| Row (inactive) | 10:138–10:141 | `.work-row` | `position: relative`; `height: 89px`; `opacity: 1` (container not dimmed; children at 0.30) |
| Row (active) | 10:115 | `.work-row.is-active` | `height: 201px` |
| Row container opacity | — | `.work-row:not(.is-active)` | `opacity: 0.30` (applies to whole container — title, index, meta) |
| Row index | 7:26, 10:162–10:166 | `.work-row__index` | `position: absolute`; `top: 20px`; `left: var(--content-left)`; `font-family: var(--font-index)`; `font-size: var(--fs-index)`; `font-weight: 700`; `line-height: var(--lh-index)`; `letter-spacing: var(--ls-index)`; `color: var(--color-ink)` |
| Active row index colour | 7:26 | `.work-row.is-active .work-row__index` | `color: var(--color-index-active)` (= #61757c); `opacity: 1` |
| Row title | 7:18, 7:33, etc. | `.work-row__title` | `position: absolute`; `top: 20px`; `left: var(--content-inset)`; `font-family: var(--font-subtitle)`; `font-size: var(--fs-subtitle-bold)`; `font-weight: 700`; `line-height: var(--lh-subtitle-bold)`; `letter-spacing: var(--ls-subtitle-bold)`; `color: var(--color-ink)` |
| Row meta | 10:108, 10:116, etc. | `.work-row__meta` | `position: absolute`; `top: 57px`; `left: var(--content-inset)`; `font-family: var(--font-mono)`; `font-size: var(--fs-caption)`; `line-height: var(--lh-caption)`; `letter-spacing: var(--ls-caption)`; `color: var(--color-meta)`; `text-transform: uppercase`; `display: flex`; `gap: 28px` |
| Row body | 7:27 | `.work-row__body` | `position: absolute`; `top: 65px`; `left: var(--content-inset)`; `width: 392px`; `font-family: var(--font-body)`; `font-size: var(--fs-body)`; `line-height: var(--lh-body)`; `color: var(--color-ink)`; **`opacity: 0.60`**; display none on inactive rows |
| Player plate | 7:30 | `.work-player` | `position: absolute`; `top: 215px`; `left: 619px`; `width: 1013px`; `height: 570px`; `background: var(--color-ink)`; `overflow: hidden` |
| Player image | 1:18 | `.work-player__image` | `object-fit: cover`; `width: 100%`; `height: 100%` |
| Player gradient | — | `.work-player__image::after` or overlay div | `background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.20) 100%)` (stops at 66.35%) |
| Player iframe | — | `.work-player__frame` | `position: absolute`; `inset: 0`; `width: 100%`; `height: 100%` |
| Caption bar | 10:158 | `.work-player__caption` | `position: absolute`; `bottom: 0`; `left: 0`; `width: 100%`; `height: 40px`; `background: var(--ink-40)` |
| Caption title | 10:159 | `.work-player__caption-title` | `position: absolute`; `left: 32px`; `top: 50%`; `transform: translateY(-50%)`; `font-family: var(--font-mono)`; `font-size: var(--fs-caption)`; `line-height: var(--lh-caption)`; `letter-spacing: var(--ls-caption)`; `text-transform: uppercase`; `color: var(--color-bone)` |
| Caption year | 10:160 | `.work-player__caption-meta` | Same as title; `left: 232px` |

**Opacity model for §02:** The Figma applies `opacity: 0.30` to the entire inactive row container. The active row has no container-level opacity. The active row's body text has `opacity: 0.60` individually. Index colour changes from `#000` to `#61757c` on the active row.

**Hairline positions (absolute y from section top):**
Row 01: y = 215 · Row 02: y = 416 · Row 03: y = 505 · Row 04: y = 594 · Row 05: y = 683

---

## Section 03 — Services (node 11:176)

| Figma element | Node | Selector | Key CSS properties |
|---|---|---|---|
| Section frame | 11:176 | `.section-services` | `height: 100vh`; `background: var(--color-bone)` |
| Heading | 11:178 | `.services-heading` | `position: absolute`; `top: 120px`; `left: var(--content-left)`; `font-family: var(--font-display)`; `font-size: var(--fs-heading)`; `line-height: var(--lh-heading)`; `letter-spacing: var(--ls-heading)`; `font-weight: 700`; `color: var(--color-ink)` |
| Grid line | 11:317–11:366 | `.service-row__rule` | `position: absolute`; `top: 0`; `left: var(--content-left)`; `right: var(--content-left)`; `border-top: 1px solid var(--ink-10)` |
| Row (inactive) | — | `.service-row` | `position: relative`; `height: 93px` |
| Row (active) | 11:357 | `.service-row.is-active` | `height: 197px` |
| Row title | 11:316, 11:355, etc. | `.service-row__title` | `position: absolute`; `top: 32px`; `left: var(--content-left)`; `font-family: var(--font-subtitle)`; `font-size: var(--fs-subtitle-reg)`; `font-weight: 400`; `line-height: var(--lh-subtitle-reg)`; `letter-spacing: var(--ls-subtitle-reg)`; `color: var(--color-ink)`; `opacity: 0.20` (inactive) |
| Active row title | 11:357 | `.service-row.is-active .service-row__title` | `opacity: 1.0` |
| Row arrow | 11:382–11:386 | `.service-row__arrow` | `position: absolute`; `top: 31px`; `left: 1554px`; `width: 32px`; `height: 32px`; outlined circle SVG with NE arrow; `display: none` on active row |
| Row body | 11:367 | `.service-row__body` | `position: absolute`; `top: 90px`; `left: var(--content-left)`; `width: 1275px`; `font-family: var(--font-body)`; `font-size: var(--fs-body)`; `line-height: var(--lh-body)`; `color: var(--color-ink)` |
| Closing rule | 11:366 | `.services-list__closing-rule` | `position: absolute`; `top: 879px`; `left: var(--content-left)`; `right: var(--content-left)`; `border-top: 1px solid var(--ink-10)` |

**Grid line positions (absolute y from section top):**
217 · 310 · 403 · [active row 197 px] · 600 · 693 · 786 · 879

**Closing rule formula:** `top: calc(217px + 93px × 2 + 197px + 93px × 3)` = 879 px.

**Arrow positions (y centred in inactive row):**
Creative Direction: ~264 · Cinematography: ~357 · Photography: ~647 · Visual Motion: ~740 · Color & Grade: ~833

---

## Shared tokens

All tokens defined in `assets/css/variables.css`.

| Token | Value | Use |
|---|---|---|
| `--content-left` | 96 px | Left anchor — headings, rules, index, §03 titles |
| `--content-inset` | 152 px | §02 row content — title, meta, body |
| `--nav-height` | 64 px | Nav bar height |
| `--safezone` | 120 px | Top and bottom safe zones |
| `--site-width` | 1728 px | Reference frame width |
| `--fs-heading` / `--lh-heading` / `--ls-heading` | 36 / 42 / −0.72 px | §01/02/03 headings |
| `--fs-subtitle-bold` / `--lh-subtitle-bold` / `--ls-subtitle-bold` | 24 / 32 / −0.48 px | §02 row titles |
| `--fs-subtitle-reg` / `--lh-subtitle-reg` / `--ls-subtitle-reg` | 36 / 40 / −0.72 px | §03 service titles |
| `--fs-body` / `--lh-body` | 16 / 19.2 px | Body copy |
| `--fs-caption` / `--lh-caption` / `--ls-caption` | 12 / 12 / −0.24 px | Meta, captions |
| `--fs-nav` / `--lh-nav` / `--ls-nav` | 16 / 24 / −0.32 px | Nav links |
| `--fs-index` / `--lh-index` / `--ls-index` | 24 / 32 / −0.48 px | Work index numbers |
| `--color-index-active` | #61757c | Active row index |
| `--color-meta` | #a7a7a7 | Meta text |
| `--ink-10` | rgba(0,0,0,0.10) | Hairline rules |
| `--ink-40` | rgba(0,0,0,0.40) | Caption bar |
| `--ink-60` | rgba(0,0,0,0.60) | Active row body opacity |
| `--color-nav-bg` | rgba(0,0,0,0.80) | Nav background |
