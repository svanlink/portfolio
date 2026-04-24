# Sebastian Van Eickelen — Portfolio

Static HTML + CSS desktop homepage. No build system. Open `index.html` in a browser or serve with any static host.

## Structure

```
portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css        — CSS reset
│   │   ├── variables.css    — All design tokens (colors, spacing, z-index, easing)
│   │   ├── base.css         — Global document styles, typography utilities
│   │   ├── layout.css       — Site wrapper, catalog tab, section rules
│   │   ├── components.css   — Nav, buttons, cards, form fields, work list, preview plate
│   │   └── sections.css     — Section-specific layout and visual styles
│   ├── js/
│   │   ├── main.js          — Interaction logic: previews, accordion, contact form, nav behavior
│   │   └── motion.js        — GSAP entrance and section motion
│   ├── img/                 — Place image assets here
│   ├── icons/               — Place client logo SVGs here
│   └── media/               — Place video poster frames here
```

## Placeholder Replacements

### Images (`assets/img/`)

| Filename | Usage |
|---|---|
| `hero-poster.jpg` | Hero section video fallback (full-bleed, dark, cinematic) |
| `cinematic-poster.jpg` | Cinematic section video fallback (full-bleed, dark) |
| `work-preview.jpg` | Selected work preview — Watches & Wonders |
| `work-dolomite.jpg` | Selected work preview — The Dolomite Sessions |
| `work-decathlon.jpg` | Selected work preview — Decathlon Switzerland |
| `work-still-frame.jpg` | Selected work preview — Still Frame Series |
| `work-mountain.jpg` | Selected work preview — Mountain Architecture |
| `work-geneva-light.jpg` | Selected work preview — Geneva Light Study |
| `portrait.jpg` | About section — portrait |

Recommended dimensions: hero/cinematic posters at 1440×900px or larger. Work previews at 680×456px or 2× for retina.

### Client Logos (`assets/icons/`)

| Filename | Client |
|---|---|
| `richemont.svg` | Richemont |
| `decathlon.svg` | Decathlon |
| `mammut.svg` | Mammut |
| `cartier.svg` | Cartier |
| `epfl.svg` | EPFL |
| `swisstours.svg` | SWISStours |

All logos should be single-color (ideally black or neutral). CSS applies `filter: grayscale(100%)` and `opacity: 0.72`. SVGs should have `viewBox` set and no hardcoded fill colors (use `currentColor` or inherit).

### Vimeo Video IDs

In `index.html`, find the two `data-vimeo-id="PLACEHOLDER"` attributes:

1. Hero section: `.js-hero-media .js-vimeo-target` — replace `PLACEHOLDER` with your Vimeo reel ID
2. Cinematic section: `.js-cinematic-media .js-vimeo-target` — replace `PLACEHOLDER` with your Vimeo ID

### Contact Email

Update `href="mailto:contact@vaneickelen.com"` and the visible email address in the contact section.

## Contact Form

The contact form is wired for static-site delivery through [FormSubmit](https://formsubmit.co/). The current endpoint sends enquiries to `contact@vaneickelen.com`.

Important: the first live submission must be confirmed from the inbox before delivery becomes active.

## Deployment

GitHub Pages ready. All paths are relative. No server dependencies.

To serve locally:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

## Design Tokens

All tokens are in `assets/css/variables.css`. Key values:

- `--color-ink: #0B0B0B` — near-black
- `--color-bone: #F6F2EE` — warm off-white
- `--color-ember: #D75A2F` — orange-red accent
- Site canvas: 1440px minimum width (desktop-first, no responsive breakpoints yet)

---

## Working with Claude

The project has a Claude Code skill system at `.claude/`. Read `CLAUDE.md` at the root before starting any session — it routes to the design truth, spec files, and skills.

**Skills** (`.claude/skills/`) govern how Claude approaches each task type:

| Skill | Use when |
|---|---|
| `prompt-rewriter` | Sharpening a rough instruction before acting on it |
| `figma-fidelity` | Translating Figma nodes to CSS with measured accuracy |
| `design-critic` | Auditing design, typography, spacing, or visual hierarchy |
| `frontend-implementer` | Writing or refactoring HTML/CSS/JS |

**Prompt templates** (`.claude/prompts/`) are ready-to-use starting points for common tasks. Fill in the brackets and run:

`design-critique.md`, `figma-audit.md`, `figma-to-code.md`, `frontend-refactor.md`, `layout-system.md`, `typography-review.md`, `spacing-review.md`, `responsive-audit.md`, `copy-refinement.md`, `strategy-review.md`, `prompt-rewriter.md`

**Knowledge base** (`docs/knowledge/`) contains `CLAUDE-BRIEF.md` (full operating manual), `SYNTHESIS.md` (cross-source synthesis), and 12 per-source reference files covering CSS architecture, responsive design, design systems, Figma handoff, and prompt engineering.
