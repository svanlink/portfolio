# Prompt Engineering for LLMs — Berryman & Ziegler

## Summary

O'Reilly, 2024, ISBN 9781098156152. Written by two engineers from the GitHub Copilot team for developers who are building applications on top of LLMs and who need more than vibes-based prompting. The book's central move is to stop treating the LLM as a conversational partner and start treating it as a document-completion engine whose behavior is governed by the distribution of its training corpus. Every technique in the book is a corollary of that framing: align the prompt with document patterns the model has seen a thousand times, and the output becomes predictable. For a Claude-driven portfolio workflow the book pays for itself just in the vocabulary for structuring system prompts and evaluating outputs.

## Techniques / patterns

1. **Little Red Riding Hood principle.** Do not stray far from the path. Pattern the prompt after common document shapes the model has seen: markdown docs, transcripts, code blocks, conventional commit messages. Inventing a novel structure forces the model off-trail and reliability drops.
2. **Playwriting metaphor.** The prompt author is a showrunner writing a script for several roles: system, user, assistant, tool. Every turn should read as something that character would plausibly say in that scene. Out-of-character lines break completion quality.
3. **ChatML roles.** System sets behavior and rules, user conveys the task, assistant responds, tool returns external data. Keep responsibilities clean; do not bury rules inside user turns.
4. **Inception.** On completion-style models, begin the assistant response for the model. Ending with `Sure, here is the JSON:` forces the next tokens to match that frame.
5. **Transitioning.** The last tokens of the prompt shift the model from question-poser to answerer. End with a colon, an opening quote, or a half-finished sentence the model must close.
6. **Sandwich technique.** Put the core instruction at the top and again at the bottom. The middle holds context, examples, and retrieved snippets. Instruction repetition survives the model's "lost middle."
7. **Refocusing.** Long prompts drift. The final paragraph restates the primary task so the model does not answer a subproblem it encountered along the way.
8. **Few-shot with 3–5 examples.** One example is a hint, three to five define the distribution. Pick examples that span the expected output shape, not just the easy case.
9. **Zero-shot chain-of-thought.** "Let's think step by step" is the cheapest reasoning upgrade. Use it when correctness matters more than token cost.
10. **ReAct loop.** Reason, Act (tool call), observe result, reason again. The loop belongs in the control layer, not inside a single prompt.
11. **Reflexion.** After the first answer, prompt the same model to critique it and rewrite. The critique pass catches errors the generation pass cannot see.
12. **Elastic snippets.** For retrieval contexts, keep short, medium, and long versions of each source and fit the largest that stays within the token budget.
13. **Structured output formats.** XML for short self-contained elements (escaping is easy), YAML for multi-line text that needs indentation, Markdown for human-readable reports. JSON only when downstream needs to parse.
14. **Recognizable start and end markers.** Wrap parseable output in triple backticks or explicit section headers. Makes the boundary unambiguous for a regex or a parser.
15. **Logit bias for yes/no calibration.** For classification, shift `logit_bias` on the two target tokens to force the model toward a confident answer and reduce hedging.
16. **SOMA evaluation.** Specific questions, Ordinal scaled answers, Multi-Aspect coverage. Design evals as rubrics, not as "did it feel good."
17. **RTC evaluation.** Relevance, Truth, Completeness. The three axes Copilot uses to score chat.
18. **Chekhov's gun fallacy.** The model assumes everything in the prompt is load-bearing, so it will weave in irrelevant context. Remove anything that is not needed for this specific call.

## Code snippets worth remembering

```text
# Zero-shot chain of thought
Q: A store has 23 apples and sells 8. How many are left?
A: Let's think step by step.
```

```xml
<!-- Preferred structural format for short fields -->
<analysis>
  <topic>subgrid</topic>
  <confidence>high</confidence>
  <next_action>show example</next_action>
</analysis>
```

```text
# Sandwich with refocus at the bottom
You are reviewing CSS for a portfolio site. Flag any physical properties
that should be logical properties.

<files>
[... retrieved code ...]
</files>

Remember: only flag physical-to-logical swaps. Ignore everything else.
Return a JSON array of {file, line, suggestion}.
```

```text
# Inception on a completion model
...therefore the recommended CSS is:

```css
```

```text
# Few-shot shape with explicit distribution
Input:  margin-left: 16px;
Output: margin-inline-start: 16px;

Input:  padding-top: 24px; padding-bottom: 24px;
Output: padding-block: 24px;

Input:  text-align: left;
Output:
```

## Anti-patterns

- Writing novel, "creative" prompt formats the model has never seen in training. Reliability drops the further from familiar document shapes you go.
- Putting the critical instruction only in the middle of a long prompt ("lost middle"). The model's attention sags there.
- Trusting a single-pass output for non-trivial tasks. Ship a Reflexion-style critique loop before treating it as final.
- Decorating the prompt with context "just in case." Chekhov's gun: the model will find a way to use it and derail.
- Using JSON as a human-readable container. It forces escaping gymnastics; prefer XML or YAML when a human will read the output.
- Believing the model when it states a false premise confidently. Truth bias means prompt nonsense in, nonsense out.
- Hierarchical summarization over many levels. The "rumor problem": the last layer is playing telephone with the first.
- Treating RLHF'd models as strictly smarter. The "alignment tax" often costs raw reasoning accuracy for politeness.

## Page or file references

- Source on disk: `~/Downloads/prompt-engineering-for-llms-...-9781098156152.pdf` (359 pages)
- Ch on structure and ChatML — playwriting metaphor, role discipline
- Ch on context windows — lost middle, sandwich, refocus, transition
- Ch on output shaping — XML vs YAML vs Markdown, markers, logit bias
- Ch on reasoning — zero-shot CoT, ReAct, Reflexion
- Ch on evaluation — SOMA, RTC, rubric design
- NotebookLM source ID: `bb093cf8-78e6-4...`
