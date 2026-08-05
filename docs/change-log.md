# SOZO Web Change Log

This file records why a change was made, which files it touched, and how it was checked. Add one entry for every future modification.

## 2026-07-17

### Restore the light brand mark in the shared shell

- Files: `src/styles/v2-system.css`, `docs/change-log.md`, `site/AGENTS.md`
- Reason: The source `logo.png` is a dark mark intended for light display on the site's dark visual field. During the duplicate CSS cleanup, the old Header rule `filter: invert(1)` was removed without being migrated, so the original black asset appeared in the Header.
- Implementation: Restored `object-fit`, `filter: invert(1)`, opacity, and the shared image transition in the V2 brand owner. The same rule now applies consistently to the Footer brand.
- Verification: `npm.cmd run check:architecture` and `npm.cmd run build` pass; local homepage returns HTTP 200.
- Status: Implemented and verified.

## 2026-07-12

### Record the Footer transition requirement and root cause

- Files: `docs/ui-transition-requirements.md`, `docs/change-log.md`, `src/styles/v2-system.css`, `site/AGENTS.md`
- Reason: The last homepage panel and Footer still read as two separate sections. The user explicitly requires a continuous black-to-black fade with no obvious blue rectangular gradient.
- Finding: The visible seam is caused by a one-pixel panel line, a local `.footer-cta` cyan gradient, Footer borders, and split ownership between `styles.css` and `v2-system.css`.
- Verification: Reproduced at the local homepage in the in-app browser and confirmed the computed `.footer-cta` background includes `linear-gradient(90deg, rgba(116, 220, 255, 0.06), ...)` while the last panel ends at the exact Footer start.
- Implementation: Moved the transition surface to `.site-footer::before`, removed the Footer CTA's local cyan gradient and borders, hid the last homepage panel's separator line, and aligned Footer width with `--v2-side` on mobile.
- Verification: Desktop `1280x720` and mobile `390x844` browser checks both report `.footer-cta { background-image: none; border-top: 0; border-bottom: 0; }`; the Footer fade is rendered by `.site-footer::before` and no horizontal overflow was introduced.
- Status: Fixed and visually verified.

### Remove duplicate shared shell ownership

- Files: `src/styles.css`, `src/styles/v2-system.css`, `src/components/layout/PageShell.jsx`, `src/components/layout/Footer.jsx`, `scripts/check-style-ownership.mjs`, `package.json`, `docs/style-ownership.md`, `site/AGENTS.md`
- Reason: Shared Header, mobile navigation, Footer, and PageHero rules were implemented in both the legacy stylesheet and the V2 system layer. That allowed later overrides to recreate the visual seam and made the source of truth unclear.
- Implementation: Removed legacy shared shell rules, duplicate PageHero element rules, and unused immersive/story hero rules from `styles.css`; moved the remaining mobile menu behavior and `main#content` frame state into the V2 owner; removed the redundant final V2 guardrail layer; added a static ownership check for CSS, import order, and page mounts; documented the DOM and one-way dependency contracts.
- Verification: `npm.cmd run check:architecture` and `npm.cmd run build` pass. The source audit reports no shared shell selectors in `styles.css`.
- Status: Implemented; browser regression still required after the local dev page reconnects.
