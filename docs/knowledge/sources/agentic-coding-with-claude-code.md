# Agentic Coding with Claude Code — Eden Marco

## Summary

Packt, 2024. A practitioner's guide to operating Claude Code as a platform rather than a chat window. The companion repo is concrete: each chapter ships a runnable example showing the exact file structure Claude Code expects (`.claude/`, `.mcp.json`, `CLAUDE.md`, subagent markdown with frontmatter, skills, hooks, output styles). What makes this book valuable beyond the Anthropic docs is the opinionated *layout* — where to put the memory files, how to scope slash commands, how to structure subagent prompts so they actually stay in character. For a solo developer using Claude Code daily, this is the reference that turns ad-hoc prompting into a reproducible workflow.

## Techniques / patterns

1. **`CLAUDE.md` at project root is the primary context.** Loaded every session. Keep it terse: routing, rules, key references. Heavy content lives in linked files. Large `CLAUDE.md` files get summarized away under pressure; a routing-first file survives.
2. **`.claude/agents/<name>.md` for subagents.** Frontmatter is `name`, `description`, `tools` (explicit whitelist), `model`, `color`. The body is the system prompt. Keep each subagent under 150 lines or it becomes harder to steer than the main agent.
3. **Explicit tool whitelist per subagent.** Tools listed in the subagent frontmatter are the only tools it can call. Never pass the full toolkit unless the subagent genuinely needs it. Restricted tools keep the subagent focused and auditable.
4. **`.claude/commands/<name>.md` for slash commands.** Each file becomes a `/<name>` command. The body is the prompt executed on invocation, with access to `$ARGUMENTS` and shell expansions. Use for repeated multi-step flows — code review, release notes, changelog generation.
5. **`.mcp.json` at project root for project-scoped MCP servers.** HTTP, command (npx), and stdio transports. API keys get placeholder values in git and real values via environment or a local override file.
6. **Persistent memory vs session memory.** `CLAUDE.md` persists across sessions. In-session state lives in the conversation. Never assume the agent remembers something from last week if it is not in a file.
7. **Hooks on PreToolUse / PostToolUse / Stop.** Use PreToolUse to block dangerous tool calls, PostToolUse to auto-format or auto-lint, Stop to run a final check. Hook scripts receive JSON on stdin with the tool name and input.
8. **Output styles in `.claude/output-styles/`.** Frontmatter-tagged markdown that reshapes the agent's response format (bullet-free, terse, code-only). Toggle per session or attach to a subagent.
9. **Skills in `.claude/skills/<name>/`.** Directory with a `SKILL.md` plus supporting files. Activated by keyword in the user's request. Load content on demand instead of baking it into `CLAUDE.md`.
10. **Parallel subagents for independent work.** Spawn multiple subagent calls in one tool-use block when they have no data dependencies on each other. One subagent per distinct concern (security review, performance review, accessibility review).
11. **Hierarchical delegation.** Main agent plans and decides, subagents execute. The main agent's context stays clean because the subagent's raw output never enters it — only the subagent's summary.
12. **Context engineering over prompt engineering.** The lever is what the agent sees before it starts thinking. Curate `CLAUDE.md`, the tool list, the file tree, and the recent conversation. The prompt itself matters less than most people think.
13. **GIST framing — Goal, Input, Steps, Tools.** Before writing a slash command, fill in the four pieces. If any of them is vague, the command will underperform.
14. **Output-style-as-contract.** When a subagent must return parseable output, enforce it via the output style, not via a parenthetical in the prompt. Parentheticals get ignored; output styles do not.
15. **Custom statusline via Python script.** The `.claude/statusline.py` pattern reads the transcript, pulls the last user prompt, and renders a one-line summary in the terminal. Useful for long sessions where you lose track of what you asked five turns ago.
16. **Separation of memory surfaces.** Three tiers: `CLAUDE.md` (project rules), `.claude/memory/` (per-user auto-memory), skills (on-demand loaded). Each tier has a different update cadence; do not mix them.

## Code snippets worth remembering

```json
// .mcp.json — project-scoped MCP servers (from Ch 1)
{
  "mcpServers": {
    "verbose-server": {
      "type": "http",
      "url": "http://127.0.0.1:8000/mcp"
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": { "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}" }
    },
    "tavily": {
      "type": "http",
      "url": "https://mcp.tavily.com/mcp/?tavilyApiKey=${TAVILY_API_KEY}"
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

```markdown
---
name: security-reviewer
description: >
  Use this agent when code handles authentication, user input, payments, or
  external data. Reviews for OWASP Top 10, secret leakage, input validation.
tools: Read, Grep, Glob, Bash
model: sonnet
color: red
---

You are a security reviewer. Your only job is to find vulnerabilities
in the diff under review. You never write code. You return a numbered
list of findings, each with severity (CRITICAL / HIGH / MEDIUM / LOW),
file path with line number, and a one-line fix recommendation.

If you find no issues, return exactly: "No security issues found."
Do not pad.
```

```markdown
<!-- .claude/commands/review.md — invoked via /review -->
---
description: Structured code review of the current diff
---

Run `git diff --stat` and `git diff` to see the changes. Review them
across four axes in order:

1. Correctness — does the code do what it claims?
2. Security — any unsafe input handling, secrets, injection?
3. Performance — obvious hot paths, N+1, unbounded loops?
4. Maintainability — naming, deep nesting, function length?

Return findings as a numbered list. Group by severity.
$ARGUMENTS
```

```python
# .claude/hooks/pre-tool-use-guard.py — block dangerous shell commands
import json, sys, re

data = json.loads(sys.stdin.read())
tool = data.get("tool_name", "")
cmd  = data.get("tool_input", {}).get("command", "")

DANGEROUS = [
    r"\brm\s+-rf\s+/",
    r"\bgit\s+push\s+--force\s+.*\b(main|master)\b",
    r"\bchmod\s+-R\s+777\b",
    r">\s*/dev/sd[a-z]",
]

if tool == "Bash":
    for pat in DANGEROUS:
        if re.search(pat, cmd):
            print(f"[hook] BLOCKED: dangerous command pattern: {pat}", file=sys.stderr)
            sys.exit(2)

print(json.dumps(data))
```

```text
# Project skeleton that Claude Code expects
.
├── CLAUDE.md                      # always-loaded routing file
├── .mcp.json                      # project-scoped MCP servers
├── .claude/
│   ├── agents/
│   │   ├── security-reviewer.md
│   │   └── code-explorer.md
│   ├── commands/
│   │   ├── review.md              # /review
│   │   └── release-notes.md       # /release-notes
│   ├── hooks/
│   │   ├── pre-tool-use-guard.py
│   │   └── post-edit-format.sh
│   ├── output-styles/
│   │   └── terse.md
│   └── skills/
│       └── git-pushing/
│           └── SKILL.md
└── src/
```

## Anti-patterns

- Putting the whole project spec in `CLAUDE.md`. Under pressure it gets summarized and the rules evaporate. Keep `CLAUDE.md` as a router, not an encyclopedia.
- Handing a subagent every tool in the toolbox. Without a whitelist, subagents wander into unrelated work and you lose control of what they touched.
- Reusing one giant subagent for every task. Specialized subagents with narrow prompts beat one generalist every time.
- Committing `.mcp.json` with real API keys. Use placeholders and load from environment or a gitignored override.
- Hooks that error silently. A failing PreToolUse hook should exit 2 with a clear message; exit 0 means "approved."
- Letting subagent raw output into the main context. If the subagent returns 5,000 tokens of grep results, summarize before forwarding or the main agent drowns.
- Prompt engineering without context engineering. Rewriting the system prompt ten times while the file tree, tool list, and `CLAUDE.md` stay wrong.

## Page or file references

- Repository: `https://github.com/PacktPublishing/Agentic-Coding-with-Claude-Code`
- Book: Eden Marco, *Agentic Coding with Claude Code*, Packt 2024, ISBN 9781806022595
- Ch 1 *Context Engineering* — `.mcp.json`, context curation
- Ch 2 *The GIST of Claude Code* — hooks (hookhub example)
- Ch 3 *Essential Commands* — custom commands, hook notifications
- Ch 4 *Extending with MCP* — `.mcp.json`, `CLAUDE.md` routing
- Ch 5 *GitHub Automation* — CI-triggered Claude Code runs
- Ch 6 *Planning and Multi-Agent* — orchestration
- Ch 7 *Subagents* — `.claude/agents/<name>.md` frontmatter pattern
- Ch 8 *Output Styles* — `.claude/output-styles/`, statusline.py
- Ch 9 *Agent Skills* — `.claude/skills/<name>/SKILL.md`
- Ch 10 *Claude Code Desktop*
- Ch 11 *Deep Agents*
