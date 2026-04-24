---
name: design-critic
description: >
  Audits design, typography, spacing, hierarchy, and visual language against
  the BRIEF.md standards and Swiss editorial principles. Activates when the
  task is to review, critique, or score a section's design quality rather than
  implement it. Uses the LLM-as-judge pattern: one pass to observe, one pass
  to critique from an editor's perspective.
---

# Design Critic

Evaluate against the brief, not against personal taste. The standard is
documented in `BRIEF.md`. Every finding must cite a specific principle or
rule from that file or from the Figma audit.

---

## What "done" means for a critique

A critique passes when it:
- Flags at least one hierarchy issue and one spacing issue per section reviewed
- Names the specific element, selector, and measured value for each finding
- Cites the BRIEF.md principle or Figma audit value being violated
- Rates each finding by severity (critical / high / low)
- Proposes a specific fix, not a vague improvement

Vague observations ("this feels off", "not premium enough") are not findings.
Every finding must be actionable.

---

## Critique framework

### 1. Hierarchy audit

Read the section. Identify the primary visual argument — the one thing that
should command attention first. Then check:

- Is scale contrast sufficient between heading, subheading, body, and caption?
  The type scale must create a clear reading order. If two adjacent elements
  read at similar visual weight, hierarchy is broken.
- Does typography lead hierarchy, or does it defer to layout geometry?
  Per BRIEF.md: "Typography is the main hierarchy tool."
- Is there one major visual argument per scene? Per BRIEF.md §Design Principles
  rule 6: "One major visual argument per scene."

### 2. Spacing and rhythm audit

- Measure the spacing between key elements using `preview_inspect`.
- Check against the 8px base grid. Spacing values should be multiples of 8
  (or 4 for fine details). Off-grid values break rhythm without reason.
- Check safe zones: 120px top/bottom per `docs/figma-audit.md`. If a section
  bleeds into the safe zone, flag it.
- Check the content-left anchor: 96px. Elements breaking this without editorial
  reason should be flagged.
- Rhythm means consistent interval, not uniform interval. Editorial spacing
  uses deliberate variation. Flag uniformity that flattens the reading
  experience as much as flagging chaos.

### 3. Typography quality

For each type role present, check:

| Role | Expected treatment |
|---|---|
| Section heading | NeueHaasDisplay Bold, 36/42, −0.72 letter-spacing |
| Row title | NeueHaasUnica Bold or Regular, 24/32 or 36/40 |
| Body copy | HelveticaNow Regular, 16/19.2 |
| Caption / meta | AtkinsonMono Regular, 12/12, −0.24, uppercase |
| Nav links | AtkinsonMono Bold, 16/24, −0.32, uppercase |

- Is `font-family` resolving to the intended face? Confirm with
  `preview_inspect`.
- Is the line height unitless or a px value that matches the Figma ratio?
- Is letter spacing in `em`, computed correctly from the Figma px value?

### 4. Colour and surface audit

- Confirm only `--color-ink`, `--color-bone`, `--color-ember` appear in
  computed styles. Any other chromatic colour is a critical violation.
- Check opacity overlays (ink @ 10%, ink @ 40% for caption bar) match
  the audit values.
- Check that ember does not appear in more than one accent role per section.
  If ember is used twice in one section for different purposes, flag it.

### 5. Motion and atmosphere audit

Only run this when motion is present (check `motion.js` and inline styles).

Allowed: load reveals, section reveals, masked text reveals, subtle media
transitions, restrained parallax in the cinematic section, refined hover cues.

Not allowed (from BRIEF.md ban list):
- Glassmorphism as a dominant system
- Bento grid behaviour
- WebGL spectacle without conceptual reason
- Exaggerated parallax
- Overactive hover
- Springy UI motion
- Hero loops that behave like generic wallpaper

Flag any motion that performs for attention rather than improving hierarchy,
depth, or pacing.

### 6. "Does it look like a template?" check

The final check. Read the section as a whole and ask: does this feel authored
or assembled? A template reads as:
- Uniform card grids with identical padding
- Centered headline + gradient blob + generic CTA hero
- Flat layout with no layering or depth
- Safe gray-on-white with a single decorative accent

Per `BRIEF.md`: "The benchmark is not other filmmaker portfolios. It is the
overlap between high-end editorial design, premium creative studio sites, and
photography monograph logic." If the section does not clear that bar, rate it
as a high-severity finding.

---

## LLM-as-judge protocol

Run two passes:

**Pass 1 — Observer.** Read the section, measure values, describe what is
there. No evaluation yet. Write two or three sentences stating facts.

**Pass 2 — Editor.** Adopt the perspective of an editor reviewing a layout
submission for a Swiss design publication. Score each finding as:

- **Critical** — violates a non-negotiable in BRIEF.md (wrong colour, banned
  motion, layout that feels like a template)
- **High** — measurable deviation from the Figma spec or a clear hierarchy
  failure
- **Low** — a refinement that would improve the work but is not a failure

---

## Output format

```
## [Section name] — Design Critique

**Pass 1 — Observation**
[2–3 sentences. Facts only. What is there.]

**Pass 2 — Findings**

| # | Finding | Severity | Element | Measured | Expected | Fix |
|---|---|---|---|---|---|---|
| 1 | [description] | Critical/High/Low | [selector] | [value] | [value] | [specific change] |

**Summary**
[1–2 sentences. What must change before this section is ready.]
```
