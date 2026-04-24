# Figma for UI/UX — Master Web Design in Figma

## Summary

Packt video course. The companion repository is a zip of `.fig` files plus a small stack of client-facing PDFs (Web Design Checklist, freelancing messages, nine-tips cheat sheet, LinkedIn post rewrite, Download Figma guide). As a standalone source it is thin: the real content lives in the video demonstrations, and the markdown/code portion of the repo is not inspectable. Where *Design Beyond Limits* covers the design-system and token depth, this course covers the freelancer-facing surface — client-ready checklists, pricing and messaging templates, and the beginner-to-practitioner Figma workflow. Keep this file as a short list of the client-communication and hand-off artefacts that are worth lifting into an engagement kit, and as an index to the `.fig` files for future local inspection.

## Techniques / patterns

1. **Web Design Checklist as a handover contract.** A single-page checklist pinned to every project: responsive breakpoints covered, semantic structure, accessibility contrast, loading states, empty states, error states, hover and focus states, copy reviewed, images optimised. Attach to the delivery message; the client signs off against it, not against taste.
2. **Freelancing message templates.** Six or seven canned replies: initial inquiry, scope clarification, quote presentation, revision-scope push-back, milestone check-in, invoice nudge, project wrap. Personalise the opening and closing; leave the middle fixed. Cuts response time on repetitive exchanges.
3. **"Nine tips" cheat sheet style.** A one-page numbered list of the highest-leverage techniques the course returns to: Auto Layout on every frame, components not instances, named layers, consistent spacing scale, semantic colour tokens, variants over duplicates, interactive prototypes for sign-off, version-history for milestones, export presets per asset role.
4. **LinkedIn post rewrite as a voice lesson.** The rewrite file contrasts a generic "Figma is great" post with a rewritten version that names a specific problem, the move that solved it, and the measurable outcome. Same structure any creative director can use for case-study posts.
5. **`.fig` file as a teaching artefact.** The `1+make+a+website.fig` file is the course's starter canvas; open it in Figma rather than reading PDFs. The file shows the expected page structure, Auto Layout conventions, and component organisation for a small marketing site.
6. **Section 8 redesign brief pattern.** A zipped content folder (copy, images, brand assets) is provided; the exercise is the redesign. This mirrors a real client drop — the brief is the assets, not a specification. Practise reading a content folder as the brief.
7. **Client-deliverable PDF pack.** The repo ships Download-Figma, Links, and How-to-get-help-fast as PDFs sized for email. Useful pattern: bundle onboarding PDFs with every kick-off email so the client never loses the tool-setup instructions in chat history.

## Code snippets worth remembering

```text
# Delivery checklist template (compress the course checklist to one page)
Responsive
  [ ] Layout verified at 320, 768, 1024, 1440, 1920
  [ ] No horizontal overflow at any breakpoint
  [ ] Touch targets ≥ 44×44 on mobile

Structure & semantics
  [ ] One <h1> per page; headings in order
  [ ] Landmarks present (header, nav, main, footer)
  [ ] Images have alt text; decorative images empty-alt

States
  [ ] Hover, focus, active, disabled on every interactive element
  [ ] Loading, empty, error states for every data surface
  [ ] Keyboard-only flow verified

Performance
  [ ] LCP < 2.5s on a throttled 3G pass
  [ ] Images in AVIF/WebP with width and height attributes
  [ ] Critical font weights preloaded; others display: swap

Content & accessibility
  [ ] Copy proofread; client-approved strings only
  [ ] WCAG AA contrast verified on body and UI text
  [ ] Reduced-motion path present
```

```text
# Freelancing reply scaffolds (fixed middle, personalised edges)

Quote presentation:
  "Thanks for the context — the fixed scope as I understand it is {X}, {Y},
  {Z}. I'm quoting {RANGE} for the fixed scope with {N} revision rounds.
  Anything outside that lands as a change request, which I price at {RATE}
  per hour. Happy to walk through the scope on a 15-minute call before you
  decide."

Revision push-back:
  "Happy to make this change. It falls outside the {N} included rounds, so
  I'd price it as a change request at {FLAT} or {HOURLY}. Let me know how
  you'd like to proceed and I'll get on it today."

Milestone check-in:
  "Quick status on {PROJECT}: {WHAT SHIPPED}, {WHAT IS IN REVIEW}, {WHAT
  IS NEXT}. Blocker / decision needed from you: {ONE THING}. Next
  milestone: {DATE}."
```

```text
# "Nine tips" pattern — the one-page handout
1. Auto Layout on every frame, without exception.
2. Components before instances. If it appears twice, component it.
3. Name every layer that matters. Rename as you go, not at the end.
4. One spacing scale, one radius scale, one type scale. No one-offs.
5. Semantic colour tokens (surface/text/border) in every component.
6. Variants for visual states; booleans for orthogonal toggles.
7. Interactive prototypes before static mocks get signed off.
8. Version-history labels at every milestone.
9. Export presets per asset role (marketing hero, thumbnail, UI icon).
```

## Anti-patterns

- Treating the course's PDFs as the deliverable and skipping the `.fig` file. The canvas is where the real practice lives; the PDFs are handouts.
- Using the freelancing message templates verbatim without editing the edges. Clients notice the boilerplate immediately and the reply looks careless.
- Running this course instead of *Design Beyond Limits* when the goal is a design system. The two have different scopes; mismatched choice wastes a weekend.
- Publishing the checklist as a Notion doc the client never opens. Attach it to the delivery email as a one-page PDF with the project name at the top.

## Page or file references

- Repository: `https://github.com/PacktPublishing/Figma-for-UI-UX-Master-Web-Design-in-Figma`
- Course by Packt — video content; companion repo is `.fig` files, PDFs, and images only (no code)
- Section 1 — `1+make+a+website.fig`, Web Design Checklist, How-to-get-help-fast, Download Figma, Links
- Section 4 — `9+tips.pdf`, `freelancing+messages.pdf`, `linkedin+post+rewrite.png`
- Section 5 — `Paypal_Site.jpg` (reference screenshot)
- Section 8 — `Content+for+Redesign.zip` (redesign brief as a content drop)
- Overlap: *Design Beyond Limits with Figma* is the authoritative source for the design-system and token depth. This course is the freelancer-facing surface. When in doubt, reach for the other one.
- Note: the repo's README is copy-pasted from a different Packt repo ("OpenAI Ecosystem") — treat README content as unreliable.
