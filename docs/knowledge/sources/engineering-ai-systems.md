# Engineering AI Systems: Architecture and DevOps Essentials

## Summary

Pearson / Addison-Wesley, ISBN 9780138261450, 502 pages. Written for architects and platform engineers operating foundation-model-backed systems at scale. The book is a pattern catalog: each pattern names an operational problem (cost spike, hallucination, drift, supply-chain risk) and gives the architectural move that contains it. Most of the material is overkill for a solo static-site project, but the agentic loops, guardrails, observability and co-versioning chapters are directly applicable to the way Claude operates on this repo. Skip the enterprise MLOps content.

## Techniques / patterns

1. **Circuit breaker.** After N consecutive failures, stop calling the component. Return a fallback or a hard error. Keeps one flaky dependency from exhausting retries and tokens. In a Claude loop: if the same check fails twice, stop and surface the blocker.
2. **Chain of Thought.** Explicit intermediate reasoning steps before the answer. Reliability correlates with making the work visible.
3. **Tree of Thought.** Branch into multiple candidate reasonings, score each with an evaluation function, continue down the best path and backtrack if a branch dead-ends. Heavy; reserve for planning.
4. **Self-consistency.** Run the same prompt several times and majority-vote the answer. Cheapest way to reduce variance on a classifier-style task.
5. **LLM-as-judge (independent overseeing agent).** A second model with a different frame reviews the first's output. Use when the primary model cannot reliably grade itself (visual critique, tone, copy edit).
6. **Input guardrails.** Intercept and refuse or rewrite inappropriate prompts before they reach the main model. First line of defense against prompt injection.
7. **Output guardrails.** Sanitize or block generated text before it leaves the system. Filters hallucinated PII, off-brand language, unsafe code.
8. **Execution guardrails.** Validate that tool calls (DB queries, file writes, shell commands) have no harmful side effects before executing. The only guardrail that prevents irreversible damage.
9. **Constitutional LLM check.** A smaller, cheaper model verifies that the main model's output follows a fixed list of rules. Complements guardrails for drift-detection over long conversations.
10. **Red teaming.** Simulate adversarial inputs (prompt injection, poisoned data, jailbreaks) as part of CI. Known failures get regression tests.
11. **Framed autonomy.** The agent has full autonomy inside a defined frame (e.g. "read-only inside this repo, no network calls, no git push") but cannot exit that frame without human approval. Maps exactly to Claude's permission system.
12. **Human-in-the-loop (HITL) gates.** Explicit sign-off for irreversible or externally visible actions: publishing, deleting, force-pushing, sending messages. Not optional for regulated or customer-facing outputs.
13. **Mode switcher.** Dynamically swap an expensive, high-latency FM for a cheaper model when the SLO is in danger. For Claude: swap Opus for Sonnet or Haiku on non-critical paths.
14. **Co-versioning registry.** One registry that stores the exact versions of model, prompt, data, code, and config that produced a given output. Without it you cannot reproduce a result you shipped.
15. **Software Bill of Materials (SBOM).** Enumerate every model, library, and dataset baked into the deliverable. Required for supply-chain audit and for noticing when a dependency was silently updated.
16. **Data lineage tracking.** Follow every byte from source through transformation into the prompt or the fine-tune set. Mandatory for debugging hallucinations and for compliance.
17. **Observability 2.0.** Structured, machine-readable logs (JSON) that carry enough context to reconstruct the entire request journey. Plain text logs are not enough once there are multiple model calls per request.
18. **Explainable proxy model.** Run a simple, interpretable model (decision tree, linear regression) alongside the main model on a sample. When the proxy and the main model disagree, that is the interesting case.
19. **Data canary.** Feed a small, known-good sample through the model on a schedule. If the output drifts, your model or pipeline drifted first.
20. **Acceptance testing with proxy measures.** When ground truth is delayed or unavailable, pick a measurable proxy (late payment for default risk, bounce rate for content quality) and gate releases on it.
21. **ReAct (Reason, Act, Observe).** Reason about the next step, act (call a tool or read a file), observe the result, repeat. The default control flow for any non-trivial agent task.
22. **Reflexion.** After the first solution, prompt the agent to self-critique and rewrite. Catches whole classes of errors the first pass cannot see.

## Code snippets worth remembering

```python
# Circuit breaker around an LLM call
class LLMCircuitBreaker:
    def __init__(self, threshold=3, cooldown_s=60):
        self.failures = 0
        self.threshold = threshold
        self.opened_at = None
        self.cooldown = cooldown_s
    def call(self, prompt):
        if self.opened_at and time.time() - self.opened_at < self.cooldown:
            return fallback(prompt)
        try:
            result = llm(prompt)
            self.failures = 0
            return result
        except Exception:
            self.failures += 1
            if self.failures >= self.threshold:
                self.opened_at = time.time()
            raise
```

```python
# LLM-as-judge on top of a draft
draft = generator.run(task)
verdict = judge.run(f"""
You are an editor. Score the draft 1-5 on: factual accuracy, on-brand tone,
terseness. Return JSON: {{"scores": {{...}}, "fix_these": [...]}}.
Draft: {draft}
""")
if min(verdict["scores"].values()) < 4:
    draft = generator.run(task, feedback=verdict["fix_these"])
```

```python
# Framed autonomy: whitelist the tools and paths the agent may touch
FRAME = {
    "read_paths":  ["./src", "./docs"],
    "write_paths": ["./src"],
    "tools":       ["read_file", "edit_file", "run_tests"],
    "forbidden":   ["git push", "rm", "curl"],
}
def act(tool, args):
    if tool not in FRAME["tools"]:
        raise PermissionError(f"{tool} is outside the frame")
    return TOOL_REGISTRY[tool](args, frame=FRAME)
```

```python
# ReAct loop skeleton
while not done(state):
    thought = llm(f"Goal: {goal}\nState: {state}\nNext thought?")
    action, args = parse_action(thought)
    observation = tools[action](args)
    state = update(state, thought, action, observation)
```

```json
// Observability 2.0: structured trace for one request
{
  "trace_id": "abc-123",
  "goal": "verify hero section pixel-perfect",
  "steps": [
    {"step": "observe", "tool": "preview_inspect", "selector": ".hero", "result": {"x": 447, "y": 215}},
    {"step": "think", "content": "matches Figma within 1px"},
    {"step": "act", "tool": "report", "content": "PASS"}
  ],
  "model": "claude-opus-4-7",
  "tokens_in": 1840,
  "tokens_out": 220
}
```

## Anti-patterns

- Pushing model or prompt updates directly to production without the normal deployment pipeline. Every quality gate exists for a reason.
- Validating on public benchmarks (MMLU, HumanEval) that have likely leaked into the model's training set. You measure memorization, not capability.
- Flakey tests. If the same input produces different results, bugs hide forever. Seed every random source or isolate the nondeterministic component.
- No co-versioning. If you cannot reproduce the exact output you shipped, you cannot debug or roll back.
- Trusting the model to police itself on sensitive outputs. Use an independent judge with a different frame.
- Treating observability as "we have logs." Unstructured logs do not survive multi-step agent traces.
- Running an agent with unframed autonomy on a repo with secrets or a shared infrastructure. Always restrict the blast radius first.

## Page or file references

- Source on disk: `~/Downloads/engineering-ai-systems-architecture-and-devops-essentials-9780138261450-9780138261412-0138261415.pdf` (502 pages)
- Chs on agent patterns — ReAct, Reflexion, CoT/ToT, self-consistency, LLM-as-judge
- Chs on guardrails — input, output, execution, constitutional LLM, red teaming
- Chs on autonomy — framed autonomy, HITL, mode switcher
- Chs on co-versioning — registry, SBOM, data lineage
- Chs on observability — Observability 2.0, explainable proxies, data canaries
- NotebookLM source IDs: `541c8167-59d5-4...` and `897eb224-082c-4...` (book is split across two PDF sources)
