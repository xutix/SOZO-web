# Current SOZO Dock Product Facts

Last synced from SOZO-DOCK: 2026-06-23.

## Product Positioning

SOZO Dock is a translucent acrylic desktop monitor stand / desktop control center. It combines ambient lighting, knock gestures, audio-reactive lighting and media control.

It is not just an engineering demo. The long-term goal is a consumer-grade desktop product with polished software.

## Hardware

Current hardware direction:

- ESP32-C3 controller.
- Multiple WS2812 LED strips.
- Dual IMU knock sensing.
- INMP441 microphone audio input.
- BLE HID media control.
- USB serial communication for desktop configuration.

## Software Repositories

SOZO-DOCK:

- Firmware.
- PySide6 hardware validation app.
- Electron + React formal desktop app prototype.
- Storybook design system workbench.
- Device capability contract.

SOZO-web:

- Public website.
- Product presentation.
- Brand and marketing UI.
- Does not directly control hardware.

## Capability Truth

Use SOZO-DOCK `docs/device_contract_v1.json` as the truth source.

Support levels:

- `supported`: real available capability.
- `partial`: exists but has limits.
- `missing_app`: firmware exists, app entry is incomplete.
- `missing_firmware`: not supported by firmware yet.
- `planned`: roadmap only.

## Currently Safe Website Claims

The website can say:

- SOZO Dock is designed as a desktop lighting and control center.
- It uses addressable LED lighting.
- It explores audio-reactive lighting with an onboard microphone.
- It explores knock gestures through motion sensors.
- It targets desktop media-control workflows through HID-style actions.
- A formal desktop control app is being built.

Use cautious wording for unfinished areas:

- Computer system audio support is under development and platform-dependent.
- macOS system audio support is a roadmap item.
- Full HID macro configuration is a roadmap item.
- Firmware update inside the formal app is a roadmap item.

## Do Not Claim As Fully Shipped Yet

Do not present these as complete shipped capabilities unless SOZO-DOCK updates the contract:

- Full HID macro editor.
- macOS system audio capture.
- Computer wake from SOZO Dock.
- In-app firmware update.
- Full public release of the Electron app.

## Visual Direction

The website and app should feel related:

- Light theme.
- Frosted glass.
- Translucent acrylic feel.
- Soft teal / blue accents.
- Clean product UI, not hacker-console UI.
- Premium desk setup aesthetic.

The website may be more expressive than the desktop app, but it should not become a heavy cyberpunk or admin-dashboard style.