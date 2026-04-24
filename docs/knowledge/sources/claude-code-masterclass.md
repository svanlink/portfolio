# Claude Code Masterclass — Packt / hourToLearn

## Summary

Packt video course, 2024. Companion repo is quiz files plus one command reference. As a standalone source this is thin — the video course lives elsewhere and the repo is aide-mémoire. But the quiz answers and the MCP-setup command reference capture a few crisp distinctions that do not appear cleanly in the denser *Agentic Coding* book: progressive disclosure levels inside Skills, the global-vs-project scope for shared behaviors, the explicit CLI-level `claude mcp add` registration, and the architectural boundary between Skills (behavior) and MCP (connectivity). Treat this file as an index of those distinctions, not a standalone guide.

## Techniques / patterns

1. **`/init` creates the `CLAUDE.md` file.** The built-in slash command that seeds a project with its memory file. Run once per new project before any real work.
2. **Three-level progressive disclosure in Skills.** Level 1 is the YAML frontmatter (`name`, `description`) — Claude indexes this without loading the full skill. Level 2 is the `SKILL.md` body, loaded on activation. Level 3 is `references/` and `scripts/`, loaded only when the skill explicitly reads them. Design every skill with this hierarchy in mind so activation cost stays small.
3. **Global vs project skills.** Project-scoped skills live in `./.claude/skills/`. Global skills live in `~/.claude/skills/` and are available in every project. Rule of thumb: put commit-message enforcement, shell-safety rules, and personal-style preferences at the user level; put project-specific domain logic at the project level.
4. **Skills vs MCP — the architectural split.** Skills define behavior and logic that shape how Claude responds. MCP servers provide connectivity to external data and tools. They are complementary: a skill can call an MCP tool, an MCP server cannot replace a skill.
5. **`claude mcp add <name> <command> [args]`.** Register a custom MCP server with the Claude CLI. The registration goes into user or project settings depending on the flag.
6. **`uv` + `fastmcp` for Python MCP servers.** The course's chosen stack: `uv init --python 3.13`, create a venv, `uv add fastmcp`, write a server. `uv` handles deps and isolation cleanly; pip-based setups rot faster.
7. **MCP Inspector for tool debugging.** `npx @modelcontextprotocol/inspector` launches a local UI that connects to a server, lists its tools, and lets you invoke each with JSON input. Use before registering the server with Claude, never after.
8. **Compact or reset context when it stales.** Long sessions accumulate irrelevant context that degrades responses. When the agent starts referencing old decisions, summarize and reset. Do not let the conversation run forever.
9. **Summary-style context handoff during bug fixes.** When the bug context is muddy, stop, write a two-paragraph summary of the bug and what has been ruled out, reset, and start a fresh session with the summary as the opener.
10. **Custom slash commands take arguments.** A command with `$ARGUMENTS` can accept a ticket number, a file path, or a free-form string. Make them parametric so one command covers five variations.
11. **Sub-agents handle specific tasks or roles independently.** They are not a replacement for MCP tools; they are independent conversations with their own context that the main agent delegates work to.

## Code snippets worth remembering

```powershell
# Windows MCP server bootstrap (works on macOS/Linux with matching shell)
uv init --python 3.13
uv venv
.\.venv\Scripts\Activate.ps1
uv add fastmcp
```

```bash
# Launch MCP Inspector for local testing before registration
npx @modelcontextprotocol/inspector
```

```bash
# Register a custom MCP tool with the Claude CLI
claude mcp add myDemoMcp uv run /absolute/path/to/main.py
```

```json
// settings.json — two MCP servers, one npx-hosted, one local Python
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    },
    "myDemoMcp": {
      "type": "stdio",
      "command": "/Users/me/.local/bin/uv",
      "args": ["run", "/Users/me/workspace/my-mcp/main.py"],
      "env": {}
    }
  }
}
```

```markdown
---
name: commit-message-enforcer
description: >
  Enforces the project's commit message format (Conventional Commits) on
  every proposed commit. Activates when the user says "commit" or "create
  a commit". Reads the diff, suggests a compliant message, refuses types
  outside the whitelist.
---

# Commit Message Enforcer

Allowed types: feat, fix, refactor, docs, test, chore, perf, ci.

Format:
  <type>: <description under 70 chars>

  <optional body, wrapped at 72 chars>

Never include co-author trailers unless the user asks.
Never propose a type outside the whitelist.
```

## Anti-patterns

- Putting every skill at the project level. Reusable behaviors belong in `~/.claude/skills/` so they follow you across projects.
- Loading the whole skill body into `CLAUDE.md` instead of relying on progressive disclosure. Defeats the indexing benefit; bloats every session.
- Registering an MCP server before testing it with the Inspector. Broken tools become broken agent runs.
- Running one session forever. Context decays; periodically compact, summarize, or reset.
- Confusing skills with MCP servers and choosing only one. The intended architecture uses both.

## Page or file references

- Repository: `https://github.com/PacktPublishing/Claude-Code-Masterclass-Code-faster-with-Agentic-AI` (quizzes and one commands.md)
- Course by Packt / hourToLearn
- Section 02 — Applying Claude Code in projects (`/init`, `CLAUDE.md`)
- Section 03 — Sessions and context (reset, summarize)
- Section 04 — Slash commands and configuration
- Section 07 — MCP tools for automation
- Section 08 — Sub-agents
- Section 09 — Skills (progressive disclosure levels)
- Section 11 — Advanced MCP (uv + fastmcp bootstrap, Inspector, `claude mcp add`)
- Overlap: most of this content is covered in depth by *Agentic Coding with Claude Code*. Prefer that book for implementation detail.
