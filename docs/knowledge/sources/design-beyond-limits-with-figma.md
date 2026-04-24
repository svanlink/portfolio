# Design Beyond Limits with Figma — Šimon Jůn

## Summary

Packt, 2024. An advanced-workflow book aimed at designers and design leads who already know the Figma basics and want to operate at the scale of a design system with real downstream consumers. The companion repository is a chapter index only, no exercise files — the book itself is the source and the repo is a bookmark. The nine chapters cover advanced collaboration, the plugin ecosystem, AI in Figma, designer-developer synergy, scaling systems, tokens, accessibility, precision handoff, and stakeholder engagement. For a solo portfolio workflow the keepers are the token pipeline, the handoff contract, the accessibility-in-Figma checks, and the plugin automation patterns that eliminate tedious work.

## Techniques / patterns

1. **Variables over styles for tokens.** Figma Variables carry semantic meaning and scope; Styles only hold values. Every color, spacing, and type token should be a Variable, grouped into Collections (`Primitives`, `Semantic`, `Component`). Styles stay reserved for effects and text-style bundles that do not map 1:1 to code.
2. **Three-collection token pipeline.** `Primitives` holds raw values (`blue-500`, `grey-900`). `Semantic` aliases primitives into roles (`color/text/primary`, `color/surface/default`). `Component` holds component-specific overrides (`button/bg/hover`). Export semantic and component tokens only — primitives are Figma-internal.
3. **Variable modes for theming.** Light, dark, and density variants live as modes on the same collection. Swapping a frame's mode recolors the whole page without duplication.
4. **Auto Layout as a component contract.** Every component root uses Auto Layout with explicit fill, hug, or fixed on each axis. Components that do not use Auto Layout cannot be composed safely; treat them as illustration only.
5. **Boolean and Variant properties.** Variants cover orthogonal visual states (size, style, emphasis). Booleans cover independent toggles (with-icon, loading, disabled). Never express a boolean as a Variant — the matrix explodes.
6. **Component Properties for text and instance swap.** Expose text labels and icon slots as properties rather than hard-coding. Consumers override via the right panel without detaching.
7. **`.local` vs `.remote` library separation.** Every project consumes tokens and primitives from a remote library. Components live either in the remote library (shared) or locally (one-off). Detached remote components are the primary source of system drift — audit regularly.
8. **Dev Mode inspection contract.** Developers see only published components, published tokens, and Ready-for-Dev marked frames. Anything else is work-in-progress and must not leak. Enforce with named pages: `👀 Ready for Dev`, `🚧 WIP`, `📦 Archive`.
9. **Code Connect for component mapping.** Link Figma components to their code counterparts so Dev Mode shows the real import path and props. Kills the "which React component is this?" ambiguity at handoff.
10. **Accessibility annotations in the frame.** Use an a11y annotation plugin (or a home-rolled component) to mark tab order, roles, labels, and reduced-motion behavior directly on the design. Devs get the same source of truth designers used.
11. **WCAG contrast baked into tokens.** Every semantic color pair is auto-checked in a QA page: `text/primary on surface/default`, `text/primary on surface/inverted`, etc. Failing pairs do not ship.
12. **Plugin automation for repetitive work.** Typical wins: bulk-apply variables to selected layers, generate color-ramp primitives from a seed, rename layers to match the BEM hierarchy, export tokens to JSON for a build pipeline.
13. **Interactive prototypes with Variables.** Prototype state (open/closed, selected tab) is driven by a boolean or number variable. One flow can represent a full feature instead of twenty duplicated frames.
14. **AI-assisted first pass, human second.** Use AI plugins to generate first-draft layouts, copy, and image placeholders. Every output goes through the system (Auto Layout, tokens) before it ships. AI accelerates the draft, not the spec.
15. **Versioning strategy for shared libraries.** Library publishes are releases, not saves. Major component changes require a migration note. Consumers update on their schedule, not yours.

## Code snippets worth remembering

```json
// Variables collection export format (via plugin) — feeds Style Dictionary
{
  "color": {
    "text": {
      "primary":    { "value": "{color.primitive.ink.950}",  "type": "color" },
      "secondary":  { "value": "{color.primitive.ink.600}",  "type": "color" },
      "inverted":   { "value": "{color.primitive.bone.100}", "type": "color" }
    },
    "surface": {
      "default":  { "value": "{color.primitive.bone.100}", "type": "color" },
      "raised":   { "value": "{color.primitive.bone.200}", "type": "color" },
      "inverted": { "value": "{color.primitive.ink.950}",  "type": "color" }
    }
  }
}
```

```text
# Page structure inside a feature file
00 — Cover & Changelog
01 — 👀 Ready for Dev
02 — 🚧 WIP
03 — 🧪 Explorations
04 — 🎨 Components (library consumers)
05 — 📦 Archive
```

```text
# Variant matrix rule of thumb
Button
  Variant: size       = sm | md | lg
  Variant: emphasis   = primary | secondary | ghost
  Boolean: with-icon  = true | false
  Boolean: loading    = true | false
  Boolean: disabled   = true | false

  → 3 × 3 = 9 variants, 3 booleans multiplicatively off the grid
  → Do NOT add a fourth variant axis; add a boolean instead
```

```text
# Handoff checklist (pin to every Ready-for-Dev frame)
- [ ] Auto Layout on every frame
- [ ] Semantic tokens, no raw primitives
- [ ] Component instances, no detached nodes
- [ ] Accessibility annotations attached
- [ ] Responsive breakpoint variants present
- [ ] Dev Mode link shared in the ticket
```

```text
# Token export pipeline (daily)
Figma Variables
    ↓ plugin (Tokens Studio, Variables2Code, or custom)
tokens.json  →  Style Dictionary  →  CSS variables / Tailwind config / JS tokens
    ↓
committed to repo, consumed by app build
```

## Anti-patterns

- Treating Figma Styles and Variables as interchangeable. Styles do not support modes or scoping; tokens belong in Variables.
- Expressing every state as a Variant. A boolean toggle as a Variant doubles the matrix needlessly; use a Component Boolean Property.
- Detaching an instance to make a one-off tweak. The detached node drifts forever; add a Component Property or a new Variant instead.
- Shipping a design with raw primitive colors (`blue-500`) referenced directly. The dev will hardcode it and the semantic layer rots.
- Skipping Dev Mode setup and telling developers to "eyeball the spacing." Dev Mode is the contract; without it the handoff is a rumor.
- Using AI-generated layouts without passing them through Auto Layout and tokens. They look fine once and break on the first data change.
- Publishing a library update with a breaking change and no migration note. Consumers lose trust in the library and start copying components locally.

## Page or file references

- Repository: `https://github.com/PacktPublishing/Design-Beyond-Limits-with-Figma` (chapter index only, no exercise files)
- Book: Šimon Jůn, *Design Beyond Limits with Figma*, Packt 2024, ISBN 9781836207719
- Ch 1 *Advanced Collaborative Design* — file structure, pages, branching
- Ch 2 *Leveraging Figma's Plugin Ecosystem* — automation patterns
- Ch 3 *Harnessing AI in Figma* — AI-first-draft workflow
- Ch 4 *Enhancing Designer-Developer Synergy* — Dev Mode, Code Connect
- Ch 5 *Scaling Design Systems for Consistency* — library separation
- Ch 6 *Utilizing Design Tokens for Consistency* — Variables, collections, modes
- Ch 7 *Building Accessible Design Systems* — WCAG in tokens, annotations
- Ch 8 *Precision Handoff Techniques* — Ready-for-Dev, checklist
- Ch 9 *Elevating Stakeholder Engagement* — interactive prototypes
- NotebookLM source ID: `36951610-69db-4`
