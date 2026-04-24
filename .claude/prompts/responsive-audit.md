# Responsive Audit Prompt

Load `.claude/skills/design-critic/SKILL.md` and `.claude/skills/frontend-implementer/SKILL.md`.

---

## Template

```
Read BRIEF.md, assets/css/layout.css, and assets/css/sections.css.
The Figma source specifies desktop at 1728px. Responsive behaviour below
that is ours to define.

Audit [SECTION / WHOLE SITE] for responsive correctness.

Use preview_resize to check at these widths: 320, 768, 1024, 1440, 1728.

For each breakpoint, check:
1. No horizontal overflow (scroll x must be zero).
2. No content clipping into safe zones.
3. Typography still reads at a comfortable measure (≤75ch line length).
4. Touch targets on interactive elements are ≥44 × 44px at 320–768.
5. Absolute positioning does not break the layout at narrower widths
   (if it does, propose a linearisation strategy).
6. Images have explicit width/height attributes and do not overflow
   their containers.

Report per breakpoint. Flag breakpoints where the layout needs intervention.
Propose the minimal media query or container query addition needed.
Use min-width (mobile-first) breakpoints. Add a breakpoint at the content
break point, not at a device width.
```
