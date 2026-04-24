# Mastering Front-End Development — Cybellium

## Summary

Cybellium, 476 pages. A broad survey of front-end development from HTML basics to career advice. The book is encyclopedic and shallow: most chapters restate common knowledge without depth. Its value for a senior practitioner is as a checklist of named techniques and numeric thresholds — font-display rules, CWV targets, line-length bounds, print-stylesheet specifics — that reinforce what is already known in more authoritative sources (Marcotte for RWD, CSS in Depth for CSS). Skip the HTML, JS and framework chapters entirely. The few keepers cluster in the print-CSS, motion-accessibility, and performance-budget sections.

## Techniques / patterns

1. **Cubic-bezier for natural easing.** Prefer `cubic-bezier(0.25, 1, 0.5, 1)` and similar expressive curves over `ease-in` / `ease-out` defaults. The latter are geometric, the former feel physical.
2. **`will-change` before heavy animation.** Promote a layer ahead of an expensive transform or opacity animation. Remove it when the animation ends — a permanent `will-change` wastes GPU memory.
3. **`prefers-reduced-motion` as a first-class query.** Every non-trivial transition ships with a `@media (prefers-reduced-motion: reduce)` branch that flattens or removes the motion. Treat it as a required accessibility contract, not a nice-to-have.
4. **Custom-property fallbacks.** Use the second argument of `var()` for resilience: `var(--color-accent, #3498db)`. Protects against unloaded stylesheets and theme swaps that leave gaps.
5. **Print-stylesheet rules worth copying.** Render anchor hrefs inline via `a::after { content: " (" attr(href) ")"; }`. Control layout flow with `page-break-before: always;` or `page-break-after: avoid;`. Use a 12pt base font size for legibility across physical media.
6. **Asset hashing for aggressive caching.** Ship bundles with a content hash in the filename (`main.[contenthash].js`). Combined with a long `Cache-Control: max-age=31536000, immutable`, repeat visits skip the network entirely.
7. **Route-level dynamic imports.** `import('./route').then(...)` signals Webpack (or Vite) to emit a separate chunk. Combine with a router that awaits the promise before mounting the route.
8. **Font-loading stack.** `font-display: swap;` on every `@font-face`. Subset the font to the actual character range used. For programmatic control, use the native `FontFace` API: `new FontFace('MyFont', 'url(font.woff2)').load().then(f => document.fonts.add(f))`.
9. **Performance-is-money framing.** A one-second delay in load time tracks with roughly seven percent fewer conversions and a significant drop in satisfaction. Useful for a client conversation that needs a dollar figure.
10. **Core Web Vitals numeric targets.** LCP under 2.5s, FID under 100ms (now INP under 200ms), CLS under 0.1. These are the Google search ranking thresholds, not aspirational goals.
11. **Critical CSS inlining.** Extract above-the-fold CSS, inline it in the `<head>`, defer the rest with `<link rel="preload" as="style" onload="...">` or async loading. Removes a render-blocking round-trip.
12. **`dns-prefetch` for third-party origins.** `<link rel="dns-prefetch" href="//cdn.example.com">` resolves DNS before the request lands. Cheap and compounding over many third-party assets.
13. **Conditional GET with ETag / Last-Modified.** The server responds 304 Not Modified when the resource is unchanged. Works out of the box with any reverse proxy; the win is zero payload on revisit.
14. **Stale-while-revalidate in a Service Worker.** Serve from cache immediately, fetch in the background, update the cache for the next visit. Users never wait on the network for a page they have seen before.
15. **Line length 50–75 characters.** A readability threshold that survives translation from print to web. Enforce with `max-width: 65ch` on body copy containers.
16. **Line-height 1.4–1.6 for body copy.** Tighter feels cramped, looser breaks the vertical grid. Set once at the root, override for display type only.
17. **`srcset` and `sizes` on every content image.** The browser picks the right resolution per viewport density. `loading="lazy"` on everything below the fold, `fetchpriority="high"` on the one hero asset above it.

## Code snippets worth remembering

```css
/* Motion accessibility — required on every transition */
.card {
  transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
```

```css
/* Print stylesheet essentials */
@media print {
  body { font-size: 12pt; color: #000; background: #fff; }
  a::after { content: " (" attr(href) ")"; font-size: 10pt; }
  h2, h3 { page-break-after: avoid; }
  .figure, .chart { page-break-inside: avoid; }
  .page-break { page-break-before: always; }
}
```

```html
<!-- Render-path basics: preload the hero, defer the rest -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="preload" as="image" href="/hero.avif" fetchpriority="high">
<link rel="preload" as="style" href="/app.css" onload="this.rel='stylesheet'">
<style>/* inlined critical CSS here */</style>
```

```js
// FontFace API — programmatic control, no FOIT
const font = new FontFace('Inter', 'url(/fonts/inter.woff2) format("woff2")', {
  weight: '400 700',
  display: 'swap',
});
font.load().then((loaded) => {
  document.fonts.add(loaded);
  document.documentElement.classList.add('fonts-loaded');
});
```

```js
// Route-level code splitting
const routes = {
  '/':        () => import('./pages/home'),
  '/work':    () => import('./pages/work'),
  '/about':   () => import('./pages/about'),
};
async function mount(path) {
  const { default: Page } = await routes[path]();
  return Page();
}
```

## Anti-patterns

- Permanent `will-change` on elements that only animate once. GPU memory leak and regression on scroll performance.
- Downloading a full font family for three words of display type. Subset aggressively or pick a variable font.
- `display: none` to "hide" assets on mobile. The browser still downloads the image; use `srcset` with appropriate sizes.
- CSS-in-JS that injects styles at render time with no extraction step. Defeats the purpose of a critical-path budget.
- Transitions on layout-bound properties (`width`, `height`, `top`, `margin`). Stay on `transform` and `opacity` to keep the compositor happy.
- Treating Core Web Vitals as a one-time audit. They regress with every feature; wire them into CI.
- Print styles as an afterthought. Clients and recruiters print portfolios; the output tells them whether you care.

## Page or file references

- Source on disk: `~/Downloads/mastering-front-end-development-a-comprehensive-guide-to-learn-front-end-development.pdf` (476 pages)
- Ch 4 *Advanced CSS Techniques* — transitions, cubic-bezier, variables, print, reduced motion
- Ch 8 *Webpack and Build Tools* — asset hashing, dynamic imports, font loading
- Ch 12 *Performance Optimization* — CWV thresholds, critical CSS, service workers, caching
- Ch 13 *Responsive Web Design* — fluid formula (identical to Marcotte), `srcset`, line-length
- NotebookLM source ID: `ca9cb481-7040-4`
- Overlap warning: this book's responsive-design chapter is a condensed restatement of Marcotte. The fluid formula and viewport-meta rule are not original here.
