# CSS in Depth, 2nd edition — Keith J. Grant

## Summary

Manning, 2024. Companion code listings to Grant's second edition, which updates the first edition's cascade-and-box-model foundation for the modern CSS era: cascade layers, `oklch()`, `@property`, logical properties, container queries, and `@layer`-driven architecture. The repository is the authoritative set of working examples. What the book brings that no other source in this library does is the *ordering*: first-principles cascade and specificity, then modular composition, then modern features layered on top without breaking the foundation. Grant's `@layer reset, theme, global, modules` stack is the model to steal for any non-trivial CSS architecture.

## Techniques / patterns

1. **`@layer reset, theme, global, modules` stack.** The single most useful pattern in the book. Four named layers, declared in priority order at the top of the stylesheet. Every subsequent rule goes into one of them. The cascade becomes deterministic without specificity wars.
2. **Layer declaration order sets priority, not source order.** `@layer reset, theme, global, modules;` at the top means modules always win over reset even if reset is redeclared later. Re-read this rule until it sticks — it is the foundation of the whole approach.
3. **`revert-layer` keyword.** Inside a later layer, `all: revert-layer` rolls a property back to whatever the previous layer set. Lets a component opt out of a theme override without `!important`.
4. **`oklch()` as the default color format.** Perceptually uniform lightness, works in calc() and `from` expressions, supports wide-gamut displays. Every listing in Ch 15 uses it. Stop writing hex and hsl.
5. **Relative color with `oklch(from ...)`.** Derive related colors algorithmically: `oklch(from var(--brand) calc(l + 20%) c h)` for a lighter variant. Eliminates the drift that per-shade hex variables always acquire.
6. **`@property` for animatable custom properties.** A plain CSS variable cannot be transitioned. Register it with `@property { syntax: "<angle>"; inherits: false; initial-value: 0deg; }` and it animates like a first-class property. Unlocks hue-shift transitions and animated gradients.
7. **Logical properties by default.** Every Grant listing uses `max-inline-size`, `margin-inline`, `padding-block`, `min-block-size: 100dvh`. Switching between LTR and RTL, or between horizontal and vertical writing modes, becomes free.
8. **`100dvh` over `100vh`.** The dynamic viewport unit accounts for mobile browser chrome that hides and reveals on scroll. `100vh` overflows; `100dvh` does not.
9. **BEM for the modules layer.** `.dropdown`, `.dropdown__toggle`, `.dropdown__drawer`, `.dropdown.is-open`. Inside the `modules` layer the specificity concerns disappear, so BEM is for readability and boundary enforcement rather than specificity control.
10. **Component-scoped custom properties.** Define `--border-color`, `--text-color`, `--background-color` on the component root (`.dropdown { ... }`), then reference them from descendants. Theming and dark-mode variations swap the variable once instead of repeating `color` in twenty places.
11. **Reduced-motion reset inside the reset layer.** A universal selector override that clamps every animation and transition to 0.01ms when `prefers-reduced-motion: reduce`. Put it in the reset layer so every later rule inherits it automatically.
12. **`body { margin: unset; }` over `margin: 0`.** `unset` honors `revert-layer` semantics; hard-coded zeros block opt-out. Small distinction, pays off when the reset layer is reused across projects.
13. **Radial-gradient backgrounds with token pairs.** `radial-gradient(var(--bg-color-1), var(--bg-color-2))` anchored to two theme tokens. Atmospheric depth without an image asset.
14. **Transition on `height` via `height: auto` plus overflow trick.** Grant's dropdown uses `height: 0; overflow: hidden; transition: height 0.2s ease-out;` and sets `height: auto` on `.is-open`. Not pixel-perfect but broadly supported; for exact-height transitions, use a CSS grid with `grid-template-rows: 0fr` → `1fr`.
15. **`preconnect` before the Google Fonts stylesheet link.** Both `fonts.googleapis.com` and `fonts.gstatic.com` (with `crossorigin`). Without both, the browser pays two serial handshakes before any font byte arrives.
16. **`font-display: fallback` for brand fonts.** Grant uses `&display=fallback` in the Google Fonts URL — a middle ground between `swap` (any flash of fallback) and `block` (invisible text up to 3s). Fallback shows text immediately, then swaps only if the font arrives within 3s.
17. **`@layer modules { .card { ... } }` for component isolation.** Drop every component file inside the modules layer. Component order inside the layer no longer matters for specificity.

## Code snippets worth remembering

```css
/* The canonical 4-layer stack — put this at the top of every stylesheet */
@layer reset, theme, global, modules;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: unset; }
  img  { max-inline-size: 100%; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer theme {
  :root {
    --bg-color-1:    oklch(47% 0.10 238deg);
    --bg-color-2:    oklch(32% 0.08 238deg);
    --font-color:    white;
    --accent-yellow: oklch(87% 0.13  83deg);
  }
}

@layer global {
  body {
    min-block-size: 100dvh;
    background-color: var(--bg-color-1);
    background-image: radial-gradient(var(--bg-color-1), var(--bg-color-2));
    color: var(--font-color);
  }
}
```

```css
/* @property unlocks hue-shift transitions on a custom property */
@property --hue {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

button {
  --hue: 314deg;
  background-color: oklch(39% 0.10 var(--hue));
  transition: --hue 0.5s linear;
}
button:hover { --hue: 250deg; }
```

```css
/* Component-scoped tokens inside the modules layer */
@layer modules {
  .dropdown {
    --border-color:        oklch(61% 0.08 314deg);
    --text-color:          oklch(39% 0.06 314deg);
    --text-color-focused:  oklch(39% 0.20 314deg);
    --background-color:    white;
    --highlight-color:     oklch(95% 0.01 314deg);
  }
  .dropdown__toggle {
    padding: 0.5em 1em;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    background-color: var(--background-color);
    transition: background-color 0.2s linear;
  }
  .dropdown__toggle:hover { background-color: var(--highlight-color); }
}
```

```css
/* revert-layer lets a scoped rule opt out of an earlier-layer override */
@layer theme {
  .button { color: white; background-color: var(--brand-blue); }
}
@layer theme {
  /* Inside a blog, links should use the global link styles, not the button */
  .blog-content a:any-link { all: revert-layer; }
}
```

```html
<!-- Font loading preconnect + fallback display -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Raleway&display=fallback">
```

## Anti-patterns

- Redeclaring the cascade layer order at the bottom of the file hoping the later declaration "wins." The first `@layer` declaration in the document sets order for the whole document.
- Leaving custom properties unregistered when you want to animate them. A `--color` transition does nothing without `@property`.
- Mixing hex, hsl, and oklch in one project. Pick one format per project and convert old values once.
- Using `100vh` for a full-screen hero on mobile. It overflows when the browser chrome collapses. Use `100dvh`.
- `!important` to override a lower-priority layer. If you need that, the layer order is wrong.
- Physical properties (`margin-left`, `padding-top`, `width`, `height`) in greenfield code. Use `margin-inline-start`, `padding-block-start`, `inline-size`, `block-size`.
- One giant `:root` custom-property block. Split into theme, component, and utility scopes so overrides land in the right place.

## Page or file references

- Repository: `https://github.com/CSSInDepth/css-in-depth-2`
- Book: Keith J. Grant, *CSS in Depth, 2nd edition*, Manning 2024
- Ch 6 — Grid layout
- Ch 8 — Cascade layers (`@layer`), `revert-layer`
- Ch 11 — Backgrounds, borders, shadows
- Ch 12 — Contrast, typography, spacing
- Ch 13 — Transitions
- Ch 14 — Transforms
- Ch 15 — Animations, `@property`, `oklch()`
- Ch 16 — Full-site composition showing the layer stack in practice
- NotebookLM source ID: `646cf050-29e2-4` (repo metadata only — actual CSS comes from `gh api`)
