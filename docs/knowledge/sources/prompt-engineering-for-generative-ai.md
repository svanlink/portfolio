# Prompt Engineering for Generative AI — Phoenix & Taylor

## Summary

O'Reilly, ISBN 9781098153434. Broader than Berryman & Ziegler's Copilot-focused book: covers text LLMs, image diffusion models, and agentic workflows under one model-agnostic framework. Written for practitioners moving a prompt from notebook hack to production. The keepers for a Claude-driven portfolio are the Five Principles checklist (a sanity test for any prompt), the meta-prompting and least-to-most patterns for agent orchestration, and the negative-prompt / format-modifier vocabulary if you ever wire in an image-generation step.

## Techniques / patterns

1. **Five Principles of Prompting.** Direction, Format, Examples, Evaluation, Division. Run every non-trivial prompt through these five before shipping; a missing principle is a known failure mode.
2. **Give Direction.** Describe the desired style, tone, or persona in detail. Vague "write well" produces average output; "write like a senior CSS engineer explaining subgrid to a junior" narrows the distribution.
3. **Specify Format.** Name the structure (JSON, YAML, Markdown with specific headers). The model optimizes for whatever shape it sees, so under-specifying guarantees drift.
4. **Provide Examples.** Three to five covering the breadth of expected outputs. Too many examples overfits and suppresses novel but correct answers.
5. **Evaluate Quality.** Build a rubric. Thumbs-up/thumbs-down only catches catastrophic failure; ordinal rubrics catch degradation. LLM-as-judge is a valid second pass.
6. **Divide Labor.** A single prompt that does retrieval, reasoning, formatting, and style in one call will fail at some of them. Split into chained prompts, each specialized.
7. **Prewarming (internal retrieval).** First turn: "List best practices for X." Second turn: "Now apply those to this specific case." The model's own advice becomes the context.
8. **Meta-prompting.** Use one LLM to write prompts for another. Works especially well for image models where the prompt language is alien to most humans.
9. **Least-to-most.** Decompose a hard problem into a chain of simpler prompts; each output becomes context for the next. Similar to chain-of-thought but across turns, not within one.
10. **Majority vote.** Run the same classification N times, take the mode. Cheap way to reduce variance when stakes matter.
11. **Tree of Thoughts.** Instead of one linear reasoning chain, branch into multiple candidate thoughts, score each, expand the best. Overkill for most tasks; worth it for planning and search.
12. **Programmatic directives.** Tell the model the output will be parsed: "Only return valid JSON. Never include backtick symbols. The response will be parsed with json.loads()." Claims of downstream machinery change behavior.
13. **Uncompleted JSON priming.** End the prompt with `{"result":` so the model has no choice but to continue with valid structure.
14. **Pydantic or schema validation.** Treat the model output as untrusted input; validate against a typed schema on arrival. Catch drift at the boundary.
15. **Format modifiers for images.** Prefix the subject with the medium: "oil painting of", "stock photo of", "blueprint diagram of". Changes the aesthetic baseline.
16. **Quality boosters for images.** Append training-corpus tokens: "4k", "trending on artstation", "masterpiece". Pattern-match what the training data labeled as good.
17. **Weighted prompt terms.** Midjourney `::` and Stable Diffusion `()` assign numerical importance. Use sparingly or the prompt collapses into one concept.
18. **Negative prompting.** Spell out what to exclude. Diffusion models weave in unasked-for concepts that live near the target in latent space; `--no people` or negative prompt boxes prune those.
19. **SDXL Base + Refiner split.** Base model handles composition, Refiner handles detail. Switch around 0.6–0.8 of steps. Mirrors the "divide labor" principle at the model level.
20. **Meme unbundling.** Instead of "in the style of Dali," decompose the style into its mechanisms ("surrealist landscape, melting objects, long shadows") so you can remix and avoid copying any one artist.
21. **Prompt editing mid-generation.** Stable Diffusion `[from:to:step]` syntax blends two concepts. Useful for controlled transitions.

## Code snippets worth remembering

```text
# Prewarming pattern
Turn 1: "List five best practices for writing accessible SVG icons."
Turn 2: "Apply those practices to the icon in <svg>...</svg>. Return the
revised SVG and a short note of what you changed."
```

```text
# Format directive that actually holds
Return ONLY a JSON object with this exact shape. No prose, no backticks,
no explanation. The response will be parsed with json.loads().

{
  "heading": "<string>",
  "bullets": ["<string>", "<string>", "<string>"]
}
```

```text
# Least-to-most decomposition for a refactor
Step 1: "List the design tokens hardcoded in this file."
Step 2: "For each token, propose a CSS variable name."
Step 3: "Rewrite the file using those variables. Output only the diff."
```

```text
# Midjourney-style image prompt assembled from the framework
editorial photograph of a matte-black ceramic vase on bone-coloured linen,
soft single-source window light, shallow depth of field, 35mm, ember
highlight on the rim ::2  --ar 3:2  --no people, text, logos
```

```python
# Treat model output as untrusted input
from pydantic import BaseModel, Field
class SEOMeta(BaseModel):
    title: str = Field(max_length=60)
    description: str = Field(max_length=160)

raw = call_llm(prompt)
meta = SEOMeta.model_validate_json(raw)   # raises on drift
```

## Anti-patterns

- Naive prompting: a one-liner with no direction, no examples, no format. Produces average output and you never learn why.
- Magic-word thinking: hunting for the one phrase that fixes the prompt. The problem is usually missing principles, not a vocabulary upgrade.
- Overfitting on examples: past five, the model starts echoing examples instead of generalizing. Trim aggressively.
- Garbage in, garbage out without a rewriter. If user prompts are low quality, add a prompt-rewriting step rather than accepting the output.
- Using one prompt for retrieval + reasoning + formatting. Divide labor or expect failures at the weakest leg.
- Shipping without evals. A prompt you cannot grade is a prompt you cannot improve.
- Copying a named artist's style verbatim. Unbundle the style into its mechanisms for a more original and less legally fraught result.

## Page or file references

- Source on disk: `~/Downloads/dokumen.pub_prompt-engineering-for-generative-ai-9781098153434.epub`
- Ch on Five Principles — Direction, Format, Examples, Evaluation, Division
- Chs on advanced techniques — prewarming, meta-prompting, least-to-most, majority vote, Tree of Thoughts
- Ch on image generation — format modifiers, quality boosters, weighting, negative prompts, SDXL pipeline
- Ch on production formats — programmatic directives, Pydantic validation, YAML over JSON
- NotebookLM source ID: `7c06c2ad-c58a-4...`
