# Typography Review Prompt

Load `.claude/skills/design-critic/SKILL.md` before using this template.

---

## Template

```
Read docs/figma-audit.md §Tokens and docs/figma-spec.md.
Load .claude/skills/design-critic/SKILL.md.

Review the typography in [SECTION NAME / ALL SECTIONS] against the type
roles defined in the Figma audit.

For each type role present, use preview_inspect to measure:
- font-family (resolved face, not variable name)
- font-size
- font-weight
- line-height (report as unitless ratio)
- letter-spacing (report in em)
- colour token

Compare each measured value to the expected value from the audit:

| Role | Expected family | Expected size | Expected lh | Expected ls |
|---|---|---|---|---|
| Section heading | NeueHaasDisplay | 36px | 1.167 | −0.02em |
| Row title §02 | Neue Haas Unica W1G | 24px | 1.333 | −0.02em |
| Row title §03 | Neue Haas Unica W1G | 36px | 1.111 | −0.02em |
| Body copy | HelveticaNowText | 16px | 1.2 | 0 |
| Caption / meta | AtkinsonHyperlegibleMono | 12px | 1 | −0.02em |
| Nav links | AtkinsonHyperlegibleMono | 16px | 1.5 | −0.02em |

Flag any mismatch. Rate each finding. Propose the exact CSS correction.
```
