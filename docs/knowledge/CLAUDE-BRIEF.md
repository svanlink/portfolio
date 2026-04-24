# CLAUDE-BRIEF.md — Portfolio project operating manual

**Read this at the start of any portfolio session.** It consolidates the knowledge from Sebastian's reference library (6 PDFs + 1 EPUB + 6 GitHub repos, indexed in NotebookLM notebook `320fc947-0207-425c-bffc-a5a83b50ffa5`) into a single operating brief for Claude Code. The source material is listed at the end; fetch from it when a task needs more depth.

The project now has a full skill system. Start every session by reading `CLAUDE.md` at the portfolio root — it routes to the design truth, Figma specs, and the four skills. Use the prompt templates in `.claude/prompts/` rather than composing instructions from scratch.

Each source has a dedicated per-source reference file in `docs/knowledge/sources/<slug>.md` containing a summary, techniques, code snippets, anti-patterns, and page/file pointers. `docs/knowledge/SYNTHESIS.md` organises those twelve files into six domains (prompt engineering, agentic loops, modern CSS, responsive layout, design systems, performance) and flags cross-source reinforcement and disagreement. When this brief is too terse, go to the per-source file; when a decision needs cross-source context, go to `SYNTHESIS.md`.

---

## 1. Project context

Sebastian Van Eickelen is rebuilding `portfolio/` as a pixel-perfect implementation of Figma file `JWt6OLpeh0o047V1mC3rTx`. Three sections at 1728×1000: Hero (§01, node 1:56), Selected Work (§02, 1:65), Services (§03, 11:176). Black + bone palette, ember accent only. See `CLAUDE.md` at project root for brand and voice rules — they are binding.

---

## 2. How Claude should work on this project

### 2a. Prompt & context engineering (from *Prompt Engineering for LLMs* and *Prompt Engineering for Generative AI*)

- **Little Red Riding Hood principle** — pattern output after common motifs in the training corpus: triple-backtick code blocks, conventional comment headers, standard Markdown structure. Never invent a new format when a well-trodden one exists.
- **Chain-of-thought before code** — when the task is non-trivial, think step-by-step in prose before emitting code. Reliability correlates with explicit intermediate reasoning.
- **Few-shot over zero-shot** — when transforming code, look at 2–3 existing examples in the codebase first (`Grep`, `Read`) and match them. Don't freestyle.
- **Sandwiching** — for long prompts, the critical constraint goes at both the top and the bottom. This applies when Claude writes briefs for its own subagents.
- **Structured output** — when a subagent or hook needs to parse a result, demand JSON or YAML with a declared schema. Never ask for "a nice summary."
- **Task decomposition** — split large changes into ≤3-step sub-tasks. A single giant diff is how regressions ship.
- **Five-principle checklist for any prompt**: Direction, Format, Examples, Evaluation, Division. If a prompt is missing one, it's under-specified.

### 2b. Agentic loops & guardrails (from *Engineering AI Systems*)

- **ReAct loop** — Observe (read files / run a tool) → Think (state the plan) → Act (make the change). Never skip Observe.
- **Reflexion loop** — after writing code, generate a self-critique pass ("what could go wrong with this?") and fix the top issue before declaring done.
- **LLM-as-judge** — for visual or qualitative output (design critique, copy tone), use a second pass with different framing ("you are an editor reviewing this draft"). Don't self-approve on first emission.
- **Circuit breaker** — if the same check fails twice, stop and surface the blocker. Don't loop indefinitely on the same error.
- **Framed autonomy** — high autonomy for system/vault/code tasks, lower autonomy for public writing and client-facing work (see `CLAUDE.md`).
- **Co-versioning** — treat `docs/figma-audit.md`, `docs/figma-spec.md`, and the CSS as a linked triple. When Figma changes, update all three.
- **Human-in-the-loop gates** — publishing, irreversible deletes, force-pushes, and account changes always pause for explicit approval. See the global safety rules.

### 2c. Verification loop for this project specifically

Every meaningful change must pass this gate before "done":

1. Start/verify preview server (`preview_start` or reuse running server).
2. Inspect actual DOM positions against Figma spec (`preview_inspect` on key selectors).
3. Check network for unexpected external calls.
4. Screenshot only as final proof, not as the primary verification (JPEG compression hides faint text and small deltas).
5. Report measured values with ≤1px tolerance against Figma.

Never claim pixel-perfect without measured evidence.

---

## 3. Frontend techniques to apply

### 3a. CSS (from *CSS in Depth 2*, *Mastering Front-End Development*, `css-in-depth-2` repo)

- **Custom properties for design tokens** — all color, spacing, type, duration, easing as `--name` in `variables.css`. Never hardcode a hex twice.
- **Logical properties** — prefer `margin-inline`, `padding-block`, `inset-inline-start` over physical equivalents. Future-proofs against RTL and keeps the reset lean.
- **`@property`** — when a custom property needs type safety or animation, declare it with `@property { syntax: '<color>'; inherits: true; initial-value: ... }`.
- **Cascade layers** — `@layer reset, base, layout, components, utilities;` gives deterministic specificity. Use them before reaching for `!important`.
- **Container queries over media queries** — components query their container (`@container`), not the viewport. Media queries are for page-level breakpoints only.
- **Subgrid** — when a child needs to align to the parent grid's tracks (e.g. row rules in the Selected Work list), use `grid-template-rows: subgrid`.
- **`fr` units + `minmax()`** — flexible grid columns, never fixed pixels for column widths.
- **Fluid type with `clamp()`** — `clamp(min, preferred-vw, max)`. Figma specifies a point on this curve; the curve itself is ours.
- **Compositor-only animation** — `transform`, `opacity`, `clip-path`, `filter`. Never animate `width`, `height`, `top`, `left`, `margin`.
- **Critical CSS inlining** — above-the-fold styles go in `<style>` in `<head>`. Defer the rest.

### 3b. Responsive (from *Responsive Web Design* — Marcotte)

- **The fluid formula** — `target ÷ context = result`. A 447px rule inside a 1728px frame is `447/1728 = 25.86%`. Use this when a Figma measurement needs to scale.
- **`max-width: 100%` on media** — always. Never let an image overflow its flex/grid track.
- **Breakpoints from content, not devices** — add a breakpoint when the line length passes ~75ch or a layout visibly breaks, not at "iPad width."
- **Linearization at narrow widths** — drop floats/grid to a single column below the narrowest useful breakpoint. Figma only specifies desktop; we own the reflow.
- **Viewport meta tag** — `<meta name="viewport" content="width=device-width, initial-scale=1">`. Non-negotiable.

### 3c. Performance (from *Mastering Front-End Development*)

- **Critical rendering path** — inline above-the-fold CSS, preload hero font + hero video poster, defer everything else.
- **Font loading** — `font-display: swap`, preload only the critical weight.
- **Explicit image dimensions** — `width`/`height` on every `<img>` to prevent CLS.
- **Budget**: < 80 KB JS gzipped, < 15 KB CSS gzipped for this microsite (portfolio, landing-page class).

---

## 4. Design system & Figma handoff

### 4a. Tokens (from *Expressive Design Systems*)

- **Semantic names, not descriptive** — `--color-ink`, `--color-bone`, `--color-ember` — not `--black`, `--white`, `--orange`. Decouple value from meaning.
- **Tokens → roles → values** — three layers. `--color-ember` (value) → `--color-accent` (role) → used by component.
- **Four global levers**: Size, Scale, Density, Weight. Every token ultimately maps to one.
- **Space scale** — 4px base, doubling or Fibonacci-ish: `--space-1: 4px` … `--space-12: 192px`. Figma uses 8px grid; our scale must be a superset.
- **Component hierarchy** — Basic (button, rule) → Composite (work-row, service-row) → Container (work-list) → Layout (section-work). Name files to match.

### 4b. Figma-to-code handoff (from *Design Beyond Limits with Figma* repo)

- **Dev Mode is the contract** — use `mcp__Figma__get_variable_defs` and `get_design_context` to read tokens directly. Don't eyeball hex values.
- **Auto-layout → Flexbox/Grid** — Figma's auto-layout maps to flex. `Fixed` / `Hug` / `Fill` → fixed width / `width: max-content` / `flex: 1`.
- **Absolute-positioned Figma children** — when a Figma frame has absolute children (as our three sections do), CSS absolute positioning is the correct translation. Don't "fix" it into flex if the Figma source is absolute.
- **Components as contracts** — if two instances share a Figma component, they share a CSS class. Deviations go in a variant, not in ad-hoc overrides.
- **Accessibility token** — WCAG contrast is a token check, not a final step. Ink-on-bone, bone-on-ink: ≥7:1. Ember on bone: verify before use.

---

## 5. Workflow patterns — how to actually execute

### 5a. Before editing

1. Read `CLAUDE.md` at project root.
2. Read any spec files referenced by the task (`docs/figma-audit.md`, `docs/figma-spec.md`).
3. Grep for existing patterns in the codebase before inventing new ones.
4. If a Figma node is mentioned, fetch it via the Figma MCP first.

### 5b. During editing

- One change at a time. Re-verify between changes.
- Never edit a file without reading it first (hook enforces this).
- Use dedicated tools (Edit, Write, Read, Grep, Glob) before Bash.
- Preview mutations via `preview_eval` are temporary — real changes go in source files.

### 5c. After editing

- Run the verification loop (§2c).
- If any value is off by >1px, iterate until it isn't.
- Commit is not automatic — ask before `git commit`, `git push`, or any PR operation.

### 5d. When stuck

- Circuit-break after two failed attempts.
- State the blocker plainly: "I've tried X and Y, both failed because Z."
- Propose two options and ask which to pursue.

---

## 6. Non-negotiables (from project `CLAUDE.md` and global rules)

- **Palette**: monochrome + ember only. No other chromatic colours. Ember gradients (radial bloom, horizon fade) are allowed.
- **Prose format**: sentences, no bullets unless asked, no em-dashes, no bold-for-emphasis, no AI vocabulary (see `Reference — Anti-AI Writing Style.md`).
- **Immutability first** — new objects, not in-place mutation.
- **No features beyond the task** — bug fixes don't come with surrounding cleanup.
- **No backwards-compatibility shims** — delete unused code rather than rename it `_unused`.
- **No default error handling** — trust internal code; validate only at boundaries.

---

## 7. Source library

NotebookLM notebook: `320fc947-0207-425c-bffc-a5a83b50ffa5` — "Ai Prompts"

| Source | Per-source file | Use for |
|---|---|---|
| *CSS in Depth, 2e* (repo: `CSSInDepth/css-in-depth-2`) | [css-in-depth-2.md](sources/css-in-depth-2.md) | Cascade layers, `@property`, `oklch()`, logical properties, `100dvh` |
| *Responsive Web Design* — Marcotte (PDF) | [marcotte-rwd.md](sources/marcotte-rwd.md) | Fluid formula, breakpoint strategy, linearization |
| *Mastering Front-End Development* (PDF) | [mastering-front-end-development.md](sources/mastering-front-end-development.md) | CRP, critical CSS, print stylesheet, performance checklist |
| *Expressive Design Systems* — Perez-Cruz (PDF) | [perez-cruz-expressive-design-systems.md](sources/perez-cruz-expressive-design-systems.md) | Tokens/roles/values, four global levers, component hierarchy |
| *Design Beyond Limits with Figma* (repo: `PacktPublishing/Design-Beyond-Limits-with-Figma`) | [design-beyond-limits-with-figma.md](sources/design-beyond-limits-with-figma.md) | Three-collection Variables pipeline, Dev Mode, handoff checklist |
| *Prompt Engineering for LLMs* — Berryman & Ziegler (PDF) | [prompt-engineering-for-llms.md](sources/prompt-engineering-for-llms.md) | Little Red Riding Hood, playwriting, sandwich-plus-refocus |
| *Prompt Engineering for Generative AI* (EPUB) | [prompt-engineering-for-generative-ai.md](sources/prompt-engineering-for-generative-ai.md) | Five principles, prewarming, meta-prompting, least-to-most |
| *Engineering AI Systems* (PDF) | [engineering-ai-systems.md](sources/engineering-ai-systems.md) | ReAct, Reflexion, circuit breaker, LLM-as-judge, framed autonomy |
| `PacktPublishing/Agentic-Coding-with-Claude-Code` | [agentic-coding-with-claude-code.md](sources/agentic-coding-with-claude-code.md) | `.claude/` skeleton, subagents, hooks, `.mcp.json`, output styles |
| `PacktPublishing/Claude-Code-Masterclass-Code-faster-with-Agentic-AI` | [claude-code-masterclass.md](sources/claude-code-masterclass.md) | Progressive-disclosure skills, Skills-vs-MCP split, MCP Inspector |
| `PacktPublishing/Claude-AI-for-Creatives---Learn-by-Building-Projects` | [claude-ai-for-creatives.md](sources/claude-ai-for-creatives.md) | Parametric prompt library, Kishotenketsu pacing, marketing personas |
| `PacktPublishing/Figma-for-UI-UX-Master-Web-Design-in-Figma` | [figma-for-ui-ux.md](sources/figma-for-ui-ux.md) | Delivery checklist, freelancing message templates |

Cross-source synthesis: [SYNTHESIS.md](SYNTHESIS.md).

To go deeper on a topic: use `notebooklm ask "..."` with specific source IDs, or `gh api repos/<owner>/<repo>/contents/<path>` for repo code, or `Read <pdf-path> pages: "a-b"` for PDFs in `~/Downloads/`.

---

## 8. Kickoff prompt template

When starting a new portfolio task, paste this at the top of the request to Claude:

> Read `docs/knowledge/CLAUDE-BRIEF.md` first. Then read the relevant Figma audit/spec files for this task. Apply the CSS, design-system, and agentic-loop techniques the brief references. Verify with the measurement loop (§2c) before claiming done. Brand: monochrome + ember only. Voice: sentences, no bullets, no AI vocabulary. If anything in the brief conflicts with the current request, flag it before proceeding.
