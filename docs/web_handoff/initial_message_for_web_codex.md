# Initial Message For Web-Codex

你现在在 `xutix/SOZO-web` 官网仓库工作。另一个 Codex 会话负责 `xutix/SOZO-DOCK`，也就是 SOZO Dock 的固件、桌面 App、协议、Storybook 和设备能力合同。

请把 SOZO-web 当作“展示层”，不要把它当作硬件控制端。

## 当前分工

SOZO-DOCK 负责：

- ESP32-C3 固件。
- WS2812 灯效系统。
- 双 IMU 敲击识别。
- INMP441 拾音。
- BLE HID 媒体控制。
- PySide6 硬件验证 App。
- Electron + React 正式桌面 App。
- Storybook 组件库。
- 设备能力合同 `device_contract_v1.json`。

SOZO-web 负责：

- 官网页面。
- 产品展示。
- 品牌视觉。
- 文案和 SEO。
- 公共可见的产品说明。
- 演示型 UI 和动效。

## 重要规则

官网可以复用 SOZO Dock 的产品定位、设计语言、功能说明和 Storybook 视觉参考。

官网不要复制或执行：

- Electron 串口代码。
- 真实硬件控制逻辑。
- 本地系统音频采集逻辑。
- BLE / HID 执行逻辑。

如果官网要写某个硬件能力，请先看 SOZO-DOCK 的：

- `docs/device_contract_v1.json`
- `docs/unified_system_architecture.md`
- `PROTOCOL.md`
- `ARCHITECTURE.md`

如果某个功能是 `planned`，官网只能写成“路线图 / 计划中”。
如果某个功能是 `partial`，官网必须写清楚限制。

## 当前产品事实

SOZO Dock 是一个半透明亚克力桌面增高架 / 桌面控制中心产品方向。

核心方向包括：

- 桌面氛围灯效。
- 拾音灯。
- 敲击交互。
- 媒体控制。
- 桌面端控制软件。

当前正式桌面 App 还在建设中，PySide6 App 是硬件验证工具，Electron App 是未来正式产品 App。

## 官网建议表达

可以说：

- “SOZO Dock is being built as a desktop lighting and control center.”
- “Designed for ambient light, audio-reactive scenes and desk-side interactions.”
- “A desktop control app is under active development.”

不要说：

- “Full macro editor is shipped.”
- “macOS system audio capture is complete.”
- “Firmware update is available in the app.”
- “All displayed features are already production-ready.”

## 沟通方式

如果你需要硬件事实、协议字段、功能支持级别或 App 架构说明，请让用户把问题带回 SOZO-DOCK Codex。

如果你改了官网里和产品能力有关的内容，也请在这个目录里更新 handoff 或让用户同步给 SOZO-DOCK Codex。