---
name: frontend-implementer
description: >
  Governs HTML, CSS, and JS implementation for this portfolio. Activates for
  any coding task: writing new sections, refactoring existing code, fixing
  bugs, optimising performance, or adding motion. Enforces the CSS
  architecture, token system, semantic HTML standards, and performance budget
  for this project.
---

# Frontend Implementer

Write it right the first time. One change at a time. Verify before moving on.

---

## Project stack

- `index.html` — single static file at project root, no framework, no build system
- `assets/css/reset.css`, `variables.css`, `fonts.css`, `base.css`, `layout.css`,
  `components.css`, `sections.css` — 7 CSS files, loaded in that order in `<head>`
- `assets/js/main.js` — interaction logic: work-row accordion, preview plate,
  nav behaviour, contact form wiring
- `assets/js/motion.js` — all GSAP timelines. ScrollTrigger section reveals,
  entrance animations, parallax. No GSAP logic lives in `main.js`.
- No npm, no bundler. External: GSAP via CDN only (`defer` attribute).
- `assets/fonts/` — 14 TTF files. Loaded via `@font-face` in `fonts.css` only.
- `assets/img/` — brand logos, portrait, work placeholder, one AVIF placeholder.

---

## CSS architecture

### File responsibilities

| File | Contains |
|---|---|
| `reset.css` | Normalise. Box-sizing, margin, padding, list-style. Nothing else. |
| `variables.css` | All design tokens. Colours, type scale, spacing, duration, easing. |
| `fonts.css` | `@font-face` declarations only. 14 faces. No other rules. |
| `base.css` | Body defaults, global type, selection, focus ring, scroll behaviour. |
| `layout.css` | Scene scaffolding. `.section-*` heights, safe zones, grid containers. |
| `components.css` | Reusable pieces: `.work-row`, `.service-row`, `.site-nav`, `.btn`. |
| `sections.css` | Section-specific rules not generalisable elsewhere. |

**Rule**: before adding CSS to any file, read it first. Put the rule in the
file whose responsibility matches it. If the rule spans two files, it belongs
in the more general one.

### Token system

All values come from `variables.css`. Never hardcode a hex, a px font-size, or
a duration more than once.

Core token categories:
- `--color-ink`, `--color-bone`, `--color-ember` — palette (only three)
- `--content-left: 96px`, `--content-inset: 152px` — layout anchors
- `--fs-*`, `--lh-*`, `--ls-*` — type scale
- `--space-*` — spacing scale (4px base)
- `--duration-fast`, `--duration-normal`, `--ease-out-expo` — motion

When a value recurs more than twice in any file, extract it to a token.

### Property ordering within a rule

```
/* Box model */
display, position, top/right/bottom/left, inset, z-index, width, height

/* Typography */
font-family, font-size, font-weight, line-height, letter-spacing, color,
text-transform, text-decoration

/* Visual */
background, border, border-radius, opacity, box-shadow, outline

/* Animation */
transform, transition, animation, will-change
```

---

## HTML standards

### Semantic structure

```html
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <section aria-labelledby="[heading-id]">
    <h1 id="[heading-id]">...</h1>
  </section>
</main>
<footer>...</footer>
```

Do not reach for `<div>` when a semantic element exists.

### Images

Every `<img>` needs:
- `width` and `height` attributes matching intrinsic size (prevents CLS)
- `alt` text (empty string `alt=""` for decorative images)
- `loading="lazy"` except for the hero image (`loading="eager" fetchpriority="high"`)

### Forms

The contact form uses `name`, `email`, `message` fields. Inputs are
`type="text"`, `type="email"`, `type="textarea"`. Labels are explicit, not
placeholder-only. No default browser styling — use `appearance: none` and
token-based styling.

---

## Motion rules

Animate only compositor-friendly properties: `transform`, `opacity`,
`clip-path`, `filter` (sparingly). Never animate `width`, `height`, `top`,
`left`, `margin`, `padding`, `font-size`.

For GSAP: use `ScrollTrigger` for section reveals and parallax. Keep all
timeline definitions in `motion.js`. Do not inline GSAP logic in `main.js`.

Always provide a `prefers-reduced-motion` fallback:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

`will-change` only on elements that are actively animating. Remove it
immediately after the animation ends if the element is static afterward.

---

## Performance budget (microsite class)

| Asset | Budget |
|---|---|
| JS (gzipped) | < 80 KB |
| CSS (gzipped) | < 15 KB |
| LCP | < 2.5s on throttled 3G |
| CLS | < 0.1 |

- Hero image/video: `loading="eager"`, `fetchpriority="high"`, poster preloaded
- All other images: `loading="lazy"`
- Fonts: `font-display: swap`, preload only the critical weight
- GSAP: loaded from CDN with `defer`

---

## Editing protocol

1. Read the target file before editing it. Understand the existing pattern.
2. Grep for the selector or function before adding a new one. Don't duplicate.
3. Make one change. Run the verification loop. Then make the next.
4. Never edit `variables.css` without reading all 7 CSS files first — token
   renames cascade everywhere.
5. Never edit `fonts.css` without checking `@font-face` references in base.css.

---

## Verification after every change

1. Confirm preview server is running.
2. `preview_inspect` on the changed selector. Measure the computed value.
3. Compare to `docs/figma-audit.md`. Tolerance: ±1px.
4. `preview_console_logs` — zero errors before claiming done.
5. `preview_network` — no unexpected external calls.

---

## Anti-patterns

- Editing without reading the file first
- Adding a rule without searching for existing rules on the same selector
- Hardcoding any value that appears twice
- Using `px` for line-height (use unitless)
- Using `vh` without a `dvh` modern override for mobile viewport
- Using `position: fixed` for elements that should be `absolute` within a section
- Animating layout-bound properties
- Leaving `will-change` on static elements
- Committing without being asked
