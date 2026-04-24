# Figma to Code Prompt

Load `.claude/skills/figma-fidelity/SKILL.md` before using this template.

---

## Template

```
Read docs/figma-audit.md, docs/figma-spec.md, and the relevant CSS file in
assets/css/. Load .claude/skills/figma-fidelity/SKILL.md.

Implement [ELEMENT OR SECTION] from Figma node [NODE ID] in
[TARGET CSS FILE / SELECTOR].

Steps:
1. Read the measured values from docs/figma-audit.md for this element.
2. If any values are missing from the audit, fetch them via the Figma MCP
   (file JWt6OLpeh0o047V1mC3rTx, node [NODE ID]) and record them in
   docs/figma-audit.md before writing CSS.
3. Translate each Figma property using the rules in the Figma Fidelity skill:
   - Absolute position → CSS absolute, no coercion to flex
   - Font name → CSS family from the font map in the skill
   - Letter spacing → divide Figma px by font-size px to get em
   - Line height → divide Figma px by font-size px for unitless ratio
   - Colour → token from variables.css, never hardcoded hex
4. Write the CSS change as a minimal diff to [TARGET CSS FILE].
5. Add or update the Figma → selector mapping in docs/figma-spec.md.
6. Verify with preview_inspect. Report measured vs expected for each property.
   Tolerance: ±1px for position/size, exact for type and colour.
7. Do not proceed to the next element until the current one passes.

Palette constraint: monochrome + ember only. No other chromatic colour.
```

---

## Quick reference — font map

| Figma name | CSS family | Weight |
|---|---|---|
| NeueHaasDisplay Bold | `"NeueHaasDisplay"` | 700 |
| NeueHaasUnica Bold | `"Neue Haas Unica W1G"` | 700 |
| NeueHaasUnica Regular | `"Neue Haas Unica W1G"` | 400 |
| HelveticaNow Regular | `"HelveticaNowText"` | 400 |
| HelveticaNeue Bold | `"HelveticaNowText"` | 700 |
| AtkinsonMono Bold | `"AtkinsonHyperlegibleMono"` | 700 |
| AtkinsonMono Regular | `"AtkinsonHyperlegibleMono"` | 400 |
