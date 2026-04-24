# Copy Refinement Prompt

---

## Template

```
Read BRIEF.md §Core Positioning and the relevant section in index.html.

Refine the copy in [SECTION / ELEMENT] against these standards:

Voice constraints (from BRIEF.md and brand profile):
- Sentences, not bullets.
- No em-dashes. Use a period, comma, or colon.
- No AI vocabulary (utilise, leverage, seamless, cutting-edge, innovative,
  robust, elevate, game-changing, dynamic, compelling, streamline).
- No bold for emphasis in prose.
- Direct. No softening, no performed enthusiasm, no encouragement.

Positioning constraint:
- Sebastian is a filmmaker and photographer at the intersection of Swiss
  editorial structure and cinematic image authority.
- He is not a "videographer." He is not a "content creator."
- Services are positioned at a premium strategic level, not executional.
- The benchmark is a photography monograph designed by someone who directs.

Task:
1. Read the current copy in [SECTION / ELEMENT].
2. Identify any phrase that violates the voice or positioning constraints.
3. Rewrite the offending phrases. Do not rewrite copy that already works.
4. Output the revised copy block with each changed phrase annotated:
   [CHANGED: reason]
5. If a service label or section title reads below the strategic level,
   flag it and propose an alternative.

Do not change the HTML structure. Copy changes only.
```
