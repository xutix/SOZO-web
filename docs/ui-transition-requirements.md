# SOZO Web UI Transition Requirements

## Footer transition: high-priority visual rule

The last homepage cinematic panel must dissolve into the Footer as one continuous visual field.

Required behavior:

- The last panel and Footer must share the same base background token.
- The fade must begin inside the lower part of the last panel and continue through the transition area.
- The Footer CTA must not look like an independent blue card, banner, or rectangular panel.
- There must be no visible hard top edge, blue block, rounded container, or abrupt change in background tone.
- The rule must hold on desktop and mobile widths.
- The browser annotation/highlight color is not part of the page and must not be used as visual evidence.

Acceptance check:

> At the boundary between the last homepage panel and the Footer, a viewer should read one calm black-to-black fade, not two stacked sections.

## Current root cause

The current implementation has a structural seam instead of one shared transition surface:

1. `.cinematic-panel::after` is only a one-pixel signal line, so it cannot create a fade across the panel boundary.
2. `.footer-cta` owns its own left-to-right cyan gradient, which starts at the Footer boundary and reads as a local blue block.
3. `.footer-cta` also has its own top and bottom borders, reinforcing the feeling of a separate box.
4. `.cinematic-panel` uses `overflow: hidden`, so a fade placed inside the panel cannot visually extend beyond the panel's bottom edge.
5. The legacy `styles.css` and the newer `v2-system.css` both contain Footer rules. Later overrides hide some pseudo-elements, but the Footer background gradient remains active in `v2-system.css`.

## Why earlier attempts did not hold

Earlier adjustments reduced or removed individual borders and pseudo-elements, but they did not change the ownership of the transition. The Footer was still rendering its own background, while the last panel ended at a hard box boundary. As a result, changing opacity or gradient strength changed the symptom without creating a continuous fade.

The fix must therefore be evaluated at the seam between the last panel and the Footer, not by looking only at the Footer CTA in isolation.

## Design direction

SOZO's visual language is an engineering signal field: real imagery, calm black surfaces, restrained mint/cyan signals, and clear structure. Cyan is a datum or action signal, not a large-area Footer background. The final transition should preserve the last panel's atmosphere, settle into `--v2-bg`, and let the contact CTA emerge from the same field.
