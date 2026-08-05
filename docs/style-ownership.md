# SOZO Web Style Ownership

## Shared shell owner

`src/styles/v2-system.css` is the single owner for the shared visual shell:

- `.site-header`, desktop navigation, mobile navigation, and menu button
- `main#content` frame behavior and the open-menu body state
- `.page-hero` and its shared video/image stage contract, including the generic visual slot
- `.site-footer`, `.footer-cta`, and `.footer-grid`
- Homepage `.home-cinematic` and `.cinematic-panel`

`src/styles.css` contains global tokens, resets, primitive controls, and page-specific sections. It must not define the shared shell selectors above.

## Dependency direction

`main.jsx` loads `styles.css` once for foundations, then `v2-system.css` once for the shared shell. Page components depend on `PageShell`; `PageShell` mounts `SiteHeader` and `Footer`. Pages may add page-specific classes, but they do not mount another shell or redefine the shell's CSS.

The direction is intentionally one-way:

```text
global foundations -> shared system shell -> page markup
```

Do not fix a V2 shell issue by adding a later legacy override. That creates a second dependency edge and is the reason the old transition bug kept returning.

## DOM ownership

`PageShell.jsx` owns the page frame and mounts exactly one `<main>` and one `<Footer />`. Every page mounts exactly one `PageShell` and provides content only. `Footer.jsx` owns exactly one `<footer>` element and must not mount another Footer or PageShell.

## Change rule

When a shared shell behavior changes, update its owner in `v2-system.css`. Do not add a compensating override to `styles.css`. Run:

```text
npm.cmd run check:architecture
npm.cmd run build
```

The ownership check is intentionally small: it catches the duplicate CSS layer and accidental duplicate Footer mounting that caused the transition bug to return.
