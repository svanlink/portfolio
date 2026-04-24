# Knowledge Synthesis

Cross-source reading across the twelve source files in `docs/knowledge/sources/`, organised by the six domains Sebastian works in. Each domain names the sources that cover it, calls out where multiple sources reinforce the same pattern, and flags where they disagree. Disagreements are the most useful part — they are where the field has moved, where the authors picked different problems, or where Sebastian needs to decide which book wins in his workflow.

---

## 1. Prompt engineering

**Primary sources:** *Prompt Engineering for LLMs* (Berryman & Ziegler), *Prompt Engineering for Generative AI* (O'Reilly).
**Secondary:** *Engineering AI Systems*, *Claude AI for Creatives*.

### Reinforced across sources

Three to five few-shot examples is the cross-source default. Berryman & Ziegler treat it as a distribution-shaping rule; O'Reilly lists it as one of the Five Principles; *Claude AI for Creatives* operationalises it by parametrising every prompt template so the "examples" slot is filled per-use. Past five examples the model overfits; below three, it is hinting.

Structured output formats beat free-form prose whenever a human or a parser will consume the result. Berryman & Ziegler prefer XML and YAML for human-readable payloads, reserving JSON for parseable output. O'Reilly pushes the same direction but adds the Pydantic validation layer. Both agree that "programmatic directives" — telling the model the output will be parsed — change generation behaviour, not just human reading comfort.

Reasoning passes are additive, not alternative. All three technical sources agree on the ladder: zero-shot chain-of-thought first (cheapest), Reflexion on top (self-critique rewrite), LLM-as-judge as the independent overseer when the primary model cannot grade itself. *Engineering AI Systems* names the ladder explicitly; O'Reilly and Berryman & Ziegler describe the same rungs under different names.

The sandwich-plus-refocus layout — core instruction at the top, context in the middle, instruction restated at the bottom — is a Berryman & Ziegler pattern that O'Reilly's Five Principles checklist produces by default when Direction and Format are both named. They reached the same structure from different angles.

### Disagreements worth resolving

**Format preference: XML/YAML vs JSON.** Berryman & Ziegler favour XML for short self-contained fields (escaping is easy) and YAML for multi-line text that needs indentation, reserving JSON only when a parser downstream requires it. O'Reilly's production examples lean JSON-first with schema validation. The reconciliation: XML/YAML wins when a human reviews the output; JSON wins when it goes straight to `json.loads`. Both books implicitly agree, but the defaults differ because they target different audiences (Berryman & Ziegler write for engineers debugging prompts, O'Reilly writes for engineers shipping pipelines).

**Tree of Thoughts: niche or standard?** O'Reilly treats ToT as "overkill for most tasks, worth it for planning and search." *Engineering AI Systems* treats it as a standard pattern in the agentic toolkit. For Sebastian's workflow (single-developer, time-bounded), the O'Reilly framing is right: reach for it only on genuine search problems, not on one-shot generation.

**Meta-prompting as a first-class technique.** O'Reilly elevates "use one LLM to write prompts for another" to a named pattern. Berryman & Ziegler barely mention it. *Claude AI for Creatives* sidesteps it entirely in favour of human-authored parametric prompts. The pragmatic read: meta-prompting is valuable for image generation (where the target language is alien) and for cold-starting on unfamiliar domains. For familiar domains with good prompt libraries, human-authored prompts beat meta-generated ones.

### How this applies

When building a Claude-facing prompt for the portfolio: run through O'Reilly's Five Principles (Direction, Format, Examples, Evaluation, Division) as the checklist, use Berryman & Ziegler's sandwich-plus-refocus as the layout, wrap the output in XML tags for review or JSON for parsing, and add a Reflexion pass before trusting the result. Keep ToT off the table unless the task is genuinely search.

---

## 2. Agentic loops and guardrails

**Primary sources:** *Engineering AI Systems*, *Agentic Coding with Claude Code* (Eden Marco), *Claude Code Masterclass* (Packt).
**Secondary:** *Prompt Engineering for Generative AI*.

### Reinforced across sources

The ReAct loop — reason, act, observe, repeat — is the unanimous default control flow. *Engineering AI Systems* and both Claude Code books describe it identically. The only variation is where it lives: *Engineering AI Systems* puts it in the agent framework; Marco's book puts it inside the subagent delegation pattern.

Framed autonomy is the shared governance model. *Engineering AI Systems* names the pattern (full autonomy inside a defined frame, explicit escape for anything outside it). Marco's book operationalises it through the `.claude/agents/<name>.md` tool whitelist — every subagent's `tools:` frontmatter is the frame. *Engineering AI Systems*'s hooks-as-execution-guardrails pattern matches Marco's PreToolUse hook exactly: both block dangerous tool calls before execution.

Hierarchical delegation is treated as load-bearing by all three: main agent plans, subagents execute, subagent raw output never enters the main context. Marco calls it "context engineering over prompt engineering"; *Engineering AI Systems* calls it "observability 2.0 with a clean trace." Same pattern, different vocabulary.

Skills versus MCP — behavior versus connectivity — is introduced in the *Claude Code Masterclass* and implicit in Marco's book. Skills define how Claude reasons; MCP servers provide data and tools. A skill may call an MCP tool, but an MCP server cannot replace a skill. This architectural split is the keeper from the thinner *Masterclass* source.

### Disagreements worth resolving

**`CLAUDE.md` as router vs encyclopaedia.** Marco is explicit: keep `CLAUDE.md` terse, routing-first, under pressure the agent summarises long files and rules evaporate. The *Masterclass* repo treats `CLAUDE.md` as a place to dump key rules directly. Marco's position is more defensible and matches Sebastian's existing `CLAUDE.md` in the Frame OS vault, which already uses a task-based loading table rather than inlining content.

**Skill scope default: global vs project.** The *Masterclass* recommends global (`~/.claude/skills/`) for reusable behaviours like commit-message enforcement. Marco's book puts skills at `.claude/skills/` inside each project. Reconciled: project-specific domain logic goes in the project; personal or cross-project behaviours go global. Both books are right about their own cases, wrong about the opposite case.

**Subagent granularity.** Marco recommends narrow, specialised subagents with under 150 lines each. *Engineering AI Systems* discusses the constitutional-LLM pattern where a single "overseer" subagent checks all outputs. The two views co-exist: many narrow specialists for execution, one overseer for cross-cutting rules.

**Autonomy dial.** *Engineering AI Systems* says "full autonomy inside the frame, HITL gates for irreversible actions." Marco's book pushes harder on autonomy, assuming a trusted developer running locally. The Frame OS `CLAUDE.md` already has the more nuanced rule: higher autonomy for system/vault tasks, lower for public-facing writing and client work.

### How this applies

A project `.claude/` tree should follow Marco's structure (router `CLAUDE.md`, whitelisted subagents, parametric slash commands, progressive-disclosure skills). The governance rules should follow *Engineering AI Systems*'s framed-autonomy and HITL-gate patterns. The *Masterclass* contribution is the one sentence: when in doubt, put the reusable behaviour at the user level, the specific behaviour at the project level.

---

## 3. Modern CSS

**Primary sources:** *CSS in Depth, 2nd edition* (Keith J. Grant).
**Secondary:** *Mastering Front-End Development*, *Perez-Cruz Expressive Design Systems*.

### Reinforced across sources

Custom properties as the primary design-token vehicle is the cross-source default. Grant organises them by component scope inside the `modules` layer; Perez-Cruz organises them by Values/Roles/Components across three layers; *Mastering FE* treats them as a fallback-friendly way to decorate components. All three agree on the mechanics; Perez-Cruz owns the semantic layering, Grant owns the cascade-layer mechanics.

Component-scoped tokens beat a single giant `:root` block. Grant demonstrates this inside his `.dropdown` component; Perez-Cruz argues it at the system level; *Mastering FE* implies it by showing `var(--x, fallback)` patterns that make sense only when the variable is component-scoped.

`prefers-reduced-motion` is a required contract, not a nice-to-have. Grant puts the universal reset inside the reset layer so every later rule inherits it; *Mastering FE* treats it as a first-class query that ships with every non-trivial transition. Sebastian's Frame OS global rules already require this reset in web work.

### Disagreements worth resolving

**Colour format: oklch vs hex/hsl.** Grant uses `oklch()` everywhere in the second edition and demonstrates relative-colour `oklch(from var(--x) calc(l + 20%) c h)`. *Mastering FE* still shows hex and hsl. Grant wins cleanly: `oklch` is perceptually uniform, works in `calc()` and relative-colour syntax, and supports wide-gamut displays. *Mastering FE* is older thinking. For the portfolio, pick `oklch` and convert everything.

**Animating custom properties: `@property` or not.** Grant mandates `@property` registration for any custom property that needs to transition. *Mastering FE* describes transitions without mentioning `@property`, which means its transition advice fails silently on custom-property targets. Grant is right; the *Mastering FE* version is outdated.

**Cascade management: layers vs BEM vs specificity wars.** Grant's `@layer reset, theme, global, modules;` stack is the decisive pattern. *Mastering FE* does not address cascade layers. Perez-Cruz does not take a position on CSS mechanics. No real disagreement, but Grant's stack is a clear improvement over everything else and should be the default starting point for any new stylesheet.

**`100vh` vs `100dvh`.** Grant uses `100dvh` throughout. *Mastering FE* still uses `100vh`. Grant is right about mobile; `100dvh` accounts for the collapsing browser chrome and `100vh` overflows. Straight substitution.

### How this applies

Start every new stylesheet with Grant's four-layer stack (`@layer reset, theme, global, modules;`). Use `oklch()` for all colour. Register animatable custom properties with `@property`. Ship `prefers-reduced-motion` inside the reset layer. Scope tokens to components, not to `:root`. *Mastering FE*'s CSS chapter is thin and partially outdated; default to Grant.

---

## 4. Responsive and fluid layout

**Primary sources:** *Responsive Web Design* (Marcotte).
**Secondary:** *CSS in Depth, 2nd edition*, *Mastering Front-End Development*.

### Reinforced across sources

Proportional thinking over pixel translation is the philosophical throughline. Marcotte's fluid formula (`target ÷ context = result`) teaches the habit; modern sources assume it. Grant's `clamp()`-based fluid type in the second edition is proportional thinking extended to a two-variable function (viewport, rem).

`<meta name="viewport" content="width=device-width, initial-scale=1">` is non-negotiable. Marcotte names it; every subsequent source treats it as assumed.

`max-width: 100%` on images is still the unchanged rule. Marcotte's 2011 formulation survives intact because the problem did not change.

### Disagreements worth resolving

**Fluid type: ems-with-context vs `clamp()`.** Marcotte teaches `font-size` in ems with the math recomputed against the parent at every nesting level. Grant uses `clamp(1rem, 0.92rem + 0.4vw, 1.125rem)` — a viewport-width-scaling formula that collapses the nesting concern. The modern approach wins: `clamp()` is deterministic, does not require hand-tracing ancestors, and degrades gracefully. Marcotte's method is still instructive for understanding proportional thinking but should not be used in new code.

**Mobile-first min-width ladder vs desktop-first max-width ladder.** Marcotte argues mobile-first as the correct default; modern practice agrees. *Mastering FE* mentions both without taking a position. No real disagreement in 2026; mobile-first is the settled answer.

**Media queries vs container queries.** Marcotte uses only `@media`. *Mastering FE* mentions container queries in passing. Grant's second edition covers them in depth. The decision rule: page-level layout uses media queries; component-level responsiveness (a card that should stack differently when it is narrow regardless of viewport) uses container queries. Neither source fully articulates this; it is the synthesis.

**Breakpoint list: device-survey vs content-driven.** Marcotte recommends surveying real device widths (320, 480, 600, 768, 1024, 1200) and treating them as checkpoints. Modern practice prefers content-driven breakpoints: where does the layout actually break? For Sebastian's portfolio — a small set of known surfaces — content-driven is simpler. Marcotte's device list is still a useful sanity check.

### How this applies

Keep Marcotte's proportional thinking; replace his ems-with-context with `clamp()`-based fluid type. Use `max-width: 100%` on images without modification. Default to mobile-first. Prefer content-driven breakpoints but cross-check against Marcotte's device list. For component-level reflow, prefer container queries over media queries.

---

## 5. Design systems and Figma handoff

**Primary sources:** *Expressive Design Systems* (Perez-Cruz), *Design Beyond Limits with Figma* (Šimon Jůn).
**Secondary:** *Figma for UI/UX*, *CSS in Depth, 2nd edition*.

### Reinforced across sources

Three-layer token structure (Values → Roles → Components) is named by Perez-Cruz and enacted by Jůn's three-collection pipeline (Primitives → Semantic → Component). They are the same model; Perez-Cruz argues it from a system-design angle, Jůn wires it into Figma Variables collections. Grant's component-scoped tokens inside the `modules` layer are the CSS-side realisation of the same pattern.

Semantic tokens only leave the system. Jůn: export semantic and component tokens, keep primitives Figma-internal. Perez-Cruz: role names in the codebase, never raw palette names. Grant: reference semantic custom properties from component styles. Three independent votes for the same rule.

WCAG contrast as a token-level check, not a final-QA step. Perez-Cruz defines color groups keyed to background (`OnBlack-Primary`, `OnBone-Primary`) that pass WCAG at the group level; Jůn shows the same pattern in Figma with a contrast-audit page for every semantic colour pair; Grant implicitly supports it through component-scoped tokens.

Variants for visual states, booleans for orthogonal toggles is the Jůn rule and matches Perez-Cruz's distinction between intentional-and-meaningful variation (belongs in the system) and intentional-but-unnecessary variation (does not). The rule reduces the variant matrix and keeps the system auditable.

### Disagreements worth resolving

**Figma Variables vs Figma Styles.** Jůn is explicit: Variables carry semantic meaning and scope, Styles only hold values; every token should be a Variable. *Figma for UI/UX*, being older and freelancer-focused, is ambiguous. Jůn wins cleanly for system work. Styles survive only for effects and text-style bundles that do not map 1:1 to code.

**Space scale: linear vs nonlinear.** Perez-Cruz says pick one and commit. Linear (4, 8, 12, 16, 20) for uniform rhythm; nonlinear (4, 8, 16, 32, 64) for exponential hierarchy. No other source weighs in. For a portfolio microsite where hierarchy matters more than density, nonlinear is usually correct.

**Component naming: semantic vs descriptive.** Perez-Cruz pushes for semantic ("Story Feed," "Callout," "Divider"). Jůn names by visual role ("Button", "Card") which is slightly more descriptive. Both reject metaphorical names ("River," "Rocks"). The reconciliation: descriptive names for low-level atoms, semantic names for page-level composites. Both are right for their layer.

**System purpose statement.** Perez-Cruz mandates it before any token work. Jůn does not explicitly mention it. Missing purpose is one of the causes of the drift Jůn warns about in later chapters. The two books reinforce each other once the gap is filled.

### How this applies

For the portfolio design system: start with Perez-Cruz's purpose statement, build Jůn's three-collection Figma Variables pipeline (Primitives / Semantic / Component), export semantic and component tokens to CSS custom properties organised inside Grant's `modules` layer, use nonlinear space scale, pair colour tokens with contrast-tested background groups, and enforce the variants-vs-booleans rule at the component level. *Figma for UI/UX*'s contribution is the delivery checklist and client-messaging templates, not the system model.

---

## 6. Performance and rendering

**Primary sources:** *Mastering Front-End Development*.
**Secondary:** *CSS in Depth, 2nd edition*, Sebastian's global `rules/web/performance.md`.

### Reinforced across sources

Animate compositor-friendly properties only (`transform`, `opacity`, `clip-path`, `filter` sparingly). *Mastering FE*, Grant, and Sebastian's rules agree. Layout-bound properties (`width`, `height`, `top`, `margin`) are the explicit banned list in all three.

Critical-path fundamentals: inline above-the-fold CSS, preload the hero asset and the primary font, defer the rest. *Mastering FE* describes the pattern; Grant's second edition Ch 16 shows the layer stack in practice; Sebastian's rules codify the bundle and CWV targets.

`font-display` should not block. Consensus: `swap` or `fallback`. Grant prefers `fallback` (text immediately, swap only if font arrives within 3s); *Mastering FE* prefers `swap` (always swap when font arrives). Both are defensible; `fallback` is the more conservative choice when the brand font is decorative.

`preconnect` to both `fonts.googleapis.com` and `fonts.gstatic.com` (with `crossorigin` on the second) is the Grant-specific refinement that *Mastering FE* implies but does not spell out. Without both, the browser pays two serial handshakes.

### Disagreements worth resolving

**FID vs INP.** *Mastering FE* cites Core Web Vitals as LCP < 2.5s, FID < 100ms, CLS < 0.1. This is stale: INP replaced FID in the Google ranking signal in 2024. Sebastian's global rules already reflect INP < 200ms. *Mastering FE*'s numbers are otherwise correct; FID is the only outdated metric.

**`will-change`: always or sparingly.** *Mastering FE* says use `will-change` before heavy animation. Sebastian's global rules say use narrowly and remove when done. Grant does not weigh in. The correct rule is the narrow one: a permanent `will-change` leaks GPU memory and regresses scroll performance.

**`100vh` vs `100dvh`.** *Mastering FE* still uses `100vh`. Grant uses `100dvh`. Grant is right for mobile; see the Modern CSS section.

**Service-worker stale-while-revalidate.** *Mastering FE* recommends it; Grant does not address service workers; Sebastian's rules are silent. For a portfolio microsite the cost-benefit is poor: service workers add debugging complexity for marginal revisit performance gains. Skip unless there is a measurable need.

### How this applies

Use *Mastering FE*'s render-path pattern (preload hero, preconnect fonts, inline critical CSS) as the baseline, Grant's `font-display: fallback` and `100dvh` as refinements, and Sebastian's INP target (< 200ms) in place of the stale FID number. Animate `transform` and `opacity` only. Keep `will-change` on a single transition's lifetime, not permanently. Skip service workers unless a specific requirement demands one.

---

## Cross-domain observations

**The "1 + 11" pattern: one authoritative source per domain plus eleven that reinforce or erode around it.** In modern CSS, Grant is the authority and every other source is either confirming or outdated. In responsive layout, Marcotte is the historical authority but Grant has superseded the tactics. In design systems, Perez-Cruz and Jůn split the authority cleanly (principles / Figma implementation). In prompt engineering, Berryman & Ziegler and O'Reilly overlap more than they disagree. In agentic loops, *Engineering AI Systems* is the authority on theory and Marco is the authority on Claude Code practice. In performance, *Mastering FE* is the baseline but it is shallow and partially stale.

**The three thin sources should be used as indexes, not references.** *Mastering Front-End Development*, *Claude Code Masterclass*, and *Figma for UI/UX* are all thinner than their authoritative counterparts and overlap heavily with them. Keep them for the one or two ideas each one owns uniquely (print stylesheets in *Mastering FE*, Skills-vs-MCP split in *Masterclass*, delivery checklist in *Figma for UI/UX*), and reach for the primary source for everything else.

**The contradictions cluster in three places.** Dates (INP vs FID, oklch vs hex, `100dvh` vs `100vh`), audience (JSON-first for engineers vs XML-first for prompt authors), and scope (skill at global vs project level, `CLAUDE.md` as router vs encyclopaedia). None of these are unresolvable; all are cases where the newer or more specific source wins.
