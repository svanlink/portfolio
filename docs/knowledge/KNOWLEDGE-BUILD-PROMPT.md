# Knowledge-build prompt

Paste this into a fresh Claude Code session at the portfolio project root. It is self-contained — Claude will not see this conversation.

---

## Prompt

You are building a persistent knowledge base for this portfolio project by reading Sebastian's full reference library. Your job is to read, distill, and write structured notes — not to edit any portfolio code. Do not touch `index.html`, `assets/`, or anything outside `docs/knowledge/`.

### Materials to read

All sources are already indexed in NotebookLM notebook `320fc947-0207-425c-bffc-a5a83b50ffa5` (title: "Ai Prompts"). The underlying files are also on disk.

PDFs in `~/Downloads/`:
- `mastering-front-end-development-a-comprehensive-guide-to-learn-front-end-development.pdf` (476 pages)
- `toaz.info-sachitnetexpressive-design-systemspdf-pr_42b900fbf42854f9162b9faa98a5f9be.pdf` (133 pages)
- `RESPONSIVE_WEB_DESIGN_Ethan_Marcotte.pdf` (157 pages)
- `prompt-engineering-for-llms-the-art-and-science-of-building-large-language-modelbased-applications-9781098156152.pdf` (359 pages)
- `engineering-ai-systems-architecture-and-devops-essentials-9780138261450-9780138261412-0138261415.pdf` (502 pages)

EPUB in `~/Downloads/`:
- `dokumen.pub_prompt-engineering-for-generative-ai-9781098153434.epub`

GitHub repos:
- `CSSInDepth/css-in-depth-2`
- `PacktPublishing/Design-Beyond-Limits-with-Figma`
- `PacktPublishing/Agentic-Coding-with-Claude-Code`
- `PacktPublishing/Claude-Code-Masterclass-Code-faster-with-Agentic-AI`
- `PacktPublishing/Claude-AI-for-Creatives---Learn-by-Building-Projects`
- `PacktPublishing/Figma-for-UI-UX-Master-Web-Design-in-Figma`

### How to read efficiently

PDFs — use `Read` with `pages: "a-b"`, 20 pages per call maximum. Skim TOC + intro first, then cherry-pick substantive chapters. Do not read every page.

EPUB — try `Read` first; if that fails, use `notebooklm ask` against the NotebookLM source instead.

Repos — use `gh api repos/<owner>/<repo>/contents` for structure, `gh api repos/<owner>/<repo>/readme --jq .content | base64 -d` for the README, and `gh api repos/<owner>/<repo>/contents/<path>` for specific files. Focus on code examples and chapter intros.

NotebookLM shortcut — for cross-source synthesis, use `notebooklm ask "..."`. It is faster than re-reading raw PDFs for questions like "what does X book say about Y." The CLI is already authenticated.

### What to produce

Create one markdown file per source in `docs/knowledge/sources/`, named after the source slug (e.g. `css-in-depth-2.md`, `marcotte-rwd.md`, `engineering-ai-systems.md`). Each file must contain:

1. **One-paragraph summary** — what the source is and who it is for.
2. **Techniques / patterns** — a flat list of concrete, named techniques with a 1–2 sentence description each. Prioritize things that translate to code or process. Skip anecdotes, history, and tool-agnostic platitudes.
3. **Code snippets worth remembering** — up to 5 per source, fenced with the language tag. Real, working snippets only.
4. **Anti-patterns** — what the source explicitly warns against.
5. **Page or file references** — so future sessions can jump back.

Then write one cross-source synthesis at `docs/knowledge/SYNTHESIS.md` organized by domain, not by book:
- Prompt engineering
- Agentic loops and guardrails
- Modern CSS
- Responsive and fluid layout
- Design systems and Figma handoff
- Performance and rendering

Under each domain, extract the techniques that appear in multiple sources, and note which sources reinforce each other vs. which disagree. Disagreements are the most useful part.

Finally, update `docs/knowledge/CLAUDE-BRIEF.md` (already exists) to reference the new per-source files by name where it currently has high-level summaries.

### Working constraints

- Do not edit portfolio source code in this session.
- Do not create placeholder files that you intend to fill later. Write each file once, fully, then move on.
- Save progressively: after each source is read, write its file immediately. If the session ends early, partial progress still has value.
- If a PDF section is dense and you are unsure whether it is worth including, skip it. The brief is there to be actionable, not complete.
- No AI vocabulary ("leverage", "empower", "delve", "comprehensive"), no bullet-point prose outside of the structured lists above, no em-dashes. Use sentences.
- After finishing, report in under 200 words: how many files you wrote, which sources you judged most vs. least useful for this project, and any contradictions worth my attention.

### Budget and checkpoints

Expect this to take one full session. If you hit a third of your context with more than half the sources still unread, stop reading new material, finish writing notes for what you have read, and leave a `docs/knowledge/TODO.md` listing what remains. Better to have 6 thorough source files than 12 thin ones.

### Start by

1. Running `notebooklm use 320fc947-0207-425c-bffc-a5a83b50ffa5` to set context.
2. Running `notebooklm source list` to confirm all sources are ready.
3. Creating `docs/knowledge/sources/` if it does not exist.
4. Reading the shortest, densest source first (Marcotte RWD, 157 pages) to establish the output format, then scaling up.

Begin.
