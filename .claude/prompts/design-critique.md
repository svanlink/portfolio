# Design Critique Prompt

Load `.claude/skills/design-critic/SKILL.md` before using this template.

---

## Template

```
Read BRIEF.md, docs/figma-audit.md, and docs/figma-spec.md.
Load .claude/skills/design-critic/SKILL.md.

Critique [SECTION NAME / ELEMENT] using the two-pass LLM-as-judge protocol
from the Design Critic skill.

Pass 1: observe and measure. Use preview_inspect on the key selectors.
Record actual values for type, spacing, colour, and hierarchy.

Pass 2: evaluate as a Swiss design editor. Rate each finding as Critical,
High, or Low. Cite the specific BRIEF.md principle or Figma audit value
being violated.

Output the findings table and summary. Do not suggest fixes beyond the
scope of [SECTION NAME / ELEMENT].
```
