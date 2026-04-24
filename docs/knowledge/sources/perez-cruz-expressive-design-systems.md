# Expressive Design Systems — Yesenia Perez-Cruz

## Summary

A Book Apart No. 31, published 2019. Written for design-system leads who have already built a component library and noticed it does not prevent inconsistency. The thesis is that a system which only documents components will produce cookie-cutter UI; what expressive systems add is a layer above components that encodes the brand so teams can vary tokens without breaking cohesion. For a solo portfolio the book is useful less as a management guide than as a clean vocabulary for the layering between value, role, and usage, and for its "big levers, small dials" framing that makes token decisions legible instead of arbitrary.

## Techniques / patterns

1. **Tokens, roles, values — three layers.** The token is the code identifier (`$text`), the role is the systematic usage ("primary text color"), the value is the hex or px. Rebrands change the value, keep the token and role. Swap a theme without rewriting components.
2. **Semantic naming, not descriptive.** `$interactive-action` beats `$color-blue`. When the brand palette changes, descriptive names lie.
3. **Four global levers — Size, Scale, Density, Weight.** Every expressive decision reduces to adjusting one or more. Size controls reading speed, scale controls hierarchy, density controls airiness (through space), weight controls heaviness (through type and color).
4. **Big levers, small dials.** Levers are sweeping (scale ratio, density baseline). Dials are granular (one button's hover color). Design the levers first so dials stay consistent.
5. **Component hierarchy — Basic, Composite, Container, Layout.** Atoms, molecules, then containers, then page-level layout. Name files to match so the dependency direction is visible at a glance.
6. **Color groups keyed to background.** Define foreground colors against their background role, e.g. `OnBlack-Primary`, `OnBone-Secondary`. Keeps contrast auditable at the token level instead of in every component.
7. **Accessibility as a token check.** If the color group passes WCAG, every component using it passes by default. Contrast is a system test, not a final QA step.
8. **Modular type scale via interval ratio.** Pick a base font size, derive the scale by multiplying with a ratio (1.125, 1.2, 1.333, 1.5, etc.). Line height adjusts the density and weight levers.
9. **Spacing on a 4px base.** Linear (4, 8, 12, 16, 20...) for uniform rhythm; nonlinear (4, 8, 16, 32, 64) when visual hierarchy needs exponential jumps. Pick one and commit.
10. **Number your space tokens, do not T-shirt-size them.** `space-1` through `space-12` scales; `xs, sm, md, lg, xl, xxl, xxxl` runs out of names and forces awkward invented sizes.
11. **Three kinds of variation.** Unintentional (undocumented drift), intentional-but-unnecessary (designer ego), intentional-and-meaningful (earning its complexity). Only the third belongs in the system.
12. **Dial theming vs. dial-and-lever theming.** Swapping colors only is a dial theme. Swapping scale, density, and color together (retail dark mode for bright stores) is a full lever theme.
13. **Environmental context as a variation driver.** Shopify Retail built a dark theme for bright-light, arm's-length use. Variation follows real usage, not taste.
14. **Purpose statement before tokens.** Write one sentence naming what the system is for before you define any token. Without it, every later disagreement is about taste.

## Code snippets worth remembering

```css
/* Three-layer token structure */
:root {
  /* Value layer */
  --palette-ink:   #0B0B0B;
  --palette-bone:  #F4EFE6;
  --palette-ember: #FF6B2C;

  /* Role layer — what the value means in UI */
  --color-text:        var(--palette-ink);
  --color-surface:     var(--palette-bone);
  --color-accent:      var(--palette-ember);
  --color-on-accent:   var(--palette-bone);
}
```

```css
/* Color groups keyed to background */
:root {
  --on-ink-primary:    #F4EFE6;
  --on-ink-secondary:  #C8C3BA;
  --on-bone-primary:   #0B0B0B;
  --on-bone-secondary: #4A4A4A;
}
.section-ink  { color: var(--on-ink-primary);  background: var(--color-text); }
.section-bone { color: var(--on-bone-primary); background: var(--color-surface); }
```

```css
/* Numeric space scale on 4px base, nonlinear for a microsite */
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  16px;
  --space-4:  24px;
  --space-5:  32px;
  --space-6:  48px;
  --space-7:  64px;
  --space-8:  96px;
  --space-9:  128px;
  --space-10: 192px;
}
```

```css
/* Modular type scale via a single ratio */
:root {
  --type-base:  1rem;               /* 16px */
  --type-ratio: 1.25;               /* major third */
  --type-0: var(--type-base);
  --type-1: calc(var(--type-0) * var(--type-ratio));
  --type-2: calc(var(--type-1) * var(--type-ratio));
  --type-3: calc(var(--type-2) * var(--type-ratio));
}
```

```css
/* Dial-and-lever theme: density and scale shift together */
[data-theme="compact"] {
  --space-scale: 0.75;   /* lever: density */
  --type-ratio:  1.125;  /* lever: scale */
}
[data-theme="spacious"] {
  --space-scale: 1.25;
  --type-ratio:  1.333;
}
```

## Anti-patterns

- Granular per-component color variables like `$nav-dropdown-link-hover-color`. Proliferation without semantics, impossible to rebrand, guaranteed to drift.
- Metaphorical names like "River," "Rocks," "Breakers" instead of "Story Feed," "Callout," "Divider." Cute on day one, hostile to every new hire after.
- Rigid single-use components. A component that only fits one page is not a component, it is markup with extra steps.
- Cookie-cutter variation. Applying decorative differences (skewed backgrounds, alternating borders) to modules that solve the same user goal.
- Starting from components without a purpose statement. The system will drift toward whoever is loudest.
- Treating accessibility as a final QA pass. Bake contrast into color groups so compliance happens at the token level.

## Page or file references

- Source on disk: `~/Downloads/toaz.info-sachitnetexpressive-design-systemspdf-pr_42b900fbf42854f9162b9faa98a5f9be.pdf` (133 pages)
- Ch 1 *Purpose and Principles*, pp 7–20 — purpose statement, principles, unity vs cohesion
- Ch 2 *The Process Behind the System*, pp 21–49 — audit, consolidation, documentation
- Ch 3 *Communicating Your Brand*, pp 50–74 — levers and dials, tokens/roles/values
- Ch 4 *Making Room for Variation*, pp 75–101 — theming, color groups, spacing, type scale
- Ch 5 *Managing Design Systems*, pp 102–116 — governance; skip for solo work
- NotebookLM source ID: `f6a57d9f-b075-4...`
- Note: book is by Yesenia Perez-Cruz; the disk filename mis-attributes it to "Sachit Net"
