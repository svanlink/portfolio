# Claude AI for Creatives — Learn by Building Projects

## Summary

Packt video course, 2025. The companion repo is a resources-only drop: six section folders, mostly PDFs, with a handful of markdown files and a screenplay in Final Draft format. The game-design and horror-screenplay artefacts (Raygun Slingers bestiary, Doll Terror script) are not relevant to a filmmaker/creative-director workflow and are skipped here. What is worth keeping: the parametric prompt library with bracketed placeholders, the Universal Framework and Task Decomposition templates as a method for turning any one-off request into a reusable asset, the Kishotenketsu four-act pacing model from the story-conversion section, the coaching-persona pattern from the launch kit, and the AI Marketing Team personas paired with the 2025 benchmark cheat sheet as a way to stress-test a campaign before spending on it.

## Techniques / patterns

1. **Parametric prompts with `[BRACKET]` placeholders.** Every prompt in the library follows the same shape: stable instruction with audience, tone, constraint, and deliverable slots that you fill in each use. `[NUMBER] variations of [ASSET] for [PLATFORM] promoting [PRODUCT] to [AUDIENCE] with [CONSTRAINT]`. The prompt becomes a function, not a one-shot request.
2. **Fifteen-category library as a completeness check.** Ad copy, visual direction, audience research, campaign strategy, performance analysis, content calendars, landing pages, email, social, competitive analysis, brand voice, A/B testing, video scripts, crisis, budget/ROI. If a marketing task does not fit one of these buckets, check that the task is real before building a prompt for it.
3. **Framework-in-prompt.** Every copywriting prompt names the framework it wants: pattern interrupt, question-based hook, benefit-forward declaration, social-proof teaser, before/after. Naming the framework inside the prompt constrains the model far more than adjectives like "compelling" or "punchy."
4. **Universal Framework for Designing Any Complex System.** Section 3's method: start with purpose, list the participants and their incentives, identify the interactions and their rules, choose the visible metrics and their thresholds, name the failure modes. Portable across game design, campaign structure, studio workflow, site architecture.
5. **Universal Task Decomposition Template.** Given a vague creative brief, produce: (1) the atomic deliverable, (2) the prerequisites, (3) the research loops, (4) the review gates, (5) the success criteria. Use before sending the brief to a model so the model cannot silently skip stages.
6. **Kishotenketsu four-act pacing.** Ki — introduction. Shō — development. Ten — twist or shift. Ketsu — conclusion. No central conflict required. Useful for short-form video, essays, and any narrative form where three-act Hollywood structure is overkill.
7. **Story-Format Conversion for business applications.** One story, multiple formats: pulp short, manga beat sheet, screenplay, pitch deck. The asset is the story; the format is the delivery channel. Treat the brand narrative the same way.
8. **AI Marketing Team Personas.** Rather than prompting one generalist, define five: the strategist, the copywriter, the media buyer, the analyst, the creative director. Each has its own system prompt and is addressed explicitly. Produces better output than "act as a marketing expert."
9. **2025 benchmarks as action triggers.** The cheat sheet pairs every metric (Facebook CTR 0.90%, Instagram Feed CPC $3.35, TikTok ROAS 1.67) with a below-average threshold and a specific intervention. The benchmark is not trivia; it is a rule for when to change the creative, tighten the audience, or kill the campaign.
10. **Coaching persona from the Soul Brew launch kit.** A voice persona defined by its response pattern — questions before answers, reframes before solutions, next-step commitments at the end of every exchange. Portable to a directing assistant or a client-onboarding bot.
11. **Reality-Check Journey document.** The launch kit includes a pre-mortem that lists every assumption in the plan and rates its confidence. Before launch, the assumptions below a threshold get a validation test. Analogous to the Observability-2.0 data-canary pattern from *Engineering AI Systems*.
12. **Problem → Agitation → Solution → Proof → CTA scaffold.** Classic direct-response copy structure, but explicit in every prompt that uses it. Prevents the model from skipping agitation (the step that produces emotional purchase) and landing on a flat benefits list.
13. **Emotional-angle fan-out.** One product, five emotional angles from the library: fear eliminated, aspiration fulfilled, frustration removed, joy created, transformation enabled. Use as a divergent-thinking step before picking the angle for a specific channel.
14. **Benefit rewrite prompt.** "For each feature, translate to: what does this mean for me? how does this improve my life? what can I do now that I could not before?" Forces feature-first copy through a customer-voice filter in one pass.
15. **Objection-busting copy scaffold.** List the three most common objections up front, then require social proof, risk reversal, logical reframe, and emotional reassurance in the response. Beats adversarial single-turn "respond to this objection" prompts because it pre-commits the scope.

## Code snippets worth remembering

```text
# Parametric ad-copy prompt (the canonical shape of every prompt in the library)
I need [NUMBER] variations of ad copy for [PLATFORM] promoting [PRODUCT/SERVICE].

Target audience:   [DEMOGRAPHICS + PSYCHOGRAPHICS]
Key benefit:       [MAIN BENEFIT]
Unique selling:    [USP]
Tone:              [Professional / Casual / Playful / Urgent]
Character limit:   [LIMIT]

Include a strong hook, a clear value proposition, and a compelling CTA.
Format for [PLATFORM] best practices.
```

```text
# Hook generator with explicit frameworks named
Generate 20 attention-grabbing hooks for [PRODUCT/SERVICE] that:
- Stop scrollers immediately
- Create curiosity or urgency
- Are under [CHARACTER COUNT] characters
- Speak to [TARGET AUDIENCE]'s biggest pain point: [PAIN POINT]

Use these frameworks, one per hook, labelled:
- Pattern interrupt (unexpected statement)
- Question-based hook
- Benefit-forward declaration
- Social-proof teaser
- Before/After implication
```

```text
# Emotional-angle fan-out prompt (divergent-thinking step before channel pick)
I'm advertising [PRODUCT/SERVICE] to [TARGET AUDIENCE].

Give me 5 distinct emotional angles, one per line:
1. What fear does this solve?
2. What aspiration does this fulfill?
3. What frustration does this eliminate?
4. What joy does this create?
5. What transformation does this enable?

For each angle, write a 2-sentence ad concept.
```

```text
# Kishotenketsu beat sheet (no-conflict 4-act pacing)
Ki   — Introduction. Introduce character, setting, tone. No tension yet.
Shō  — Development. Expand the world, deepen the character, build texture.
Ten  — Twist. Introduce an unrelated element or perspective shift that
        re-contextualises everything that came before.
Ketsu — Conclusion. Resolve by integration, not by defeating an antagonist.

Portable to: 60-second films, Substack essays, case-study videos,
explainer reels where conflict would feel forced.
```

```text
# Benchmark-driven action trigger (Facebook Ads, 2025)
Metric            Good        Below Average → Action
CTR               0.90%       <0.70% for 3+ days → change creative, rewrite hook, test video
CPC               $0.70       >$1.20           → tighten targeting, improve relevance score
CPM               $8.96       >$15             → change ad schedule or audience
Conversion rate   8.95%       <5%              → fix landing page or offer
Cost per lead     $21.98      >$35             → reevaluate the funnel

Rule: do not optimise on gut. Write the trigger before the campaign launches,
then honour it when the trigger fires.
```

## Anti-patterns

- Prompting a generalist "marketing expert" for every task. The five-persona split (strategist, copywriter, media buyer, analyst, creative director) produces sharper output than one generic role.
- Treating the prompt library as copy-paste assets. Without filling in the bracketed placeholders carefully, the output is generic and the library is wasted.
- Skipping the Task Decomposition step on ambiguous briefs. A muddy brief run straight through a model produces a polished-looking but shallow deliverable, and the review cycle reveals the gap too late.
- Running a campaign without the benchmark triggers written down. You will rationalise a failing CTR for a week before you kill it.
- Using Kishotenketsu for work that genuinely needs three-act tension. Not every story benefits from a twist-based structure; pick the form before drafting.
- Adopting the coaching-persona pattern for time-sensitive client work. The question-first cadence is right for discovery, wrong for "I need the deliverable tonight."

## Page or file references

- Repository: `https://github.com/PacktPublishing/Claude-AI-for-Creatives---Learn-by-Building-Projects`
- Course: Packt, 2025 (video course; companion repo is PDFs and markdown, no runnable code)
- Section 3 — Universal Framework for Designing Any Complex System; Universal Task Decomposition Templates
- Section 4 — Kishotenketsu (Doll Terror manga beat sheet); Story-Format Conversion for Business Applications
- Section 5 — Soul Brew Coffee Shop Marketing Kit (coaching persona); Reality-Check Launch Journey (pre-mortem)
- Section 6 — Digital Marketing Prompts For Creatives (15 categories, 100+ parametric prompts); AI Marketing Team Personas; Digital Marketing Benchmarks Quick Reference 2025
- Skip for Sebastian's workflow: Raygun Slingers game-design artefacts (Sections 3-4), Doll Terror screenplay and asset list (Section 4). These are course exercises, not directing resources.
- Overlap: the prompt-engineering scaffolds here are downstream applications of the Five Principles from *Prompt Engineering for Generative AI* — that book is the source; this one is the applied library.
