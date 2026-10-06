# Compression pass: implementation record

Site-wide compression and visual differentiation, 6 October 2026. The strategic positioning is unchanged. This pass shortens the site and replaces repeated card grids with distinct interactive sections.

- **Commits:** `000e45b` (the pass) and `cd1b905` (group band hidden, diamond offsets removed) on `main`
- **Status:** implemented and pushed. Deployment still gated by the prerequisites in [[Strategic-Rebuild-Implementation-2026-09-25#Before this can go live]].

The approved headline remains: "Build the assurance your customers, regulators and partners expect". Geographic focus remains the United Kingdom, the United States and the GCC. No public pricing was introduced.

---

## Homepage

Six sections, then the closing invitation and the footer.

| | |
|---|---|
| 01 | Hero, with the assurance-system diagram |
| 02 | Six-service explorer, with four compact "working towards" labels |
| 03 | One pathway from requirement to independent assurance |
| 04 | Market switcher: United Kingdom, United States, GCC |
| 05 | AI governance feature on the dark band |
| 06 | Credential line, then the closing invitation |

Removed from the homepage, and deleted as components: the four route cards, the eight service cards, the separate "how we work" and "delivery model" sections, the three market cards, and the credential card grid.

Primary navigation is Services, Markets, Expertise, Insights, About. "Discuss your requirements" is the header button. Who we help stays as a page and is no longer in the bar. `/experience` redirects to `/expertise`.

## Other pages

- **About** is three parts: who we are, the delivery stack, and a credential line linking to Expertise.
- **Expertise** holds credentials, labelled practitioner experience, markets and frameworks, and how practitioners are assigned.
- **Who we help** lists typical requirements and relevant services for the six audiences.
- **Service pages** use one sentence, three situations, an accordion, three stages (Assess, Implement, Prepare), the service-specific independence note, three questions and three related services. The longer catalogue text remains in `src/data/services.ts` and is not rendered.
- Services hub and market listings are rows rather than card grids.

## Follow-ups the same day

- The "Part of Pixelette Group" footer band is hidden, not deleted. The markup is still in `Footer.tsx`. The company columns and the legal line remain visible.
- The pale offset outlines behind the Governance and Evidence diamonds in the hero diagram are removed.

## Still short of the brief

Recorded so a later pass does not treat these as done:

- Clicking a service name selects it. Only "Explore service" opens the page.
- The active service is shown by weight and colour, without a vertical indicator.
- The AI diagram settles into one boundary. The four concepts sit beside it.
- Mobile uses the same hero and AI graphics.
- The diagrams load with the page.

## Related

- [[Strategic-Rebuild-Implementation-2026-09-25]]
- [[Group-Footer-and-Privacy-Choices-2026-09-18]]
- [[Website-Replacement-Implementation-2026-09-09]]
