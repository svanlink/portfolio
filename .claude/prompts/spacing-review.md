# Spacing Review Prompt

Load `.claude/skills/design-critic/SKILL.md` before using this template.

---

## Template

```
Read docs/figma-audit.md and assets/css/variables.css.
Load .claude/skills/design-critic/SKILL.md.

Review the spacing in [SECTION NAME] for grid alignment, safe-zone
compliance, and rhythmic consistency.

Use preview_inspect to measure:
1. Top safe zone distance (expected: 120px from section top to heading top)
2. Content-left anchor (expected: 96px, token --content-left)
3. Secondary inset anchor (expected: 152px, token --content-inset in §02)
4. Inter-element gaps against the 8px base grid

For each measurement, report:
  Selector: [selector]
  Expected: [value from audit]
  Measured: [actual value]
  On 8px grid: YES / NO
  Status: PASS / FAIL (±1px tolerance)

After the table, flag any spacing value that is not a multiple of 4px.
Propose the corrected token or hardcoded value for each FAIL.
```
