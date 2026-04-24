# Frontend Refactor Prompt

Load `.claude/skills/frontend-implementer/SKILL.md` before using this template.

---

## Template

```
Read [TARGET FILE(S)] and assets/css/variables.css.
Load .claude/skills/frontend-implementer/SKILL.md.

Refactor [SELECTOR / SECTION / FILE] for [GOAL: token consistency /
semantic HTML / performance / CSS architecture / motion correctness].

Constraints:
- Do not change visual output. The refactor must be invisible in the browser.
- One change at a time. Verify with preview_inspect after each change.
- Do not add features or restructure beyond what the goal requires.
- Palette: monochrome + ember only.
- If a value is hardcoded and appears twice, extract it to variables.css.
- If an element uses a non-semantic tag and a semantic one exists, swap it.
- If a property is animating width/height/top/left/margin, flag it — do not
  silently remove it without proposing the compositor-friendly alternative.

After the refactor, report:
1. What changed and why (one sentence per change).
2. Any remaining issues outside scope (flag, do not fix).
3. Measurement confirmation: preview_inspect on the key selectors shows
   no visual regression.
```
