# Layout System Prompt

Load `.claude/skills/design-critic/SKILL.md` and `.claude/skills/frontend-implementer/SKILL.md`.

---

## Template

```
Read BRIEF.md §Layout Philosophy, docs/figma-audit.md, and assets/css/layout.css.

Review or implement the layout system for [SECTION / WHOLE SITE].

The layout contract:
- 6 scenes × 100vh. Each scene is a full-viewport editorial unit.
- Safe zones: 120px top, 120px bottom per scene.
- Content-left anchor: 96px (--content-left).
- Secondary inset: 152px (--content-inset) for §02 row content.
- Base frame reference: 1728px wide. Fluid scaling via percentage or clamp()
  for widths that should reflow. Fixed px for anchored positions within a scene.
- Absolute-positioned children: preserve CSS absolute — do not coerce to flex.

For each scene, verify:
1. Height is exactly 100vh (use 100dvh as the modern equivalent with
   100vh as fallback).
2. Safe zones are respected.
3. Content-left anchor is consistent.
4. No layout-bound properties are animated (width, height, top, left, margin).

Report findings per scene. Propose minimal CSS corrections for each failure.
Palette constraint: monochrome + ember only.
```
