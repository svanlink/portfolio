# Responsive Web Design — Ethan Marcotte

## Summary

The 2011 manifesto that named the field. A short, practical book written for working front-end designers who want to translate a single Photoshop comp into a layout that adapts to any viewport. Its three pillars are the fluid grid, flexible images, and media queries. Everything the modern responsive web takes for granted starts here, so the value now is less in the tactics than in the underlying proportional thinking: the book teaches you to stop translating pixels verbatim and start expressing every measurement as a ratio of its container.

## Techniques / patterns

1. **The fluid formula.** `target ÷ context = result`. Divide the target pixel value from the comp by the width or size of its containing element. The result is a relative unit (percentage for width and margin, `em` for font sizes) that scales with its context.
2. **Context-aware nesting.** When an element is nested inside another flexible element, recompute its percentage against the nearest flexible ancestor, not against the page. A 566px main column inside a 900px blog inside a 960px page uses 900 as context for `.main`, not 960.
3. **Keep the raw math in a CSS comment.** Write `width: 93.75%; /* 900px / 960px */` so the proportion is still legible during future edits. Never round to a pretty number; trust the browser to handle the long decimal.
4. **Flexible type in ems.** Set `font-size: 100%` on `body`, then size every child with `target / 16 = em`. When you drop into a nested context, recompute against the parent's computed pixel size, not 16px.
5. **Fluid images via `max-width: 100%`.** Apply to `img, embed, object, video`. Prevents overflow without capping upscale and preserves aspect ratio in every modern browser.
6. **Separate IE6 stylesheet uses `width: 100%`.** IE6 ignores `max-width`, so fall back to `width: 100%` but scope it with `.full` class selectors so thumbnails are not force-stretched.
7. **Viewport meta is non-negotiable.** `<meta name="viewport" content="width=device-width, initial-scale=1">`. Without it, mobile Safari renders at 980px and shrinks.
8. **Consolidate media queries in one stylesheet.** One request is better than many. Separate stylesheets per breakpoint multiply HTTP overhead.
9. **Min-width ladder for mobile-first.** Define a default linear layout in the cascade root, then layer `@media (min-width: 600px)`, `(min-width: 1024px)`, `(min-width: 1200px)` upward. Each block only contains the deltas.
10. **Chain feature queries.** `@media screen and (min-device-width: 480px) and (orientation: landscape)` when a single axis is insufficient.
11. **Survey-driven breakpoint list.** Rather than guessing, list the target resolutions for the real device set (320, 480, 600, 768, 1024, 1200) and treat breakpoints as testing checkpoints, not as canonical device widths.
12. **Linearize at narrow widths.** Below the smallest useful breakpoint, collapse multi-column floats or grid tracks into one column. The desktop comp defines a point on the curve; the designer owns the reflow.
13. **Grid nav at narrow viewports.** Transform an inline nav into a 2×2 grid with `float: left; width: 48%` when the viewport drops below ~520px, rather than letting items wrap awkwardly.
14. **Negative margins scale proportionally too.** A `-81px` pull on a 474px-wide article becomes `margin-left: -17.0886076%`. The formula does not care about the sign.

## Code snippets worth remembering

```css
/* Fluid grid, proportional nesting */
#page   { width: 90%; margin: 36px auto; }
.blog   { width: 93.75%;  margin: 0 auto 53px; /* 900 / 960 */ }
.main   { width: 62.8889%; float: left;  /* 566 / 900 */ }
.other  { width: 36.7778%; float: right; /* 331 / 900 */ }
```

```css
/* Fluid type in ems, math in the comment */
body { font-size: 100%; /* 16px baseline */ }
h1   { font-size: 1.5em;    /* 24 / 16 */ }
h1 a { font-size: 0.4583333em; /* 11 / 24 — context is h1, not body */ }
```

```css
/* The one rule that prevents every image overflow */
img, embed, object, video { max-width: 100%; }
```

```css
/* Mobile-first min-width ladder */
/* default: single column, full-bleed */
@media screen and (min-width: 600px)  { /* small tablet tweaks */ }
@media screen and (min-width: 1024px) { /* desktop layout kicks in */ }
@media screen and (min-width: 1200px) { /* wide-screen refinements */ }
```

```html
<!-- Required on every responsive page -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Anti-patterns

- Translating pixels from the comp straight into CSS. The point of the fluid formula is to break that habit.
- Rounding the decimal result to something "nicer." `0.45833333em` is correct; `0.46em` is a different number.
- Serving a separate mobile site at `/mobile/`. Fragments content, breaks shared links, forces maintenance of two trees.
- Relying on the `handheld` media type. Most mobile browsers ignore it and pick up `screen` stylesheets instead.
- Downloading desktop-weight assets on phones. Hide-with-display-none does not prevent the network request.
- Assuming mobile means "on the go, low bandwidth." A large share of phone traffic is on home Wi-Fi. Design for the viewport, not an imagined context.
- Capping images with `width: 100%` by default. That forces upscale on small images; prefer `max-width`.

## Page or file references

- Source on disk: `~/Downloads/RESPONSIVE_WEB_DESIGN_Ethan_Marcotte.pdf` (157 pages)
- Ch 1 *Our Responsive Web*, pp 1–12 — philosophy, skim only
- Ch 2 *The Flexible Grid*, pp 13–41 — fluid formula, type and width in ems/%
- Ch 3 *Flexible Images*, pp 42–63 — `max-width: 100%`, IE6 fallback
- Ch 4 *Media Queries*, pp 64–105 — query syntax, breakpoint survey
- Ch 5 *Becoming Responsive*, pp 106–139 — mobile-first argument, nav patterns
- NotebookLM source ID: `0dec4929-aedc-4...`
