---
name: prompt-rewriter
description: >
  Rewrites a rough instruction into a well-formed, actionable prompt tuned to
  this portfolio project. Activates when the user says "rewrite this prompt",
  "sharpen this", "make this better", or pastes a rough instruction and asks
  Codex to improve it before acting.
---

# Prompt Rewriter

Turn a rough instruction into a prompt that is specific, grounded, and
actionable for this project. Apply the Five Principles, then output the
rewritten prompt as a ready-to-use block.

---

## Five Principles (from *Prompt Engineering for Generative AI*)

Check every rewritten prompt against all five before finishing.

1. **Direction** — what role, what task, what constraints. State the visual
   lane (Swiss editorial, cinematic, BRIEF.md §Visual Lane) if design is
   involved. Name the file or Figma node if code is involved.

2. **Format** — specify the output shape. Code block with selector? Markdown
   table? Numbered list of issues? Measurement report? If the output format
   is ambiguous, the response will be too.

3. **Examples** — anchor the target quality. For design tasks, name a
   reference (e.g. "matches the heading treatment in Section 02"). For code
   tasks, name an existing pattern ("follow the pattern in `.work-row`").

4. **Evaluation** — define done. "Pixel-perfect means measured values within
   ±1px of `docs/figma-audit.md`." "Critique passes when it flags at least
   one hierarchy issue and one spacing issue." Without a done condition, the
   agent self-approves silently.

5. **Division** — one task per prompt. If the instruction covers two sections
   or two concerns, split it. A single diff is how regressions ship.

---

## Portfolio-specific injections

Every rewritten prompt must include whichever of these apply:

- **Figma reference** — if the task touches layout or type, inject the relevant
  node from `docs/figma-audit.md` and the selector from `docs/figma-spec.md`.
  Name the Figma file ID (`JWt6OLpeh0o047V1mC3rTx`) when MCP lookup is needed.

- **Palette constraint** — "Monochrome + ember only. No other chromatic colour."

- **Verification gate** — "Verify with the measurement loop in
  `docs/knowledge/Codex-BRIEF.md §2c` before claiming done."

- **Context anchor** — "Read `AGENTS.md` and the relevant spec files before
  touching any code."

- **Ban list reminder** — when a task involves motion or visual effects, inject
  the ban from `BRIEF.md`: no bento, no glassmorphism, no WebGL spectacle,
  no exaggerated parallax.

---

## Rewrite process

1. Read the rough instruction.
2. Identify which skill domain it belongs to: Figma Fidelity, Design Critic,
   Frontend Implementer, or something else.
3. Apply Five Principles. Fill in any missing ones.
4. Add portfolio-specific injections that apply.
5. Output the rewritten prompt in a triple-backtick block, ready to copy-paste.
6. Below the block, add a short "What I added" note (one sentence per principle
   that was missing in the original).

---

## Anti-patterns to remove from rough instructions

- "Make it look better" → name what specifically should improve (hierarchy,
  spacing, contrast, motion timing).
- "Fix the CSS" → name the selector, the property, and the target value from
  the Figma audit.
- "Implement the design" → break into one section at a time with Figma node ID.
- "Check the typography" → specify which type roles and what tolerance counts
  as passing.
- Vague adjectives ("clean", "minimal", "premium") → translate to measurable
  properties (scale contrast ratio, spacing rhythm, colour palette constraints).

---

## Output format

```
[REWRITTEN PROMPT]

<the prompt, ready to use>
```

Then:

**What I added:**
- Direction: [what was missing]
- Format: [what was missing]
- Examples: [what was missing]
- Evaluation: [what was missing]
- Division: [what was missing — or "already scoped"]
