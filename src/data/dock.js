import {
  Atom,
  Broadcast,
  Circuitry,
  Gauge,
  Microphone,
  Monitor,
  SlidersHorizontal,
  Sparkle,
} from "@phosphor-icons/react";

export const dockFeatures = [
  { icon: Sparkle, title: "灯效氛围", en: "LIGHT FIELD", text: "左、中、右三段 WS2812 被映射成连续逻辑灯带，让整张桌面拥有统一、可编排的反馈界面。", facts: [["250", "默认灯珠"], ["3", "独立灯区"], ["11+", "动态模式"]], chips: ["彩虹流动", "流星", "亚克力呼吸", "桌面极光", "玻璃流光", "低频涟漪", "专注模式"] },
  { icon: Gauge, title: "敲击交互", en: "TAP INPUT", text: "双 LSM6DS3 通过 SPI 采集左右结构振动，结合声音瞬态确认敲击，降低桌面误触发。", facts: [["2", "IMU 传感器"], ["L/R", "区域识别"], ["3", "敲击序列"]], chips: ["左右识别", "双击动作", "三击切换", "多击输入", "声音融合", "学习与校准"] },
  { icon: Monitor, title: "电脑控制", en: "PC CONTROL", text: "BLE HID 将敲击动作映射为电脑多媒体与快捷控制，同时保留 USB 串口配置和状态输出。", facts: [["BLE", "无线控制"], ["HID", "标准协议"], ["USB", "配置链路"]], chips: ["播放 / 暂停", "上下曲", "音量与静音", "锁屏", "灯效快捷动作", "串口命令"] },
  { icon: Microphone, title: "音频律动", en: "AUDIO REACTIVE", text: "INMP441 通过 I²S 获取声音能量，实时计算 RMS、包络与鼓点，让光效跟随环境或 PC 音频。", facts: [["I²S", "数字拾音"], ["RMS", "能量分析"], ["BEAT", "鼓点检测"]], chips: ["快速 / 慢速能量", "可调增益", "Attack / Release", "MIC / PC 音源", "鼓点脉冲"] },
  { icon: SlidersHorizontal, title: "桌面整合", en: "DESK WORKFLOW", text: "增高架、收纳、控制与状态反馈被整合为同一工作入口，参数可保存并持续迭代。", facts: [["ESP32-C3", "主控制器"], ["25ms", "灯效刷新"], ["APP", "上位机接口"]], chips: ["桌面增高", "设备收纳", "状态反馈", "参数保存", "固件升级", "App 通信"] },
];

export const dockPromiseCards = [
  ["01", "桌面控制中枢", "把增高架、灯效、传感器和电脑控制整合成同一个桌面入口。"],
  ["02", "桌面状态反馈", "工作模式、设备连接、音乐律动和敲击动作，都可以被灯效可视化。"],
  ["03", "工程师身份装备", "它服务于会焊接、会调试、会飞行、会造物的人，而不是普通办公装饰。"],
];

export const hardwareNodes = [
  [Gauge, "双 LSM6DS3", "SENSING", "左右振动与区域敲击"],
  [Microphone, "INMP441", "AUDIO", "RMS、包络与鼓点检测"],
  [Circuitry, "ESP32-C3", "CONTROL", "传感融合与动作路由"],
  [Sparkle, "三路 WS2812", "LIGHT", "左中右统一灯效引擎"],
  [Broadcast, "BLE HID", "WIRELESS", "多媒体与快捷控制"],
  [Monitor, "USB Serial", "INTERFACE", "配置、遥测与调试"],
  [SlidersHorizontal, "Command Router", "FIRMWARE", "参数、模式与状态管理"],
  [Atom, "PC App", "DESKTOP", "可视化配置与设备入口"],
];

export const dockSupportCards = [
  { eyebrow: "WINDOWS APP", title: "Windows 首发支持", desc: "SOZO Dock PC App 首发以 Windows 为主，承担灯效配置、状态查看和基础控制入口。", status: "准备首发" },
  { eyebrow: "MACOS PLAN", title: "macOS 版本规划中", desc: "Windows 版本稳定后，后续会按同一套软件逻辑推进 macOS 构建与适配。", status: "规划中" },
  { eyebrow: "USER MANUAL", title: "普通用户手册", desc: "文档优先服务普通用户，讲清安装、连接、灯效、敲击、常见问题，不做复杂开发者入口。", status: "预留" },
  { eyebrow: "RELEASE NOTES", title: "更新日志", desc: "软件、固件与功能变化会在官网集中记录，方便用户确认版本和更新内容。", status: "预留" },
];
