# v0.2 Direction Plan

Governing document for the first real redesign iteration.
Base: v0.1 live site. Filter: BRIEF.md. Intelligence: competitor and trend research.

---

## What v0.2 Is

v0.1 proved the infrastructure: 100vh containers, archive logic, video integration, contact form, palette, font stack. Every decision in v0.1 was made to correctly fill out the structure.

v0.2 is the first pass where decisions are made for their visual argument, not their structural placement. The brief says typography is the main hierarchy tool. v0.1 uses typography as a labeling system. v0.2 must use it as the primary hierarchy signal.

---

## What Stays from v0.1

- Archive-led work logic — list + preview plate is the right spine for the work section
- Palette — ink / bone / ember, no additions
- Font stack — HelveticaNow + DINPro
- Reduced contact form — Name, Email, Project / Brief
- Cinematic media as atmosphere — hero video, cinematic section with looped video
- Scene sequence — Hero → Selected Work → About + Worked With → Services → Cinematic → Contact
- Catalog tab and section label system — useful structural annotation
- Ember as sole chromatic accent — interaction states, index numbers, arrow details

---

## What Changes in v0.2

### 1. Hero — subordinate the video, lead with typography

The current hero is a video with a kicker annotation pasted on top. That is exactly the generic video-wallpaper-with-text pattern the brief warns against. The video exists. The kicker exists. But there is no dominant display headline — no directorial statement at editorial scale.

v0.2 change: introduce a primary display headline at 100–140px sitting in the upper compositional zone of the hero. The kicker drops to a supporting role below it. The video remains but becomes clearly subordinate to the type architecture. The opening moment should read as a statement about who Sebastian is before it reads as a production company reel.

The headline should be short, confident, and factual: a name, a position, a place, or a brief directorial claim. Not a tagline. Not a slogan. A declaration.

### 2. Selected Work — audit and refine, do not break

The list + preview logic is structurally correct. The work this section does is right. The issues are proportional and typographic, not architectural.

v0.2 change: increase the scale contrast between work item title (currently 18px) and work item metadata. Consider pulling the section label into a stronger compositional anchor. The preview plate at 680px is close to correct — evaluate whether the column relationship between list and preview needs adjustment after the hero type scale is set.

### 3. About — bigger primary statement, less biography

The primary bio runs at 18px. That is reading size, not editorial scale. The secondary bio at 15px follows immediately, creating two tiers of running text where there should be one dominant statement supported by a single subordinate line.

v0.2 change: the first paragraph of the about section should be a positioning statement at 22–26px minimum. Not a biography. Not a career summary. The answer to "who is this and why does it matter" in two or three sentences at a scale that reads as a visual event. The secondary text can remain at its current size but should be leaner — one short supporting paragraph, not two.

### 4. Services — from plates to editorial list

The 3×2 grid of 260px uniform plates reads like a SaaS benefits section. The geometry is too even. Every plate carries equal visual weight, which means nothing is a hierarchy signal. The brief names this directly: service plates should not feel like UI feature cards.

v0.2 change: replace the plate grid with an editorial list format. Each service is a row: a large index number (ember), a service name at display scale, and a one-line description at small utility scale. The list creates natural hierarchy through scale contrast and does not carry the UI-card association of the current format. The section feels like a menu from a premium studio, not a product feature breakdown.

If the list format tests poorly, the alternative is a two-column structure: service names at large left-column type, descriptions in a controlled right column. Both options are stronger than the current plate grid.

### 5. Cinematic — keep structure, strengthen the card

The cinematic section structure is architecturally sound. The still plate fills 100vh. The media layer works. The cinematic card at 860×420 with a 72px headline is in the right territory.

v0.2 change: the card's utility bar text ("CAMPAIGNS · EDITORIAL · DOCUMENTARY") is useful but the card currently reads more like metadata than a CTA. The body of the card should include one stronger closing argument — a sentence or short phrase that frames what working with Sebastian means — alongside the existing headline. The card should feel like it is making a case, not just displaying information.

### 6. Contact — full-screen authority, not a utility block

The contact section's left column is 508px wide in a full-viewport scene. That is compositionally timid. The heading is 52px, which is directionally correct, but the surrounding spatial relationships compress it. The email address at 17px is undersized for the primary CTA of a full-screen closing scene. The form sits at equal visual weight to the contact information when it should feel clearly secondary.

v0.2 change: widen the left column. Increase the email address to 22–24px and treat it as a typographic anchor, not a line of body text. Give the section more top padding — the scene should open slowly, not immediately launch into the heading. The right column form should feel like a supporting path, not an alternative of equal prominence. The footer strip at the bottom should belong to the scene visually.

---

## New Desktop Scene Structure

The sequence stays the same. What changes is the compositional logic inside each scene.

**Hero — 100vh**
Top safe zone: nav (56px) + breathing room to first type element (~120px from top)
Main content zone: large display headline anchored upper-center or upper-left
Supporting annotation: kicker, thin rule, footer strip in the lower third
Video: atmosphere layer, clearly subordinate to typography

**Selected Work — 100vh**
Top safe zone: section label at catalog-left, ~96px from top
Main content zone: list (left) + preview plate (right), vertically centered in available height
Lower support zone: archive link or scroll indicator

**About + Worked With — 100vh**
Worked With (280px): editorial title strip, logos, credibility annotation
About (calc(100vh - 280px)): primary positioning statement at large scale, portrait bleeding to right edge
Top safe zone: catalog tab
Internal anchor: primary statement sits in the upper third, portrait column provides weight on the right

**Services — 100vh**
Top safe zone: section label, ~96px from top
Main content zone: editorial service list, full width from catalog-left to content-right
Each row: large ember index / service name at display scale / one-line description at utility scale
Lower support zone: enough breathing room for future scroll reveal choreography

**Cinematic — 100vh**
Top safe zone: section index (top right)
Main content zone: full-bleed video atmosphere, card positioned left at ~160px from top
Card: headline + one closing argument line + CTA
Lower support zone: caption bar

**Contact + Footer — 100vh**
Top padding: 120px minimum — the scene should breathe on arrival
Left column (wider): index label / heading / statement / email (at larger scale) / address
Vertical divider
Right column: inquiry form (secondary supporting path)
Footer: belongs to the scene, not tacked below it

---

## Strongest First Section to Redesign

**The Hero.**

The hero is the contract the site makes with the visitor. If the contract is "video with text pasted on top," every section below reads in that frame. One change — a dominant display headline at 100–140px positioned above the existing kicker — immediately proves the design direction and establishes the type scale system for the entire page.

This is also the lowest-risk first move architecturally. The video stays. The kicker stays. The footer strip stays. The only addition is one new typographic element at the top of the composition. If it works, it unlocks the rationale for every other change. If it needs adjustment, the rest of the site is untouched.

The specific test: does the opening feel like reading the cover of a high-production monograph, or does it still feel like a reel with a label?

---

## Key Visual and System Tests for v0.2

**Test 1 — Type scale authority (Hero)**
Can a single display headline at 100–140px create enough editorial authority in the hero that the video reads as atmosphere rather than content? If yes, it proves the typographic direction for the whole site. If the composition feels unbalanced, adjust scale and position before moving to other sections.

**Test 2 — Single scene argument**
For each redesigned scene, identify the one dominant visual argument. If you cannot state it in six words, the composition is not making a decision yet. Apply this test to every section before calling it done.

**Test 3 — Services format**
Build the editorial list format for services in HTML and CSS. Evaluate it against the plate grid in the same viewport. The list should feel more authoritative and less UI-like. If it does not, investigate proportion and scale before abandoning the approach.

**Test 4 — Contact scale**
Increase the email address to 22–24px and widen the left column. Does the section now read as a closing invitation rather than a contact form with a heading on top? The email address should feel like the primary CTA of the page's final scene.

**Test 5 — Typography without labels**
Temporarily remove all helper annotations — kicker labels, catalog tab indexes, section index numbers. Does the hierarchy still read? If it does, the type system is working. If it collapses, the labels are doing structural work that type scale should be doing instead.

---

## Rationale for v0.2 Over Continuing to Polish v0.1

v0.1 is a structurally correct site with weak editorial decisions inside it. Polishing v0.1 further would make the implementation cleaner without making the design stronger. The 100vh scenes exist but behave like containers. The typography labels the layout without creating hierarchy. The services section has the geometry of a product feature grid. The contact section has the proportions of a landing page module.

v0.2 is not a different site. It is the same site with actual design decisions made. The sequence stays the same. The palette stays the same. The fonts stay the same. What changes is that each scene is now required to have one dominant visual argument, and typography is required to carry hierarchy rather than annotate it.

The research supports this direction. Typography-led minimal sites continue to win current curation. Swiss grid discipline remains a live premium design language. The strongest competitive references — Powell Studio, Artiom Yakushev, Twice, Samuel Angibaud — all demonstrate that the difference between a generic portfolio and a premium one is not a different concept. It is a different level of compositional decision-making applied to the same elements.

v0.2 is the first pass where those decisions get made.
