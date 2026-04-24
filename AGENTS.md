# AGENTS.md — Portfolio

Project router. Read this first, then follow the pointers.

---

## What this project is

A pixel-perfect static HTML/CSS/JS portfolio for Sebastian van Eickelen — filmmaker, photographer, creative director, Geneva. Single `index.html`, 7 CSS files, 2 JS files, no build system.

The design source of truth is `BRIEF.md`. The knowledge operating manual is `docs/knowledge/Codex-BRIEF.md`. Do not contradict either without flagging it first.

---

## Design truth

All visual, typographic, spacing, and motion decisions trace back to:

- `BRIEF.md` — palette, tone, layout philosophy, section structure, ban list
- `docs/figma-audit.md` — measured node values for Sections 01/02/03
- `docs/figma-spec.md` — Figma node → CSS selector mapping

The Figma file is `JWt6OLpeh0o047V1mC3rTx`. Sections: Hero (1:56), Selected Work (1:65), Services (11:176). Base frame: 1728 × 1000.

**Palette**: `--color-ink` (near-black) + `--color-bone` (off-white) + `--color-ember` (single restrained accent). No other chromatic colour. No redesign for novelty.

---

## File map

```
index.html                     — single HTML file
assets/css/
  reset.css                    — normalise
  variables.css                — all tokens
  fonts.css                    — @font-face declarations (14 loaded)
  base.css                     — body, type, global defaults
  layout.css                   — grid, section scaffolding
  components.css               — reusable UI pieces
  sections.css                 — section-specific rules
assets/js/
  main.js                      — interaction logic
  motion.js                    — GSAP animation
assets/img/                    — brand logos, portrait, work placeholder
assets/fonts/                  — 14 TTF files (Atkinson Mono, Helvetica Now, Neue Haas Unica, Neue Haas Display)
docs/
  figma-audit.md               — measured Figma node values
  figma-spec.md                — Figma → CSS selector mapping
  knowledge/
    Codex-BRIEF.md            — full knowledge operating manual
    SYNTHESIS.md               — cross-source synthesis, 6 domains
    sources/                   — 12 per-source reference files
.Codex/
  skills/                      — project-specific skills
  prompts/                     — reusable prompt templates
```

---

## Skills

Load a skill when the task matches its description. Each skill file is self-contained.

| Skill | File | Use when |
|---|---|---|
| Prompt Rewriter | `.Codex/skills/prompt-rewriter/SKILL.md` | Sharpening a rough instruction before acting on it |
| Figma Fidelity | `.Codex/skills/figma-fidelity/SKILL.md` | Translating Figma nodes to CSS with measured accuracy |
| Design Critic | `.Codex/skills/design-critic/SKILL.md` | Auditing design, typography, spacing, or visual hierarchy |
| Frontend Implementer | `.Codex/skills/frontend-implementer/SKILL.md` | Writing or refactoring HTML/CSS/JS for this project |

---

## Prompt templates

Reusable starting points for common tasks. Read the file, fill in the brackets, run it.

`.Codex/prompts/` contains: `design-critique.md`, `figma-audit.md`, `figma-to-code.md`, `frontend-refactor.md`, `layout-system.md`, `typography-review.md`, `spacing-review.md`, `responsive-audit.md`, `copy-refinement.md`, `strategy-review.md`, `prompt-rewriter.md`

---

## Behaviour rules

**Before any task:** read the relevant spec files. Grep for existing patterns before inventing new ones. If a Figma node is referenced, fetch it via the Figma MCP before touching code.

**During:** one change at a time. Re-verify between changes. Read a file before editing it.

**After:** run the measurement verification loop in `docs/knowledge/Codex-BRIEF.md §2c`. Report measured values with ≤1px tolerance. Do not claim pixel-perfect without evidence.

**Stuck:** circuit-break after two failed attempts. State the blocker. Propose two options and ask.

**Format:** sentences, not bullets (unless asked). No em-dashes. No bold for emphasis in prose. No AI vocabulary. No headers in short responses.

**Autonomy:** high for code and system tasks. Pause before publishing, irreversible deletes, force-push, or account actions.

---

## Non-negotiables

- Monochrome + ember only. No other chromatic colour anywhere.
- No features beyond the task scope.
- No backwards-compatibility shims. Delete unused code.
- No mutation — new objects only.
- Validate at system boundaries only. Trust internal guarantees.
- Commit only when asked. Ask before any git push or PR.
