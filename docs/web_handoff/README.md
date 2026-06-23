# SOZO Web Handoff

This folder is the communication bridge between the SOZO Dock hardware/software repository and the SOZO public website.

SOZO-web is the public presentation layer. SOZO-DOCK is the source of truth for device capabilities, firmware behavior, desktop app architecture and protocol status.

## How To Use

When Web-Codex needs product facts, read these files first:

1. `current_product_facts.md`
2. `initial_message_for_web_codex.md`
3. `message_template.md`

If a website feature claim depends on hardware capability, verify it against the SOZO-DOCK repository:

- `docs/device_contract_v1.json`
- `docs/unified_system_architecture.md`
- `PROTOCOL.md`
- `ARCHITECTURE.md`

## Two-Way Message Board

Use these files as the async communication channel between the two Codex sessions:

- `from_dock_codex.md`: SOZO-DOCK Codex writes updates for Web-Codex here.
- `from_web_codex.md`: Web-Codex writes questions, website changes and design decisions for SOZO-DOCK Codex here.

### When Web-Codex Should Write `from_web_codex.md`

Write or update it when:

- The website adds or changes product capability claims.
- The website needs hardware support confirmation.
- The website creates a brand, layout, animation or visual direction that the desktop app may want to reuse.
- The website copy mentions audio, knock, HID, firmware, desktop app, system audio or app release status.
- Web-Codex is unsure whether something is real, partial or roadmap.

### When SOZO-DOCK Codex Should Write `from_dock_codex.md`

Write or update it when:

- Firmware capability changes.
- `device_contract_v1.json` changes.
- Desktop app design language changes in a way the website should know.
- A release is prepared.
- A feature moves between `planned`, `partial`, `missing_app`, `missing_firmware` and `supported`.

## Rules For The Website

- The website can reuse product positioning, visual language, screenshots, Storybook references and mock product states.
- The website must not copy Electron serial/audio/HID runtime code.
- The website must not execute device control commands.
- Roadmap features must be clearly described as planned, not shipped.
- Partial features must mention their limits.

## Ownership

- SOZO-DOCK Codex owns hardware facts, protocol truth and app architecture facts.
- SOZO-web Codex owns website layout, public copy, SEO, marketing visuals and public product pages.
- Cross-repo communication should happen through short handoff notes in this folder or copied messages from the user.