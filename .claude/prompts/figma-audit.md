# Figma Audit Prompt

Load `.claude/skills/figma-fidelity/SKILL.md` before using this template.

---

## Template

```
Read docs/figma-audit.md and docs/figma-spec.md.
Load .claude/skills/figma-fidelity/SKILL.md.

Audit [SECTION NAME] (Figma node [NODE ID]) against the current implementation.

For each element in the section:
1. Read the expected value from docs/figma-audit.md.
2. Measure the actual value in the browser using preview_inspect on the
   CSS selector from docs/figma-spec.md.
3. Report the comparison in this format:

   Selector: [selector]
   Expected: [Figma value]
   Measured: [actual value]
   Delta: [difference or PASS]

At the end, list all FAIL items with the exact CSS change needed to fix each.
Apply fixes one at a time, re-verifying after each. Do not batch multiple fixes
into one diff.

Tolerance: ±1px for position and size. Exact match required for font-size,
font-family, font-weight, and colour tokens.
```

---

## Sections available

- Section 01 — Hero (node `1:56`)
- Section 02 — Selected Work (node `1:65`)
- Section 03 — Services (node `11:176`)
