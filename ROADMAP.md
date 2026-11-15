# Portfolio development roadmap

This is a personally maintained Next.js portfolio presenting projects, engineering experience and selected work. The repository is already public.

The list below describes **possible independent development work**, not completed work or a binding statement that the owner will spend the estimated time. Before submitting to a work programme, confirm the owner actually intends at least 20 hours of work here.

## Candidate work (25-40 hours, pending confirmation)

| Area | Proposed work | Acceptance criteria | Estimate |
| --- | --- | --- | --- |
| Accessibility | Review page landmarks, dialogs, focus management and keyboard-only navigation | Automated axe checks plus documented manual keyboard walkthrough | 5-8 h |
| Performance | Improve font/image loading, reduce client components, and measure page interaction costs | Before/after Lighthouse measurements with environment recorded | 4-7 h |
| Content model | Define typed project entries and source-of-truth metadata for case studies | Validated content schema with build-time feedback for missing fields | 4-7 h |
| Portfolio UX | Improve project filtering, mobile navigation and usable case-study detail pages | Regression checks for navigation and mobile sizes | 5-8 h |
| Maintainability | Add tests for content rendering, URLs and accessibility contracts; set up a repeatable CI build | Fresh checkout, lint, typecheck, build and tests documented | 5-7 h |
| Deployment hygiene | Review links, SEO metadata, redirects and production-preview consistency | Automated broken-link checks and deployed smoke test | 2-3 h |

## Rights and privacy notes

- A public portfolio can contain personally identifying information by design. Review the included CV and contact details and make sure only information intended for public release is present.
- Do **not** include employer/client source code, confidential documents or university-owned work. Describing work experience is not the same as making their IP available for reuse.
- If adding an accepted open-source licence, explicitly determine its scope for personal CV, portraits, artwork and any third-party media. Source-code licensing cannot silently grant rights you do not own.
- Inspect the complete Git history for secrets and deleted personal documents, not just the current working tree.
- Some older commits use an alternate student email in their author metadata. Confirm it belongs to the actual author and that ownership is correctly represented before signing a certification.
