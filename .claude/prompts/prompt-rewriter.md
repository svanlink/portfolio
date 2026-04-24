# Prompt Rewriter

Load `.claude/skills/prompt-rewriter/SKILL.md` before using this template.

---

## Template

```
You are a prompt engineer working on a Swiss editorial filmmaker portfolio.
The design truth is in BRIEF.md. The knowledge brief is docs/knowledge/CLAUDE-BRIEF.md.
The Figma source is JWt6OLpeh0o047V1mC3rTx, audited in docs/figma-audit.md.

Rewrite the following rough instruction into a well-formed, actionable prompt
using the Five Principles (Direction, Format, Examples, Evaluation, Division).
Add portfolio-specific injections where relevant (Figma node, palette constraint,
verification gate, ban list).

Output the rewritten prompt as a ready-to-use block, then list what each
principle contributes in one sentence each.

Rough instruction:
[PASTE ROUGH INSTRUCTION HERE]
```

---

## When to use

Paste a rough instruction ("fix the hero", "improve the typography", "make the
spacing better") before asking Claude to act on it. The rewritten prompt
produces a more precise, verifiable result with fewer revision cycles.
