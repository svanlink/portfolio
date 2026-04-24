---
name: figma-fidelity
description: >
  Translates Figma nodes into pixel-accurate CSS for this portfolio. Activates
  when a task involves implementing, auditing, or verifying any section against
  the Figma source (JWt6OLpeh0o047V1mC3rTx). Governs how values are read,
  translated, and verified. Never approximates when the Figma file can be
  inspected.
---

# Figma Fidelity

The contract between the Figma file and the codebase. Read the node. Match
the output. Verify the measurement.

---

## Ground truth files

Read these before touching any implementation work:

- `docs/figma-audit.md` — measured node values for Sections 01, 02, 03
- `docs/figma-spec.md` — Figma node → CSS selector mapping
- `assets/css/variables.css` — token definitions (must stay in sync)

The Figma file ID is `JWt6OLpeh0o047V1mC3rTx`. Base frame per section:
1728 × 1000. Global safe zones: 120px top/bottom. Content-left anchor: 96px.

---

## Node-reading protocol

When a task references a Figma element:

1. Check `docs/figma-audit.md` first. If the value is there, use it. Do not
   re-inspect unless the task is explicitly about catching an audit discrepancy.

2. If the value is not in the audit, use `mcp__Figma__get_design_context` with
   the node ID. Extract: position (x, y), size (w, h), fill, stroke, font
   name, font size, line height, letter spacing, opacity.

3. Record new values back into `docs/figma-audit.md` as a co-versioning step
   before writing any CSS.

4. Cross-check against `docs/figma-spec.md` to confirm the CSS selector is
   mapped. Add a mapping if it's missing.

---

## Translation rules

### Positions

Absolute-positioned Figma children → CSS absolute positioning. Do not coerce
to flex or grid if the Figma source is absolute. The current sections use
absolute positioning throughout; respect that.

Fluid scaling (from Marcotte): when a position must scale, apply the fluid
formula — `target ÷ context`. A value of 447px inside a 1728px frame is
`447/1728 = 25.86%`. Use percentages when scaling is intended, fixed px when
the design is pinned.

### Typography

Font name → exact `font-family` value from `assets/css/fonts.css`. Map:

| Figma name | CSS family |
|---|---|
| NeueHaasDisplay Bold | `"NeueHaasDisplay"` weight 700 |
| NeueHaasUnica Bold | `"Neue Haas Unica W1G"` weight 700 |
| NeueHaasUnica Regular | `"Neue Haas Unica W1G"` weight 400 |
| HelveticaNow Regular | `"HelveticaNowText"` weight 400 |
| HelveticaNeue Bold | `"HelveticaNowText"` weight 700 |
| AtkinsonMono Bold | `"AtkinsonHyperlegibleMono"` weight 700 |
| AtkinsonMono Regular | `"AtkinsonHyperlegibleMono"` weight 400 |

Letter spacing: Figma reports in px. CSS uses `em`. Divide by font-size.
Example: −0.72px at 36px = `−0.02em`.

Line height: Figma reports absolute px. CSS uses a unitless ratio. Divide
by font-size. Example: 42px at 36px = `1.167`.

### Colour

Figma colour → CSS custom property from `variables.css`. Never hardcode hex.

| Figma value | Token |
|---|---|
| `#000000` / `#0a0a0a` range | `var(--color-ink)` |
| `#ffffff` / bone range | `var(--color-bone)` |
| ember range | `var(--color-ember)` |
| `rgba(0,0,0,0.80)` | `rgb(from var(--color-ink) r g b / 0.80)` or hardcoded `rgba` matching audit |

Opacity overlays: Figma's "ink @ 10%" → `color-mix(in oklch, var(--color-ink) 10%, transparent)` or direct `rgba`.

### Spacing and layout

Use CSS custom properties for repeated values. Current tokens in `variables.css`:

- `--content-left: 96px` — left anchor for most elements
- `--content-inset: 152px` — secondary left anchor (row title/meta/body in §02)

When a spacing value recurs more than twice, extract it as a token.

---

## Verification loop

After every implementation change, run this gate. Do not claim done without
measured evidence.

1. Start or confirm the preview server is running (`preview_start`).
2. Use `preview_inspect` on each key selector from the spec. Record the
   measured value.
3. Compare measured value to `docs/figma-audit.md`. Tolerance: ±1px.
4. If any value is off, iterate until within tolerance.
5. Check `preview_console_logs` for errors before finishing.
6. Screenshot only as final proof after measurement passes — not as the
   primary verification method.

Report format for each checked element:

```
Selector: .work-heading
Expected (Figma): top 120, left 96, font-size 36px
Measured: top 120, left 96, font-size 36px
Status: PASS
```

---

## Co-versioning rule

The trilogy `docs/figma-audit.md` + `docs/figma-spec.md` + `assets/css/` must
stay in sync. When any one changes, update the others:

- New CSS selector → add mapping row to `figma-spec.md`
- New Figma value discovered → add node row to `figma-audit.md`
- Token renamed in `variables.css` → grep all CSS files and update references

---

## Anti-patterns

- Eyeballing colour from a screenshot. Always read the token from the audit or
  the Figma MCP.
- Approximating letter spacing ("close enough"). Compute it. The formula is
  `Figma-px ÷ font-size-px`.
- Using `position: relative` when Figma source has absolute children.
- Hardcoding hex values. Map to tokens.
- Calling "pixel-perfect" without a measurement report.
- Updating CSS without updating `figma-spec.md`.
